import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { normalizeTargetLang, translateRecords, translateLongText } from '@server/translate';

/**
 * Public news endpoints.
 *
 *   GET /api/news              → list all published articles (slim payload)
 *   GET /api/news?slug=x       → single article by slug (full payload)
 *   GET /api/news?lang=es[&…]  → same, with title/excerpt/content translated
 *
 * Admin create/update/delete live under /api/admin/news.
 */

// Translating long article bodies can exceed Vercel's default 10s function limit.
export const maxDuration = 60;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = normalizeTargetLang(searchParams.get('lang'));
    const slug = searchParams.get('slug')?.trim();

    if (slug) {
      const article = await prisma.newsArticle.findUnique({ where: { slug } });
      if (!article || !article.publishedAt) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      let out: typeof article = article;
      if (lang) {
        const [withShort] = await translateRecords(
          'news',
          lang,
          [article],
          (a) => ({
            ...(a.title ? { title: a.title } : {}),
            ...(a.excerpt ? { excerpt: a.excerpt } : {}),
          }),
          (a, t) => ({ ...a, ...t }),
        );
        const content = await translateLongText('news', article.id, lang, article.content);
        out = { ...withShort, content };
      }
      const res = NextResponse.json(out);
      res.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
      return res;
    }

    const articles = await prisma.newsArticle.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        coverImageAlt: true,
        publisher: true,
        source: true,
        sourceUrl: true,
        sourceDate: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
    const out = lang
      ? await translateRecords(
          'news',
          lang,
          articles,
          (a) => ({
            ...(a.title ? { title: a.title } : {}),
            ...(a.excerpt ? { excerpt: a.excerpt } : {}),
          }),
          (a, t) => ({ ...a, ...t }),
        )
      : articles;
    const res = NextResponse.json(out);
    res.headers.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=300');
    return res;
  } catch (err) {
    console.error('GET /api/news error:', err);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
