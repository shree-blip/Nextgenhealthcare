import { NextResponse } from 'next/server';
import { prisma } from '@server/prisma';
import { requireAdmin } from '@server/auth';

export async function GET() {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const posts = await prisma.post.findMany({ orderBy: { publishedAt: 'desc' }, take: 200 });
    return NextResponse.json({ posts });
  } catch (err) {
    console.error('GET /api/admin/posts error:', err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
