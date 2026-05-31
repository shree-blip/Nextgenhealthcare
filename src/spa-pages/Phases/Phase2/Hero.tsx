import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation(['pages']);
  return (
    <>
      <Link to="/about#methodology" className="ph2-crumb">
        {t('pages:phases.phase2.hero.back')}
      </Link>

      <section className="ph2-hero">
        <div className="ph2-rail">
          <span className="ph2-rail-vert">{t('pages:phases.phase2.hero.railVert')}</span>
          <span className="ph2-rail-num">{t('pages:phases.phase2.hero.railNum')}</span>
        </div>
        <div className="ph2-hero-content">
          <span className="ph2-eyebrow">{t('pages:phases.phase2.hero.eyebrow')}</span>
          <h1
            className="ph2-h1"
            dangerouslySetInnerHTML={{ __html: t('pages:phases.phase2.hero.title') }}
          />
          <p className="ph2-lede">{t('pages:phases.phase2.hero.lede')}</p>
          <div className="ph2-stat">
            <div className="ph2-stat-big">{t('pages:phases.phase2.hero.statBig')}</div>
            <div className="ph2-stat-cap">{t('pages:phases.phase2.hero.statCap')}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
