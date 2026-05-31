import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ctaImg from '../../assets/nextgen-image/Bookimg.png';
import { ArrowIcon } from '@/components/icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="gtx-cta">
      <div className="gt-shell">
        <div className="gtx-cta-card">
          <div className="gtx-cta-card-img">
            <img src={ctaImg} alt="" loading="lazy" decoding="async" />
            <div className="gtx-cta-card-img-tag" aria-hidden="true">
              <span className="dot" /> {t('pages:hipaaCompliance.cta.tag')}
            </div>
          </div>
          <div className="gtx-cta-card-body">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:hipaaCompliance.cta.eyebrow')}
            </span>
            <h2 className="gtx-cta-h">
              {t('pages:hipaaCompliance.cta.titleLine1')}{' '}
              <em>{t('pages:hipaaCompliance.cta.titleAccent')}</em>
            </h2>
            <p>{t('pages:hipaaCompliance.cta.body')}</p>
            <Link to="/contact" className="gtx-btn-primary">
              {t('pages:hipaaCompliance.cta.ctaPrimary')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
