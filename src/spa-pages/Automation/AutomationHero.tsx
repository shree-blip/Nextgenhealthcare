import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import futuristicHealthcare from '../../assets/nextgen-image/Automationbannerimg.png';
import { ArrowIcon } from '@/components/icons';

interface AutomationHeroProps {
  onBook: () => void;
}

const AutomationHero = ({ onBook }: AutomationHeroProps) => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="au-hero" aria-labelledby="hero-title">
      <div className="container-shell">
        <Breadcrumb current={t('automation:breadcrumb.automation')} />
        <div className="au-hero-grid">
          <div className="reveal">
            <div className="eyebrow">
              <span className="pulse" />
              {t('automation:hero.eyebrow')}
            </div>

            <h1 className="au-title" id="hero-title">
              {t('automation:hero.titlePart1')}
              <span className="accent">{t('automation:hero.titleAccent')}</span>
              {t('automation:hero.titlePart2')}
            </h1>

            <p className="au-lede">{t('automation:hero.lede')}</p>

            <div className="au-cta-row">
              <Link to="/automation/templates" className="au-btn au-btn-primary au-btn-hero">
                {t('automation:hero.ctaPrimary')}
                <ArrowIcon size={13} />
              </Link>
              <button
                type="button"
                className="au-btn au-btn-ghost au-btn-hero"
                onClick={onBook}
                aria-haspopup="dialog"
                aria-controls="bookingModal"
              >
                {t('automation:hero.ctaSecondary')}
              </button>
            </div>

            <div className="au-trust">
              <span className="au-trust-label">{t('automation:hero.trustLabel')}</span>
              <div className="au-trust-logos" aria-label={t('automation:hero.trustLogosLabel')}>
                <span>{t('automation:hero.trustLogos.logo1')}</span>
                <span>{t('automation:hero.trustLogos.logo2')}</span>
                <span>{t('automation:hero.trustLogos.logo3')}</span>
              </div>
            </div>
          </div>

          <div className="au-hero-visual reveal d2" aria-hidden="true">
            <img src={futuristicHealthcare} alt="" className="h-img" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationHero;
