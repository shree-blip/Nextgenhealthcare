interface Row {
  label: string;
  diy: string;
  agency: string;
  us: string;
}

const ROWS: Row[] = [
  { label: 'Healthcare expertise', diy: 'Provider posts when they remember', agency: 'Generalist - any vertical', us: 'Healthcare-only since day one' },
  { label: 'HIPAA + compliance', diy: 'No formal review', agency: 'No clinical reviewer', us: 'Licensed clinician reviews every post' },
  { label: 'Content production', diy: 'Phone footage when convenient', agency: 'Stock + AI templates', us: 'Quarterly capture day, custom-shot' },
  { label: 'Posting cadence', diy: '1-3×/week when busy', agency: '3×/wk per channel', us: '4×/wk per channel, every week, indefinitely' },
  { label: 'Channel discipline', diy: 'Everywhere, half-heartedly', agency: '4-5 channels, all shallow', us: 'Two channels, run deep' },
  { label: 'Engagement / community', diy: 'Replies when remembered', agency: 'No DM coverage', us: 'Same-day DM + comment SLA' },
  { label: 'Reporting cadence', diy: 'Native insights monthly', agency: 'PDF deck monthly', us: 'Live dashboard + weekly Loom + monthly written' },
  { label: 'Typical first-90-day reach lift', diy: '0-20%', agency: '40-80%', us: '+312% (avg, 120 healthcare accounts)' },
];

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Comparison = () => {
  return (
    <section className="sl-section sm-compare-section">
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

        <div className="sm-compare-wrap">
          <table className="sm-compare-table" role="table">
            <thead>
              <tr>
                <th className="sm-compare-row-label" scope="col">&nbsp;</th>
                <th scope="col" className="sm-compare-col">
                  <div className="sm-compare-col-head">
                    <span className="sm-compare-col-name">DIY</span>
                    <span className="sm-compare-col-sub">Self-managed</span>
                  </div>
                </th>
                <th scope="col" className="sm-compare-col">
                  <div className="sm-compare-col-head">
                    <span className="sm-compare-col-name">Generalist agency</span>
                    <span className="sm-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="sm-compare-col winner">
                  <div className="sm-compare-col-head">
                    <span className="sm-compare-pill">Recommended</span>
                    <span className="sm-compare-col-name">TheNextGen</span>
                    <span className="sm-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="sm-compare-row-label">{r.label}</th>
                  <td className="sm-compare-cell">{r.diy}</td>
                  <td className="sm-compare-cell">{r.agency}</td>
                  <td className="sm-compare-cell winner">
                    <span className="sm-compare-tick" aria-hidden="true"><Tick /></span>
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
