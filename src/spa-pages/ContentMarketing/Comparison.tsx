interface Row { label: string; diy: string; agency: string; us: string }

const ROWS: Row[] = [
  { label: 'Healthcare expertise', diy: 'Internal team part-time', agency: 'Generalist - any vertical', us: 'Healthcare-only since day one' },
  { label: 'Clinical reviewer', diy: 'None', agency: 'Editorial review only', us: 'Licensed clinician signs every YMYL piece' },
  { label: 'Volume vs depth', diy: 'Whatever fits in spare time', agency: '20+ thin posts / month', us: '4 deep pieces · pillar + 3 supporting' },
  { label: 'AEO / AI search readiness', diy: 'Not addressed', agency: 'Bolt-on if asked', us: 'Built into every brief from day one' },
  { label: 'Schema + technical SEO', diy: 'Default WordPress', agency: 'Basic Article schema', us: 'MedicalWebPage + FAQ + HowTo on every piece' },
  { label: 'Refresh + content decay', diy: 'Never', agency: 'Annual at best', us: 'Top-25 refreshed quarterly · decay alerts weekly' },
  { label: 'Internal linking', diy: 'Manual + inconsistent', agency: 'Ad-hoc', us: 'Cluster map enforced · 3-7 links per article' },
  { label: 'Typical first-year organic lift', diy: 'Flat or down', agency: '+15-40%', us: '+312% (avg, 90 healthcare accounts)' },
];

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Comparison = () => {
  return (
    <section className="sl-section cm-compare-section">
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

        <div className="cm-compare-wrap">
          <table className="cm-compare-table" role="table">
            <thead>
              <tr>
                <th className="cm-compare-row-label" scope="col">&nbsp;</th>
                <th scope="col" className="cm-compare-col">
                  <div className="cm-compare-col-head">
                    <span className="cm-compare-col-name">DIY</span>
                    <span className="cm-compare-col-sub">Self-managed</span>
                  </div>
                </th>
                <th scope="col" className="cm-compare-col">
                  <div className="cm-compare-col-head">
                    <span className="cm-compare-col-name">Generalist agency</span>
                    <span className="cm-compare-col-sub">Any vertical</span>
                  </div>
                </th>
                <th scope="col" className="cm-compare-col winner">
                  <div className="cm-compare-col-head">
                    <span className="cm-compare-pill">Recommended</span>
                    <span className="cm-compare-col-name">TheNextGen</span>
                    <span className="cm-compare-col-sub">Healthcare-only</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="cm-compare-row-label">{r.label}</th>
                  <td className="cm-compare-cell">{r.diy}</td>
                  <td className="cm-compare-cell">{r.agency}</td>
                  <td className="cm-compare-cell winner">
                    <span className="cm-compare-tick" aria-hidden="true"><Tick /></span>
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
