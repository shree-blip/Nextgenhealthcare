import { revalidateTag } from 'next/cache';
import { prisma } from './prisma';

// Shared Gemini-backed news generator. Mirrors ai-blog.ts but produces shorter
// news-style copy (250-450 words), no fictional stats, and writes to the
// NewsArticle table instead of Post.

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export interface GeneratedNews {
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  seoTitle: string;
  coverImageAlt: string;
  source: string;
}

const DEFAULT_TOPICS = [
  'Hospital systems adopt voice-AI for patient intake',
  'CMS proposes reimbursement updates for remote patient monitoring',
  'FDA clears continuous glucose monitor for non-diabetic adults',
  'Telehealth use stabilizes after pandemic-era peak',
  'Major EHR vendor expands HIPAA-aware AI scribe pilot',
  'Patient review velocity is the new local-SEO signal for clinics',
  'Medical groups consolidate marketing stacks to cut tool sprawl',
  'Rural clinics turn to shared MSO platforms for compliance',
];

function pickFallbackTopic() {
  return DEFAULT_TOPICS[Math.floor(Math.random() * DEFAULT_TOPICS.length)];
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let candidate = base || 'untitled';
  let counter = 1;
  for (let i = 0; i < 50; i++) {
    const existing = await prisma.newsArticle.findUnique({ where: { slug: candidate } });
    if (!existing) return candidate;
    counter += 1;
    candidate = `${base}-${counter}`;
  }
  return `${base}-${Date.now()}`;
}

function buildPrompt(topic: string) {
  return `You are the senior newsroom editor for "TheNextGen Healthcare Marketing" weekly brief. Write an original, factual news-style article about the topic below.

TOPIC: ${topic}

VOICE & AUDIENCE:
- Audience: US clinic owners, practice managers, and healthcare marketers.
- Tone: neutral, factual, AP-style. Lead with the most important fact. No marketing fluff.
- Length: 250-450 words.
- Do NOT invent specific dates, dollar figures, percentages, or named individuals. Use directional language ("most", "many", "roughly") and refer to publicly-known organizations only (CMS, FDA, CDC, HIMSS, Mayo, Cleveland Clinic, etc.).
- End with one short paragraph on the practical implication for clinics.
- Content section is HTML — use <p> for paragraphs, <h2> for one optional subheading, <strong> for emphasis, <ul>/<li> for at most one short list. No <html>/<head>/<body>/<h1>.

Output your answer using EXACTLY this delimited format. Each section starts with its tag on its own line and ends at the next tag. Output nothing outside the tags — no preamble, no markdown fences. The CONTENT section comes FIRST.

===CONTENT===
The full HTML body (250-450 words).

===TITLE===
A clear 6-12 word news headline (no quotes inside, no clickbait).

===EXCERPT===
A single-sentence dek, 140-200 characters.

===SOURCE===
The most plausible publisher tag (e.g. "FDA", "CMS", "HIMSS", "Industry"). Single short label, no URL.

===SEO_TITLE===
A 50-60 character SEO-optimized title.

===META_DESCRIPTION===
A 140-160 character search-snippet description.

===COVER_ALT===
A short descriptive alt text for a cover image.

===END===`;
}

function parseDelimitedSections(text: string): GeneratedNews {
  const parts = text.split(/===\s*([A-Z_]+)\s*===/);
  const sections: Record<string, string> = {};
  for (let i = 1; i < parts.length; i += 2) {
    const tag = parts[i];
    const body = (parts[i + 1] ?? '').trim();
    if (tag === 'END') continue;
    sections[tag] = body;
  }
  return {
    title: sections.TITLE || '',
    excerpt: sections.EXCERPT || '',
    seoTitle: sections.SEO_TITLE || '',
    metaDescription: sections.META_DESCRIPTION || '',
    coverImageAlt: sections.COVER_ALT || '',
    content: sections.CONTENT || '',
    source: sections.SOURCE || '',
  };
}

async function callGemini(topic: string): Promise<GeneratedNews> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured. Add it to .env.local');
  }
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: buildPrompt(topic) }] }],
        generationConfig: {
          temperature: 0.7,
          // News articles are shorter than blogs — 4000 is plenty of headroom
          // for ~450-word HTML body + the metadata sections.
          maxOutputTokens: 4000,
        },
      }),
    },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Gemini ${res.status}: ${text.slice(0, 200) || 'unknown error'}`);
  }
  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (!rawText) throw new Error('Gemini returned an empty response');

  const parsed = parseDelimitedSections(rawText);
  if (!parsed.title || !parsed.content) {
    console.error('[AI news] Gemini raw output (parse failed):', rawText.slice(0, 600));
    throw new Error('Gemini response did not include all required sections');
  }
  return parsed;
}

// Heuristic 0-100 quality score for the oneshot endpoint. Tuned for news
// (shorter content, source label expected).
function computeValidationScore(news: GeneratedNews): number {
  let score = 0;
  if (news.seoTitle && news.seoTitle.length >= 40 && news.seoTitle.length <= 70) score += 18;
  else if (news.seoTitle) score += 8;
  if (
    news.metaDescription &&
    news.metaDescription.length >= 120 &&
    news.metaDescription.length <= 170
  )
    score += 18;
  else if (news.metaDescription) score += 8;
  if (news.excerpt && news.excerpt.length >= 130) score += 14;
  if (news.content && news.content.length >= 1200) score += 22;
  else if (news.content && news.content.length >= 600) score += 12;
  if (news.coverImageAlt && news.coverImageAlt.length > 5) score += 8;
  if (news.source && news.source.length > 1) score += 10;
  if (/<p[ >]/i.test(news.content || '')) score += 10;
  return Math.min(100, score);
}

export async function generateAndSaveNews(opts: {
  topic?: string;
  autoPublish?: boolean;
  withScore: boolean;
}) {
  const topic = (opts.topic || '').trim() || pickFallbackTopic();
  const news = await callGemini(topic);

  const slug = await uniqueSlug(slugify(news.title));
  const validationScore = opts.withScore ? computeValidationScore(news) : undefined;

  const article = await prisma.newsArticle.create({
    data: {
      title: news.title.slice(0, 250),
      slug,
      excerpt: news.excerpt?.slice(0, 500) || null,
      content: news.content || '',
      coverImage: null,
      coverImageAlt: news.coverImageAlt?.slice(0, 250) || null,
      publisher: 'The NextGen Healthcare Marketing',
      source: news.source?.slice(0, 60) || null,
      sourceUrl: null,
      sourceDate: null,
      seoTitle: news.seoTitle?.slice(0, 120) || null,
      metaDesc: news.metaDescription?.slice(0, 200) || null,
      publishedAt: opts.autoPublish ? new Date() : null,
    },
  });
  revalidateTag('news');

  return {
    success: true as const,
    article: {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      source: article.source,
      publishedAt: article.publishedAt,
      ...(validationScore !== undefined ? { validationScore } : {}),
    },
  };
}
