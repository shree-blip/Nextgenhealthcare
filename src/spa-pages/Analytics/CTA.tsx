import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="an-cta-section" id="audit">
      <div className="container-shell">
        <div className="an-cta-panel">
          <div className="an-cta-left">
            <div className="an-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('analytics.cta.eyebrow')}
            </div>
            <h2 className="an-cta-title">{t('analytics.cta.title')}</h2>
            <p className="an-cta-desc">{t('analytics.cta.desc')}</p>
            <div className="an-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('analytics.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/case-studies" className="sl-btn-ghost">
                {t('analytics.cta.ctaSecondary')}
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

          <div className="an-cta-right">
            <div className="an-cta-stat">
              <span className="an-cta-stat-num">
                100<em>%</em>
              </span>
              <span className="an-cta-stat-lbl">{t('analytics.cta.stat1Lbl')}</span>
            </div>
            <div className="an-cta-stat">
              <span className="an-cta-stat-num">
                −85<em>%</em>
              </span>
              <span className="an-cta-stat-lbl">{t('analytics.cta.stat2Lbl')}</span>
            </div>
            <div className="an-cta-stat">
              <span className="an-cta-stat-num">
                $12<em>M+</em>
              </span>
              <span className="an-cta-stat-lbl">{t('analytics.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
