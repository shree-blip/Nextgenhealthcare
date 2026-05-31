import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const FinalCTA = () => {
  const { t } = useTranslation('pricing');

  return (
    <section className="pr-cta" aria-labelledby="pr-cta-title">
      <div className="container-shell">
        <div className="pr-cta-card">
          <span className="pr-cta-eyebrow">{t('cta.eyebrow')}</span>
          <h2 id="pr-cta-title" className="pr-cta-h2">
            {t('cta.titleStart')} <em>{t('cta.titleEm')}</em>
            {t('cta.titleEnd')}
          </h2>
          <p className="pr-cta-text">{t('cta.text')}</p>
          <div className="pr-cta-actions">
            <Link to="/contact" className="pr-cta-pri">
              {t('cta.primary')}
              <span className="ico" aria-hidden="true">
                <ArrowIcon size={14} />
              </span>
            </Link>
            <Link to="/case-studies" className="pr-cta-sec">
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
