interface Row {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: Row[] = [
  {
    label: 'Healthcare expertise',
    diy: 'Canva + intern',
    agency: 'Generalist brand studio',
    us: 'Healthcare-only · 40+ rebrands',
  },
  {
    label: 'Process starts with',
    diy: 'Logo',
    agency: 'Logo',
    us: 'Positioning first · identity second',
  },
  {
    label: 'Pressure-tested where',
    diy: 'Nowhere',
    agency: 'Moodboards + decks',
    us: 'Live patient-facing surfaces + ad creative',
  },
  {
    label: 'Design tokens / system',
    diy: 'None',
    agency: 'Hand-off PDF only',
    us: 'Working Figma library + dev handoff',
  },
  {
    label: 'Photography direction',
    diy: 'Stock images',
    agency: 'Stock + light direction',
    us: 'Quarterly real-photo capture · zero stock',
  },
  {
    label: 'Voice + tone framework',
    diy: 'None',
    agency: 'Tagline only',
    us: 'Framework + 3-axis matrix + sample copy',
  },
  {
    label: 'Rollout discipline',
    diy: 'Big-bang, painful',
    agency: 'Coordinated digital',
    us: 'Phased digital → printables → signage · zero downtime',
  },
  {
    label: 'Brand-health tracking',
    diy: 'None',
    agency: 'Annual review',
    us: 'Quarterly retro · 12-signal scorecard',
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
    <section className="sl-section br-compare-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">09 - Compare</div>
            <h2 className="sl-sec-title">
              DIY, generalist studio, or <em>healthcare specialist.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Side-by-side
            <br />
            no asterisks
          </div>
        </div>

        <div className="br-compare-wrap">
          <table className="br-compare-table" role="table">
            <thead>
              <tr>
                <th className="br-compare-row-label" scope="col">
                  &nbsp;
                </th>
                <th scope="col" className="br-compare-col">
                  <div className="br-compare-col-head">
                    <span className="br-compare-col-name">DIY</span>
                    <span className="br-compare-col-sub">Internal team</span>
                  </div>
                </th>
                <th scope="col" className="br-compare-col">
                  <div className="br-compare-col-head">
                    <span className="br-compare-col-name">Generalist studio</span>
                    <span className="br-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="br-compare-col winner">
                  <div className="br-compare-col-head">
                    <span className="br-compare-pill">Recommended</span>
                    <span className="br-compare-col-name">TheNextGen</span>
                    <span className="br-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="br-compare-row-label">
                    {r.label}
                  </th>
                  <td className="br-compare-cell">{r.diy}</td>
                  <td className="br-compare-cell">{r.agency}</td>
                  <td className="br-compare-cell winner">
                    <span className="br-compare-tick" aria-hidden="true">
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
