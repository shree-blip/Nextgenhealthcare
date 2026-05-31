import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('metaAds.hero.bullets', { returnObjects: true }) as string[];

  return (
    <section className="ma-hero">
      <div className="container-shell">
        <div className="ma-hero-grid">
          <div>
            <div className="ma-hero-crumb">
              <Link to="/services">{t('metaAds.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('metaAds.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="ma-hero-eyebrow">
              <span className="dot" /> {t('metaAds.hero.eyebrow')}
            </span>
            <h1 className="ma-hero-title">
              {t('metaAds.hero.titleLine')} <em>{t('metaAds.hero.titleAccent')}</em>
            </h1>
            <p className="ma-hero-lede">{t('metaAds.hero.lede')}</p>

            <div className="ma-hero-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('metaAds.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#process" className="sl-btn-ghost">
                {t('metaAds.hero.ctaSecondary')}
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

            <ul className="ma-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="ma-hero-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="ma-hero-mock" aria-hidden="true">
            <div className="ma-hero-phone">
              <div className="ma-hero-phone-screen">
                <div className="ma-hero-phone-bar">
                  <span>9:41</span>
                  <span>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 16h20v3H2zM3 13h18v2H3zM5 10h14v2H5z" /></svg>
                  </span>
                </div>
                <div className="ma-hero-phone-head">
                  <div className="ma-hero-phone-avatar">FF</div>
                  <div className="ma-hero-phone-handle">
                    <span className="ma-hero-phone-name">focusfinance.clinic</span>
                    <span className="ma-hero-phone-sub">{t('metaAds.hero.sponsored')}</span>
                  </div>
                </div>
                <div className="ma-hero-phone-img" />
                <div className="ma-hero-phone-actions">
                  <span>Like</span>
                  <span>Share</span>
                  <span className="cta">Book →</span>
                </div>
              </div>
            </div>

            <div className="ma-hero-card c1">
              <span className="lbl">{t('metaAds.hero.card1Lbl')}</span>
              <span className="val">$18<em>.40</em></span>
              <span className="dlt">−42%</span>
            </div>

            <div className="ma-hero-card c2">
              <span className="lbl">{t('metaAds.hero.card2Lbl')}</span>
              <span className="val">312</span>
              <span className="dlt">+68%</span>
            </div>

            <div className="ma-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              ROAS 4.6×
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
