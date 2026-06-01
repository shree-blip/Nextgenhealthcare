import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

/**
 * Admin per-article ops.
 *
 *   GET    /api/admin/news/:id  → fetch (any status)
 *   PUT    /api/admin/news/:id  → partial update (publish toggle uses this)
 *   PATCH  /api/admin/news/:id  → same as PUT (REST-conventional alias)
 *   DELETE /api/admin/news/:id  → remove
 */

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const article = await prisma.newsArticle.findUnique({ where: { id } });
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(article);
  } catch (err) {
    console.error('GET /api/admin/news/:id error:', err);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

async function applyUpdate(req: NextRequest, params: Promise<{ id: string }>) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    // Only set fields the client actually sent — enables partial updates
    // like the publish-toggle (which only sends { publishedAt }).
    const data: Record<string, unknown> = {};

    if (body.title !== undefined) data.title = String(body.title).slice(0, 250);
    if (body.slug !== undefined) data.slug = String(body.slug).slice(0, 250);
    if (body.excerpt !== undefined)
      data.excerpt = body.excerpt ? String(body.excerpt).slice(0, 500) : null;
    if (body.content !== undefined)
      data.content =
        typeof body.content === 'string' ? body.content.slice(0, 200000) : '';
    if (body.coverImage !== undefined) data.coverImage = body.coverImage || null;
    if (body.coverImageAlt !== undefined) data.coverImageAlt = body.coverImageAlt || null;
    if (body.publisher !== undefined)
      data.publisher = body.publisher || 'The NextGen Healthcare Marketing';
    if (body.source !== undefined) data.source = body.source || null;
    if (body.sourceUrl !== undefined) data.sourceUrl = body.sourceUrl || null;
    if (body.sourceDate !== undefined)
      data.sourceDate = body.sourceDate ? new Date(String(body.sourceDate)) : null;
    if (body.seoTitle !== undefined) data.seoTitle = body.seoTitle || null;
    if (body.metaDesc !== undefined) data.metaDesc = body.metaDesc || null;
    if (body.publishedAt !== undefined)
      data.publishedAt = body.publishedAt ? new Date(String(body.publishedAt)) : null;

    const article = await prisma.newsArticle.update({ where: { id }, data });
    revalidateTag('news');
    return NextResponse.json(article);
  } catch (err) {
    console.error('Update /api/admin/news/:id error:', err);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export const PUT = (req: NextRequest, ctx: { params: Promise<{ id: string }> }) =>
  applyUpdate(req, ctx.params);

export const PATCH = (req: NextRequest, ctx: { params: Promise<{ id: string }> }) =>
  applyUpdate(req, ctx.params);

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  try {
    await prisma.newsArticle.delete({ where: { id } });
    revalidateTag('news');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/admin/news/:id error:', err);
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
