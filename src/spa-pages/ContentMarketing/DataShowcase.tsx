interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { num: '14.2', unit: 'K', label: 'Monthly organic / client', sub: 'Trailing 12-month avg · post month-6 ramp' },
  { num: '#3', label: 'Avg SERP position', sub: 'Across primary keyword set, 90-account cohort' },
  { num: '38', unit: '+', label: 'Bookings / mo attributed', sub: 'Organic content as first or assisted touchpoint' },
  { num: '18', unit: '+', label: 'Backlinks earned / quarter', sub: 'Editorial-driven, not paid placement' },
];

const SIGNALS = [
  'Pillar coverage %',
  'Cluster depth',
  'Search intent match',
  'CTR by position',
  'Time on page',
  'Scroll depth',
  'Internal link velocity',
  'Backlink quality (DA)',
  'AI Overview citation rate',
  'Featured snippet capture',
  'Content decay alerts',
  'Refresh cadence',
];

const DataShowcase = () => {
  return (
    <section className="sl-section cm-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve signals. <em>Tracked per article.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Per-piece dashboard
            <br />
            not aggregate
          </div>
        </div>

        <div className="cm-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="cm-data-card">
              <div className="cm-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="cm-data-lbl">{s.label}</div>
              <p className="cm-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="cm-data-signals">
          <div className="cm-data-signals-head">
            <span className="cm-data-signals-eyebrow">12 signals we track per article</span>
          </div>
          <div className="cm-data-signals-grid">
            {SIGNALS.map((s, i) => (
              <span key={s} className="cm-data-signal">
                <span className="cm-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
