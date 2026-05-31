import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { PLACEHOLDER_IMAGE as moreInfoBanner } from '@/lib/placeholderImage';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="amih-hero" aria-labelledby="amih-hero-title">
      <div className="container-shell">
        <Breadcrumb current={t('automation:breadcrumb.moreInfo')} />

        <div className="amih-hero-grid">
          <div className="amih-hero-copy">
            <span className="amih-eyebrow">
              <i aria-hidden="true" />
              {t('automation:moreInfo.hero.eyebrow')}
            </span>
            <h1 id="amih-hero-title" className="amih-h1">
              {t('automation:moreInfo.hero.title')}
            </h1>
            <p className="amih-lede">{t('automation:moreInfo.hero.lede')}</p>
            <div className="amih-hero-cta">
              <Link to="/free-growth-audit" className="amih-btn amih-btn-primary">
                {t('automation:moreInfo.hero.ctaPrimary')} <ArrowIcon size={14} strokeWidth={2.2} />
              </Link>
              <a href="#amih-solutions" className="amih-btn amih-btn-ghost">
                {t('automation:moreInfo.hero.ctaSecondary')}
              </a>
            </div>
          </div>

          <img
            src={moreInfoBanner}
            alt={t('automation:moreInfo.hero.bannerAlt')}
            className="amih-hero-banner"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
