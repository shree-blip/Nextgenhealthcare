import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Parallax, AnimatedBackground } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import industryImg from '../../assets/nextgen-image/Industryimg.png';

interface IndustriesHeroProps {
  onBook: () => void;
}

const IndustriesHero = ({ onBook }: IndustriesHeroProps) => {
  const { t } = useTranslation('industries');
  return (
    <section className="ind-hero" aria-labelledby="ind-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <div className="ind-hero-grid">
          <div className="ind-hero-text">
            <span className="ind-eyebrow">{t('hero.eyebrow')}</span>
            <h1 id="ind-title" className="ind-h1">
              {t('hero.titleLead')}
              <span className="accent">{t('hero.titleAccent')}</span>
              {t('hero.titleTrail')}
            </h1>
            <p className="ind-lede">{t('hero.lede')}</p>

            <div className="ind-hero-cta">
              <Link to="/pricing" className="svc-cta-primary">
                {t('hero.ctaPrimary')}
                <span className="ico" aria-hidden="true">
                  <ArrowIcon size={14} />
                </span>
              </Link>
              <button
                type="button"
                className="svc-cta-link"
                onClick={onBook}
                aria-haspopup="dialog"
                aria-controls="bookingModal"
              >
                {t('hero.ctaSecondary')}
                <span className="ico" aria-hidden="true">
                  <svg
                    width={12}
                    height={12}
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
                </span>
              </button>
            </div>

            <div className="ind-trust">
              <span className="ind-trust-label">{t('hero.trustLabel')}</span>
              <div className="ind-trust-stats">
                <span className="ind-trust-stat">
                  <span className="ind-trust-stat-num">3+</span>
                  <span className="ind-trust-stat-label">{t('hero.trust.verticals')}</span>
                </span>
                <span className="ind-trust-stat">
                  <span className="ind-trust-stat-num">$10M+</span>
                  <span className="ind-trust-stat-label">{t('hero.trust.adSpend')}</span>
                </span>
                <span className="ind-trust-stat">
                  <span className="ind-trust-stat-num">3&times;</span>
                  <span className="ind-trust-stat-label">{t('hero.trust.roi')}</span>
                </span>
              </div>
            </div>
          </div>

          <Parallax as="div" speed={0.06} className="ind-visual" aria-hidden="true">
            <div className="ind-visual-frame">
              <div className="ind-visual-svg">
                <img
                  src={industryImg}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="ind-visual-img"
                />
              </div>
            </div>

            <div className="ind-float-card fc1">
              <span className="fc-icon">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </span>
              <div className="fc-text">
                <strong>{t('hero.floatCards.leads.value')}</strong>
                <small>{t('hero.floatCards.leads.label')}</small>
              </div>
            </div>

            <div className="ind-float-card fc3">
              <span className="fc-icon">
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <div className="fc-text">
                <strong>{t('hero.floatCards.hipaa.value')}</strong>
                <small>{t('hero.floatCards.hipaa.label')}</small>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default IndustriesHero;
