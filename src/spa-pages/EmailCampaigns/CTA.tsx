import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="em-cta-section" id="audit">
      <div className="container-shell">
        <div className="em-cta-panel">
          <div className="em-cta-left">
            <div className="em-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('emailCampaigns.cta.eyebrow')}
            </div>
            <h2 className="em-cta-title">{t('emailCampaigns.cta.title')}</h2>
            <p className="em-cta-desc">{t('emailCampaigns.cta.desc')}</p>
            <div className="em-cta-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('emailCampaigns.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/case-studies" className="sl-btn-ghost">
                {t('emailCampaigns.cta.ctaSecondary')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="em-cta-right">
            <div className="em-cta-stat">
              <span className="em-cta-stat-num">68<em>%</em></span>
              <span className="em-cta-stat-lbl">{t('emailCampaigns.cta.stat1Lbl')}</span>
            </div>
            <div className="em-cta-stat">
              <span className="em-cta-stat-num">47<em>+</em></span>
              <span className="em-cta-stat-lbl">{t('emailCampaigns.cta.stat2Lbl')}</span>
            </div>
            <div className="em-cta-stat">
              <span className="em-cta-stat-num">21<em>d</em></span>
              <span className="em-cta-stat-lbl">{t('emailCampaigns.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
