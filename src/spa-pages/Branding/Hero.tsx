import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('branding.hero.bullets', { returnObjects: true }) as string[];

  return (
    <section className="br-hero">
      <div className="container-shell">
        <div className="br-hero-grid">
          <div>
            <div className="br-hero-crumb">
              <Link to="/services">{t('branding.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('branding.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="br-hero-eyebrow">
              <span className="dot" /> {t('branding.hero.eyebrow')}
            </span>
            <h1 className="br-hero-title">
              {t('branding.hero.titleLine')} <em>{t('branding.hero.titleAccent')}</em>{' '}
              {t('branding.hero.titleAfter')}
            </h1>
            <p className="br-hero-lede">{t('branding.hero.lede')}</p>

            <div className="br-hero-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('branding.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#deliverables" className="sl-btn-ghost">
                {t('branding.hero.ctaSecondary')}
                <svg
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
              </a>
            </div>

            <ul className="br-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="br-hero-check" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="br-hero-mock" aria-hidden="true">
            <div className="br-hero-board">
              <div className="br-hero-board-tag">{t('branding.hero.boardTag')}</div>

              <div className="br-hero-mark">
                <div className="br-hero-monogram">
                  <span>Bayview</span>
                  <span>Health</span>
                </div>
              </div>

              <div className="br-hero-palette">
                <span className="sw p1">
                  <em>Plum</em>
                  <i>#5B2C5C</i>
                </span>
                <span className="sw p2">
                  <em>Gold</em>
                  <i>#D4A95C</i>
                </span>
                <span className="sw p3">
                  <em>Mist</em>
                  <i>#F5E6D3</i>
                </span>
                <span className="sw p4">
                  <em>Ink</em>
                  <i>#1A2438</i>
                </span>
              </div>

              <div className="br-hero-type">
                <span className="serif">Aa</span>
                <div className="meta">
                  <span className="font">Canela Text · 56 / 60</span>
                  <span className="font sub">Inter · 14 / 20</span>
                </div>
              </div>

              <div className="br-hero-card">
                <div className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
                  </svg>
                </div>
                <div>
                  <span className="kicker">{t('branding.hero.patientPromiseLabel')}</span>
                  <span className="copy">{t('branding.hero.patientPromiseCopy')}</span>
                </div>
              </div>
            </div>

            <div className="br-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {t('branding.hero.tag1')}
            </div>
            <div className="br-hero-tag t2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {t('branding.hero.tag2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
