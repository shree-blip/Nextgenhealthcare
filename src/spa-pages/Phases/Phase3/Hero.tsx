import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation(['pages']);
  return (
    <>
      <Link to="/about#methodology" className="ph3-crumb">
        {t('pages:phases.phase3.hero.back')}
      </Link>

      <header className="ph3-masthead">
        <span className="a">{t('pages:phases.phase3.hero.masthead.a')}</span>
        <span className="b">{t('pages:phases.phase3.hero.masthead.b')}</span>
        <span className="c">{t('pages:phases.phase3.hero.masthead.c')}</span>
        <span className="d">{t('pages:phases.phase3.hero.masthead.d')}</span>
      </header>

      <h1
        className="ph3-display"
        dangerouslySetInnerHTML={{ __html: t('pages:phases.phase3.hero.display') }}
      />
    </>
  );
};

export default Hero;
