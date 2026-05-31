import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="gb-cta-section" id="audit">
      <div className="container-shell">
        <div className="gb-cta-panel">
          <div className="gb-cta-left">
            <div className="gb-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('googleBusinessProfile.cta.eyebrow')}
            </div>
            <h2 className="gb-cta-title">{t('googleBusinessProfile.cta.title')}</h2>
            <p className="gb-cta-desc">{t('googleBusinessProfile.cta.desc')}</p>
            <div className="gb-cta-ctas">
              <Link to="/free-growth-audit" className="sl-btn-primary">
                {t('googleBusinessProfile.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/case-studies" className="sl-btn-ghost">
                {t('googleBusinessProfile.cta.ctaSecondary')}
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

          <div className="gb-cta-right">
            <div className="gb-cta-stat">
              <span className="gb-cta-stat-num">#1</span>
              <span className="gb-cta-stat-lbl">{t('googleBusinessProfile.cta.stat1Lbl')}</span>
            </div>
            <div className="gb-cta-stat">
              <span className="gb-cta-stat-num">
                218<em>%</em>
              </span>
              <span className="gb-cta-stat-lbl">{t('googleBusinessProfile.cta.stat2Lbl')}</span>
            </div>
            <div className="gb-cta-stat">
              <span className="gb-cta-stat-num">
                110<em>+</em>
              </span>
              <span className="gb-cta-stat-lbl">{t('googleBusinessProfile.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
