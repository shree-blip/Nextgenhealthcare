import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sm-cta-section" id="audit">
      <div className="container-shell">
        <div className="sm-cta-panel">
          <div className="sm-cta-left">
            <div className="sm-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('socialMedia.cta.eyebrow')}
            </div>
            <h2 className="sm-cta-title">{t('socialMedia.cta.title')}</h2>
            <p className="sm-cta-desc">{t('socialMedia.cta.desc')}</p>
            <div className="sm-cta-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('socialMedia.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/case-studies" className="sl-btn-ghost">
                {t('socialMedia.cta.ctaSecondary')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="sm-cta-right">
            <div className="sm-cta-stat">
              <span className="sm-cta-stat-num">312<em>%</em></span>
              <span className="sm-cta-stat-lbl">{t('socialMedia.cta.stat1Lbl')}</span>
            </div>
            <div className="sm-cta-stat">
              <span className="sm-cta-stat-num">5.8<em>%</em></span>
              <span className="sm-cta-stat-lbl">{t('socialMedia.cta.stat2Lbl')}</span>
            </div>
            <div className="sm-cta-stat">
              <span className="sm-cta-stat-num">120<em>+</em></span>
              <span className="sm-cta-stat-lbl">{t('socialMedia.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
