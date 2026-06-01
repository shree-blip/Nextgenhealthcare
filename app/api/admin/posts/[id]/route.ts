import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';
import { sanitizeText } from '@server/sanitize';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id: rawId } = await ctx.params;
    const id = Number(rawId);
    if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    console.error('GET /api/admin/posts/:id error:', err);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

async function updatePost(req: NextRequest, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id: rawId } = await ctx.params;
    const id = Number(rawId);
    if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

    const body = (await req.json().catch(() => ({}))) as Record<string, any>;
    const data: Record<string, unknown> = {};
    if (body.title !== undefined) data.title = String(body.title).slice(0, 250);
    if (body.slug !== undefined) data.slug = String(body.slug).slice(0, 250);
    if (body.excerpt !== undefined)
      data.excerpt = body.excerpt ? String(body.excerpt).slice(0, 500) : null;
    if (body.content !== undefined)
      data.content = body.content ? sanitizeText(body.content, 50000) : '';
    if (body.coverImage !== undefined) data.coverImage = body.coverImage || null;
    if (body.coverImageAlt !== undefined) data.coverImageAlt = body.coverImageAlt || null;
    if (body.seoTitle !== undefined) data.seoTitle = body.seoTitle || null;
    if (body.metaDesc !== undefined) data.metaDesc = body.metaDesc || null;
    if (body.canonical !== undefined) data.canonical = body.canonical || null;
    if (body.publishedAt !== undefined)
      data.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;

    const post = await prisma.post.update({ where: { id }, data });
    revalidateTag('posts');
    return NextResponse.json(post);
  } catch (err) {
    console.error('Update /api/admin/posts/:id error:', err);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export const PATCH = updatePost;
export const PUT = updatePost;

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { id: rawId } = await ctx.params;
    const id = Number(rawId);
    if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    await prisma.post.delete({ where: { id } });
    revalidateTag('posts');
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/admin/posts/:id error:', err);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
