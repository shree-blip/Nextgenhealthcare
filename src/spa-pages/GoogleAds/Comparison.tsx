interface Row {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: Row[] = [
  {
    label: 'Healthcare expertise',
    diy: 'YouTube tutorials',
    agency: 'Generalist - learning on your spend',
    us: 'Healthcare-only since day one',
  },
  {
    label: 'HIPAA + PHI handling',
    diy: 'Default Google tag leaks PHI',
    agency: 'No BAA, no server-side',
    us: 'Server-side, scrubbed, BAA-covered',
  },
  {
    label: 'Account ownership',
    diy: 'You own it (good)',
    agency: 'Often agency-owned (bad)',
    us: 'You always own the account',
  },
  {
    label: 'Reporting cadence',
    diy: 'Google\'s native UI',
    agency: 'Monthly PDF, often late',
    us: 'Live dashboard + weekly Loom + monthly written',
  },
  {
    label: 'Optimization frequency',
    diy: 'Whenever you remember',
    agency: 'Monthly check-in',
    us: 'Weekly + automated anomaly alerts',
  },
  {
    label: 'Conversion tracking',
    diy: 'Whatever default fires',
    agency: 'Phone OR form (rarely both)',
    us: 'Phone, form, booking, revenue - all attributed',
  },
  {
    label: 'Lock-in',
    diy: '—',
    agency: '6-12 month contracts',
    us: '90-day ramp, then month-to-month',
  },
  {
    label: 'Typical first-90-day CPA change',
    diy: 'Flat or worse',
    agency: '−10% to flat',
    us: '−42% (avg across 180 accounts)',
  },
];

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Comparison = () => {
  return (
    <section className="sl-section ga-compare-section">
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

        <div className="ga-compare-wrap">
          <table className="ga-compare-table" role="table">
            <thead>
              <tr>
                <th className="ga-compare-row-label" scope="col">&nbsp;</th>
                <th scope="col" className="ga-compare-col">
                  <div className="ga-compare-col-head">
                    <span className="ga-compare-col-name">DIY</span>
                    <span className="ga-compare-col-sub">Self-managed</span>
                  </div>
                </th>
                <th scope="col" className="ga-compare-col">
                  <div className="ga-compare-col-head">
                    <span className="ga-compare-col-name">Generalist agency</span>
                    <span className="ga-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="ga-compare-col winner">
                  <div className="ga-compare-col-head">
                    <span className="ga-compare-pill">Recommended</span>
                    <span className="ga-compare-col-name">TheNextGen</span>
                    <span className="ga-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="ga-compare-row-label">{r.label}</th>
                  <td className="ga-compare-cell">{r.diy}</td>
                  <td className="ga-compare-cell">{r.agency}</td>
                  <td className="ga-compare-cell winner">
                    <span className="ga-compare-tick" aria-hidden="true"><Tick /></span>
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
