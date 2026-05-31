import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
interface CTABannerProps {
  onBook: () => void;
}

const PlusMark = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <rect x="6" y="0" width="2" height="14" rx="1" />
    <rect x="0" y="6" width="14" height="2" rx="1" />
  </svg>
);

const CTABanner = ({ onBook }: CTABannerProps) => {
  const { t } = useTranslation('services');
  return (
    <section className="cta-banner-section" aria-labelledby="cta-title">
      <div className="container-shell">
        <div className="cta-card">
          <span className="reg-w tl" />
          <span className="reg-w tr" />
          <span className="reg-w bl" />
          <span className="reg-w br" />

          <span className="plus-mark pm1" aria-hidden="true">
            <PlusMark size={14} />
          </span>
          <span className="plus-mark pm2" aria-hidden="true">
            <PlusMark size={10} />
          </span>
          <span className="plus-mark pm3" aria-hidden="true">
            <PlusMark size={12} />
          </span>
          <span className="plus-mark pm4" aria-hidden="true">
            <PlusMark size={10} />
          </span>

          <div className="cta-inner">
            <span className="cta-eyebrow">{t('cta.eyebrow')}</span>
            <h2 id="cta-title" className="cta-h2">
              {t('cta.titleLine')} <em>{t('cta.titleAccent')}</em>.
            </h2>
            <p className="cta-text">{t('cta.text')}</p>
            <div className="cta-row">
              <button
                type="button"
                className="cta-primary"
                onClick={onBook}
                aria-haspopup="dialog"
                aria-controls="bookingModal"
              >
                {t('cta.button')}
                <ArrowIcon strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
