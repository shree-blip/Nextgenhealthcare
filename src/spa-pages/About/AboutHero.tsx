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
              {t('hero.titleEnd')}
            </h1>
            <p
              className="ab-hero-lede reveal d3"
              dangerouslySetInnerHTML={{ __html: t('hero.lede') }}
            />

            <div className="ab-hero-trust reveal d4">
              <div className="ab-hero-trust-item">
                <span className="ab-hero-trust-item-num">
                  {t('hero.trust.practicesNum')}
                  <em>+</em>
                </span>
                <span className="ab-hero-trust-item-label">{t('hero.trust.practicesLabel')}</span>
              </div>
              <div className="ab-hero-trust-item">
                <span className="ab-hero-trust-item-num">
                  {t('hero.trust.spendNum')}
                  <em>+</em>
                </span>
                <span className="ab-hero-trust-item-label">{t('hero.trust.spendLabel')}</span>
              </div>
              <div className="ab-hero-trust-item">
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
