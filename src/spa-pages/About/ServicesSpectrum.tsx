import { useTranslation } from 'react-i18next';
import { usePillars } from '@/content/about/services-spectrum';

const ServicesSpectrum = () => {
  const { t } = useTranslation('about');
  const pillars = usePillars();

  return (
    <section className="ab-spectrum" aria-labelledby="ab-spec-title">
      <div className="container-shell">
        <div className="ab-spec-head">
          <span className="ab-spec-eyebrow">{t('spectrum.eyebrow')}</span>
          <h2 id="ab-spec-title" className="ab-spec-h2">
            {t('spectrum.title')}
          </h2>
          <p className="ab-spec-sub">{t('spectrum.subtitle')}</p>
        </div>

        <div className="ab-spec-split">
          {pillars.map((pillar) => (
            <article key={pillar.tag} className="ab-spec-pillar">
              <div className="ab-spec-pillar-art" aria-hidden="true">
                {pillar.image ? (
                  <img src={pillar.image} alt="" loading="lazy" decoding="async" />
                ) : (
                  pillar.art
                )}
              </div>
              <div className="ab-spec-pillar-head">
                <span className="ab-spec-pillar-icon" aria-hidden="true">
                  {pillar.icon}
                </span>
                <div>
                  <span className="ab-spec-pillar-tag">{pillar.tag}</span>
                  <h3 className="ab-spec-pillar-title">{pillar.title}</h3>
                </div>
              </div>
              <p className="ab-spec-pillar-text">{pillar.text}</p>

              <ul className="ab-spec-features">
                {pillar.features.map((f) => (
                  <li key={f.title} className="ab-spec-feature">
                    <span className="ab-spec-feature-icon" aria-hidden="true">
                      {f.icon}
                    </span>
                    <div className="ab-spec-feature-body">
                      <h4 className="ab-spec-feature-title">{f.title}</h4>
                      <p className="ab-spec-feature-desc">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="ab-spec-metric">
                <span className="ab-spec-metric-value">{pillar.metric.value}</span>
                <span className="ab-spec-metric-label">{pillar.metric.label}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSpectrum;
