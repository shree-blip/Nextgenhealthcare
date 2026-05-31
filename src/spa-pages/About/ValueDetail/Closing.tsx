import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionButton } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import type { ValueEntry } from '@/content/about/values.data';

const Closing = ({ entry }: { entry: ValueEntry }) => {
  const { t } = useTranslation('about');

  return (
    <section className="ow-close" aria-labelledby="ab-value-close-title">
      <div className="container-shell">
        <div className="ow-close-card ow-detail-close-card">
          <div className="ow-close-body">
            <span className="ow-pill">
              <span className="ow-pill-dot" /> {t('valueDetail.closing.pill')}
            </span>
            <h2 id="ab-value-close-title" className="ow-close-h">
              {t('valueDetail.closing.titleLine1')}
              <br />
              {t('valueDetail.closing.titleLine2Start')} <em>{t('valueDetail.closing.titleLine2Em')}</em>
              {t('valueDetail.closing.titleLine2End')}
            </h2>
            <p className="ow-close-p">{t('valueDetail.closing.body')}</p>
            <div className="ow-close-cta">
              <MotionButton to="/free-growth-audit" className="ow-cta-primary ow-cta-primary--light">
                {t('valueDetail.closing.primary')}
                <ArrowIcon />
              </MotionButton>
              <Link to="/about" className="ow-cta-link ow-cta-link--light">
                {t('valueDetail.closing.secondary')}
              </Link>
            </div>
          </div>
          <div className="ow-detail-close-metric" aria-hidden="true">
            <strong>{entry.proof.v}</strong>
            <span>{entry.proof.l}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
