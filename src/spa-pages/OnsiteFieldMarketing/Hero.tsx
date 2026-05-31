import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('pages:onsiteFieldMarketing.hero.bullets', { returnObjects: true }) as string[];
  return (
    <section className="ofm-hero">
      <div className="container-shell">
        <div className="ofm-hero-grid">
          <div>
            <div className="ofm-hero-crumb">
              <Link to="/services">{t('pages:onsiteFieldMarketing.breadcrumb.services')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('pages:onsiteFieldMarketing.breadcrumb.current')}</span>
            </div>
            <span className="ofm-hero-eyebrow">
              <span className="dot" /> {t('pages:onsiteFieldMarketing.hero.eyebrow')}
            </span>
            <h1 className="ofm-hero-title">
              {t('pages:onsiteFieldMarketing.hero.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.hero.titleAccent')}</em>
            </h1>
            <p className="ofm-hero-lede">{t('pages:onsiteFieldMarketing.hero.lede')}</p>

            <div className="ofm-hero-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('pages:onsiteFieldMarketing.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#process" className="sl-btn-ghost">
                {t('pages:onsiteFieldMarketing.hero.ctaSecondary')}
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

            <ul className="ofm-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="ofm-hero-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="ofm-hero-mock" aria-hidden="true">
            <div className="ofm-hero-map">
              <div className="ofm-hero-pin p1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /></svg>
              </div>
              <div className="ofm-hero-pin p2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 22 2 22" /></svg>
              </div>
              <div className="ofm-hero-pin p3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
              </div>
            </div>

            <div className="ofm-hero-card c1">
              <span className="lbl">{t('pages:onsiteFieldMarketing.hero.mockCards.c1.lbl')}</span>
              <span className="val">{t('pages:onsiteFieldMarketing.hero.mockCards.c1.val')}</span>
              <span className="dlt">{t('pages:onsiteFieldMarketing.hero.mockCards.c1.dlt')}</span>
            </div>

            <div className="ofm-hero-card c2">
              <span className="lbl">{t('pages:onsiteFieldMarketing.hero.mockCards.c2.lbl')}</span>
              <span className="val">{t('pages:onsiteFieldMarketing.hero.mockCards.c2.val')}</span>
              <span className="dlt">{t('pages:onsiteFieldMarketing.hero.mockCards.c2.dlt')}</span>
            </div>

            <div className="ofm-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              {t('pages:onsiteFieldMarketing.hero.mockCards.t1')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
