import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  useIndustryDetailEntries,
  industryDetailHref,
} from '@/content/industries/details.data';

const HeartIcon = () => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const AllIndustries = () => {
  const { t } = useTranslation('industries');
  const entries = useIndustryDetailEntries();

  return (
    <section className="all-ind" id="all-industries" aria-labelledby="all-ind-title">
      <div className="container-shell">
        <div className="all-ind-head">
          <span className="all-ind-eyebrow">{t('allIndustries.eyebrow')}</span>
          <h2 id="all-ind-title" className="all-ind-h2">
            {t('allIndustries.title')}
          </h2>
          <p className="all-ind-sub">{t('allIndustries.subtitle')}</p>
          <div className="all-ind-count">
            <span className="num">{t('allIndustries.countNum')}</span>
            <span className="bar" />
            <span>{t('allIndustries.countLabel')}</span>
          </div>
        </div>

        <div className="all-ind-list">
          {entries.map((row) => {
            const metricLabel = row.metric.l.split(',')[0];
            return (
              <Link
                key={row.slug}
                to={industryDetailHref(row.slug)}
                className="all-ind-card"
                aria-label={t('allIndustries.cardAriaLabel', { label: row.label })}
              >
                <div className="all-ind-card-img">
                  <img src={row.image} alt={row.label} loading="lazy" decoding="async" />
                </div>
                <div className="all-ind-card-body">
                  <div className="all-ind-card-head">
                    <div className="all-ind-card-titles">
                      <h3 className="all-ind-card-title">{row.label}</h3>
                      <p className="all-ind-card-meta">{row.meta}</p>
                    </div>
                    <span className="all-ind-card-heart" aria-hidden="true">
                      <HeartIcon />
                    </span>
                  </div>
                  <p className="all-ind-card-desc">{row.description}</p>
                  <div className="all-ind-card-footer">
                    <div className="all-ind-card-stats">
                      <div className="all-ind-stat">
                        <span className="all-ind-stat-v">{row.metric.v}</span>
                        <span className="all-ind-stat-l">{metricLabel}</span>
                      </div>
                      <div className="all-ind-stat">
                        <span className="all-ind-stat-v">HIPAA</span>
                        <span className="all-ind-stat-l">{t('allIndustries.ready')}</span>
                      </div>
                      <div className="all-ind-stat">
                        <span className="all-ind-stat-v">{row.services.length}+</span>
                        <span className="all-ind-stat-l">{t('allIndustries.levers')}</span>
                      </div>
                    </div>
                    <span className="all-ind-card-btn">{t('allIndustries.seeMore')}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllIndustries;
