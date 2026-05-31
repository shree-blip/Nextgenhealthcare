const BADGES = [
  'Google Analytics 4 certified',
  'Looker Studio partner',
  'Tableau-trained team',
  'BigQuery + dbt practitioners',
  'Segment + RudderStack integrators',
  'CallRail BAA partner',
  'PHI-free conversion APIs',
  'BAA on every downstream tool',
];

const TrustBar = () => {
  return (
    <section className="an-trust" aria-label="Analytics tools and trust signals">
      <div className="container-shell">
        <div className="an-trust-head">
          <span className="an-trust-lbl">Tool-agnostic · Healthcare-only</span>
          <span className="an-trust-sep" aria-hidden="true" />
          <span className="an-trust-meta">BAA + DPA reviewed quarterly</span>
        </div>
        <div className="an-trust-track">
          {BADGES.map((b) => (
            <span key={b} className="an-trust-pill">
              <span className="an-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
