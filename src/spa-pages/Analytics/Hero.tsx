import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('analytics.hero.bullets', { returnObjects: true }) as string[];

  return (
    <section className="an-hero">
      <div className="container-shell">
        <div className="an-hero-grid">
          <div>
            <div className="an-hero-crumb">
              <Link to="/services">{t('analytics.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('analytics.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="an-hero-eyebrow">
              <span className="dot" /> {t('analytics.hero.eyebrow')}
            </span>
            <h1 className="an-hero-title">
              {t('analytics.hero.titleLine')} <em>{t('analytics.hero.titleAccent')}</em>
            </h1>
            <p className="an-hero-lede">{t('analytics.hero.lede')}</p>

            <div className="an-hero-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('analytics.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#sources" className="sl-btn-ghost">
                {t('analytics.hero.ctaSecondary')}
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

            <ul className="an-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="an-hero-check" aria-hidden="true">
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

          <div className="an-hero-mock" aria-hidden="true">
            <div className="an-hero-dash">
              <div className="an-hero-dash-bar">
                <span className="dot r" />
                <span className="dot y" />
                <span className="dot g" />
                <span className="title">{t('analytics.hero.dashboardTitle')}</span>
                <span className="live">
                  <span className="ping" /> {t('analytics.hero.live')}
                </span>
              </div>

              <div className="an-hero-dash-body">
                <div className="an-hero-kpis">
                  <div className="kpi">
                    <span className="lbl">Booked patients</span>
                    <span className="val">1,284</span>
                    <span className="dlt up">↑ 62%</span>
                  </div>
                  <div className="kpi">
                    <span className="lbl">Attributed revenue</span>
                    <span className="val">
                      $847<em>K</em>
                    </span>
                    <span className="dlt up">↑ 38%</span>
                  </div>
                  <div className="kpi">
                    <span className="lbl">Blended CPA</span>
                    <span className="val">
                      $28<em>.40</em>
                    </span>
                    <span className="dlt up">↓ 42%</span>
                  </div>
                </div>

                <div className="an-hero-chart">
                  <div className="chart-head">
                    <span>Bookings by channel · 30d</span>
                    <span className="legend">
                      <i className="b1" /> Ads
                      <i className="b2" /> SEO
                      <i className="b3" /> Social
                    </span>
                  </div>
                  <div className="chart-canvas">
                    <svg viewBox="0 0 280 90" preserveAspectRatio="none">
                      <path
                        d="M0,70 C30,65 50,55 80,50 C110,45 140,40 170,32 C200,24 230,18 280,12"
                        fill="none"
                        stroke="#0EA5E9"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,80 C30,76 60,72 100,68 C140,64 180,55 220,46 C250,40 270,35 280,30"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,85 C40,80 80,78 120,74 C160,70 200,64 240,58 C260,55 280,52 280,50"
                        fill="none"
                        stroke="#A78BFA"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <circle cx="280" cy="12" r="3.5" fill="#0EA5E9" />
                      <circle cx="280" cy="30" r="3.5" fill="#10B981" />
                      <circle cx="280" cy="50" r="3.5" fill="#A78BFA" />
                    </svg>
                  </div>
                </div>

                <div className="an-hero-funnel">
                  <div className="step s1">
                    <span className="bar" style={{ width: '100%' }} />
                    <span className="lbl">Impressions</span>
                    <span className="num">142K</span>
                  </div>
                  <div className="step s2">
                    <span className="bar" style={{ width: '68%' }} />
                    <span className="lbl">Clicks / visits</span>
                    <span className="num">12.4K</span>
                  </div>
                  <div className="step s3">
                    <span className="bar" style={{ width: '42%' }} />
                    <span className="lbl">Leads</span>
                    <span className="num">2,847</span>
                  </div>
                  <div className="step s4">
                    <span className="bar" style={{ width: '22%' }} />
                    <span className="lbl">Booked patients</span>
                    <span className="num">1,284</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="an-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              {t('analytics.hero.tag1')}
            </div>
            <div className="an-hero-tag t2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {t('analytics.hero.tag2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
