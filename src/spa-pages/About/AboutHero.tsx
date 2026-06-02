import { useTranslation } from 'react-i18next';
import { AnimatedBackground } from '@/lib/motion';
import { useOrbitPills } from '@/content/about/hero';

const AboutHero = () => {
  const { t } = useTranslation('about');
  const pills = useOrbitPills();

  return (
    <section className="ab-hero" aria-labelledby="ab-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <div className="ab-hero-grid">
          <div className="ab-hero-text">
            <span className="ab-hero-eyebrow reveal d1">{t('hero.eyebrow')}</span>
            <h1 id="ab-title" className="ab-hero-h1 reveal d2">
              {t('hero.titleStart')} <span className="accent">{t('hero.titleAccent')}</span>
            </h1>
            <p
              className="ab-hero-lede reveal d3"
              dangerouslySetInnerHTML={{ __html: t('hero.lede') }}
            />

            <div className="ab-hero-trust reveal d4">
              <div className="ab-hero-trust-item">
                <span className="ab-hero-trust-item-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <span className="ab-hero-trust-item-num">
                  {t('hero.trust.practicesNum')}
                  <em>+</em>
                </span>
                <span className="ab-hero-trust-item-label">{t('hero.trust.practicesLabel')}</span>
              </div>
              <div className="ab-hero-trust-item">
                <span className="ab-hero-trust-item-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="6" y1="20" x2="6" y2="13" />
                    <line x1="12" y1="20" x2="12" y2="9" />
                    <line x1="18" y1="20" x2="18" y2="5" />
                    <polyline points="4 11 9 6 13 10 21 3" />
                    <polyline points="16 3 21 3 21 8" />
                  </svg>
                </span>
                <span className="ab-hero-trust-item-num">
                  {t('hero.trust.spendNum')}
                  <em>+</em>
                </span>
                <span className="ab-hero-trust-item-label">{t('hero.trust.spendLabel')}</span>
              </div>
              <div className="ab-hero-trust-item">
                <span className="ab-hero-trust-item-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11.5 14.5 16 9.5" />
                  </svg>
                </span>
                <span className="ab-hero-trust-item-num">
                  {t('hero.trust.hipaaNum')}
                  <em>{t('hero.trust.hipaaSymbol')}</em>
                </span>
                <span className="ab-hero-trust-item-label">{t('hero.trust.hipaaLabel')}</span>
              </div>
            </div>
          </div>

          <div className="ab-hero-visual" aria-hidden="true">
            <div className="ab-hero-orbit">
              <div className="ab-hero-hub">
                <div>
                  <div className="ab-hero-hub-mark">N+</div>
                  <span className="ab-hero-hub-name">{t('hero.hubName')}</span>
                  <span className="ab-hero-hub-tag">{t('hero.hubTag')}</span>
                </div>
              </div>

              {pills.map((pill) => (
                <span key={pill.cls} className={`ab-orbit-pill ${pill.cls}`}>
                  <span className="dot" />
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
