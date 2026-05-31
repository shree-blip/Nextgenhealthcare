import { useTranslation } from 'react-i18next';

interface Result {
  metric: string;
  metricLabel: string;
  context: string;
  practice: string;
}

const Outcomes = () => {
  const { t } = useTranslation('pages');
  const results = t('pages:freeGrowthAudit.outcomes.items', { returnObjects: true }) as Result[];
  return (
    <section className="fga-outcomes" aria-labelledby="fga-outcomes-title">
      <div className="container-shell">
        <header className="fga-section-head fga-outcomes-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.outcomes.tag')}</span>
          <h2 id="fga-outcomes-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.outcomes.title')}
          </h2>
          <p className="fga-outcomes-lede">{t('pages:freeGrowthAudit.outcomes.lede')}</p>
        </header>

        <div className="fga-outcomes-grid">
          {results.map((r) => (
            <article key={r.practice} className="fga-outcome-card">
              <div className="fga-outcome-metric">{r.metric}</div>
              <div className="fga-outcome-metric-lbl">{r.metricLabel}</div>
              <p className="fga-outcome-context">{r.context}</p>
              <div className="fga-outcome-practice">
                <span className="fga-outcome-dot" aria-hidden="true" />
                {r.practice}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
