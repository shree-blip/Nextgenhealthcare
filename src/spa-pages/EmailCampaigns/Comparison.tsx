interface Row {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: Row[] = [
  { label: 'Healthcare expertise', diy: 'Mailchimp tutorials', agency: 'Generalist - any vertical', us: 'Healthcare-only since day one' },
  { label: 'HIPAA + BAA coverage', diy: 'No BAA in place', agency: 'BAA missing on at least one tool', us: 'BAA signed on every tool we touch' },
  { label: 'SPF · DKIM · DMARC', diy: 'Usually only one of three', agency: 'Configured but not monitored', us: 'All three + DMARC reports monitored weekly' },
  { label: 'Flow library on launch', diy: '0-1 flow', agency: '2 flows in month 1', us: '4 flows live in 21 days' },
  { label: 'List hygiene cadence', diy: 'Never', agency: 'Quarterly', us: 'Auto-suppression at 180-day inactivity' },
  { label: 'Attribution to bookings', diy: 'Open + click only', agency: 'Conversion goal, no revenue', us: 'Booked revenue tied per send' },
  { label: 'Reporting cadence', diy: 'ESP native UI', agency: 'Monthly PDF', us: 'Live dashboard + weekly Loom + monthly written' },
  { label: 'Typical first-90-day OR lift', diy: 'Flat or down', agency: '+8-15%', us: '+38 percentage-points (avg, 90 accounts)' },
];

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Comparison = () => {
  return (
    <section className="sl-section em-compare-section">
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

        <div className="em-compare-wrap">
          <table className="em-compare-table" role="table">
            <thead>
              <tr>
                <th className="em-compare-row-label" scope="col">&nbsp;</th>
                <th scope="col" className="em-compare-col">
                  <div className="em-compare-col-head">
                    <span className="em-compare-col-name">DIY</span>
                    <span className="em-compare-col-sub">Self-managed</span>
                  </div>
                </th>
                <th scope="col" className="em-compare-col">
                  <div className="em-compare-col-head">
                    <span className="em-compare-col-name">Generalist agency</span>
                    <span className="em-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="em-compare-col winner">
                  <div className="em-compare-col-head">
                    <span className="em-compare-pill">Recommended</span>
                    <span className="em-compare-col-name">TheNextGen</span>
                    <span className="em-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="em-compare-row-label">{r.label}</th>
                  <td className="em-compare-cell">{r.diy}</td>
                  <td className="em-compare-cell">{r.agency}</td>
                  <td className="em-compare-cell winner">
                    <span className="em-compare-tick" aria-hidden="true"><Tick /></span>
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
