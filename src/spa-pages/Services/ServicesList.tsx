import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@/components/icons';
import { useServices } from '@/content/services/list';

const CardArrow = () => (
  <span className="svc-card-arrow" aria-hidden="true">
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  </span>
);

const ServicesList = () => {
  const { t } = useTranslation('services');
  const services = useServices();
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="svc-list"
      id="all-services"
      data-expanded={expanded}
      aria-labelledby="svc-list-title"
    >
      <div className="container-shell">
        <div className="svc-list-head">
          <span className="svc-list-eyebrow">{t('list.indexEyebrow')}</span>
          <h2 id="svc-list-title" className="svc-list-h2">
            {t('list.indexTitle')}
          </h2>
          <p className="svc-list-sub">{t('list.indexSub')}</p>
          <div className="svc-list-all">
            <span>{t('list.indexBadgeLeft')}</span>
            <span className="bar" />
            <span>{t('list.indexBadgeRight')}</span>
          </div>
        </div>

        <div className="svc-cards">
          {services.map(({ ariaId, illustration, image, imgFocus, meta, title, sub, to, extra }) => (
            <Link
              key={ariaId}
              to={to}
              className={`svc-card${extra ? ' is-extra' : ''}`}
              aria-labelledby={ariaId}
            >
              <div className={`svc-card-img${image ? ' has-img' : ''}`}>
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    style={
                      imgFocus && imgFocus !== 'center'
                        ? {
                            transform: 'scale(1.25)',
                            transformOrigin: `${imgFocus} center`,
                            objectPosition: `${imgFocus} center`,
                          }
                        : undefined
                    }
                  />
                ) : (
                  illustration
                )}
                <CardArrow />
              </div>
              <span className="svc-card-meta">{meta}</span>
              <h3 id={ariaId} className="svc-card-title">
                {title}
              </h3>
              <p className="svc-card-sub">{sub}</p>
            </Link>
          ))}
        </div>

        <div className="svc-more-row">
          <button
            type="button"
            className="svc-more-btn"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="all-services"
          >
            {expanded ? t('list.showLess') : t('list.seeMore')}
            <span className="ico" aria-hidden="true">
              <ChevronDownIcon size={14} strokeWidth={2.4} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
