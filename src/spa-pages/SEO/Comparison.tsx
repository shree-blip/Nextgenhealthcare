interface CompareRow {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: CompareRow[] = [
  {
    label: 'Healthcare expertise',
    diy: 'You read three blogs',
    agency: 'Generalist; learning on your retainer',
    us: 'Healthcare-only since day one',
  },
  {
    label: 'HIPAA + PHI handling',
    diy: 'Stock pixels leak intent data',
    agency: 'Default GA4, no BAA',
    us: 'Server-side, scrubbed, BAA-covered tooling',
  },
  {
    label: 'Time to first lift',
    diy: '6–12 months, if at all',
    agency: '4–6 months (talk-heavy phase)',
    us: 'Week 6 visible, Week 12 measurable',
  },
  {
    label: 'Reporting',
    diy: 'Whatever GA4 emails you',
    agency: 'Monthly PDF, three days late',
    us: 'Live dashboard + weekly Loom + monthly written',
  },
  {
    label: 'Content review',
    diy: 'No medical reviewer',
    agency: 'No clinical workflow',
    us: 'MD review loop on every YMYL page',
  },
  {
    label: 'Lock-in',
    diy: '—',
    agency: '12-month contracts',
    us: 'Quarter-to-quarter, cancel any time',
  },
  {
    label: 'Hourly cost equivalent',
    diy: '$0 + your time + lost revenue',
    agency: '$120–180/hr blended',
    us: 'Fixed retainer, predictable',
  },
];

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Comparison = () => {
  return (
    <section className="sl-section seo-compare-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Compare</div>
            <h2 className="sl-sec-title">
              DIY, generalist agency, or <em>healthcare specialist.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Side-by-side
            <br />
            no asterisks
          </div>
        </div>

        <div className="seo-compare-wrap">
          <table className="seo-compare-table" role="table">
            <thead>
              <tr>
                <th className="seo-compare-row-label" scope="col">&nbsp;</th>
                <th scope="col" className="seo-compare-col">
                  <div className="seo-compare-col-head">
                    <span className="seo-compare-col-name">DIY</span>
                    <span className="seo-compare-col-sub">In-house, evenings</span>
                  </div>
                </th>
                <th scope="col" className="seo-compare-col">
                  <div className="seo-compare-col-head">
                    <span className="seo-compare-col-name">Generalist agency</span>
                    <span className="seo-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="seo-compare-col winner">
                  <div className="seo-compare-col-head">
                    <span className="seo-compare-pill">Recommended</span>
                    <span className="seo-compare-col-name">TheNextGen</span>
                    <span className="seo-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="seo-compare-row-label">{r.label}</th>
                  <td className="seo-compare-cell">{r.diy}</td>
                  <td className="seo-compare-cell">{r.agency}</td>
                  <td className="seo-compare-cell winner">
                    <span className="seo-compare-tick" aria-hidden="true"><Tick /></span>
                    {r.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
