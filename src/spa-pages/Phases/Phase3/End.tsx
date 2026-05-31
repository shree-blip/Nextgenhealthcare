import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const End = () => {
  const { t } = useTranslation(['pages']);
  return (
    <footer className="ph3-end">
      <div className="a">{t('pages:phases.phase3.end.a')}</div>
      <Link to="/contact" className="b">
        <span className="l">{t('pages:phases.phase3.end.l')}</span>
        <span className="t">{t('pages:phases.phase3.end.t')}</span>
      </Link>
    </footer>
  );
};

export default End;
