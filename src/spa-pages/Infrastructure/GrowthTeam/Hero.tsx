import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import heroImg from '@/assets/nextgen-image/growthteambannerimg.png';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation(['pages', 'common']);
  return (
    <section className="gtx-hero">
      <div className="gt-shell">
        <nav className="gtx-crumb" aria-label={t('common:common.breadcrumb')}>
          <Link to="/about">{t('pages:infrastructure.common.breadcrumbAbout')}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/about#infrastructure">
            {t('pages:infrastructure.common.breadcrumbInfrastructure')}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="cur">
            {t('pages:infrastructure.growthTeam.hero.breadcrumbCurrent')}
          </span>
        </nav>

        <div className="gtx-hero-grid">
          <div className="gtx-hero-content">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:infrastructure.growthTeam.hero.eyebrow')}
            </span>
            <h1 className="gtx-hero-title">
              {t('pages:infrastructure.growthTeam.hero.title')}
              <em> {t('pages:infrastructure.growthTeam.hero.titleEm')}</em>
            </h1>
            <p className="gtx-hero-lede">{t('pages:infrastructure.growthTeam.hero.lede')}</p>
            <div className="gtx-hero-ctas">
              <Link to="/contact" className="gtx-btn-primary">
                {t('pages:infrastructure.growthTeam.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/our-work" className="gtx-btn-link">
                {t('pages:infrastructure.growthTeam.hero.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="gtx-hero-visual">
            <img src={heroImg} alt="" loading="eager" decoding="async" />
            <div className="gtx-hero-visual-tag" aria-hidden="true">
              <span className="gtx-hero-visual-tag-num">
                {t('pages:infrastructure.growthTeam.hero.visualTagNum')}
              </span>
              <span className="gtx-hero-visual-tag-lbl">
                {t('pages:infrastructure.growthTeam.hero.visualTagLabel')}
              </span>
            </div>
          </div>
        </div>

        <ul className="gtx-hero-stats">
          <li>
            <strong>6</strong>
            <span>{t('pages:infrastructure.growthTeam.hero.stats.specialists')}</span>
          </li>
          <li>
            <strong>105+</strong>
            <span>{t('pages:infrastructure.growthTeam.hero.stats.hours')}</span>
          </li>
          <li>
            <strong>3.1×</strong>
            <span>{t('pages:infrastructure.growthTeam.hero.stats.roas')}</span>
          </li>
          <li>
            <strong>0</strong>
            <span>{t('pages:infrastructure.growthTeam.hero.stats.handoffs')}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
