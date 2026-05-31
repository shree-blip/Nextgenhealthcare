import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Parallax, MotionButton } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import { IMG } from './data';

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ow-close" aria-labelledby="ow-close-title">
      <div className="container-shell">
        <div className="ow-close-card">
          <Parallax as="div" speed={0.05} className="ow-close-img" aria-hidden="true">
            <img src={IMG.studio} alt="" loading="lazy" />
            <div className="ow-close-shade" />
          </Parallax>
          <div className="ow-close-body">
            <span className="ow-pill">
              <span className="ow-pill-dot" /> {t('ourWork.closing.pill')}
            </span>
            <h2 id="ow-close-title" className="ow-close-h">
              {t('ourWork.closing.titleStart')}
              <em>{t('ourWork.closing.titleEm')}</em>
              {t('ourWork.closing.titleEnd')}
            </h2>
            <p className="ow-close-p">{t('ourWork.closing.p')}</p>
            <div className="ow-close-cta">
              <MotionButton to="/free-growth-audit" className="ow-cta-primary ow-cta-primary--light">
                {t('ourWork.closing.ctaPrimary')}
                <ArrowIcon />
              </MotionButton>
              <Link to="/case-studies" className="ow-cta-link ow-cta-link--light">
                {t('ourWork.closing.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
