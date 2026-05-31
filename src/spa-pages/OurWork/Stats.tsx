import { useTranslation } from 'react-i18next';
import { STATS } from './data';

const Stats = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ow-stats" aria-label={t('ourWork.stats.ariaLabel')}>
      <div className="container-shell">
        <div className="ow-stats-grid">
          {STATS.map((s, i) => (
            <div key={s.l} className="ow-stat">
              <span className="ow-stat-mono">0{i + 1}</span>
              <div className="ow-stat-v">{s.v}</div>
              <div className="ow-stat-l">{t(`ourWork.stats.items.${i}`, s.l)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
