import { useTranslation } from 'react-i18next';

const Body = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph3-body">
      <aside className="ph3-body-aside" aria-label={t('pages:phases.phase3.body.aside.asideLabel')}>
        <div className="pair">
          <span className="k">{t('pages:phases.phase3.body.aside.duration.k')}</span>
          <span className="v">{t('pages:phases.phase3.body.aside.duration.v')}</span>
        </div>
        <div className="pair">
          <span className="k">{t('pages:phases.phase3.body.aside.surface.k')}</span>
          <span className="v">{t('pages:phases.phase3.body.aside.surface.v')}</span>
        </div>
        <div className="pair">
          <span className="k">{t('pages:phases.phase3.body.aside.cadence.k')}</span>
          <span className="v">{t('pages:phases.phase3.body.aside.cadence.v')}</span>
        </div>
        <div className="pair">
          <span className="k">{t('pages:phases.phase3.body.aside.signal.k')}</span>
          <span className="v">{t('pages:phases.phase3.body.aside.signal.v')}</span>
        </div>
      </aside>

      <div className="ph3-body-main">
        <p>{t('pages:phases.phase3.body.p1')}</p>
        <p>{t('pages:phases.phase3.body.p2')}</p>
        <p>{t('pages:phases.phase3.body.p3')}</p>
        <p>{t('pages:phases.phase3.body.p4')}</p>
      </div>
    </section>
  );
};

export default Body;
