import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import Seo from '@/components/Seo';
import { renderArticleHtml } from '@/lib/article-body';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import { NEWS_ARTICLES, newsBySlug, CATEGORY_TONES, type NewsArticle } from './news.data';

/* ─── Admin-authored article (from DB) ───────────────────────────
   Renders articles created in /dashboard/admin News Management. Used as
   a fallback when the slug isn't in the static NEWS_ARTICLES set. */

interface DbNewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  publisher: string | null;
  source: string | null;
  sourceUrl: string | null;
  publishedAt: string | null;
}

type DbState = 'loading' | 'ready' | 'not-found' | 'error';

const DbNewsArticleView = ({ slug }: { slug: string }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  const [article, setArticle] = useState<DbNewsArticle | null>(null);
  const [state, setState] = useState<DbState>('loading');

  useEffect(() => {
    let cancelled = false;
    const url =
      `/api/news?slug=${encodeURIComponent(slug)}` + (lang === 'es' ? '&lang=es' : '');
    fetch(url)
      .then(async (res) => {
        if (res.status === 404) return { _missing: true } as const;
        if (!res.ok) throw new Error('Failed to load');
        return (await res.json()) as DbNewsArticle;
      })
      .then((data) => {
        if (cancelled) return;
        if ('_missing' in data) {
          setState('not-found');
          return;
        }
        setArticle(data);
        setState('ready');
      })
      .catch(() => !cancelled && setState('error'));
    return () => {
      cancelled = true;
    };
  }, [slug, lang]);

  if (state === 'loading') {
    const rows: (number | null)[] = [96, 100, 88, 64, null, 92, 100, 90, 72, null, 98, 84];
    return (
      <section className="ph-page-head" role="status" aria-label="Loading article">
        <div className="container-shell" style={{ maxWidth: 760 }}>
          <div className="bpx-skel" style={{ width: 130, height: 13, marginTop: 32, marginBottom: 24 }} />
          <div className="bpx-skel" style={{ width: '85%', height: 44, marginBottom: 14 }} />
          <div className="bpx-skel" style={{ width: '100%', height: 18, marginBottom: 8 }} />
          <div className="bpx-skel" style={{ width: '70%', height: 18 }} />
          <div
            className="bpx-skel"
            style={{ width: '100%', height: 260, borderRadius: 18, margin: '40px 0' }}
          />
          {rows.map((w, i) =>
            w === null ? (
              <div key={i} style={{ height: 22 }} />
            ) : (
              <div key={i} className="bpx-skel" style={{ width: `${w}%`, marginTop: i === 0 ? 0 : 14 }} />
            ),
          )}
        </div>
      </section>
    );
  }
  if (state === 'not-found') return <Navigate to="/healthcare-news" replace />;
  if (state === 'error' || !article) {
    return (
      <section style={{ padding: '120px 0', textAlign: 'center', color: '#b91c1c' }}>
        Couldn't load this article right now.
      </section>
    );
  }

  const published = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt || article.title}
        path={`/healthcare-news/${article.slug}`}
      />
      <section className="ph-page-head">
        <div className="container-shell">
          <Breadcrumb
            items={[
              { label: 'Healthcare News', to: '/healthcare-news' },
              { label: article.title.slice(0, 48) + (article.title.length > 48 ? '…' : '') },
            ]}
          />
          <div style={{ marginTop: 32, maxWidth: 760 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0a9968',
                marginBottom: 14,
              }}
            >
              {article.source || article.publisher || 'Newsroom'} · {published}
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(30px, 4.4vw, 52px)',
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
                fontWeight: 800,
                color: '#1A2438',
              }}
            >
              {article.title}
            </h1>
            {article.excerpt && (
              <p
                style={{
                  marginTop: 18,
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  lineHeight: 1.6,
                  color: '#4A5568',
                }}
              >
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {article.coverImage && (
        <section style={{ padding: '24px 0 0' }}>
          <div className="container-shell">
            <img
              src={article.coverImage}
              alt={article.coverImageAlt || ''}
              style={{
                width: '100%',
                maxHeight: 520,
                objectFit: 'cover',
                borderRadius: 18,
                display: 'block',
              }}
            />
          </div>
        </section>
      )}

      <section style={{ padding: 'clamp(40px, 5vw, 80px) 0' }}>
        <div className="container-shell">
          <article
            className="bpx-content"
            style={{ maxWidth: 760, margin: '0 auto' }}
            dangerouslySetInnerHTML={{ __html: renderArticleHtml(article.content) }}
          />
          {article.sourceUrl && (
            <p
              style={{
                maxWidth: 760,
                margin: '36px auto 0',
                fontSize: 13,
                color: '#64748b',
              }}
            >
              Original source:{' '}
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#0a9968' }}
              >
                {article.source || article.sourceUrl}
              </a>
            </p>
          )}
          <div style={{ maxWidth: 760, margin: '40px auto 0' }}>
            <Link to="/healthcare-news" style={{ color: '#0a9968', fontWeight: 700 }}>
              ← Back to Healthcare News
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

const COLORS = {
  navy: '#1A2438',
  body: '#4A5568',
  muted: '#718096',
  mint: '#EBF4DD',
};

const truncate = (s: string, n: number): string =>
  s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`;

/* ─── Tone-coloured category pill ─── */
const CategoryPill = ({
  article,
  size = 'md',
}: {
  article: NewsArticle;
  size?: 'sm' | 'md';
}) => {
  const { t } = useTranslation('pages');
  const tone = CATEGORY_TONES[article.category];
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[10.5px]' : 'px-3 py-1.5 text-[11px]';
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-mono font-bold tracking-[0.18em] uppercase ${pad}`}
      style={{ background: tone.soft, color: tone.hex }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
      {t(`healthcareNews.categoryLabels.${article.category}`, article.category)}
    </span>
  );
};

/* ─── Section 01 · HERO ─── */
const Hero = ({ article }: { article: NewsArticle }) => {
  const { t } = useTranslation('pages');
  const tone = CATEGORY_TONES[article.category];
  const localizedTitle = t(`healthcareNews.articles.${article.slug}.title`, article.title);
  const localizedLede = t(`healthcareNews.articles.${article.slug}.lede`, article.lede);
  const localizedDate = t(`healthcareNews.articles.${article.slug}.date`, article.date);
  const localizedReadTime = t(`healthcareNews.articles.${article.slug}.readTime`, article.readTime);
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={localizedTitle.slice(0, 48) + (localizedTitle.length > 48 ? '…' : '')} />

        <div className="mt-8 grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-7">
            <CategoryPill article={article} />
            <h1
              className="mt-6 font-extrabold leading-[1.02] tracking-[-0.034em] text-[clamp(34px,5vw,68px)]"
              style={{ color: COLORS.navy }}
            >
              {localizedTitle}
            </h1>
            <p
              className="mt-7 text-[18px] leading-[1.65] max-w-[60ch]"
              style={{ color: COLORS.body }}
            >
              {localizedLede}
            </p>

            {/* Byline meta row */}
            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]"
              style={{ color: COLORS.muted }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-grid place-items-center w-9 h-9 rounded-full font-mono text-[12px] font-bold"
                  style={{ background: tone.soft, color: tone.hex }}
                  aria-hidden="true"
                >
                  {article.author
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span>
                  {t('healthcareNews.detail.byPrefix')}{' '}
                  <strong style={{ color: COLORS.navy }}>{article.author}</strong>
                </span>
              </div>
              <span className="opacity-30">·</span>
              <span>{localizedDate}</span>
              <span className="opacity-30">·</span>
              <span>{localizedReadTime}</span>
            </div>
          </div>

          {/* Right-side: small stat-card with tone accent */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-[24px] p-8 overflow-hidden border"
              style={{
                background: COLORS.mint,
                borderColor: 'rgba(26, 36, 56, 0.10)',
              }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: tone.hex }}
                aria-hidden="true"
              />
              <div
                className="font-mono text-[11px] tracking-[0.22em] uppercase font-bold"
                style={{ color: tone.hex }}
              >
                {t('healthcareNews.detail.storyBrief')}
              </div>
              <h2
                className="mt-3 text-[20px] font-extrabold tracking-[-0.018em] leading-[1.18]"
                style={{ color: COLORS.navy }}
              >
                {article.takeaways[0]}
              </h2>
              {article.takeaways[1] && (
                <p className="mt-4 text-[14px] leading-[1.6]" style={{ color: COLORS.body }}>
                  {article.takeaways[1]}
                </p>
              )}
              <div
                className="mt-6 pt-5 border-t flex items-center gap-2 text-[10.5px] uppercase tracking-[0.20em] font-bold"
                style={{ borderColor: 'rgba(26, 36, 56, 0.10)', color: tone.hex }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.hex }} />
                {article.takeaways.length} {t('healthcareNews.detail.keyTakeawaysSuffix')}
              </div>
            </div>
          </div>
        </div>

        {/* Full-bleed cover image */}
        <div
          className="mt-12 lg:mt-16 relative rounded-[28px] overflow-hidden border aspect-[21/9] shadow-[0_28px_60px_-32px_rgba(45,55,72,0.32)]"
          style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
        >
          <img
            src={article.img}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(26, 36, 56, 0) 60%, rgba(26, 36, 56, 0.35) 100%)',
            }}
          />
          <div
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-white font-bold">
              {t('healthcareNews.detail.editorial')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsDetail = () => {
  const { t } = useTranslation('pages');
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? newsBySlug(slug) : undefined;

  if (!article) {
    // Slug not in static set → try the DB (admin-authored article).
    if (slug) return <DbNewsArticleView slug={slug} />;
    return <Navigate to="/healthcare-news" replace />;
  }

  const localizedTitle = t(`healthcareNews.articles.${article.slug}.title`, article.title);
  const localizedLede = t(`healthcareNews.articles.${article.slug}.lede`, article.lede);
  const localizedDate = t(`healthcareNews.articles.${article.slug}.date`, article.date);
  const localizedSection = t(
    `healthcareNews.categoryLabels.${article.category}`,
    article.category
  );

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: localizedTitle,
    description: localizedLede,
    url: `${SITE.url}/healthcare-news/${article.slug}`,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@id': `${SITE.url}#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/healthcare-news/${article.slug}`,
    },
    articleSection: localizedSection,
    inLanguage: 'en-US',
  };

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: 'Healthcare News', path: '/healthcare-news' },
    { name: localizedTitle },
  ]);

  return (
    <>
      <Seo
        title={localizedTitle}
        description={truncate(localizedLede, 160)}
        path={`/healthcare-news/${article.slug}`}
        type="article"
        article={{
          publishedTime: article.date,
          modifiedTime: article.date,
          author: article.author,
          section: localizedSection,
        }}
        schema={[articleSchema, breadcrumbSchema]}
      />

      <Hero article={article} />
      {/* Hidden marker so we keep the localized read time available to assistive tech if needed */}
      <span hidden>{localizedDate}</span>
    </>
  );
};

export default NewsDetail;
export { NEWS_ARTICLES };
