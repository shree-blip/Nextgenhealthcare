import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon, ClockIcon } from '@/components/icons';

/**
 * BlogFeed — DB-driven editorial layout.
 *
 * Renders posts admin-published through /dashboard/admin/blog in an editorial
 * news layout. Uses a stale-while-revalidate cache so repeat visits paint
 * instantly while a fresh fetch runs in the background.
 */

interface DbPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

type LoadState = 'loading' | 'ready' | 'error';

// In-memory + sessionStorage cache so the blog page renders instantly on
// repeat visits. The fresh /api/posts response fires in the background and
// updates state when it arrives (SWR pattern).
const POSTS_CACHE_KEY = 'blog-feed:v1';
let memoryCache: DbPost[] | null = null;

function readCachedPosts(): DbPost[] | null {
  if (memoryCache) return memoryCache;
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(POSTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DbPost[];
    if (!Array.isArray(parsed)) return null;
    memoryCache = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function writeCachedPosts(posts: DbPost[]) {
  memoryCache = posts;
  try {
    window.sessionStorage.setItem(POSTS_CACHE_KEY, JSON.stringify(posts));
  } catch {
    /* storage may be full / disabled — silently skip */
  }
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function readingTime(excerpt: string | null) {
  // Crude reading-time estimator — only excerpt is on the list view,
  // so use word count × ~5 (full posts average 4-6× excerpt length).
  const words = (excerpt || '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.round((words * 5) / 200));
  return `${minutes} min read`;
}

function PostCover({ post, ratio = '16 / 9' }: { post: DbPost; ratio?: string }) {
  if (post.coverImage) {
    return (
      <img
        src={post.coverImage}
        alt=""
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          aspectRatio: ratio,
          objectFit: 'cover',
          display: 'block',
          borderRadius: 14,
        }}
      />
    );
  }
  // Soft gradient fallback derived from the post id so each card looks distinct
  const palettes = [
    ['#d1fae5', '#cffafe'],
    ['#fef3c7', '#fde2e8'],
    ['#e0e7ff', '#fce7f3'],
    ['#dbeafe', '#dcfce7'],
    ['#fae8ff', '#dbeafe'],
  ];
  const [a, b] = palettes[post.id % palettes.length];
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        aspectRatio: ratio,
        background: `linear-gradient(135deg, ${a}, ${b})`,
        borderRadius: 14,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          position: 'absolute',
          bottom: 16,
          left: 18,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(15, 65, 50, 0.55)',
        }}
      >
        Editorial
      </span>
    </div>
  );
}

function PostMetaRow({ post }: { post: DbPost }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 12,
        color: '#64748b',
        marginBottom: 10,
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0a9968' }}>
        News
      </span>
      <span style={{ width: 3, height: 3, borderRadius: 999, background: '#cbd5e1' }} />
      <span>{formatDate(post.publishedAt)}</span>
      <span style={{ width: 3, height: 3, borderRadius: 999, background: '#cbd5e1' }} />
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
        <ClockIcon size={11} />
        {readingTime(post.excerpt)}
      </span>
    </div>
  );
}

/* ─── Card variants ───────────────────────────────────────── */

function LeadCard({ post }: { post: DbPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      state={{ post }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
        gap: 32,
        alignItems: 'center',
        padding: 'clamp(24px, 4vw, 40px)',
        background: 'white',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        borderRadius: 22,
        boxShadow: '0 20px 50px -20px rgba(15, 23, 42, 0.12)',
        textDecoration: 'none',
        color: 'inherit',
      }}
      className="bf-lead"
    >
      <PostCover post={post} ratio="4 / 3" />
      <div>
        <PostMetaRow post={post} />
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(24px, 3.4vw, 38px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontWeight: 800,
            color: '#0f172a',
          }}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p
            style={{
              marginTop: 14,
              fontSize: 16,
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '52ch',
            }}
          >
            {post.excerpt}
          </p>
        )}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 20,
            fontWeight: 700,
            fontSize: 14,
            color: '#0a9968',
          }}
        >
          Read full story
          <ArrowIcon size={12} />
        </span>
      </div>
    </Link>
  );
}

function FeatureCard({ post }: { post: DbPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      state={{ post }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        textDecoration: 'none',
        color: 'inherit',
      }}
      className="bf-feature"
    >
      <PostCover post={post} ratio="16 / 11" />
      <div>
        <PostMetaRow post={post} />
        <h3
          style={{
            margin: 0,
            fontSize: 18,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            fontWeight: 700,
            color: '#0f172a',
          }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13.5,
              lineHeight: 1.55,
              color: '#64748b',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

function CompactCard({ post }: { post: DbPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      state={{ post }}
      style={{
        display: 'flex',
        gap: 16,
        padding: '18px 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
        textDecoration: 'none',
        color: 'inherit',
      }}
      className="bf-compact"
    >
      <div style={{ flex: '0 0 130px' }}>
        <PostCover post={post} ratio="4 / 3" />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0a9968',
            marginBottom: 6,
          }}
        >
          News · {formatDate(post.publishedAt)}
        </div>
        <h4
          style={{
            margin: 0,
            fontSize: 15.5,
            lineHeight: 1.3,
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.01em',
          }}
        >
          {post.title}
        </h4>
        {post.excerpt && (
          <p
            style={{
              marginTop: 6,
              fontSize: 13,
              lineHeight: 1.5,
              color: '#64748b',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ─── Main feed ────────────────────────────────────────────── */

export default function BlogFeed() {
  // Hydrate from cache synchronously so first paint is instant on repeat visits.
  const cached = readCachedPosts();
  const [posts, setPosts] = useState<DbPost[]>(cached ?? []);
  const [state, setState] = useState<LoadState>(cached ? 'ready' : 'loading');

  useEffect(() => {
    let cancelled = false;
    // Always revalidate in the background — the cached list paints immediately,
    // then this fetch refreshes with any new posts the admin published.
    fetch('/api/posts')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: DbPost[]) => {
        if (cancelled) return;
        const published = (Array.isArray(data) ? data : [])
          .filter((p) => p.publishedAt)
          .sort(
            (a, b) =>
              new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime(),
          );
        setPosts(published);
        setState('ready');
        writeCachedPosts(published);
      })
      .catch(() => {
        // Only show the error state if we have nothing cached to fall back to.
        if (!cancelled && !cached) setState('error');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lead = posts[0];
  const features = useMemo(() => posts.slice(1, 4), [posts]);
  const rest = useMemo(() => posts.slice(4), [posts]);

  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)',
        padding: '64px 0 90px',
      }}
    >
      <div className="container-shell">
        {/* Loading + empty + error states */}
        {state === 'loading' && (
          <div
            style={{
              padding: '80px 0',
              textAlign: 'center',
              color: '#94a3b8',
              fontSize: 14,
            }}
          >
            Loading the latest stories…
          </div>
        )}

        {state === 'error' && (
          <div
            style={{
              padding: '60px 0',
              textAlign: 'center',
              color: '#b91c1c',
              fontSize: 14,
            }}
          >
            Couldn't load posts right now. Please refresh.
          </div>
        )}

        {state === 'ready' && posts.length === 0 && (
          <div
            style={{
              padding: '80px 0',
              textAlign: 'center',
              color: '#64748b',
            }}
          >
            <p style={{ fontSize: 17, marginBottom: 6 }}>No articles published yet.</p>
            <p style={{ fontSize: 13, color: '#94a3b8' }}>
              Once an admin publishes a post, it'll appear here automatically.
            </p>
          </div>
        )}

        {state === 'ready' && lead && (
          <>
            {/* Lead story */}
            <div style={{ marginBottom: features.length > 0 ? 56 : 0 }}>
              <LeadCard post={lead} />
            </div>

            {/* Section divider */}
            {features.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#0f172a',
                  }}
                >
                  Featured
                </h2>
                <span style={{ flex: 1, height: 1, background: 'rgba(15, 23, 42, 0.1)' }} />
              </div>
            )}

            {/* Featured row */}
            {features.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 32,
                  marginBottom: rest.length > 0 ? 64 : 0,
                }}
              >
                {features.map((post) => (
                  <FeatureCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* More stories */}
            {rest.length > 0 && (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 8,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#0f172a',
                    }}
                  >
                    More stories
                  </h2>
                  <span style={{ flex: 1, height: 1, background: 'rgba(15, 23, 42, 0.1)' }} />
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    columnGap: 40,
                    rowGap: 0,
                  }}
                >
                  {rest.map((post) => (
                    <CompactCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Lead card collapses to single column on mobile */}
      <style>{`
        @media (max-width: 760px) {
          .bf-lead { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
