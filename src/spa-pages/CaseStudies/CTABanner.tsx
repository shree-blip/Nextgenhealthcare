import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTABanner = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="cs-cta-banner">
      <div className="container-shell">
        <div className="ctab-grid">
          <div>
            <h2 className="ctab-title">{t('caseStudies.ctaBanner.title')}</h2>
            <p className="ctab-desc">{t('caseStudies.ctaBanner.desc')}</p>
          </div>
          <a href="#book" className="ctab-btn">
            {t('caseStudies.ctaBanner.button')}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
