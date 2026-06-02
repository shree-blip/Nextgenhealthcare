import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { sanitizeText } from '@server/sanitize';
import { normalizeTargetLang, translateRecords } from '@server/translate';

// Translating long article bodies can exceed Vercel's default 10s function limit.
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  try {
    const lang = normalizeTargetLang(req.nextUrl.searchParams.get('lang'));
    const slug = req.nextUrl.searchParams.get('slug')?.trim();
    if (slug) {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: { author: true, categories: true, tags: true },
      });
      if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const out = lang
        ? (
            await translateRecords(
              'post',
              lang,
              [post],
              (p) => ({
                ...(p.title ? { title: p.title } : {}),
                ...(p.excerpt ? { excerpt: p.excerpt } : {}),
                ...(p.content ? { content: p.content } : {}),
                ...(p.coverImageAlt ? { coverImageAlt: p.coverImageAlt } : {}),
              }),
              (p, t) => ({ ...p, ...t }),
            )
          )[0]
        : post;
      return NextResponse.json(out, {
        headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=600' },
      });
    }
    const posts = await prisma.post.findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        coverImageAlt: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
    const out = lang
      ? await translateRecords(
          'post',
          lang,
          posts,
          (p) => ({
            ...(p.title ? { title: p.title } : {}),
            ...(p.excerpt ? { excerpt: p.excerpt } : {}),
          }),
          (p, t) => ({ ...p, ...t }),
        )
      : posts;
    return NextResponse.json(out, {
      headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=300' },
    });
  } catch (err) {
    console.error('GET /api/posts error:', err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'title and slug are required' }, { status: 400 });
    }
    const existing = await prisma.post.findUnique({ where: { slug: body.slug } });
    if (existing) {
      return NextResponse.json({ error: 'A post with that slug already exists' }, { status: 409 });
    }
    const post = await prisma.post.create({
      data: {
        title: String(body.title).slice(0, 250),
        slug: String(body.slug).slice(0, 250),
        excerpt: body.excerpt ? String(body.excerpt).slice(0, 500) : null,
        content: body.content ? sanitizeText(body.content, 50000) : '',
        coverImage: body.coverImage || null,
        coverImageAlt: body.coverImageAlt || null,
        seoTitle: body.seoTitle || null,
        metaDesc: body.metaDesc || null,
        canonical: body.canonical || null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
      },
    });
    // Bust the SSR seed cache so the new post shows up on next pageview.
    revalidateTag('posts');
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error('POST /api/posts error:', err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
