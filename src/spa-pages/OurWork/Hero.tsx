import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Parallax, AnimatedBackground, MotionButton } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import { IMG } from './data';

const Hero = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ow-hero" aria-labelledby="ow-h1">
      <AnimatedBackground variant="aurora" intensity="medium" />
      <div className="container-shell">
        <nav className="ow-crumbs" aria-label="Breadcrumb">
          <Link to="/">{t('ourWork.crumbs.home')}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{t('ourWork.crumbs.ourWork')}</span>
        </nav>

        <div className="ow-hero-grid">
          <div className="ow-hero-copy">
            <span className="ow-pill">
              <span className="ow-pill-dot" />
              {t('ourWork.hero.pill')}
            </span>
            <h1 id="ow-h1" className="ow-h1">
              {t('ourWork.hero.titleLine1')}
              <br />
              <em>{t('ourWork.hero.titleEm')}</em> {t('ourWork.hero.titleLine2')}
              <br />
              {t('ourWork.hero.titleLine3')}
            </h1>
            <p className="ow-lede">{t('ourWork.hero.lede2')}</p>
            <div className="ow-hero-cta">
              <MotionButton to="/contact" className="ow-cta-primary">
                {t('ourWork.hero.ctaPrimary')}
                <ArrowIcon />
              </MotionButton>
              <Link to="/case-studies" className="ow-cta-link">
                {t('ourWork.hero.ctaSecondary')}
              </Link>
            </div>
          </div>

          <Parallax as="div" speed={0.06} className="ow-hero-visual" aria-hidden="true">
            <figure className="ow-spotlight">
              <img src={IMG.spotlight} alt="" loading="eager" />
              <figcaption>
                <span className="ow-spot-tag">{t('ourWork.hero.spotTag')}</span>
                <span className="ow-spot-title">{t('ourWork.hero.spotTitle')}</span>
              </figcaption>
            </figure>

            <div className="ow-floater ow-floater-1">
              <span className="ow-floater-num">
                {t('ourWork.hero.float1Num')}<small>%</small>
              </span>
              <span className="ow-floater-lbl">{t('ourWork.hero.float1Lbl')}</span>
            </div>
            <div className="ow-floater ow-floater-2">
              <span className="ow-floater-dot" /> {t('ourWork.hero.float2')}
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default Hero;
