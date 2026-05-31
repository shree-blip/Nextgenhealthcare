import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

interface StatItem {
  num: string;
  unit?: string;
  lbl: string;
}

const CTA = () => {
  const { t } = useTranslation('pages');
  const stats = t('pages:medicalAutomation.cta.stats', {
    returnObjects: true,
  }) as StatItem[];
  return (
    <section className="mau-cta-section" id="audit">
      <div className="container-shell">
        <div className="mau-cta-panel">
          <div className="mau-cta-left">
            <div className="mau-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('pages:medicalAutomation.cta.eyebrow')}
            </div>
            <h2 className="mau-cta-title">{t('pages:medicalAutomation.cta.title')}</h2>
            <p className="mau-cta-desc">{t('pages:medicalAutomation.cta.desc')}</p>
            <div className="mau-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('pages:medicalAutomation.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services" className="sl-btn-ghost">
                {t('pages:medicalAutomation.cta.ctaSecondary')}
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
              </Link>
            </div>
          </div>

          <div className="mau-cta-right">
            {stats.map((s) => (
              <div key={s.lbl} className="mau-cta-stat">
                <span className="mau-cta-stat-num">
                  {s.num}
                  {s.unit && <em>{s.unit}</em>}
                </span>
                <span className="mau-cta-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
