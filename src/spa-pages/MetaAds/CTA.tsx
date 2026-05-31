import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ma-cta-section" id="audit">
      <div className="container-shell">
        <div className="ma-cta-panel">
          <div className="ma-cta-left">
            <div className="ma-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('metaAds.cta.eyebrow')}
            </div>
            <h2 className="ma-cta-title">{t('metaAds.cta.title')}</h2>
            <p className="ma-cta-desc">{t('metaAds.cta.desc')}</p>
            <div className="ma-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('metaAds.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services" className="sl-btn-ghost">
                {t('metaAds.cta.ctaSecondary')}
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

          <div className="ma-cta-right">
            <div className="ma-cta-stat">
              <span className="ma-cta-stat-num">4.6<em>×</em></span>
              <span className="ma-cta-stat-lbl">{t('metaAds.cta.stat1Lbl')}</span>
            </div>
            <div className="ma-cta-stat">
              <span className="ma-cta-stat-num">−42<em>%</em></span>
              <span className="ma-cta-stat-lbl">{t('metaAds.cta.stat2Lbl')}</span>
            </div>
            <div className="ma-cta-stat">
              <span className="ma-cta-stat-num">40<em>+</em></span>
              <span className="ma-cta-stat-lbl">{t('metaAds.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
