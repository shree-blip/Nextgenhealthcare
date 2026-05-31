import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface StatItem {
  num: string;
  suffix?: string;
  label: string;
  desc: string;
  chip: string;
}

const TONES = ['gold', 'sage', 'brown', 'gold2'] as const;

const ICONS: ReactNode[] = [
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <circle cx="8" cy="14.5" r="1" fill="currentColor" />
    <circle cx="12" cy="14.5" r="1" fill="currentColor" />
    <circle cx="16" cy="14.5" r="1" fill="currentColor" />
    <circle cx="8" cy="18" r="1" fill="currentColor" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
  </svg>,
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2.2" />
    <path d="M3.5 6.5L6 4.5M20.5 6.5L18 4.5" />
  </svg>,
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4M9 9h2" />
  </svg>,
];

const StatsRail = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:freeGrowthAudit.stats.items', { returnObjects: true }) as StatItem[];
  return (
    <section className="fga-stats" aria-labelledby="fga-stats-title">
      <div className="container-shell">
        <header className="fga-section-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.stats.tag')}</span>
          <h2 id="fga-stats-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.stats.title')}
          </h2>
        </header>
        <div className="fga-stats-grid">
          {items.map((s, i) => (
            <article key={s.label} className={`fga-stat-card tone-${TONES[i] ?? 'gold'}`}>
              <div className="fga-stat-icon" aria-hidden="true">
                {ICONS[i]}
              </div>
              <div className="fga-stat-num">
                {s.num}
                {s.suffix && <span className="fga-stat-suffix">{s.suffix}</span>}
              </div>
              <div className="fga-stat-label">{s.label}</div>
              <p className="fga-stat-desc">{s.desc}</p>
              <span className="fga-stat-chip">
                <span className="fga-stat-chip-dot" aria-hidden="true" />
                {s.chip}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRail;
