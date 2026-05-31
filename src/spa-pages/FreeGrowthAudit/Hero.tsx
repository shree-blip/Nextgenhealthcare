import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatedBackground, MotionButton, Parallax } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import medspaImg from '@/assets/nextgen-image/Medspas&wellnessimg.png';
import urgentImg from '@/assets/nextgen-image/Urgentcareimg.png';
import dentalImg from '@/assets/nextgen-image/Dentalimg.png';
import mentalImg from '@/assets/nextgen-image/Mentalhealthimg.png';
import bannerImg from '@/assets/nextgen-image/Freegrowthauditimg.png';

/* -----------------------------------------------------------
   Sample-report mockup that sits beside the form on desktop.
   Replaces the old DocumentVisual with a richer two-page
   spread + floating healthcare practice thumbnails so users
   instantly see the variety of practices this audit covers.
   ----------------------------------------------------------- */
const ReportPreview = () => {
  const { t } = useTranslation('pages');
  return (
    <div className="fga-hero-stage" aria-hidden="true">
      <div className="fga-hero-banner">
        <img src={bannerImg} alt="" loading="eager" />
      </div>

      {/* Floating practice thumbnails — show variety of audiences */}
      <Parallax as="div" speed={0.04} className="fga-hero-thumbs">
        <div className="fga-hero-thumb t1">
          <img src={dentalImg} alt="" loading="lazy" />
          <span>{t('pages:freeGrowthAudit.hero.thumbs.dental')}</span>
        </div>
        <div className="fga-hero-thumb t2">
          <img src={medspaImg} alt="" loading="lazy" />
          <span>{t('pages:freeGrowthAudit.hero.thumbs.medspa')}</span>
        </div>
        <div className="fga-hero-thumb t3">
          <img src={urgentImg} alt="" loading="lazy" />
          <span>{t('pages:freeGrowthAudit.hero.thumbs.urgent')}</span>
        </div>
        <div className="fga-hero-thumb t4">
          <img src={mentalImg} alt="" loading="lazy" />
          <span>{t('pages:freeGrowthAudit.hero.thumbs.mental')}</span>
        </div>
      </Parallax>

      <div className="fga-chip fga-chip-3">
        <svg
          width={11}
          height={11}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {t('pages:freeGrowthAudit.hero.previewKeep')}
      </div>
    </div>
  );
};

const Hero = () => {
  const { t } = useTranslation('pages');
  const points = t('pages:freeGrowthAudit.hero.points', { returnObjects: true }) as string[];
  return (
    <section className="fga-hero" aria-labelledby="fga-h1">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <nav className="fga-crumbs" aria-label={t('pages:freeGrowthAudit.breadcrumb.current')}>
          <Link to="/">{t('pages:freeGrowthAudit.breadcrumb.home')}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{t('pages:freeGrowthAudit.breadcrumb.current')}</span>
        </nav>

        <div className="fga-hero-grid">
          <div className="fga-hero-copy">
            <span className="fga-pill">
              <span className="fga-pill-dot" />
              {t('pages:freeGrowthAudit.hero.pill')}
            </span>
            <h1 id="fga-h1" className="fga-h1">
              {t('pages:freeGrowthAudit.hero.titleLine1')}
              <br />
              <em>{t('pages:freeGrowthAudit.hero.titleAccent')}</em>{' '}
              {t('pages:freeGrowthAudit.hero.titleSuffix')}
            </h1>
            <p className="fga-lede">{t('pages:freeGrowthAudit.hero.lede')}</p>

            {/* Inline social proof strip */}
            <ul className="fga-hero-points" aria-label={t('pages:freeGrowthAudit.hero.pointsAria')}>
              {points.map((p) => (
                <li key={p}>
                  <span className="fga-hero-bullet" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6}>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="fga-cta-row">
              <MotionButton to="/contact" className="fga-cta">
                {t('pages:freeGrowthAudit.hero.ctaPrimary')}
                <ArrowIcon />
              </MotionButton>
              <div className="fga-cta-meta">
                <span className="fga-cta-meta-num">{t('pages:freeGrowthAudit.hero.ctaMetaNum')}</span>{' '}
                {t('pages:freeGrowthAudit.hero.ctaMetaSuffix')}
              </div>
            </div>

            <div className="fga-hero-trustline" aria-label={t('pages:freeGrowthAudit.hero.trustAria')}>
              <span className="fga-hero-trust-dot" /> {t('pages:freeGrowthAudit.hero.trustText')}
              <span aria-hidden="true">·</span>
              <span className="fga-hero-trust-stars">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 17.27l5.18 3.04-1.37-5.88L20 9.75l-6.01-.51L12 4 9.99 9.24 4 9.75l4.19 4.68-1.37 5.88z" />
                </svg>
                <strong>{t('pages:freeGrowthAudit.hero.trustStarsRating')}</strong>{' '}
                {t('pages:freeGrowthAudit.hero.trustStarsSuffix')}
              </span>
            </div>
          </div>

          <ReportPreview />
        </div>
      </div>
    </section>
  );
};

export default Hero;
