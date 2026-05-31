interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { num: '$24', unit: 'M', label: 'Ad spend managed', sub: 'Across 180+ healthcare accounts since 2019' },
  { num: '4.2', unit: '×', label: 'Avg client ROAS', sub: 'Trailing 12-month, weighted by spend' },
  { num: '−42', unit: '%', label: 'Avg CPA reduction', sub: 'First 90 days of taking over an existing account' },
  { num: '92', unit: '%', label: 'Client retention', sub: 'Month-to-month after 90-day ramp' },
];

const LEVERS = [
  'Account architecture',
  'Conversion tracking',
  'Smart bidding strategy',
  'Negative keyword sweep',
  'Search query mining',
  'Ad-extension coverage',
  'Quality Score management',
  'Audience layering',
  'Landing-page alignment',
  'Geo + device bid mods',
  'Day-parting',
  'Branded protection',
];

const DataShowcase = () => {
  return (
    <section className="sl-section ga-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve levers. <em>Tuned every week.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Live ROAS dashboard
            <br />
            from day 7
          </div>
        </div>

        <div className="ga-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="ga-data-card">
              <div className="ga-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="ga-data-lbl">{s.label}</div>
              <p className="ga-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="ga-data-signals">
          <div className="ga-data-signals-head">
            <span className="ga-data-signals-eyebrow">12 levers we tune every week</span>
          </div>
          <div className="ga-data-signals-grid">
            {LEVERS.map((s, i) => (
              <span key={s} className="ga-data-signal">
                <span className="ga-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
