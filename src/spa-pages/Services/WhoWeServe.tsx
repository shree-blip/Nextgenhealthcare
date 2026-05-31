import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useServeCards } from '@/content/services/who-we-serve';

const CardArrow = () => (
  <span className="serve-arrow" aria-hidden="true">
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

const WhoWeServe = () => {
  const { t } = useTranslation('services');
  const cards = useServeCards();

  return (
    <section className="serve-section" id="who-we-serve" aria-labelledby="serve-title">
      <div className="container-shell">
        <div className="serve-head">
          <span className="serve-eyebrow">{t('whoWeServe.indexEyebrow')}</span>
          <h2 id="serve-title" className="serve-h2">
            {t('whoWeServe.indexTitle')}
          </h2>
          <p className="serve-sub">{t('whoWeServe.indexSub')}</p>
        </div>

        <div className="serve-grid">
          {cards.map(({ ariaId, image, imgPosition, tag, title, desc, points, accent, to, stat, cta }) => (
            <Link
              key={ariaId}
              to={to}
              className="serve-card"
              aria-labelledby={ariaId}
              style={{ ['--serve-accent' as string]: accent }}
            >
              <div className="serve-img" aria-hidden="true">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={imgPosition ? { objectPosition: imgPosition } : undefined}
                />
              </div>
              <div className="serve-overlay" aria-hidden="true" />

              <div className="serve-card-top">
                <span className="serve-tag">{tag}</span>
                <CardArrow />
              </div>

              <div className="serve-card-foot">
                <h3 id={ariaId} className="serve-title">
                  {title}
                </h3>
                <p className="serve-desc">{desc}</p>
                <ul className="serve-points">
                  {points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>

                <div className="serve-reveal" aria-hidden="true">
                  <span className="serve-reveal-divider" />
                  <div className="serve-reveal-row">
                    <span className="serve-reveal-stat">{stat}</span>
                    <span className="serve-reveal-cta">
                      {cta}
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
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="13 6 19 12 13 18" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
