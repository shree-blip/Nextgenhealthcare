interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { num: '68', unit: '%', label: 'Avg open rate', sub: 'Across lifecycle sends · vs. 21% industry benchmark' },
  { num: '24', unit: '%', label: 'Click rate', sub: 'On recall + post-visit flows' },
  { num: '47', unit: '+', label: 'Monthly attributed bookings', sub: 'Patients booked with email as last touchpoint' },
  { num: '12', unit: 'h', label: 'Front-desk hours saved / wk', sub: 'Reminders + follow-up that don\'t need a human' },
];

const SIGNALS = [
  'Open rate',
  'Click rate',
  'Click-to-open',
  'Reply rate',
  'Booked rate',
  'Hard bounce %',
  'Soft bounce %',
  'Complaint rate',
  'Unsubscribe rate',
  'List growth rate',
  'Inbox placement %',
  'Revenue per send',
];

const DataShowcase = () => {
  return (
    <section className="sl-section em-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve signals. <em>Tracked per send, not monthly.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Live dashboard
            <br />
            from week 2
          </div>
        </div>

        <div className="em-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="em-data-card">
              <div className="em-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="em-data-lbl">{s.label}</div>
              <p className="em-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="em-data-signals">
          <div className="em-data-signals-head">
            <span className="em-data-signals-eyebrow">12 signals we track per send</span>
          </div>
          <div className="em-data-signals-grid">
            {SIGNALS.map((s, i) => (
              <span key={s} className="em-data-signal">
                <span className="em-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
