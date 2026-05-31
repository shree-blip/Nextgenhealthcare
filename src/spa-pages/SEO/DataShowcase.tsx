interface DataStat {
  num: string;
  unit?: string;
  label: string;
  sub: string;
}

const STATS: DataStat[] = [
  { num: '2.1', unit: 'B+', label: 'Keywords tracked', sub: 'Across the US healthcare SERP universe' },
  { num: '180', unit: '+', label: 'Practices audited', sub: 'From solo clinics to 40-location networks' },
  { num: '$42', unit: 'M', label: 'Organic revenue attributed', sub: 'In the last 24 months alone' },
  { num: '94', unit: '%', label: 'Client retention', sub: 'Average tenure 31 months' },
];

const SIGNALS = [
  'Crawl health',
  'Indexability',
  'Schema coverage',
  'Core Web Vitals',
  'GBP completeness',
  'Citation parity',
  'Review velocity',
  'Backlink quality',
  'AEO citation rate',
  'Topical authority',
  'Internal link equity',
  'Mobile UX',
];

const DataShowcase = () => {
  return (
    <section className="sl-section seo-data-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - The data</div>
            <h2 className="sl-sec-title">
              SEO is decided by <em>signals.</em> We watch every one.
            </h2>
          </div>
          <div className="sl-sec-meta">
            Live dashboard
            <br />
            shipped on day 1
          </div>
        </div>

        <div className="seo-data-grid">
          {STATS.map((s) => (
            <article key={s.label} className="seo-data-card">
              <div className="seo-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="seo-data-lbl">{s.label}</div>
              <p className="seo-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <div className="seo-data-signals">
          <div className="seo-data-signals-head">
            <span className="seo-data-signals-eyebrow">12 signal categories we instrument from day one</span>
          </div>
          <div className="seo-data-signals-grid">
            {SIGNALS.map((s, i) => (
              <span key={s} className="seo-data-signal">
                <span className="seo-data-signal-num">{String(i + 1).padStart(2, '0')}</span>
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
