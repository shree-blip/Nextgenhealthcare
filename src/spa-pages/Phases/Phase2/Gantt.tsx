import { useTranslation } from 'react-i18next';

interface GanttBarProps {
  kind: 'strategy' | 'build';
  start: number;
  end: number;
  label: string;
}
const GanttBar = ({ kind, start, end, label }: GanttBarProps) => {
  const pctLeft = ((start - 1) / 14) * 100;
  const pctWidth = ((end - start + 1) / 14) * 100;
  return (
    <div
      className={`ph2-gantt-bar ${kind}`}
      style={{
        marginLeft: `${pctLeft}%`,
        width: `${pctWidth}%`,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: label }} />
      <span className="d-meta">
        D{String(start).padStart(2, '0')}–{String(end).padStart(2, '0')}
      </span>
    </div>
  );
};

const Gantt = () => {
  const { t } = useTranslation(['pages']);
  const trackA = t('pages:phases.phase2.gantt.trackA', { returnObjects: true }) as {
    name: string;
    label: string;
    bars: Record<string, string>;
  };
  const trackB = t('pages:phases.phase2.gantt.trackB', { returnObjects: true }) as {
    name: string;
    label: string;
    bars: Record<string, string>;
  };
  return (
    <section className="ph2-gantt" aria-labelledby="ph2-gantt-title">
      <div className="ph2-gantt-head">
        <span className="lbl">{t('pages:phases.phase2.gantt.label')}</span>
        <h2 id="ph2-gantt-title">{t('pages:phases.phase2.gantt.title')}</h2>
        <div className="leg">
          <span>
            <i className="strategy" />
            {t('pages:phases.phase2.gantt.legend.strategy')}
          </span>
          <span>
            <i className="build" />
            {t('pages:phases.phase2.gantt.legend.build')}
          </span>
        </div>
      </div>

      <div className="ph2-gantt-board">
        <div className="ph2-gantt-days">
          <span className="d-lbl">{t('pages:phases.phase2.gantt.dayHeader')}</span>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`d${i === 7 ? ' week-break' : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>

        <div className="ph2-gantt-track">
          <div className="track-name">
            {trackA.name}
            <em>{trackA.label}</em>
          </div>
          <div className="ph2-gantt-bars">
            <GanttBar kind="strategy" start={1} end={4} label={trackA.bars.keyword} />
            <GanttBar kind="strategy" start={3} end={8} label={trackA.bars.positioning} />
            <GanttBar kind="strategy" start={6} end={12} label={trackA.bars.journey} />
            <GanttBar kind="strategy" start={9} end={14} label={trackA.bars.editorial} />
          </div>
        </div>

        <div className="ph2-gantt-track">
          <div className="track-name">
            {trackB.name}
            <em>{trackB.label}</em>
          </div>
          <div className="ph2-gantt-bars">
            <GanttBar kind="build" start={2} end={6} label={trackB.bars.tracking} />
            <GanttBar kind="build" start={4} end={9} label={trackB.bars.intake} />
            <GanttBar kind="build" start={6} end={11} label={trackB.bars.chatbot} />
            <GanttBar kind="build" start={10} end={14} label={trackB.bars.dashboard} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gantt;
