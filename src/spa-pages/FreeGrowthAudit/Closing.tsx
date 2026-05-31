import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionButton } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="fga-close" aria-labelledby="fga-close-title">
      <div className="container-shell">
        <div className="fga-close-card">
          <div className="fga-close-tag">
            <span className="fga-pill-dot" /> {t('pages:freeGrowthAudit.closing.tag')}
          </div>
          <h2 id="fga-close-title" className="fga-close-h">
            {t('pages:freeGrowthAudit.closing.title')}
            <br />
            {t('pages:freeGrowthAudit.closing.titleLine2')}
          </h2>
          <p className="fga-close-p">{t('pages:freeGrowthAudit.closing.body')}</p>

          <MotionButton to="#audit-form" className="fga-close-cta">
            {t('pages:freeGrowthAudit.closing.ctaPrimary')}
            <ArrowIcon size={18} />
          </MotionButton>

          <div className="fga-close-trust">
            <span>{t('pages:freeGrowthAudit.closing.trustText')}</span>
            <span aria-hidden="true">·</span>
            <Link to="/case-studies">{t('pages:freeGrowthAudit.closing.trustLink')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
