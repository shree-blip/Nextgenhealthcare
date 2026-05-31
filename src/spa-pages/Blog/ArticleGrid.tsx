import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon, ChevronRightIcon, ClockIcon } from '@/components/icons';

interface DbPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
}
import imgHipaa from '../../assets/nextgen-image/Hippablogimg.png';
import imgUrgentCpa from '../../assets/nextgen-image/Urgentcpablogimg.png';
import imgReviews from '../../assets/nextgen-image/Googlereviewblogimg.png';
import imgGbp from '../../assets/nextgen-image/7googlebuisnessblogimg.png';
import imgAi from '../../assets/nextgen-image/Aipatientblogimg.png';
import imgMedspa from '../../assets/nextgen-image/Medspaltvblogimg.png';
import imgWait from '../../assets/nextgen-image/Waitmarketingblogimg.png';
import imgDashboard from '../../assets/nextgen-image/Marketingbloghimg.png';
import imgFsed from '../../assets/nextgen-image/freestandingerblogimg.png';

interface ArticleConfig {
  slug: string;
  href: string;
  cat: string;
  date: string;
  readTime: string;
  author: string;
  illustration: ReactElement;
}

const ARTICLES: ArticleConfig[] = [
  {
    slug: 'hipaa-tracking',
    href: '/blog/hipaa-tracking',
    cat: 'compliance',
    date: 'Apr 22, 2026',
    readTime: '8 min read',
    author: 'Priya Patel',
    illustration: <img src={imgHipaa} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'ads-cost',
    href: '/blog/ads-cost',
    cat: 'paid',
    date: 'Apr 18, 2026',
    readTime: '6 min read',
    author: 'Marcus Rodriguez',
    illustration: <img src={imgUrgentCpa} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'reviews',
    href: '/blog/reviews',
    cat: 'reputation',
    date: 'Apr 14, 2026',
    readTime: '5 min read',
    author: 'Sarah Chen',
    illustration: <img src={imgReviews} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'maps-rank',
    href: '/blog/maps-rank',
    cat: 'seo',
    date: 'Apr 10, 2026',
    readTime: '9 min read',
    author: 'Marcus Rodriguez',
    illustration: <img src={imgGbp} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'ai-chatbot',
    href: '/blog/ai-chatbot',
    cat: 'automation',
    date: 'Apr 6, 2026',
    readTime: '11 min read',
    author: 'David Kim',
    illustration: <img src={imgAi} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'medspa',
    href: '/blog/medspa',
    cat: 'medspa',
    date: 'Apr 2, 2026',
    readTime: '7 min read',
    author: 'Marcus Rodriguez',
    illustration: <img src={imgMedspa} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'urgent-care',
    href: '/blog/urgent-care',
    cat: 'urgent',
    date: 'Mar 28, 2026',
    readTime: '6 min read',
    author: 'Sarah Chen',
    illustration: <img src={imgWait} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'analytics',
    href: '/blog/analytics',
    cat: 'analytics',
    date: 'Mar 24, 2026',
    readTime: '8 min read',
    author: 'David Kim',
    illustration: <img src={imgDashboard} alt="" loading="lazy" decoding="async" />,
  },
  {
    slug: 'fsed-trauma',
    href: '/blog/fsed-trauma',
    cat: 'fsed',
    date: 'Mar 20, 2026',
    readTime: '10 min read',
    author: 'Sarah Chen',
    illustration: <img src={imgFsed} alt="" loading="lazy" decoding="async" />,
  },
];

const CATEGORIES: { id: string; count: number }[] = [
  { id: 'all', count: 42 },
  { id: 'seo', count: 8 },
  { id: 'paid', count: 7 },
  { id: 'compliance', count: 6 },
  { id: 'automation', count: 5 },
  { id: 'reputation', count: 4 },
  { id: 'medspa', count: 5 },
  { id: 'urgent', count: 4 },
  { id: 'fsed', count: 3 },
];

const CalendarIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 22 C 4 16 7 14 12 14 C 17 14 20 16 20 22" />
  </svg>
);

const ArticleGrid = () => {
  const { t } = useTranslation('blog');
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [dbPosts, setDbPosts] = useState<DbPost[]>([]);

  useEffect(() => {
    // Pull admin-created posts from the backend so new posts published from the
    // dashboard show up here automatically alongside the editorial articles.
    fetch('/api/posts')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: DbPost[]) =>
        setDbPosts(Array.isArray(data) ? data.filter((p) => p.publishedAt) : []),
      )
      .catch(() => setDbPosts([]));
  }, []);

  const visibleDbPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (activeCat !== 'all' && activeCat !== 'recent') return [];
    if (!q) return dbPosts;
    return dbPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q)),
    );
  }, [dbPosts, activeCat, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((article) => {
      const catMatches = activeCat === 'all' || article.cat === activeCat;
      if (!catMatches) return false;
      if (!q) return true;
      const title = t(`posts.${article.slug}.title`).toLowerCase();
      const excerpt = t(`posts.${article.slug}.excerpt`).toLowerCase();
      return title.includes(q) || excerpt.includes(q);
    });
  }, [activeCat, query, t]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== '' && activeCat !== 'all') {
      setActiveCat('all');
    }
  };

  return (
    <>
      <section className="bl-tools" aria-label={t('list.filterLabel')}>
        <div className="container-shell">
          <div className="bl-tools-grid">
            <div className="bl-cats" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`bl-cat${activeCat === cat.id ? ' is-active' : ''}`}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {t(`categories.${cat.id}`)} <span className="count">{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="bl-search">
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder={t('list.searchPlaceholder')}
                aria-label={t('list.searchLabel')}
                value={query}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bl-grid-section" aria-label={t('list.allArticlesLabel')}>
        <div className="container-shell">
          <div className="bl-grid" id="bl-grid">
            {/* DB-backed posts created from admin dashboard — newest first */}
            {visibleDbPosts.map((post) => (
              <Link key={`db-${post.id}`} to={`/blog/${post.slug}`} className="bl-card">
                <div className="bl-card-cover">
                  <span className="bl-card-cat">New</span>
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        width: '100%',
                        height: '100%',
                        background:
                          'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 50%, #cffafe 100%)',
                      }}
                    />
                  )}
                </div>
                <div className="bl-card-body">
                  <div className="bl-card-meta-top">
                    <span className="item">
                      <CalendarIcon />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Draft'}
                    </span>
                  </div>
                  <h3 className="bl-card-title">{post.title}</h3>
                  {post.excerpt && <p className="bl-card-excerpt">{post.excerpt}</p>}
                  <div className="bl-card-foot">
                    <span className="bl-card-cta">
                      {t('list.readMore')}
                      <ArrowIcon size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {filtered.length === 0 && visibleDbPosts.length === 0 ? (
              <div className="bl-empty">{t('list.emptyResults')}</div>
            ) : (
              filtered.map((article) => (
                <Link key={article.href} to={article.href} className="bl-card">
                  <div className="bl-card-cover">
                    <span className="bl-card-cat">{t(`posts.${article.slug}.catLabel`)}</span>
                    {article.illustration}
                  </div>
                  <div className="bl-card-body">
                    <div className="bl-card-meta-top">
                      <span className="item">
                        <CalendarIcon />
                        {article.date}
                      </span>
                      <span className="dot" />
                      <span className="item">
                        <ClockIcon size={11} />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="bl-card-title">{t(`posts.${article.slug}.title`)}</h3>
                    <p className="bl-card-excerpt">{t(`posts.${article.slug}.excerpt`)}</p>
                    <div className="bl-card-foot">
                      <div className="bl-card-author">
                        <div className="bl-card-author-avatar" aria-hidden="true">
                          <UserIcon />
                        </div>
                        <span className="bl-card-author-name">{article.author}</span>
                      </div>
                      <span className="bl-card-cta">
                        {t('list.readMore')}
                        <ArrowIcon size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <nav className="bl-pagination" aria-label={t('list.paginationLabel')}>
            <button className="bl-pg-btn bl-pg-arrow" disabled aria-label={t('list.prevPage')}>
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="bl-pg-btn is-active">1</button>
            <button className="bl-pg-btn">2</button>
            <button className="bl-pg-btn">3</button>
            <button className="bl-pg-btn">4</button>
            <button className="bl-pg-btn bl-pg-arrow" aria-label={t('list.nextPage')}>
              <ChevronRightIcon />
            </button>
          </nav>
        </div>
      </section>
    </>
  );
};

export default ArticleGrid;
