import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph1-tl">
      <div className="ph1-tl-head">
        <span className="lbl">{t('pages:phases.phase1.timeline.label')}</span>
        <h2>{t('pages:phases.phase1.timeline.title')}</h2>
      </div>
      <div className="ph1-tl-grid">
        <div className="ph1-tl-cell active">
          <div className="day">{t('pages:phases.phase1.timeline.cells.intake.day')}</div>
          <div
            className="ttl"
            dangerouslySetInnerHTML={{ __html: t('pages:phases.phase1.timeline.cells.intake.title') }}
          />
          <p className="txt">{t('pages:phases.phase1.timeline.cells.intake.text')}</p>
        </div>
        <div className="ph1-tl-cell">
          <div className="day">{t('pages:phases.phase1.timeline.cells.crawl.day')}</div>
          <div
            className="ttl"
            dangerouslySetInnerHTML={{ __html: t('pages:phases.phase1.timeline.cells.crawl.title') }}
          />
          <p className="txt">{t('pages:phases.phase1.timeline.cells.crawl.text')}</p>
        </div>
        <div className="ph1-tl-cell">
          <div className="day">{t('pages:phases.phase1.timeline.cells.funnel.day')}</div>
          <div className="ttl">{t('pages:phases.phase1.timeline.cells.funnel.title')}</div>
          <p className="txt">{t('pages:phases.phase1.timeline.cells.funnel.text')}</p>
        </div>
        <div className="ph1-tl-cell">
          <div className="day">{t('pages:phases.phase1.timeline.cells.readout.day')}</div>
          <div
            className="ttl"
            dangerouslySetInnerHTML={{ __html: t('pages:phases.phase1.timeline.cells.readout.title') }}
          />
          <p className="txt">{t('pages:phases.phase1.timeline.cells.readout.text')}</p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
