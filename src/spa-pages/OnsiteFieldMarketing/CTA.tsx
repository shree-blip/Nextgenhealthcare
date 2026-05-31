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
  const stats = t('pages:onsiteFieldMarketing.cta.stats', {
    returnObjects: true,
  }) as StatItem[];
  return (
    <section className="ofm-cta-section" id="audit">
      <div className="container-shell">
        <div className="ofm-cta-panel">
          <div className="ofm-cta-left">
            <div className="ofm-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('pages:onsiteFieldMarketing.cta.eyebrow')}
            </div>
            <h2 className="ofm-cta-title">{t('pages:onsiteFieldMarketing.cta.title')}</h2>
            <p className="ofm-cta-desc">{t('pages:onsiteFieldMarketing.cta.desc')}</p>
            <div className="ofm-cta-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('pages:onsiteFieldMarketing.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services" className="sl-btn-ghost">
                {t('pages:onsiteFieldMarketing.cta.ctaSecondary')}
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

          <div className="ofm-cta-right">
            {stats.map((s) => (
              <div key={s.lbl} className="ofm-cta-stat">
                <span className="ofm-cta-stat-num">
                  {s.num}
                  {s.unit && <em>{s.unit}</em>}
                </span>
                <span className="ofm-cta-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
