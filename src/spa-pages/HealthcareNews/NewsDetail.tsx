import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import { NEWS_ARTICLES, newsBySlug, CATEGORY_TONES, type NewsArticle } from './news.data';

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
