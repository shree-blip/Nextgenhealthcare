import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsThumb from './NewsThumb';
import { ArrowIcon } from '@/components/icons';
import { newsBySlug } from './news.data';

const imgFor = (path: string) => {
  const slug = path.replace('/healthcare-news/', '');
  return newsBySlug(slug)?.img;
};

const LATEST = [
  { to: '/healthcare-news/mayo-wearable-heart-monitor', key: 'mayo' },
  { to: '/healthcare-news/mental-health-coverage-expansion', key: 'mental' },
  { to: '/healthcare-news/rural-clinics-shared-ehr', key: 'rural' },
  { to: '/healthcare-news/dental-online-bookings-growth', key: 'dental' },
  { to: '/healthcare-news/ai-pharmacy-inventory', key: 'pharma' },
] as const;

const FEATURED_ITEMS = [
  { to: '/healthcare-news/texas-clinic-n8n-workflows', key: 'n8n' },
  { to: '/healthcare-news/hipaa-pitfalls-2026', key: 'hipaa' },
  { to: '/healthcare-news/marketing-stack-standardization', key: 'stack' },
] as const;

const POPULAR = [
  { to: '/healthcare-news/patient-reviews-search-weight', num: '01', key: 'reviews' },
  { to: '/healthcare-news/ai-front-desks-rise', num: '02', key: 'frontDesks' },
  { to: '/healthcare-news/compliant-email-drips', num: '03', key: 'email' },
  { to: '/healthcare-news/medspa-roas-2026', num: '04', key: 'medspa' },
  { to: '/healthcare-news/ehr-sms-no-show-reduction', num: '05', key: 'sms' },
] as const;

const FEATURED_MAIN_TO = '/healthcare-news/texas-clinic-n8n-workflows';

const TrendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const ColumnHead = ({
  title,
  to,
  linkLabel,
  icon,
}: {
  title: string;
  to: string;
  linkLabel: string;
  icon: ReactElement;
}) => (
  <div className="tc-head">
    <h2>{title}</h2>
    <Link to={to} className="tc-link">
      {linkLabel}
      {icon}
    </Link>
  </div>
);

const NewsThreeColumn = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="three-col">
      <div className="container-shell">
        <div className="tc-grid">
          {/* COL 1: Latest */}
          <div className="tc-col">
            <ColumnHead
              title={t('healthcareNews.threeCol.latest')}
              to="/blog"
              linkLabel={t('healthcareNews.threeCol.all')}
              icon={<ArrowIcon strokeWidth={2.2} />}
            />
            {LATEST.map((item) => (
              <Link key={item.to} className="latest-item" to={item.to}>
                <div className="latest-img">
                  <NewsThumb
                    category={t(`healthcareNews.threeCol.latestItems.${item.key}.cat`)}
                    seed={`latest-${item.to}`}
                    aspect="square"
                    image={imgFor(item.to)}
                  />
                </div>
                <div>
                  <span className="latest-cat">
                    {t(`healthcareNews.threeCol.latestItems.${item.key}.cat`)}
                  </span>
                  <h3 className="latest-title">
                    {t(`healthcareNews.threeCol.latestItems.${item.key}.title`)}
                  </h3>
                  <div className="latest-meta">
                    {t(`healthcareNews.threeCol.latestItems.${item.key}.meta`)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* COL 2: Featured */}
          <div className="tc-col">
            <ColumnHead
              title={t('healthcareNews.threeCol.featured')}
              to="/case-studies"
              linkLabel={t('healthcareNews.threeCol.all')}
              icon={<ArrowIcon strokeWidth={2.2} />}
            />

            <Link className="featured-main" to={FEATURED_MAIN_TO}>
              <div className="featured-main-img">
                <NewsThumb
                  category={t('healthcareNews.threeCol.featuredMain.cat')}
                  seed="featured-main-long-read"
                  aspect="landscape"
                  caption={t('healthcareNews.threeCol.featuredMain.cat')}
                  image={imgFor(FEATURED_MAIN_TO)}
                />
              </div>
              <span className="featured-item-cat">
                {t('healthcareNews.threeCol.featuredMain.cat')}
              </span>
              <h3 className="featured-main-title">
                {t('healthcareNews.threeCol.featuredMain.title')}
              </h3>
              <p className="featured-main-desc">{t('healthcareNews.threeCol.featuredMain.desc')}</p>
              <div className="hg-byline">
                <span>
                  {t('healthcareNews.threeCol.featuredMain.byPrefix')}{' '}
                  <strong>{t('healthcareNews.threeCol.featuredMain.author')}</strong>
                </span>
                <span className="dot" />
                <span>{t('healthcareNews.threeCol.featuredMain.meta')}</span>
              </div>
            </Link>

            <div className="featured-list">
              {FEATURED_ITEMS.map((item) => (
                <Link key={item.to} className="featured-item" to={item.to}>
                  <span className="featured-item-cat">
                    {t(`healthcareNews.threeCol.featuredItems.${item.key}.cat`)}
                  </span>
                  <h4 className="featured-item-title">
                    {t(`healthcareNews.threeCol.featuredItems.${item.key}.title`)}
                  </h4>
                  <div className="featured-item-meta">
                    {t(`healthcareNews.threeCol.featuredItems.${item.key}.meta`)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* COL 3: Most Popular */}
          <div className="tc-col">
            <ColumnHead
              title={t('healthcareNews.threeCol.popular')}
              to="/blog"
              linkLabel={t('healthcareNews.threeCol.trending')}
              icon={<TrendIcon />}
            />
            {POPULAR.map((item) => (
              <Link key={item.to} className="pop-item" to={item.to}>
                <span className="pop-num">{item.num}</span>
                <div>
                  <span className="pop-cat">
                    {t(`healthcareNews.threeCol.popularItems.${item.key}.cat`)}
                  </span>
                  <h3 className="pop-title">
                    {t(`healthcareNews.threeCol.popularItems.${item.key}.title`)}
                  </h3>
                  <div className="pop-meta">
                    {t(`healthcareNews.threeCol.popularItems.${item.key}.meta`)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsThreeColumn;
