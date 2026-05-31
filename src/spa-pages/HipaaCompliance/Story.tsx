import { useTranslation } from 'react-i18next';
import storyBannerImg from '../../assets/nextgen-image/Ourstoryimg.png';
import story1 from '../../assets/nextgen-image/Hippacomplianceimg.png';
import story2 from '../../assets/nextgen-image/Complianceimg.png';
import story3 from '../../assets/nextgen-image/Clinicalimg1.png';
import story4 from '../../assets/nextgen-image/Patientverificationimg.png';
import story5 from '../../assets/nextgen-image/Helathcareimg.png';
import story6 from '../../assets/nextgen-image/Medicalautomationimg.png';

const Story = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hcp-story">
      <div className="hcp-story-banner">
        <img src={storyBannerImg} alt="" loading="lazy" decoding="async" />
        <div className="hcp-story-banner-overlay" aria-hidden="true">
          <span className="hcp-story-banner-eyebrow">
            {t('pages:hipaaCompliance.story.bannerEyebrow')}
          </span>
          <h2 className="hcp-story-banner-title">
            {t('pages:hipaaCompliance.story.bannerTitleLine1')}{' '}
            <em>{t('pages:hipaaCompliance.story.bannerTitleAccent')}</em>
          </h2>
        </div>
      </div>

      <div className="gt-shell">
        {/* Intro paragraph + collage */}
        <div className="hcp-story-grid">
          <div className="hcp-story-intro">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:hipaaCompliance.story.introEyebrow')}
            </span>
            <p className="hcp-story-lede">{t('pages:hipaaCompliance.story.introLede')}</p>
            <p className="hcp-story-sub">{t('pages:hipaaCompliance.story.introSub')}</p>
          </div>

          <div className="hcp-story-collage" aria-hidden="true">
            <div className="hcp-story-tile tile-1">
              <img src={story1} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="hcp-story-tile tile-2">
              <img src={story2} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="hcp-story-tile tile-3">
              <img src={story3} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="hcp-story-tile tile-4">
              <img src={story4} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="hcp-story-tile tile-5">
              <img src={story5} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="hcp-story-tile tile-6">
              <img src={story6} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>

        {/* What We Offer block */}
        <div className="hcp-story-offer">
          <div className="hcp-story-offer-left">
            <span className="hcp-story-offer-eyebrow">
              {t('pages:hipaaCompliance.story.offerEyebrow')}
            </span>
            <h3 className="hcp-story-offer-title">
              {t('pages:hipaaCompliance.story.offerTitleLine1')}{' '}
              <em>{t('pages:hipaaCompliance.story.offerTitleAccent')}</em>
            </h3>
          </div>
          <div className="hcp-story-offer-right">
            <p className="hcp-story-offer-lede">{t('pages:hipaaCompliance.story.offerLede')}</p>
            <p className="hcp-story-offer-body">{t('pages:hipaaCompliance.story.offerBody')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
