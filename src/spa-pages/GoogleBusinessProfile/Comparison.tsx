interface Row {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: Row[] = [
  {
    label: 'Healthcare expertise',
    diy: 'Front desk updates when remembered',
    agency: 'Generalist - any vertical',
    us: 'Healthcare-only · 110+ locations managed',
  },
  {
    label: 'HIPAA + review responses',
    diy: 'No formal protocol',
    agency: 'Generic templates',
    us: 'HIPAA-safe response library · clinician-reviewed',
  },
  {
    label: 'Multi-location console',
    diy: 'GBP UI, one at a time',
    agency: 'Spreadsheet + manual edits',
    us: 'Unified console · bulk updates · per-location dashboards',
  },
  {
    label: 'Citation consistency',
    diy: 'Whatever was set up at launch',
    agency: 'One-off citation build',
    us: '70+ directories · quarterly audit · auto-sync',
  },
  {
    label: 'Posts cadence',
    diy: '0-2 per quarter',
    agency: 'Monthly when remembered',
    us: 'Weekly per location · indefinitely',
  },
  {
    label: 'Photo cadence',
    diy: 'Annual reshoot if lucky',
    agency: 'Stock images',
    us: 'Quarterly shoot + weekly drip schedule',
  },
  {
    label: 'Review velocity',
    diy: 'Whatever happens organically',
    agency: 'Manual request emails',
    us: 'EHR-wired automation · ~18 reviews/mo/location',
  },
  {
    label: 'Typical first-90-day map lift',
    diy: 'Flat',
    agency: '+40-80%',
    us: '+218% direction requests · +340% profile views',
  },
];

const Tick = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Comparison = () => {
  return (
    <section className="sl-section gb-compare-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">09 - Compare</div>
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

        <div className="gb-compare-wrap">
          <table className="gb-compare-table" role="table">
            <thead>
              <tr>
                <th className="gb-compare-row-label" scope="col">
                  &nbsp;
                </th>
                <th scope="col" className="gb-compare-col">
                  <div className="gb-compare-col-head">
                    <span className="gb-compare-col-name">DIY</span>
                    <span className="gb-compare-col-sub">Self-managed</span>
                  </div>
                </th>
                <th scope="col" className="gb-compare-col">
                  <div className="gb-compare-col-head">
                    <span className="gb-compare-col-name">Generalist agency</span>
                    <span className="gb-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="gb-compare-col winner">
                  <div className="gb-compare-col-head">
                    <span className="gb-compare-pill">Recommended</span>
                    <span className="gb-compare-col-name">TheNextGen</span>
                    <span className="gb-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="gb-compare-row-label">
                    {r.label}
                  </th>
                  <td className="gb-compare-cell">{r.diy}</td>
                  <td className="gb-compare-cell">{r.agency}</td>
                  <td className="gb-compare-cell winner">
                    <span className="gb-compare-tick" aria-hidden="true">
                      <Tick />
                    </span>
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
