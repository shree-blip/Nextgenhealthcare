interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  {
    num: '#1',
    label: 'Avg map-pack position',
    sub: 'Across primary keyword set · 110+ healthcare locations',
  },
  { num: '218', unit: '%', label: 'Direction-request lift', sub: 'First 90 days of optimization' },
  { num: '340', unit: '%', label: 'Profile-view lift', sub: 'Trailing 6-month avg across cohort' },
  {
    num: '18',
    unit: '+',
    label: 'Reviews / month / location',
    sub: 'Steady-state after request automation',
  },
];

const SIGNALS = [
  'Profile views',
  'Search queries',
  'Direction requests',
  'Phone calls',
  'Website clicks',
  'Message volume',
  'Photo views',
  'Review velocity',
  'Avg star rating',
  'Response rate',
  'Local Pack rank',
  'Maps-to-booking %',
];

const DataShowcase = () => {
  return (
    <section className="sl-section gb-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve signals. <em>Tracked per location, every day.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Live dashboard
            <br />
            from week 2
          </div>
        </div>

        <div className="gb-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="gb-data-card">
              <div className="gb-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="gb-data-lbl">{s.label}</div>
              <p className="gb-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="gb-data-signals">
          <div className="gb-data-signals-head">
            <span className="gb-data-signals-eyebrow">12 signals we track daily</span>
          </div>
          <div className="gb-data-signals-grid">
            {SIGNALS.map((s, i) => (
              <span key={s} className="gb-data-signal">
                <span className="gb-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
