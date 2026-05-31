import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Foot = () => {
  const { t } = useTranslation(['pages']);
  return (
    <div className="ph1-foot">
      <span className="ph1-foot-side">{t('pages:phases.phase1.foot.end')}</span>
      <Link to="/methodology/phase-2" className="ph1-next">
        <span className="ph1-next-label">{t('pages:phases.phase1.foot.nextLabel')}</span>
        <span className="ph1-next-title">{t('pages:phases.phase1.foot.nextTitle')}</span>
      </Link>
    </div>
  );
};

export default Foot;
