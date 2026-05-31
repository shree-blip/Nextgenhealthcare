interface Stat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  {
    num: '+62',
    unit: '%',
    label: 'Brand recall lift',
    sub: 'Aided recall · 6 months post-launch · 40-client cohort',
  },
  {
    num: 'A',
    unit: '+',
    label: 'Avg trust score',
    sub: 'Independent patient survey · post-engagement',
  },
  {
    num: '+38',
    unit: '%',
    label: 'Conversion lift',
    sub: 'Site + ad creative re-tuned to new identity',
  },
  {
    num: '100',
    unit: '%',
    label: 'Touchpoint coverage',
    sub: 'Documented across web · print · clinic · social',
  },
];

const SIGNALS = [
  'Aided recall',
  'Unaided recall',
  'Brand search volume',
  'Direct traffic %',
  'Net Promoter Score',
  'Review velocity',
  'Sentiment score',
  'Premium-tier pricing power',
  'Provider recruiting pipeline',
  'Referral share',
  'Repeat visit rate',
  'Touchpoint consistency',
];

const DataShowcase = () => {
  return (
    <section className="sl-section br-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - The data</div>
            <h2 className="sl-sec-title">
              Twelve signals. <em>Tracked at each brand audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Brand health
            <br />
            measured · not assumed
          </div>
        </div>

        <div className="br-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="br-data-card">
              <div className="br-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="br-data-lbl">{s.label}</div>
              <p className="br-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="br-data-signals">
          <div className="br-data-signals-head">
            <span className="br-data-signals-eyebrow">12 brand-health signals we measure</span>
          </div>
          <div className="br-data-signals-grid">
            {SIGNALS.map((s, i) => (
              <span key={s} className="br-data-signal">
                <span className="br-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
