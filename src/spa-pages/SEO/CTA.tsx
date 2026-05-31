import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="seo-cta-section" id="audit">
      <div className="container-shell">
        <div className="seo-cta-panel">
          <div className="seo-cta-left">
            <div className="seo-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('seoService.cta.eyebrow')}
            </div>
            <h2 className="seo-cta-title">{t('seoService.cta.title')}</h2>
            <p className="seo-cta-desc">{t('seoService.cta.desc')}</p>
            <div className="seo-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('seoService.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/pricing" className="sl-btn-ghost">
                {t('seoService.cta.ctaSecondary')}
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

          <div className="seo-cta-right">
            <div className="seo-cta-stat">
              <span className="seo-cta-stat-num">+62<em>%</em></span>
              <span className="seo-cta-stat-lbl">{t('seoService.cta.stat1Lbl')}</span>
            </div>
            <div className="seo-cta-stat">
              <span className="seo-cta-stat-num">94<em>%</em></span>
              <span className="seo-cta-stat-lbl">{t('seoService.cta.stat2Lbl')}</span>
            </div>
            <div className="seo-cta-stat">
              <span className="seo-cta-stat-num">5<em>d</em></span>
              <span className="seo-cta-stat-lbl">{t('seoService.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
