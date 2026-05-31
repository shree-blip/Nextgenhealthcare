import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Strip = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph2-strip">
      <div className="ph2-strip-wrap">
        <span className="ph2-strip-lbl">{t('pages:phases.phase2.strip.label')}</span>
        <p className="ph2-strip-q">{t('pages:phases.phase2.strip.quote')}</p>
        <Link to="/methodology/phase-3" className="ph2-strip-next">
          <span className="l">{t('pages:phases.phase2.strip.nextLabel')}</span>
          <span className="t">{t('pages:phases.phase2.strip.nextTitle')}</span>
        </Link>
      </div>
    </section>
  );
};

export default Strip;
