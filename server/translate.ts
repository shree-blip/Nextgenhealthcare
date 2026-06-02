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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** POST a prompt to Gemini and return the concatenated text. Retries on the
 *  transient "overloaded"/rate-limit statuses (429/500/503) with backoff —
 *  Gemini returns 503 fairly often on larger requests, which otherwise made
 *  long article bodies silently fall back to English. */
async function callGemini(prompt: string, opts: { json?: boolean } = {}): Promise<string> {
  const body = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 8192,
      ...(opts.json ? { responseMimeType: 'application/json' } : {}),
    },
  });

  const delays = [600, 1500];
  let lastErr: unknown;
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    try {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body,
      });
      if (res.ok) {
        const data = (await res.json()) as {
          candidates?: { content?: { parts?: { text?: string }[] } }[];
        };
        return (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
      }
      // Retry transient overload / rate-limit statuses; fail fast on the rest.
      if (![429, 500, 503].includes(res.status) || attempt === delays.length) {
        throw new Error(`Gemini HTTP ${res.status}`);
      }
      lastErr = new Error(`Gemini HTTP ${res.status}`);
    } catch (err) {
      lastErr = err;
      if (attempt === delays.length) break;
    }
    await sleep(delays[attempt]);
  }
  throw lastErr instanceof Error ? lastErr : new Error('Gemini request failed');
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

  const text = (await callGemini(prompt, { json: true })).trim();
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

/** Translate one piece of plain/HTML text via Gemini (no JSON wrapper, so it
 *  can't be derailed by parse errors). Brand/technical names are preserved. */
async function geminiTranslatePlain(text: string, lang: TargetLang): Promise<string> {
  const prompt = `Translate the following healthcare-marketing article content into ${LANG_NAME[lang]}.
Rules:
- Preserve ALL HTML tags, markdown, and line breaks exactly as they appear.
- Do NOT translate brand or technical names: "TheNextGen", "Google", "Meta", "HIPAA", "SEO", "GA4".
- Output ONLY the translated text — no preamble, no explanation, no code fences.

CONTENT:
${text}`;

  const out = await callGemini(prompt);
  if (!out.trim()) throw new Error('Gemini returned empty translation');
  return out;
}

// Split long text into chunks that stay comfortably under the model's output
// limit, preferring paragraph boundaries so HTML/markdown blocks aren't cut
// mid-tag. ~5000 chars ≈ well under 8192 output tokens.
function chunkText(text: string, maxChars = 3500): string[] {
  if (text.length <= maxChars) return [text];
  const pieces = text.split(/(\n\n+)/); // keep the separators
  const chunks: string[] = [];
  let cur = '';
  for (const piece of pieces) {
    if (cur && (cur + piece).length > maxChars) {
      chunks.push(cur);
      cur = '';
    }
    cur += piece;
    while (cur.length > maxChars) {
      chunks.push(cur.slice(0, maxChars));
      cur = cur.slice(maxChars);
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

/**
 * Translate a long text field (an article body) into `lang`.
 *
 * The body is split into paragraph-sized chunks and EACH chunk is cached
 * independently, content-addressed by its md5 (`trc:<lang>:<hash>`). This makes
 * the operation resilient to Gemini's frequent 503 "overloaded" responses:
 *   - progress is never lost — already-translated chunks are reused on the next
 *     request, so a flaky first load that only does part of the body completes
 *     over a couple of page views;
 *   - the work is time-bounded (well under the 60s function cap) so the request
 *     never times out — any chunk not finished in time is returned in English
 *     this round and translated on a later request;
 *   - identical paragraphs across articles are translated once.
 * Never throws — worst case it returns (partial) English.
 */
export async function translateLongText(
  _entityType: 'post' | 'news',
  _id: number,
  lang: TargetLang,
  text: string | null | undefined,
): Promise<string> {
  const source = text || '';
  if (!GEMINI_API_KEY || !source.trim()) return source;

  const chunks = chunkText(source);
  const keys = chunks.map((c) => `trc:${lang}:${md5(c)}`);

  // Pre-load all already-cached chunk translations in one query.
  const cacheByKey = new Map<string, string>();
  try {
    const rows = await prisma.googleApiCache.findMany({
      where: { cacheKey: { in: Array.from(new Set(keys)) } },
    });
    for (const r of rows) {
      const d = r.responseData as unknown as { text?: string } | null;
      if (d && typeof d.text === 'string') cacheByKey.set(r.cacheKey, d.text);
    }
  } catch (err) {
    console.error('[translate] chunk cache read failed:', err);
  }

  const deadline = Date.now() + 22000; // leave generous headroom under the 60s cap
  const expiresAt = new Date('2099-01-01T00:00:00Z');
  const out: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const key = keys[i];
    const cached = cacheByKey.get(key);
    if (cached != null) {
      out.push(cached);
      continue;
    }
    if (Date.now() > deadline) {
      out.push(chunks[i]); // out of time — English this round, fills in next load
      continue;
    }
    try {
      const translated = await geminiTranslatePlain(chunks[i], lang);
      out.push(translated);
      cacheByKey.set(key, translated);
      await prisma.googleApiCache
        .upsert({
          where: { cacheKey: key },
          create: { cacheKey: key, responseData: { text: translated } as unknown as object, expiresAt },
          update: { responseData: { text: translated } as unknown as object, expiresAt },
        })
        .catch((err) => console.error('[translate] chunk cache write failed:', err));
    } catch (err) {
      console.error('[translate] chunk translation failed, English for this chunk:', err);
      out.push(chunks[i]);
    }
  }

  return out.join('');
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
