import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('seoService.hero.bullets', { returnObjects: true }) as string[];

  return (
    <section className="seo-hero">
      <div className="container-shell">
        <div className="seo-hero-grid">
          <div>
            <div className="seo-hero-crumb">
              <Link to="/services">{t('seoService.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('seoService.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="seo-hero-eyebrow">
              <span className="dot" /> {t('seoService.hero.eyebrow')}
            </span>
            <h1 className="seo-hero-title">
              {t('seoService.hero.titleLine')} <em>{t('seoService.hero.titleAccent')}</em>
            </h1>
            <p className="seo-hero-lede">{t('seoService.hero.lede')}</p>

            <div className="seo-hero-ctas">
              <a href="#audit" className="sl-btn-primary">
                {t('seoService.hero.ctaPrimary')}
                <ArrowIcon />
              </a>
              <a href="#capabilities" className="sl-btn-ghost">
                {t('seoService.hero.ctaSecondary')}
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

            <ul className="seo-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="seo-hero-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="seo-hero-mock" aria-hidden="true">
            <div className="seo-hero-mock-window">
              <div className="seo-hero-mock-bar">
                <span className="dot r" />
                <span className="dot y" />
                <span className="dot g" />
                <div className="seo-hero-mock-url">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  {t('seoService.hero.dashboardTitle')}
                </div>
              </div>

              <div className="seo-hero-mock-body">
                <div className="seo-hero-mock-row top">
                  <div className="seo-hero-mock-kpi">
                    <span className="lbl">{t('seoService.hero.kpi1')}</span>
                    <span className="val">38,210</span>
                    <span className="dlt up">+47%</span>
                  </div>
                  <div className="seo-hero-mock-kpi">
                    <span className="lbl">{t('seoService.hero.kpi2')}</span>
                    <span className="val">3.4</span>
                    <span className="dlt up">↑ 4.2</span>
                  </div>
                  <div className="seo-hero-mock-kpi">
                    <span className="lbl">{t('seoService.hero.kpi3')}</span>
                    <span className="val">1,284</span>
                    <span className="dlt up">+62%</span>
                  </div>
                </div>

                <div className="seo-hero-mock-chart">
                  <svg viewBox="0 0 320 96" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="seoArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#576DB5" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#576DB5" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,72 L24,68 L48,62 L72,66 L96,54 L120,46 L144,40 L168,32 L192,38 L216,24 L240,18 L264,22 L288,12 L320,8 L320,96 L0,96 Z" fill="url(#seoArea)" />
                    <path d="M0,72 L24,68 L48,62 L72,66 L96,54 L120,46 L144,40 L168,32 L192,38 L216,24 L240,18 L264,22 L288,12 L320,8" fill="none" stroke="#576DB5" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="seo-hero-mock-keys">
                  <div className="seo-hero-mock-key">
                    <span className="pos">#1</span>
                    <span className="kw">urgent care near me</span>
                    <span className="trend up">+12</span>
                  </div>
                  <div className="seo-hero-mock-key">
                    <span className="pos">#2</span>
                    <span className="kw">family dentist [city]</span>
                    <span className="trend up">+7</span>
                  </div>
                  <div className="seo-hero-mock-key">
                    <span className="pos">#3</span>
                    <span className="kw">walk-in clinic Saturday</span>
                    <span className="trend up">+5</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><polygon points="12 2 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9" /></svg>
              {t('seoService.hero.tag1')}
            </div>
            <div className="seo-hero-tag t2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              {t('seoService.hero.tag2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
