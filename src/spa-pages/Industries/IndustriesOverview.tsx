import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIndustriesOverview } from '@/content/industries/overview';
import { industryDetailHref } from '@/content/industries/details.data';
import { ArrowIcon } from '@/components/icons';

const IndustriesOverview = () => {
  const { t } = useTranslation('industries');
  const cards = useIndustriesOverview();

  return (
    <section className="ind-overview" aria-labelledby="ind-ov-title">
      <div className="container-shell">
        <div className="ind-ov-head">
          <span className="ind-ov-eyebrow">{t('overview.eyebrow')}</span>
          <h2 id="ind-ov-title" className="ind-ov-h2">
            {t('overview.title')}
          </h2>
          <p className="ind-ov-sub">{t('overview.subtitle')}</p>
          <a href="#deep-dive" className="ind-ov-link">
            {t('overview.linkLabel')}
            <span className="ico" aria-hidden="true">
              <ArrowIcon size={14} />
            </span>
          </a>
        </div>

        <div className="ind-ov-grid">
          {cards.map((card) => (
            <Link
              key={card.ariaId}
              to={industryDetailHref(card.slug)}
              className="ind-ov-card"
              aria-labelledby={card.ariaId}
              aria-label={t('overview.cardAriaLabel', { label: card.titleText })}
            >
              <div className="ind-ov-img has-img">
                <img src={card.image} alt={card.imageAlt} loading="lazy" decoding="async" />
                <span className="ind-ov-arrow" aria-hidden="true">
                  <ArrowIcon size={14} strokeWidth={2} />
                </span>
              </div>
              <span className="ind-ov-meta">
                <span className="date">{card.meta}</span>
              </span>
              <h3 id={card.ariaId} className="ind-ov-title">
                {card.title}
              </h3>
              <p className="ind-ov-sub-text">{card.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesOverview;
