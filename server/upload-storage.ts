import { put } from '@vercel/blob';
import path from 'node:path';
import fs from 'node:fs/promises';

const PUBLIC_UPLOADS = path.join(process.cwd(), 'public', 'uploads');

export async function storeUpload(
  subdir: 'blog' | 'avatar',
  file: File,
): Promise<{ url: string; filename: string }> {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  const dot = file.name.lastIndexOf('.');
  const rawExt = dot >= 0 ? file.name.slice(dot).toLowerCase() : '';
  const ext = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(rawExt) ? rawExt : '.png';
  const basename = `${stamp}-${rand}${ext}`;
  const filename = `${subdir}/${basename}`;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const blob = await put(filename, file, { access: 'public', contentType: file.type, token });
    return { url: blob.url, filename };
  }

  const dir = path.join(PUBLIC_UPLOADS, subdir);
  await fs.mkdir(dir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, basename), bytes);
  return { url: `/uploads/${filename}`, filename };
}
