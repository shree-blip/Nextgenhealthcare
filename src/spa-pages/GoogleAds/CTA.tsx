import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ga-cta-section" id="audit">
      <div className="container-shell">
        <div className="ga-cta-panel">
          <div className="ga-cta-left">
            <div className="ga-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('googleAds.cta.eyebrow')}
            </div>
            <h2 className="ga-cta-title">{t('googleAds.cta.title')}</h2>
            <p className="ga-cta-desc">{t('googleAds.cta.desc')}</p>
            <div className="ga-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('googleAds.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/pricing" className="sl-btn-ghost">
                {t('googleAds.cta.ctaSecondary')}
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

          <div className="ga-cta-right">
            <div className="ga-cta-stat">
              <span className="ga-cta-stat-num">4.2<em>×</em></span>
              <span className="ga-cta-stat-lbl">{t('googleAds.cta.stat1Lbl')}</span>
            </div>
            <div className="ga-cta-stat">
              <span className="ga-cta-stat-num">−42<em>%</em></span>
              <span className="ga-cta-stat-lbl">{t('googleAds.cta.stat2Lbl')}</span>
            </div>
            <div className="ga-cta-stat">
              <span className="ga-cta-stat-num">$24<em>M</em></span>
              <span className="ga-cta-stat-lbl">{t('googleAds.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
