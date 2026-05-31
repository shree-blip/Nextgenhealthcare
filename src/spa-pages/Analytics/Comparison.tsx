interface Row {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: Row[] = [
  {
    label: 'Healthcare expertise',
    diy: 'GA4 + spreadsheets',
    agency: 'Generalist - any vertical',
    us: 'Healthcare-only · 90+ engagements',
  },
  {
    label: 'PHI / HIPAA handling',
    diy: 'No formal protocol',
    agency: 'No BAA on at least one tool',
    us: 'Server-side · scrubbed · BAA-covered end-to-end',
  },
  {
    label: 'Source systems unified',
    diy: '1-2 (GA4 + maybe Ads)',
    agency: '3-4',
    us: '10+ (Ads · GA4 · GSC · GBP · CRM · EHR · Booking · Call · Chat · LSA)',
  },
  {
    label: 'Attribution model',
    diy: 'Last-click only',
    agency: 'Last-click + maybe first',
    us: 'All 4 models in parallel · position-based default',
  },
  {
    label: 'Reporting cadence',
    diy: 'When asked',
    agency: 'Monthly PDF',
    us: 'Live dashboard + weekly Loom + monthly written + quarterly retro',
  },
  {
    label: 'Anomaly alerts',
    diy: 'None',
    agency: 'None',
    us: 'Auto-alerts on +/-20% week-over-week deltas',
  },
  {
    label: 'Data ownership',
    diy: 'You own GA4 only',
    agency: 'Agency-owned warehouse',
    us: 'You own the warehouse · we just operate it',
  },
  {
    label: 'Typical first-90-day visibility lift',
    diy: 'Flat',
    agency: '+20-40%',
    us: '100% channel attribution · −85% reporting time',
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
    <section className="sl-section an-compare-section">
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

        <div className="an-compare-wrap">
          <table className="an-compare-table" role="table">
            <thead>
              <tr>
                <th className="an-compare-row-label" scope="col">
                  &nbsp;
                </th>
                <th scope="col" className="an-compare-col">
                  <div className="an-compare-col-head">
                    <span className="an-compare-col-name">DIY</span>
                    <span className="an-compare-col-sub">Self-managed</span>
                  </div>
                </th>
                <th scope="col" className="an-compare-col">
                  <div className="an-compare-col-head">
                    <span className="an-compare-col-name">Generalist agency</span>
                    <span className="an-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="an-compare-col winner">
                  <div className="an-compare-col-head">
                    <span className="an-compare-pill">Recommended</span>
                    <span className="an-compare-col-name">TheNextGen</span>
                    <span className="an-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="an-compare-row-label">
                    {r.label}
                  </th>
                  <td className="an-compare-cell">{r.diy}</td>
                  <td className="an-compare-cell">{r.agency}</td>
                  <td className="an-compare-cell winner">
                    <span className="an-compare-tick" aria-hidden="true">
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
