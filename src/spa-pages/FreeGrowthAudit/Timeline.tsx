import { useTranslation } from 'react-i18next';

interface DayItem {
  d: string;
  t: string;
  n: string;
}

const Timeline = () => {
  const { t } = useTranslation('pages');
  const days = t('pages:freeGrowthAudit.timeline.days', { returnObjects: true }) as DayItem[];
  return (
    <section className="fga-timeline-section" aria-labelledby="fga-timeline-title">
      <div className="container-shell">
        <header className="fga-section-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.timeline.tag')}</span>
          <h2 id="fga-timeline-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.timeline.title')}
          </h2>
        </header>

        <ol className="fga-timeline" aria-label={t('pages:freeGrowthAudit.timeline.aria')}>
          {days.map((step, i) => (
            <li key={step.d} className={`fga-tl-item${i === days.length - 1 ? ' is-last' : ''}`}>
              <div className="fga-tl-marker" aria-hidden="true">
                <span className="fga-tl-dot" />
              </div>
              <div className="fga-tl-content">
                <div className="fga-tl-day">{step.d}</div>
                <div className="fga-tl-title">{step.t}</div>
                <p className="fga-tl-note">{step.n}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Timeline;
