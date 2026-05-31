import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@server/auth';
import { storeUpload } from '@server/upload-storage';

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard instanceof NextResponse) return guard;

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 400 });
    }

    const { url, filename } = await storeUpload('blog', file);

    return NextResponse.json(
      { url, filename, size: file.size, mimeType: file.type },
      { status: 201 },
    );
  } catch (err) {
    console.error('Blog image upload error:', err);
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
