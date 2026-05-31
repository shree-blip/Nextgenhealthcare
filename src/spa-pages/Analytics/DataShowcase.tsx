interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  {
    num: '100',
    unit: '%',
    label: 'Channel attribution',
    sub: 'Every spend dollar tied to an outcome',
  },
  {
    num: '−85',
    unit: '%',
    label: 'Reporting time saved',
    sub: 'From 6h of screenshots to one shared link',
  },
  {
    num: '$12',
    unit: 'M+',
    label: 'Healthcare revenue tracked',
    sub: 'Across 90+ multi-location engagements',
  },
  {
    num: '47',
    unit: '+',
    label: 'Live dashboards deployed',
    sub: 'Custom per engagement · no templates',
  },
];

const KPIS = [
  'Booked patients',
  'Attributed revenue',
  'Blended CPA',
  'Channel ROAS',
  'Cost per lead',
  'Lead-to-patient %',
  'Show-rate %',
  'No-show cost',
  'LTV per channel',
  'Pipeline velocity',
  'Anomaly alerts',
  'Forecast vs. actual',
];

const DataShowcase = () => {
  return (
    <section className="sl-section an-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve KPIs. <em>One screen the practice owner reads weekly.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Live dashboard
            <br />
            from week 4
          </div>
        </div>

        <div className="an-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="an-data-card">
              <div className="an-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="an-data-lbl">{s.label}</div>
              <p className="an-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="an-data-signals">
          <div className="an-data-signals-head">
            <span className="an-data-signals-eyebrow">12 KPIs on the executive dashboard</span>
          </div>
          <div className="an-data-signals-grid">
            {KPIS.map((s, i) => (
              <span key={s} className="an-data-signal">
                <span className="an-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataShowcase;
