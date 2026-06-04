import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTABanner = ({ onBook }: { onBook: () => void }) => {
  const { t } = useTranslation('pages');
  return (
    <section className="cs-cta-banner">
      <div className="container-shell">
        <div className="ctab-grid">
          <div>
            <h2 className="ctab-title">{t('caseStudies.ctaBanner.title')}</h2>
            <p className="ctab-desc">{t('caseStudies.ctaBanner.desc')}</p>
          </div>
          <button type="button" onClick={onBook} className="ctab-btn">
            {t('caseStudies.ctaBanner.button')}
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
