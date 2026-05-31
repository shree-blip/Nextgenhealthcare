import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import heroImg from '@/assets/nextgen-image/Complianceimg.png';
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
            {t('pages:infrastructure.complianceProtocol.hero.breadcrumbCurrent')}
          </span>
        </nav>

        <div className="gtx-hero-grid">
          <div className="gtx-hero-content">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:infrastructure.complianceProtocol.hero.eyebrow')}
            </span>
            <h1 className="gtx-hero-title">
              {t('pages:infrastructure.complianceProtocol.hero.title')}
              <em> {t('pages:infrastructure.complianceProtocol.hero.titleEm')}</em>
            </h1>
            <p className="gtx-hero-lede">
              {t('pages:infrastructure.complianceProtocol.hero.lede')}
            </p>
            <div className="gtx-hero-ctas">
              <Link to="/contact" className="gtx-btn-primary">
                {t('pages:infrastructure.complianceProtocol.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/about" className="gtx-btn-link">
                {t('pages:infrastructure.complianceProtocol.hero.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="gtx-hero-visual">
            <img src={heroImg} alt="" loading="eager" decoding="async" />
            <div className="gtx-hero-visual-tag" aria-hidden="true">
              <span className="gtx-hero-visual-tag-num">
                {t('pages:infrastructure.complianceProtocol.hero.visualTagNum')}
              </span>
              <span className="gtx-hero-visual-tag-lbl">
                {t('pages:infrastructure.complianceProtocol.hero.visualTagLabel')}
              </span>
            </div>
          </div>
        </div>

        <ul className="gtx-hero-stats">
          <li>
            <strong>100%</strong>
            <span>{t('pages:infrastructure.complianceProtocol.hero.stats.baa')}</span>
          </li>
          <li>
            <strong>AES-256</strong>
            <span>{t('pages:infrastructure.complianceProtocol.hero.stats.encryption')}</span>
          </li>
          <li>
            <strong>TLS 1.3</strong>
            <span>{t('pages:infrastructure.complianceProtocol.hero.stats.transit')}</span>
          </li>
          <li>
            <strong>6 yrs</strong>
            <span>{t('pages:infrastructure.complianceProtocol.hero.stats.audit')}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
