import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatedBackground } from '@/lib/motion';
import logoSrc from '../../assets/the-nextgen-logo.png';
import { ArrowIcon } from '@/components/icons';
import { useOrbitPills, useCapabilities } from '@/content/services/hero';

const ServicesHero = () => {
  const { t } = useTranslation('services');
  const orbitPills = useOrbitPills();
  const capabilities = useCapabilities();

  return (
    <section className="svc-hero" aria-labelledby="svc-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <div className="svc-grid">
          {/* CENTER stage - title + CTAs */}
          <div className="svc-stage">
            <h1 id="svc-title" className="svc-h1 reveal d2">
              {t('hero.h1Line1')}
              <br />
              {t('hero.h1Line2')}
              <br />
              <span className="word-accent">{t('hero.h1Line3')}</span>
            </h1>

            <div className="svc-stage-cta reveal d3">
              <Link to="/growth-plan" className="svc-cta-primary">
                {t('hero.ctaPrimary')}
                <span className="ico" aria-hidden="true">
                  <ArrowIcon size={14} />
                </span>
              </Link>

              <Link to="/case-studies" className="svc-cta-link">
                {t('hero.ctaSecondary')}
                <span className="ico" aria-hidden="true">
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* ORBIT - premium 3D platform card + revolving pills (moved
              here from Home). Uses the same .ho-* classes as Home so all
              styling is shared. The outer .svc-orbit wrapper just gives
              it the right grid-column placement on this page. */}
          <div className="svc-orbit" aria-hidden="true">
            <div className="ho-stage">
              <div className="ho-ring ho-ring-1" />
              <div className="ho-ring ho-ring-2" />
              <div className="ho-ring ho-ring-3" />
              <div className="ho-ring-glow" />

              <span className="ho-mark m-tl" />
              <span className="ho-mark m-tr" />
              <span className="ho-mark m-bl" />
              <span className="ho-mark m-br" />

              {/* Central 3D platform card */}
              <div className="ho-core">
                <div className="ho-core-inner">
                  <div className="ho-core-mark">
                    <img src={logoSrc} alt="" width={677} height={369} decoding="async" />
                  </div>
                  <div className="ho-core-divider" />
                  <div className="ho-core-tag">
                    {t('hero.growthOsLine1')}
                    <br />
                    {t('hero.growthOsLine2')}
                  </div>
                </div>
              </div>

              {/* Ambient orbs */}
              <span className="ho-orb ho-orb-1" />
              <span className="ho-orb ho-orb-2" />
              <span className="ho-orb ho-orb-3" />
              <span className="ho-orb ho-orb-4" />
              <span className="ho-orb ho-orb-5" />

              {/* Revolving 3D pills */}
              {orbitPills.map(({ slot, label, sub, icon }) => (
                <span key={slot} className={`ho-pill ${slot}`}>
                  <span className="ho-pill-ico">{icon}</span>
                  <span className="ho-pill-text">
                    <strong className="ho-pill-label">{label}</strong>
                    <span className="ho-pill-sub">{sub}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* BOTTOM - meta strip + sub paragraph */}
          <div className="svc-sub-row reveal d4">
            <div className="svc-meta">
              <span className="svc-meta-label">{t('hero.metaLeft')}</span>
              <span className="bar" />
              <span className="svc-meta-label">{t('hero.metaRight')}</span>
            </div>
            <p className="svc-sub">{t('hero.sub')}</p>
          </div>

          {/* CAPABILITY MARQUEE */}
          <div className="svc-bottom reveal d5">
            <span className="svc-bottom-label">{t('hero.capabilitiesLabel')}</span>
            <div className="svc-marquee" aria-label={t('hero.capabilitiesAria')}>
              <div className="svc-marquee-track">
                {capabilities.map((cap) => (
                  <span key={cap} className="svc-marquee-item">
                    {cap}
                  </span>
                ))}
                {/* Duplicate for seamless loop */}
                {capabilities.map((cap) => (
                  <span key={`dup-${cap}`} className="svc-marquee-item" aria-hidden="true">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
