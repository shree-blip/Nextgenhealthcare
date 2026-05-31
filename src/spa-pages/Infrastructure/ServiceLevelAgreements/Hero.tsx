import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import heroImg from '@/assets/nextgen-image/Servicelabelimg.png';
import { ArrowIcon } from '@/components/icons';
import Gauge from './Gauge';

const Hero = () => {
  const { t } = useTranslation(['pages', 'common']);
  const live = t('pages:infrastructure.serviceLevelAgreements.hero.gaugeLive');
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
            {t('pages:infrastructure.serviceLevelAgreements.hero.breadcrumbCurrent')}
          </span>
        </nav>

        <div className="gtx-hero-grid">
          <div className="gtx-hero-content">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:infrastructure.serviceLevelAgreements.hero.eyebrow')}
            </span>
            <h1 className="gtx-hero-title">
              {t('pages:infrastructure.serviceLevelAgreements.hero.title')}
              <em> {t('pages:infrastructure.serviceLevelAgreements.hero.titleEm')}</em>
            </h1>
            <p className="gtx-hero-lede">
              {t('pages:infrastructure.serviceLevelAgreements.hero.lede')}
            </p>
            <div className="gtx-hero-ctas">
              <Link to="/contact" className="gtx-btn-primary">
                {t('pages:infrastructure.serviceLevelAgreements.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/about" className="gtx-btn-link">
                {t('pages:infrastructure.serviceLevelAgreements.hero.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="gtx-hero-visual">
            <img src={heroImg} alt="" loading="eager" decoding="async" />
            <div className="gtx-hero-visual-tag" aria-hidden="true">
              <span className="gtx-hero-visual-tag-num">
                {t('pages:infrastructure.serviceLevelAgreements.hero.visualTagNum')}
              </span>
              <span className="gtx-hero-visual-tag-lbl">
                {t('pages:infrastructure.serviceLevelAgreements.hero.visualTagLabel')}
              </span>
            </div>
          </div>
        </div>

        {/* Gauge tiles row */}
        <div className="slax-gauge-row">
          <div className="slax-gauge-tile" style={{ '--slax-tone': '#E1505C' } as CSSProperties}>
            <Gauge pct={96} color="#E1505C" delay={0} />
            <div>
              <strong>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.sev0.strong')}
              </strong>
              <span>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.sev0.label')}
              </span>
              <em className="slax-gauge-live" aria-hidden="true">
                <span className="slax-gauge-live-dot" />
                {live}
              </em>
            </div>
          </div>
          <div className="slax-gauge-tile" style={{ '--slax-tone': '#6FA86F' } as CSSProperties}>
            <Gauge pct={99} color="#6FA86F" delay={140} />
            <div>
              <strong>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.uptime.strong')}
              </strong>
              <span>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.uptime.label')}
              </span>
              <em className="slax-gauge-live" aria-hidden="true">
                <span className="slax-gauge-live-dot" />
                {live}
              </em>
            </div>
          </div>
          <div className="slax-gauge-tile" style={{ '--slax-tone': '#576DB5' } as CSSProperties}>
            <Gauge pct={100} color="#576DB5" delay={280} />
            <div>
              <strong>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.oncall.strong')}
              </strong>
              <span>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.oncall.label')}
              </span>
              <em className="slax-gauge-live" aria-hidden="true">
                <span className="slax-gauge-live-dot" />
                {live}
              </em>
            </div>
          </div>
          <div className="slax-gauge-tile" style={{ '--slax-tone': '#B38B6D' } as CSSProperties}>
            <Gauge pct={92} color="#B38B6D" delay={420} />
            <div>
              <strong>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.refresh.strong')}
              </strong>
              <span>
                {t('pages:infrastructure.serviceLevelAgreements.hero.gauges.refresh.label')}
              </span>
              <em className="slax-gauge-live" aria-hidden="true">
                <span className="slax-gauge-live-dot" />
                {live}
              </em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
