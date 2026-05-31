import { useTranslation } from 'react-i18next';

interface Row {
  label: string;
  us: string;
  them: string;
}

const Compare = () => {
  const { t } = useTranslation('pages');
  const rows = t('pages:freeGrowthAudit.compare.rows', { returnObjects: true }) as Row[];
  return (
    <section className="fga-compare" aria-labelledby="fga-compare-title">
      <div className="container-shell">
        <header className="fga-section-head fga-compare-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.compare.tag')}</span>
          <h2 id="fga-compare-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.compare.title')}
          </h2>
          <p className="fga-compare-lede">{t('pages:freeGrowthAudit.compare.lede')}</p>
        </header>

        <div
          className="fga-compare-grid"
          role="table"
          aria-label={t('pages:freeGrowthAudit.compare.aria')}
        >
          <div className="fga-compare-row fga-compare-head-row" role="row">
            <div role="columnheader" aria-hidden="true" />
            <div role="columnheader" className="fga-compare-col fga-compare-col-us">
              <span className="fga-compare-badge">{t('pages:freeGrowthAudit.compare.usBadge')}</span>
            </div>
            <div role="columnheader" className="fga-compare-col fga-compare-col-them">
              <span className="fga-compare-badge fga-compare-badge-muted">
                {t('pages:freeGrowthAudit.compare.themBadge')}
              </span>
            </div>
          </div>
          {rows.map((r) => (
            <div key={r.label} className="fga-compare-row" role="row">
              <div role="rowheader" className="fga-compare-label">
                {r.label}
              </div>
              <div role="cell" className="fga-compare-cell fga-compare-cell-us">
                <span className="fga-compare-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span>{r.us}</span>
              </div>
              <div role="cell" className="fga-compare-cell fga-compare-cell-them">
                <span className="fga-compare-icon fga-compare-icon-x" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <span>{r.them}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Compare;
