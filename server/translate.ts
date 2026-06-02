import crypto from 'node:crypto';
import { prisma } from './prisma';

/**
 * On-the-fly translation of admin-authored content (blog posts, news articles).
 *
 * The article rows are written once in English. When a visitor requests a
 * supported non-English language, we translate the relevant fields with Gemini
 * and cache the result in the existing `GoogleApiCache` table (keyed
 * `tr:<entityType>:<id>:<lang>`). A subsequent request for the same language
 * is served from cache. The cache stores an md5 `sourceHash` of the English
 * fields — when the admin edits the article the hash changes, so the stale
 * translation is regenerated automatically.
 *
 * If GEMINI_API_KEY is missing or Gemini fails, callers transparently fall
 * back to the original English text — translation is best-effort, never fatal.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export type TargetLang = 'es';
const LANG_NAME: Record<TargetLang, string> = { es: 'Spanish (neutral Latin American)' };

/** Map an incoming language code to a supported translation target, or null
 *  (null = serve the original English, no translation needed). */
export function normalizeTargetLang(raw?: string | null): TargetLang | null {
  const code = String(raw || '').toLowerCase();
  if (code === 'es' || code.startsWith('es-')) return 'es';
  return null;
}

type Fields = Record<string, string>;

const md5 = (s: string) => crypto.createHash('md5').update(s).digest('hex');
const cacheKeyFor = (entityType: string, id: number, lang: TargetLang) =>
  `tr:${entityType}:${id}:${lang}`;

interface CacheEntry {
  sourceHash: string;
  fields: Fields;
}

async function readCache(
  entityType: string,
  ids: number[],
  lang: TargetLang,
): Promise<Map<number, CacheEntry>> {
  const out = new Map<number, CacheEntry>();
  if (ids.length === 0) return out;
  const keys = ids.map((id) => cacheKeyFor(entityType, id, lang));
  try {
    const rows = await prisma.googleApiCache.findMany({ where: { cacheKey: { in: keys } } });
    for (const row of rows) {
      const idMatch = row.cacheKey.split(':')[2];
      const id = Number(idMatch);
      const data = row.responseData as unknown as CacheEntry | null;
      if (!Number.isNaN(id) && data && typeof data === 'object' && data.fields) {
        out.set(id, { sourceHash: data.sourceHash, fields: data.fields });
      }
    }
  } catch (err) {
    console.error('[translate] cache read failed:', err);
  }
  return out;
}

async function writeCache(
  entityType: string,
  id: number,
  lang: TargetLang,
  entry: CacheEntry,
): Promise<void> {
  const cacheKey = cacheKeyFor(entityType, id, lang);
  // Translations don't expire on a clock — invalidation is via sourceHash —
  // but the column is required, so park it far in the future.
  const expiresAt = new Date('2099-01-01T00:00:00Z');
  try {
    await prisma.googleApiCache.upsert({
      where: { cacheKey },
      create: { cacheKey, responseData: entry as unknown as object, expiresAt },
      update: { responseData: entry as unknown as object, expiresAt },
    });
  } catch (err) {
    console.error('[translate] cache write failed:', err);
  }
}

/** Translate an array of field-maps in ONE Gemini call. Returns the same-length
 *  array of translated field-maps, or throws on failure. */
async function geminiTranslateBatch(items: Fields[], lang: TargetLang): Promise<Fields[]> {
  if (items.length === 0) return [];
  const prompt = `You are a professional translator for a healthcare marketing website.
Translate the string VALUES of the following JSON array from English into ${LANG_NAME[lang]}.

Rules:
- Return a JSON array with EXACTLY ${items.length} objects, in the same order.
- Keep every object's keys exactly as given; translate only the values.
- Preserve any HTML tags, markdown, line breaks, and URLs unchanged.
- Do NOT translate brand or technical names: "TheNextGen", "Google", "Meta", "HIPAA", "SEO", "GA4".
- Output ONLY the JSON array. No commentary, no code fences.

INPUT:
${JSON.stringify(items)}`;

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
      },
    }),
  });
  if (!res.ok) throw new Error(`Gemini translate HTTP ${res.status}`);
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = (data.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text || '')
    .join('')
    .trim();
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  const parsed = JSON.parse(cleaned) as Fields[];
  if (!Array.isArray(parsed) || parsed.length !== items.length) {
    throw new Error('Gemini translate returned an unexpected shape');
  }
  return parsed;
}

/**
 * Translate a list of records into `lang`, using the cache and a single batched
 * Gemini call for any cache misses. `pick` extracts the (non-empty) fields to
 * translate; `apply` merges the translated fields back onto a copy of the
 * record. Records whose translation is unavailable are returned unchanged
 * (English).
 */
export async function translateRecords<T extends { id: number }>(
  entityType: 'post' | 'news',
  lang: TargetLang,
  records: T[],
  pick: (r: T) => Fields,
  apply: (r: T, translated: Fields) => T,
): Promise<T[]> {
  if (!GEMINI_API_KEY || records.length === 0) return records;

  const sources = records.map((r) => {
    const fields = pick(r);
    return { id: r.id, fields, hash: md5(JSON.stringify(fields)) };
  });

  const cache = await readCache(
    entityType,
    sources.map((s) => s.id),
    lang,
  );

  // Decide which records need a fresh translation (cache miss or stale hash).
  const translatedById = new Map<number, Fields>();
  const pending: { id: number; fields: Fields; hash: string }[] = [];
  for (const s of sources) {
    const hit = cache.get(s.id);
    if (hit && hit.sourceHash === s.hash) {
      translatedById.set(s.id, hit.fields);
    } else if (Object.keys(s.fields).length > 0) {
      pending.push(s);
    }
  }

  if (pending.length > 0) {
    try {
      const results = await geminiTranslateBatch(
        pending.map((p) => p.fields),
        lang,
      );
      await Promise.all(
        pending.map(async (p, i) => {
          const translated = results[i] || p.fields;
          translatedById.set(p.id, translated);
          await writeCache(entityType, p.id, lang, { sourceHash: p.hash, fields: translated });
        }),
      );
    } catch (err) {
      console.error('[translate] batch failed, serving English:', err);
      // Leave pending records untranslated → English fallback.
    }
  }

  return records.map((r) => {
    const t = translatedById.get(r.id);
    return t ? apply(r, t) : r;
  });
}
