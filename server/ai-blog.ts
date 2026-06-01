import { revalidateTag } from 'next/cache';
import { prisma } from './prisma';

// Shared Gemini-backed blog generator. Both /api/ai/generate-blog and
// /api/ai/generate-blog-oneshot call generateAndSave() — the latter also
// computes a crude SEO score.

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export interface GeneratedBlog {
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  seoTitle: string;
  coverImageAlt: string;
}

const DEFAULT_TOPICS = [
  'How healthcare clinics can use Google Business Profile to drive patient visits',
  'Why HIPAA-compliant analytics matter for medical practices in 2026',
  'The most underrated patient acquisition channel: local SEO',
  'How urgent care centers can lower their cost per acquisition',
  'A practical guide to AI chatbots for patient intake',
  'What healthcare marketing leaders should measure each week',
  'Patient reviews: a step-by-step Google Business Profile playbook',
  'Building a multi-location healthcare marketing dashboard that actually helps',
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
    const existing = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!existing) return candidate;
    counter += 1;
    candidate = `${base}-${counter}`;
  }
  return `${base}-${Date.now()}`;
}

function buildPrompt(topic: string) {
  return `You are a senior content editor for "The NextGen Healthcare Marketing" agency (https://thenextgenhealth.com). Write a polished, original blog post about the following topic.

TOPIC: ${topic}

VOICE & AUDIENCE:
- Professional but approachable, like an experienced practice manager talking to peers.
- Audience: clinic owners, practice managers, and healthcare marketers in the US.
- 700-900 words.
- Cite no fake statistics; keep numbers directional ("roughly", "typically").
- End with a one-sentence call-to-action that mentions https://thenextgenhealth.com/contact for a free strategy call.
- Content section is HTML — use <h2> for sections, <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis. No <html>/<head>/<body>/<h1>.

Output your answer using EXACTLY this delimited format. Each section starts with its tag on its own line and ends at the next tag. Output nothing outside the tags — no preamble, no markdown fences. The CONTENT section comes FIRST and is the most important — fill it in completely before anything else.

===CONTENT===
The full HTML body (700-900 words, multiple <h2>/<p>/<ul> as described above).

===TITLE===
A compelling 6-12 word headline (no quotes inside).

===EXCERPT===
A single sentence, 150-220 characters, summarizing the post.

===SEO_TITLE===
A 50-60 character SEO-optimized title with a primary keyword.

===META_DESCRIPTION===
A 140-160 character search-snippet description.

===COVER_ALT===
A short descriptive alt text for the cover image.

===END===`;
}

function parseDelimitedSections(text: string): GeneratedBlog {
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
  };
}

async function callGemini(topic: string): Promise<GeneratedBlog> {
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
          temperature: 0.75,
          maxOutputTokens: 6000,
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
    console.error('[AI blog] Gemini raw output (parse failed):', rawText.slice(0, 600));
    throw new Error('Gemini response did not include all required sections');
  }
  return parsed;
}

function computeSeoScore(blog: GeneratedBlog): number {
  let score = 0;
  if (blog.seoTitle && blog.seoTitle.length >= 40 && blog.seoTitle.length <= 70) score += 20;
  else if (blog.seoTitle) score += 10;
  if (
    blog.metaDescription &&
    blog.metaDescription.length >= 120 &&
    blog.metaDescription.length <= 170
  )
    score += 20;
  else if (blog.metaDescription) score += 10;
  if (blog.excerpt && blog.excerpt.length >= 140) score += 15;
  if (blog.content && blog.content.length >= 3000) score += 25;
  else if (blog.content && blog.content.length >= 1500) score += 15;
  if (blog.coverImageAlt && blog.coverImageAlt.length > 5) score += 10;
  if (/<h2[ >]/i.test(blog.content || '')) score += 10;
  return Math.min(100, score);
}

export async function generateAndSave(opts: {
  topic?: string;
  autoPublish?: boolean;
  withSeoScore: boolean;
}) {
  const topic = (opts.topic || '').trim() || pickFallbackTopic();
  const blog = await callGemini(topic);

  const slug = await uniqueSlug(slugify(blog.title));
  const seoScore = opts.withSeoScore ? computeSeoScore(blog) : undefined;

  const post = await prisma.post.create({
    data: {
      title: blog.title.slice(0, 250),
      slug,
      excerpt: blog.excerpt?.slice(0, 500) || null,
      content: blog.content || '',
      coverImage: null,
      coverImageAlt: blog.coverImageAlt?.slice(0, 250) || null,
      seoTitle: blog.seoTitle?.slice(0, 120) || null,
      metaDesc: blog.metaDescription?.slice(0, 200) || null,
      canonical: null,
      publishedAt: opts.autoPublish ? new Date() : null,
    },
  });
  revalidateTag('posts');

  return {
    success: true as const,
    post: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      publishedAt: post.publishedAt,
      ...(seoScore !== undefined ? { seoScore } : {}),
    },
  };
}
