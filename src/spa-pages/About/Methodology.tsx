import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { usePhases } from '@/content/about/methodology';

const PhaseArrow = () => (
  <span className="phase-arrow" aria-hidden="true">
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

const Methodology = () => {
  const { t } = useTranslation('about');
  const phases = usePhases();

  return (
    <section className="method-section" id="methodology" aria-labelledby="method-title">
      <div className="container-shell">
        <div className="method-head">
          <span className="method-eyebrow">{t('methodology.eyebrow')}</span>
          <h2 id="method-title" className="method-h2">
            {t('methodology.titleStart')}&nbsp;
            <span className="accent-text">{t('methodology.titleAccent')}</span>
            {t('methodology.titleEnd')}
          </h2>
          <p className="method-sub">{t('methodology.subtitle')}</p>
        </div>

        <div className="phase-grid">
          {phases.map(({ num, phase, title, body, foot, href, image }, i) => (
            <Link key={num} to={href} className="phase-card" aria-labelledby={`phase-${i + 1}`}>
              <img
                className="phase-bg"
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
              <span className="phase-overlay" aria-hidden="true" />
              <div className="phase-content">
                <div className="phase-tag">
                  <span className="num">{num}</span>
                  <span>{phase}</span>
                </div>
                <h3 id={`phase-${i + 1}`} className="phase-title">
                  {title}
                </h3>
                <p className="phase-text">{body}</p>
                <div className="phase-foot">{foot}</div>
              </div>
              <PhaseArrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
