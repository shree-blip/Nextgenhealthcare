interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { num: '312', unit: '%', label: 'Avg reach lift', sub: 'First 90 days, across 120+ healthcare accounts' },
  { num: '5.8', unit: '%', label: 'Avg engagement rate', sub: 'vs. 1.2% healthcare-industry benchmark' },
  { num: '47', unit: '+', label: 'Monthly assisted bookings', sub: 'Booked patients with social as first touchpoint' },
  { num: '8.2', unit: 'K', label: 'Avg followers gained / yr', sub: 'Targeted by service line, not bulk reach' },
];

const SIGNALS = [
  'Save rate',
  'Share rate',
  'Hook rate (3s)',
  'Watch-through %',
  'Profile visit rate',
  'Comment-to-like ratio',
  'DM intent',
  'Sticker-tap rate',
  'Story exit rate',
  'Follower add velocity',
  'Branded search lift',
  'Direct-traffic lift',
];

const DataShowcase = () => {
  return (
    <section className="sl-section sm-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve signals. <em>We watch them daily, not monthly.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Live dashboard
            <br />
            from week 2
          </div>
        </div>

        <div className="sm-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="sm-data-card">
              <div className="sm-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="sm-data-lbl">{s.label}</div>
              <p className="sm-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="sm-data-signals">
          <div className="sm-data-signals-head">
            <span className="sm-data-signals-eyebrow">12 signals we track daily</span>
          </div>
          <div className="sm-data-signals-grid">
            {SIGNALS.map((s, i) => (
              <span key={s} className="sm-data-signal">
                <span className="sm-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
