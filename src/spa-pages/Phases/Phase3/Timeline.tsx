import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph3-timeline" aria-labelledby="ph3-timeline-title">
      <h2 id="ph3-timeline-title">{t('pages:phases.phase3.timeline.title')}</h2>
      <div className="ph3-tline">
        <div className="ph3-tcell">
          <div className="node" aria-hidden="true">
            <span className="step">01</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2 L4 14 H12 L11 22 L20 10 H12 Z" />
            </svg>
          </div>
          <div className="d">{t('pages:phases.phase3.timeline.cells.switchOn.day')}</div>
          <div className="t">{t('pages:phases.phase3.timeline.cells.switchOn.title')}</div>
          <p className="x">{t('pages:phases.phase3.timeline.cells.switchOn.text')}</p>
        </div>
        <div className="ph3-tcell">
          <div className="node" aria-hidden="true">
            <span className="step">02</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M7 14l4-4 4 3 5-6" />
            </svg>
          </div>
          <div className="d">{t('pages:phases.phase3.timeline.cells.firstRead.day')}</div>
          <div className="t">{t('pages:phases.phase3.timeline.cells.firstRead.title')}</div>
          <p className="x">{t('pages:phases.phase3.timeline.cells.firstRead.text')}</p>
        </div>
        <div className="ph3-tcell">
          <div className="node" aria-hidden="true">
            <span className="step">03</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          </div>
          <div className="d">{t('pages:phases.phase3.timeline.cells.bendCurve.day')}</div>
          <div className="t">{t('pages:phases.phase3.timeline.cells.bendCurve.title')}</div>
          <p className="x">{t('pages:phases.phase3.timeline.cells.bendCurve.text')}</p>
        </div>
        <div className="ph3-tcell">
          <div className="node" aria-hidden="true">
            <span className="step">04</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div className="d">{t('pages:phases.phase3.timeline.cells.handoff.day')}</div>
          <div className="t">{t('pages:phases.phase3.timeline.cells.handoff.title')}</div>
          <p className="x">{t('pages:phases.phase3.timeline.cells.handoff.text')}</p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
