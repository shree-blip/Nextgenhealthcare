import { useTranslation } from 'react-i18next';
import { IconDoc, IconFunnel, IconList, IconChart } from './helpers';

const Deliverables = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph1-deliv">
      <div className="ph1-deliv-head">
        <span className="lbl">{t('pages:phases.phase1.deliverables.label')}</span>
        <h2>{t('pages:phases.phase1.deliverables.title')}</h2>
      </div>
      <div className="ph1-deliv-grid">
        <div className="ph1-deliv-item">
          <IconDoc className="ic" />
          <h4>{t('pages:phases.phase1.deliverables.items.scorecard.title')}</h4>
          <p>{t('pages:phases.phase1.deliverables.items.scorecard.text')}</p>
        </div>
        <div className="ph1-deliv-item">
          <IconFunnel className="ic" />
          <h4>{t('pages:phases.phase1.deliverables.items.funnel.title')}</h4>
          <p>{t('pages:phases.phase1.deliverables.items.funnel.text')}</p>
        </div>
        <div className="ph1-deliv-item">
          <IconList className="ic" />
          <h4>{t('pages:phases.phase1.deliverables.items.fixList.title')}</h4>
          <p>{t('pages:phases.phase1.deliverables.items.fixList.text')}</p>
        </div>
        <div className="ph1-deliv-item">
          <IconChart className="ic" />
          <h4>{t('pages:phases.phase1.deliverables.items.competitor.title')}</h4>
          <p>{t('pages:phases.phase1.deliverables.items.competitor.text')}</p>
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
