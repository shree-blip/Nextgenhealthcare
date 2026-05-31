import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import aboutImg1 from '../../assets/nextgen-image/Abooutimg1.png';
import aboutImg2 from '../../assets/nextgen-image/Aboutimg2.png';
import aboutImg3 from '../../assets/nextgen-image/Aboutimg3.png';
import { ArrowIcon } from '@/components/icons';

const LeafIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 20c8 0 16-6 16-16-8 0-16 6-16 16Z" />
    <path d="M4 20c4-6 8-10 14-12" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const TargetIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </svg>
);

const AboutUs = () => {
  const { t } = useTranslation('home');

  return (
    <section className="ah-section" id="about-us" aria-labelledby="ah-title">
      <div className="container-shell">
        <span className="ah-eyebrow">{t('aboutUs.eyebrow')}</span>

        {/* ROW 1 - Title left, trust meta above paragraph on right */}
        <div className="ah-intro">
          <div className="ah-intro-left">
            <h2 id="ah-title" className="ah-title">
              {t('aboutUs.title')}
            </h2>
          </div>
          <div className="ah-intro-right">
            <div className="ah-intro-meta">
              <div className="ah-avatars" aria-hidden="true">
                <span className="ah-avatar" />
                <span className="ah-avatar" />
                <span className="ah-avatar" />
              </div>
              <div className="ah-intro-stat">
                <span className="ah-intro-stat-num">{t('aboutUs.partnerStat.value')}</span>
                <span className="ah-intro-stat-lbl">{t('aboutUs.partnerStat.label')}</span>
              </div>
            </div>
            <p className="ah-intro-text">{t('aboutUs.introText')}</p>
          </div>
        </div>

        {/* ROW 2 - Gallery with feature card and floating overlays */}
        <div className="ah-gallery">
          <div className="ah-gallery-left">
            <div className="ah-img ah-img-secondary">
              <img src={aboutImg1} alt="" width={1672} height={941} loading="lazy" decoding="async" />
            </div>
            <article className="ah-feature">
              <span className="ah-feature-icon" aria-hidden="true">
                <LeafIcon />
              </span>
              <h3 className="ah-feature-title">{t('aboutUs.feature.title')}</h3>
              <p className="ah-feature-desc">{t('aboutUs.feature.desc')}</p>
              <Link
                to="/healthcare-growth-engine"
                className="ah-feature-arrow"
                aria-label={t('aboutUs.feature.ariaLabel')}
              >
                <ArrowIcon size={14} strokeWidth={2} />
              </Link>
            </article>
          </div>

          <div className="ah-gallery-right">
            <div className="ah-img ah-img-hero">
              <img src={aboutImg2} alt="" width={1448} height={1086} loading="lazy" decoding="async" />
              <div className="ah-float-stat" aria-hidden="false">
                <span className="ah-float-stat-num">{t('aboutUs.floatStat.value')}</span>
                <span className="ah-float-stat-lbl">{t('aboutUs.floatStat.label')}</span>
              </div>
              <Link to="/about" className="ah-float-link">
                {t('aboutUs.learnMore')}
                <span className="ah-float-link-ico" aria-hidden="true">
                  <ArrowIcon size={14} strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 3 - Collaboration block */}
        <div className="ah-collab">
          <div className="ah-collab-left">
            <h3 className="ah-collab-title">{t('aboutUs.collab.title')}</h3>
            <p className="ah-collab-text">{t('aboutUs.collab.text')}</p>
            <div className="ah-pillars">
              <article className="ah-pillar">
                <span className="ah-pillar-icon" aria-hidden="true">
                  <ShieldIcon />
                </span>
                <div className="ah-pillar-body">
                  <h4 className="ah-pillar-title">{t('aboutUs.collab.pillars.strategy.title')}</h4>
                  <p className="ah-pillar-desc">{t('aboutUs.collab.pillars.strategy.desc')}</p>
                </div>
              </article>
              <article className="ah-pillar">
                <span className="ah-pillar-icon" aria-hidden="true">
                  <TargetIcon />
                </span>
                <div className="ah-pillar-body">
                  <h4 className="ah-pillar-title">{t('aboutUs.collab.pillars.revenue.title')}</h4>
                  <p className="ah-pillar-desc">{t('aboutUs.collab.pillars.revenue.desc')}</p>
                </div>
              </article>
            </div>
          </div>

          <div className="ah-collab-right">
            <div className="ah-img ah-img-hero">
              <img src={aboutImg3} alt="" width={1254} height={1254} loading="lazy" decoding="async" />
              <div className="ah-float-quote">
                <h4 className="ah-float-quote-title">{t('aboutUs.collab.quote.title')}</h4>
                <p className="ah-float-quote-text">{t('aboutUs.collab.quote.text')}</p>
              </div>
              <Link to="/about" className="ah-cta">
                {t('aboutUs.collab.cta')}
                <span className="ah-cta-ico" aria-hidden="true">
                  <ArrowIcon size={14} strokeWidth={2} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
