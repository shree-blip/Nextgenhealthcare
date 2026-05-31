import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('googleBusinessProfile.hero.bullets', { returnObjects: true }) as string[];

  return (
    <section className="gb-hero">
      <div className="container-shell">
        <div className="gb-hero-grid">
          <div>
            <div className="gb-hero-crumb">
              <Link to="/services">{t('googleBusinessProfile.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('googleBusinessProfile.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="gb-hero-eyebrow">
              <span className="dot" /> {t('googleBusinessProfile.hero.eyebrow')}
            </span>
            <h1 className="gb-hero-title">
              {t('googleBusinessProfile.hero.titleLine')}{' '}
              <em>{t('googleBusinessProfile.hero.titleAccent')}</em>{' '}
              {t('googleBusinessProfile.hero.titleAfter')}
            </h1>
            <p className="gb-hero-lede">{t('googleBusinessProfile.hero.lede')}</p>

            <div className="gb-hero-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('googleBusinessProfile.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#optimization" className="sl-btn-ghost">
                {t('googleBusinessProfile.hero.ctaSecondary')}
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

            <ul className="gb-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="gb-hero-check" aria-hidden="true">
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

          <div className="gb-hero-mock" aria-hidden="true">
            <div className="gb-hero-phone">
              <div className="gb-hero-phone-bar">
                <span className="time">9:42</span>
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="gb-hero-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>{t('googleBusinessProfile.hero.mapQuery')}</span>
              </div>

              <div className="gb-hero-map">
                <div className="gb-hero-map-grid">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="gb-hero-map-cell" />
                  ))}
                </div>
                <span className="gb-hero-map-road r1" />
                <span className="gb-hero-map-road r2" />
                <span className="gb-hero-map-pin p1">A</span>
                <span className="gb-hero-map-pin p2">B</span>
                <span className="gb-hero-map-pin p3">C</span>
                <span className="gb-hero-map-you">
                  <span className="ping" />
                  <span className="lbl">You</span>
                </span>
              </div>

              <div className="gb-hero-results">
                <div className="gb-hero-results-head">
                  <span>{t('googleBusinessProfile.hero.topResults')}</span>
                  <span className="filter">{t('googleBusinessProfile.hero.filterOpen')}</span>
                </div>
                <ul className="gb-hero-result-list">
                  <li className="gb-hero-result active">
                    <span className="pin">A</span>
                    <div className="body">
                      <span className="name">Bayview Urgent Care</span>
                      <div className="meta">
                        <span className="stars">
                          ★★★★★ <em>4.9</em>
                        </span>
                        <span className="dist">· 0.4 mi · Open until 9 pm</span>
                      </div>
                      <div className="actions">
                        <span className="ico">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          Call
                        </span>
                        <span className="ico">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <polygon points="3 11 22 2 13 21 11 13 3 11" />
                          </svg>
                          Directions
                        </span>
                        <span className="ico">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          Book
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="gb-hero-result">
                    <span className="pin">B</span>
                    <div className="body">
                      <span className="name">Coastal Health Center</span>
                      <div className="meta">
                        <span className="stars">
                          ★★★★☆ <em>4.6</em>
                        </span>
                        <span className="dist">· 0.9 mi · Open until 8 pm</span>
                      </div>
                    </div>
                  </li>
                  <li className="gb-hero-result">
                    <span className="pin">C</span>
                    <div className="body">
                      <span className="name">Westside Walk-In Clinic</span>
                      <div className="meta">
                        <span className="stars">
                          ★★★★ <em>4.3</em>
                        </span>
                        <span className="dist">· 1.3 mi · Open until 7 pm</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="gb-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {t('googleBusinessProfile.hero.tag1')}
            </div>
            <div className="gb-hero-tag t2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              {t('googleBusinessProfile.hero.tag2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
