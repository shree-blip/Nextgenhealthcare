import { unstable_cache } from 'next/cache';
import { prisma } from '@server/prisma';
import SpaClient from './SpaClient';

/**
 * Catch-all SPA renderer with SSR-side data seeding.
 *
 * The React app itself still mounts client-side (BrowserRouter needs window),
 * but before the JS bundle even loads we ship the latest 30 published posts
 * and 30 published news items inside the HTML as `window.__SEED__`. BlogFeed
 * and NewsroomStrip read from that seed first, so the blog + healthcare news
 * pages paint immediately on first visit. The `/api/posts` and `/api/news`
 * calls still fire in the background as revalidation.
 *
 * The DB queries are wrapped in `unstable_cache` so they only hit Supabase
 * every 60 seconds across all requests, keeping page TTFB low.
 */

// One row per published post — slim payload (no `content`) matching the
// shape BlogFeed expects.
const fetchPostsSeed = unstable_cache(
  async () => {
    try {
      const rows = await prisma.post.findMany({
        where: { publishedAt: { not: null } },
        orderBy: { publishedAt: 'desc' },
        take: 30,
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
      return rows.map((r) => ({
        ...r,
        publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
        updatedAt: r.updatedAt.toISOString(),
      }));
    } catch {
      return [];
    }
  },
  ['seed-posts-v1'],
  { revalidate: 60, tags: ['posts'] },
);

const fetchNewsSeed = unstable_cache(
  async () => {
    try {
      const rows = await prisma.newsArticle.findMany({
        where: { publishedAt: { not: null } },
        orderBy: { publishedAt: 'desc' },
        take: 30,
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
      return rows.map((r) => ({
        ...r,
        sourceDate: r.sourceDate ? r.sourceDate.toISOString() : null,
        publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
        updatedAt: r.updatedAt.toISOString(),
      }));
    } catch {
      return [];
    }
  },
  ['seed-news-v1'],
  { revalidate: 60, tags: ['news'] },
);

export default async function CatchAllPage() {
  // Both queries run in parallel; either returning [] just means the SPA
  // falls through to its client-side fetch (no harm done).
  const [posts, news] = await Promise.all([fetchPostsSeed(), fetchNewsSeed()]);

  // JSON.stringify here is safe — we control the columns selected above and
  // none contain user-supplied HTML. The </script> closer is still escaped
  // defensively in case any excerpt later contains it.
  const seedJson = JSON.stringify({ posts, news }).replace(/</g, '\\u003c');

  return (
    <>
      <script
        // Synchronously sets the seed BEFORE the SPA bundle runs so first paint sees it.
        dangerouslySetInnerHTML={{ __html: `window.__SEED__=${seedJson};` }}
      />
      <SpaClient />
    </>
  );
}
