import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

/**
 * Admin news endpoints (require admin auth).
 *
 *   GET  /api/admin/news  → list ALL articles incl. drafts (matches the
 *                           AdminDashboard's News Management view shape)
 *   POST /api/admin/news  → create a new article
 *
 * Per-row update/delete live at /api/admin/news/[id].
 */

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function uniqueSlug(base: string) {
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

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
    });
    // AdminDashboard's NewsManagement view expects an array (`setArticles(data)`).
    return NextResponse.json(articles);
  } catch (err) {
    console.error('GET /api/admin/news error:', err);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const rawSlug =
      typeof body.slug === 'string' && body.slug.trim() ? slugify(body.slug) : slugify(title);
    const slug = await uniqueSlug(rawSlug);

    const article = await prisma.newsArticle.create({
      data: {
        title: title.slice(0, 250),
        slug,
        excerpt: typeof body.excerpt === 'string' ? body.excerpt.slice(0, 500) : null,
        // Content is admin-authored HTML — capped, not tag-stripped.
        content: typeof body.content === 'string' ? body.content.slice(0, 200000) : '',
        coverImage: typeof body.coverImage === 'string' ? body.coverImage : null,
        coverImageAlt: typeof body.coverImageAlt === 'string' ? body.coverImageAlt : null,
        publisher:
          typeof body.publisher === 'string' && body.publisher.trim()
            ? body.publisher.slice(0, 120)
            : 'The NextGen Healthcare Marketing',
        source: typeof body.source === 'string' ? body.source.slice(0, 120) : null,
        sourceUrl: typeof body.sourceUrl === 'string' ? body.sourceUrl.slice(0, 500) : null,
        sourceDate: body.sourceDate ? new Date(String(body.sourceDate)) : null,
        seoTitle: typeof body.seoTitle === 'string' ? body.seoTitle.slice(0, 120) : null,
        metaDesc: typeof body.metaDesc === 'string' ? body.metaDesc.slice(0, 200) : null,
        publishedAt: body.publishedAt ? new Date(String(body.publishedAt)) : null,
      },
    });
    revalidateTag('news');
    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    console.error('POST /api/admin/news error:', err);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
