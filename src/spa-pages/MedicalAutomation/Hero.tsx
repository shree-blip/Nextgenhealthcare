import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const ROWS = ['intake', 'insurance', 'reminder', 'triage'] as const;

const ROW_ICONS = {
  intake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v3h6V3" /><path d="m9 13 2 2 4-4" /></svg>
  ),
  insurance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  reminder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
  ),
  triage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="9" cy="12" r="1.2" /><circle cx="15" cy="12" r="1.2" /><path d="M12 18v2" /></svg>
  ),
};

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('pages:medicalAutomation.hero.bullets', { returnObjects: true }) as string[];
  return (
    <section className="mau-hero">
      <div className="container-shell">
        <div className="mau-hero-grid">
          <div>
            <div className="mau-hero-crumb">
              <Link to="/services">{t('pages:medicalAutomation.breadcrumb.services')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('pages:medicalAutomation.breadcrumb.current')}</span>
            </div>
            <span className="mau-hero-eyebrow">
              <span className="dot" /> {t('pages:medicalAutomation.hero.eyebrow')}
            </span>
            <h1 className="mau-hero-title">
              {t('pages:medicalAutomation.hero.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.hero.titleAccent')}</em>
            </h1>
            <p className="mau-hero-lede">{t('pages:medicalAutomation.hero.lede')}</p>

            <div className="mau-hero-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('pages:medicalAutomation.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#workflows" className="sl-btn-ghost">
                {t('pages:medicalAutomation.hero.ctaSecondary')}
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

            <ul className="mau-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="mau-hero-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mau-hero-mock" aria-hidden="true">
            <div className="mau-hero-panel">
              <div className="mau-hero-panel-bar">
                <span className="mau-hero-panel-title">
                  {t('pages:medicalAutomation.hero.panel.title')}
                </span>
                <span className="mau-hero-panel-meta">
                  {t('pages:medicalAutomation.hero.panel.meta')}
                </span>
              </div>
              <div className="mau-hero-flow">
                {ROWS.map((row, i) => (
                  <div key={row} className={`mau-hero-flow-row${i === 0 ? ' active' : ''}`}>
                    <span className="mau-hero-flow-ico">{ROW_ICONS[row]}</span>
                    <div className="mau-hero-flow-body">
                      <span className="mau-hero-flow-name">
                        {t(`pages:medicalAutomation.hero.panel.rows.${row}.name`)}
                      </span>
                      <span className="mau-hero-flow-sub">
                        {t(`pages:medicalAutomation.hero.panel.rows.${row}.sub`)}
                      </span>
                    </div>
                    <span className={`mau-hero-flow-stat${row === 'reminder' ? ' muted' : ''}`}>
                      {t(`pages:medicalAutomation.hero.panel.rows.${row}.stat`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mau-hero-card c1">
              <span className="lbl">{t('pages:medicalAutomation.hero.cards.c1.lbl')}</span>
              <span className="val">
                {t('pages:medicalAutomation.hero.cards.c1.val')}
                <em>{t('pages:medicalAutomation.hero.cards.c1.unit')}</em>
              </span>
              <span className="dlt">{t('pages:medicalAutomation.hero.cards.c1.dlt')}</span>
            </div>

            <div className="mau-hero-card c2">
              <span className="lbl">{t('pages:medicalAutomation.hero.cards.c2.lbl')}</span>
              <span className="val">
                {t('pages:medicalAutomation.hero.cards.c2.val')}
                <em>{t('pages:medicalAutomation.hero.cards.c2.unit')}</em>
              </span>
              <span className="dlt">{t('pages:medicalAutomation.hero.cards.c2.dlt')}</span>
            </div>

            <div className="mau-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" /><polyline points="9 12 11 14 15 10" /></svg>
              {t('pages:medicalAutomation.hero.cards.t1')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
