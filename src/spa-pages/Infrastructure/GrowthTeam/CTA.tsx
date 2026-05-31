import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import collabImg from '@/assets/nextgen-image/Ouradvantageimg1.png';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="gtx-cta">
      <div className="gt-shell">
        <div className="gtx-cta-card">
          <div className="gtx-cta-card-img">
            <img src={collabImg} alt="" loading="lazy" decoding="async" />
            <div className="gtx-cta-card-img-tag" aria-hidden="true">
              <span className="dot" /> {t('pages:infrastructure.growthTeam.cta.tag')}
            </div>
          </div>
          <div className="gtx-cta-card-body">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:infrastructure.growthTeam.cta.eyebrow')}
            </span>
            <h2 className="gtx-cta-h">
              {t('pages:infrastructure.growthTeam.cta.title')}{' '}
              <em>{t('pages:infrastructure.growthTeam.cta.titleEm')}</em>
            </h2>
            <p>{t('pages:infrastructure.growthTeam.cta.text')}</p>
            <Link to="/contact" className="gtx-btn-primary">
              {t('pages:infrastructure.growthTeam.cta.button')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
