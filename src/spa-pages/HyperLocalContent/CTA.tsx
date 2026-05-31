import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ctaImg from '../../assets/nextgen-image/Visibiltyscoreimg.png';
import { ArrowIcon } from '@/components/icons';
import { PinIcon, CompassIcon } from './icons';

const CTA = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hlc-cta">
      <div className="hlc-shell">
        <div className="hlc-cta-card">
          <div className="hlc-cta-card-img">
            <img src={ctaImg} alt="" loading="lazy" decoding="async" />
            <span className="hlc-cta-card-tag" aria-hidden="true">
              <PinIcon size={12} />
              {t('pages:hyperLocalContent.cta.tag')}
            </span>
          </div>
          <div className="hlc-cta-card-body">
            <span className="hlc-eyebrow">
              <CompassIcon size={12} />
              {t('pages:hyperLocalContent.cta.eyebrow')}
            </span>
            <h2 className="hlc-cta-title">
              {t('pages:hyperLocalContent.cta.titleLine1')}{' '}
              <em>{t('pages:hyperLocalContent.cta.titleAccent')}</em>
            </h2>
            <p className="hlc-cta-text">{t('pages:hyperLocalContent.cta.text')}</p>
            <div className="hlc-cta-ctas">
              <Link to="/contact" className="hlc-btn-primary">
                {t('pages:hyperLocalContent.cta.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services/seo" className="hlc-btn-link">
                {t('pages:hyperLocalContent.cta.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
