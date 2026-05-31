import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="cm-cta-section" id="audit">
      <div className="container-shell">
        <div className="cm-cta-panel">
          <div className="cm-cta-left">
            <div className="cm-cta-eyebrow">
              <span className="dot" aria-hidden="true" />
              {t('contentMarketing.cta.eyebrow')}
            </div>
            <h2 className="cm-cta-title">{t('contentMarketing.cta.title')}</h2>
            <p className="cm-cta-desc">{t('contentMarketing.cta.desc')}</p>
            <div className="cm-cta-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('contentMarketing.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/case-studies" className="sl-btn-ghost">
                {t('contentMarketing.cta.ctaSecondary')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="cm-cta-right">
            <div className="cm-cta-stat">
              <span className="cm-cta-stat-num">14.2<em>K</em></span>
              <span className="cm-cta-stat-lbl">{t('contentMarketing.cta.stat1Lbl')}</span>
            </div>
            <div className="cm-cta-stat">
              <span className="cm-cta-stat-num">#3</span>
              <span className="cm-cta-stat-lbl">{t('contentMarketing.cta.stat2Lbl')}</span>
            </div>
            <div className="cm-cta-stat">
              <span className="cm-cta-stat-num">90<em>+</em></span>
              <span className="cm-cta-stat-lbl">{t('contentMarketing.cta.stat3Lbl')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
