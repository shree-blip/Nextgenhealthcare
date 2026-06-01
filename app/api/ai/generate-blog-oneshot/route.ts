import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { generateAndSave } from '@server/ai-blog';

// AI blog generation + SEO scoring can exceed Vercel's default 10s limit.
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const { topic, autoPublish } = (await req.json().catch(() => ({}))) as {
      topic?: string;
      autoPublish?: boolean;
    };
    const result = await generateAndSave({
      topic: typeof topic === 'string' ? topic : undefined,
      autoPublish: !!autoPublish,
      withSeoScore: true,
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error('/api/ai/generate-blog-oneshot error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 },
    );
  }
}
