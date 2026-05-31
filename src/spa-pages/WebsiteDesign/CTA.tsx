import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="wd-cta-section" id="audit">
      <div className="container-shell">
        <div className="wd-cta-panel">
          <div className="wd-cta-left">
            <div className="wd-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('websiteDesign.cta.eyebrow')}
            </div>
            <h2 className="wd-cta-title">{t('websiteDesign.cta.title')}</h2>
            <p className="wd-cta-desc">{t('websiteDesign.cta.desc')}</p>
            <div className="wd-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('websiteDesign.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services" className="sl-btn-ghost">
                {t('websiteDesign.cta.ctaSecondary')}
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

          <div className="wd-cta-right">
            <div className="wd-cta-stat">
              <span className="wd-cta-stat-num">1.4<em>s</em></span>
              <span className="wd-cta-stat-lbl">{t('websiteDesign.cta.stat1Lbl')}</span>
            </div>
            <div className="wd-cta-stat">
              <span className="wd-cta-stat-num">+88<em>%</em></span>
              <span className="wd-cta-stat-lbl">{t('websiteDesign.cta.stat2Lbl')}</span>
            </div>
            <div className="wd-cta-stat">
              <span className="wd-cta-stat-num">40<em>+</em></span>
              <span className="wd-cta-stat-lbl">{t('websiteDesign.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
