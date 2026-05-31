import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="br-cta-section" id="audit">
      <div className="container-shell">
        <div className="br-cta-panel">
          <div className="br-cta-left">
            <div className="br-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('branding.cta.eyebrow')}
            </div>
            <h2 className="br-cta-title">{t('branding.cta.title')}</h2>
            <p className="br-cta-desc">{t('branding.cta.desc')}</p>
            <div className="br-cta-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('branding.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/case-studies" className="sl-btn-ghost">
                {t('branding.cta.ctaSecondary')}
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

          <div className="br-cta-right">
            <div className="br-cta-stat">
              <span className="br-cta-stat-num">
                +62<em>%</em>
              </span>
              <span className="br-cta-stat-lbl">{t('branding.cta.stat1Lbl')}</span>
            </div>
            <div className="br-cta-stat">
              <span className="br-cta-stat-num">
                +38<em>%</em>
              </span>
              <span className="br-cta-stat-lbl">{t('branding.cta.stat2Lbl')}</span>
            </div>
            <div className="br-cta-stat">
              <span className="br-cta-stat-num">
                40<em>+</em>
              </span>
              <span className="br-cta-stat-lbl">{t('branding.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
