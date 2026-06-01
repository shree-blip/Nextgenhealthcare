import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '@/components/icons';

/**
 * Newsroom updates strip — fetches admin-published news articles from
 * /api/news and renders them above the static editorial layout. When an
 * admin publishes a new article in the dashboard, it appears here on the
 * next page load without any code change.
 */

interface DbNews {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  coverImageAlt: string | null;
  publisher: string | null;
  source: string | null;
  publishedAt: string | null;
}

// Instant-paint strategy mirrors BlogFeed: SSR seed → localStorage → in-memory.
// /api/news still runs in the background to pick up newly-published articles.
const CACHE_KEY = 'healthcare-news:newsroom:v2';
let memoryCache: DbNews[] | null = null;

function readSeedNews(): DbNews[] | null {
  if (typeof window === 'undefined') return null;
  const seed = (window as unknown as { __SEED__?: { news?: unknown } }).__SEED__;
  if (seed && Array.isArray(seed.news)) return seed.news as DbNews[];
  return null;
}

function readCached(): DbNews[] | null {
  if (memoryCache) return memoryCache;
  const seed = readSeedNews();
  if (seed) {
    memoryCache = seed;
    return seed;
  }
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    memoryCache = parsed;
    return parsed;
  } catch {
    return null;
  }
}

function writeCached(items: DbNews[]) {
  memoryCache = items;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
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

const NewsroomStrip = () => {
  const cached = readCached();
  const [items, setItems] = useState<DbNews[]>(cached ?? []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/news')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: DbNews[]) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : [];
        setItems(list);
        writeCached(list);
      })
      .catch(() => {
        /* leave cached items in place */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  const lead = items[0];
  const rest = items.slice(1, 4);
  const featured = items.slice(4, 7);
  const compact = items.slice(7);

  return (
    <section
      aria-label="Newsroom updates"
      style={{
        padding: 'clamp(36px, 5vw, 64px) 0',
        background: 'linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
      }}
    >
      <div className="container-shell">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#0a9968',
            }}
          >
            Newsroom · Just published
          </span>
          <span style={{ flex: 1, height: 1, background: 'rgba(15, 23, 42, 0.1)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: rest.length > 0 ? 'minmax(0, 1.2fr) minmax(0, 1fr)' : '1fr',
            gap: 36,
            alignItems: 'start',
          }}
          className="nr-grid"
        >
          {/* Lead — most recent admin-published article */}
          <Link
            to={`/healthcare-news/${lead.slug}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 18,
              overflow: 'hidden',
              background: 'white',
              border: '1px solid rgba(15, 23, 42, 0.06)',
              boxShadow: '0 18px 40px -20px rgba(15, 23, 42, 0.14)',
            }}
          >
            {lead.coverImage ? (
              <img
                src={lead.coverImage}
                alt={lead.coverImageAlt || ''}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  background: 'linear-gradient(135deg, #d1fae5, #cffafe)',
                }}
              />
            )}
            <div style={{ padding: 'clamp(20px, 2.5vw, 28px)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 12,
                  color: '#64748b',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0a9968' }}>
                  {lead.source || 'Newsroom'}
                </span>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: '#cbd5e1' }} />
                <span>{formatDate(lead.publishedAt)}</span>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 'clamp(22px, 2.8vw, 30px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  fontWeight: 800,
                  color: '#0f172a',
                }}
              >
                {lead.title}
              </h2>
              {lead.excerpt && (
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: '#475569',
                    maxWidth: '54ch',
                  }}
                >
                  {lead.excerpt}
                </p>
              )}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 16,
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#0a9968',
                }}
              >
                Read full story
                <ArrowIcon size={11} />
              </span>
            </div>
          </Link>

          {/* Side rail — next 3 most recent admin articles */}
          {rest.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {rest.map((item) => (
                <Link
                  key={item.id}
                  to={`/healthcare-news/${item.slug}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr',
                    gap: 14,
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: 14,
                    borderRadius: 14,
                    background: 'white',
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                  }}
                >
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.coverImageAlt || ''}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        aspectRatio: '1 / 1',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #fef3c7, #fde2e8)',
                      }}
                    />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#0a9968',
                        marginBottom: 6,
                      }}
                    >
                      {item.source || 'Newsroom'} · {formatDate(item.publishedAt)}
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 14.5,
                        lineHeight: 1.3,
                        fontWeight: 700,
                        color: '#0f172a',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Featured row — articles 5-7 in a 3-col grid (matches blog page Feature cards) */}
        {featured.length > 0 && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 64,
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

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 32,
              }}
            >
              {featured.map((item) => (
                <Link
                  key={item.id}
                  to={`/healthcare-news/${item.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.coverImageAlt || ''}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        aspectRatio: '16 / 11',
                        objectFit: 'cover',
                        borderRadius: 14,
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        width: '100%',
                        aspectRatio: '16 / 11',
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #e0e7ff, #fce7f3)',
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: 12,
                        color: '#64748b',
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: '#0a9968',
                        }}
                      >
                        {item.source || 'News'}
                      </span>
                      <span
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: 999,
                          background: '#cbd5e1',
                        }}
                      />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
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
                      {item.title}
                    </h3>
                    {item.excerpt && (
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
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* More stories — compact row layout for everything after the first 7 */}
        {compact.length > 0 && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 64,
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
              {compact.map((item) => (
                <Link
                  key={item.id}
                  to={`/healthcare-news/${item.slug}`}
                  style={{
                    display: 'flex',
                    gap: 16,
                    padding: '18px 0',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <div style={{ flex: '0 0 130px' }}>
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.coverImageAlt || ''}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          aspectRatio: '4 / 3',
                          objectFit: 'cover',
                          borderRadius: 14,
                        }}
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        style={{
                          width: '100%',
                          aspectRatio: '4 / 3',
                          borderRadius: 14,
                          background: 'linear-gradient(135deg, #dbeafe, #dcfce7)',
                        }}
                      />
                    )}
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
                      {item.source || 'News'} · {formatDate(item.publishedAt)}
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
                      {item.title}
                    </h4>
                    {item.excerpt && (
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
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .nr-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default NewsroomStrip;
