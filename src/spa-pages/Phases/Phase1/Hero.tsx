import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation(['pages']);
  return (
    <>
      <Link to="/about#methodology" className="ph1-crumb">
        <span aria-hidden="true">←</span> {t('pages:phases.phase1.hero.back')}
      </Link>

      <div className="ph1-meta-row">
        <span>{t('pages:phases.phase1.hero.meta.phase')}</span>
        <span>{t('pages:phases.phase1.hero.meta.name')}</span>
        <span>{t('pages:phases.phase1.hero.meta.week')}</span>
        <span>{t('pages:phases.phase1.hero.meta.deliverable')}</span>
      </div>

      <section className="ph1-hero">
        <div>
          <h2 className="ph1-bignum">
            0<em>1</em>
          </h2>
        </div>
        <div>
          <h1 className="ph1-h1">{t('pages:phases.phase1.hero.title')}</h1>
          <p className="ph1-lede">{t('pages:phases.phase1.hero.lede')}</p>
          <div className="ph1-tags">
            <span className="ph1-tag">{t('pages:phases.phase1.hero.tags.technicalSeo')}</span>
            <span className="ph1-tag">{t('pages:phases.phase1.hero.tags.localSearch')}</span>
            <span className="ph1-tag">{t('pages:phases.phase1.hero.tags.paidMedia')}</span>
            <span className="ph1-tag">{t('pages:phases.phase1.hero.tags.cro')}</span>
            <span className="ph1-tag">{t('pages:phases.phase1.hero.tags.frontDesk')}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
