const BADGES = [
  'Healthcare design specialists',
  'AIGA-aligned editorial process',
  'WCAG 2.2 AA accessibility built-in',
  'Figma + Illustrator native delivery',
  'You own every source file',
  'Phased rollout · zero downtime',
  'Clinician-reviewed visual claims',
  'Brand-system documentation guaranteed',
];

const TrustBar = () => {
  return (
    <section className="br-trust" aria-label="Brand process trust signals">
      <div className="container-shell">
        <div className="br-trust-head">
          <span className="br-trust-lbl">Design-led · Healthcare-only</span>
          <span className="br-trust-sep" aria-hidden="true" />
          <span className="br-trust-meta">Reviewed quarterly · refreshed every 2 yrs</span>
        </div>
        <div className="br-trust-track">
          {BADGES.map((b) => (
            <span key={b} className="br-trust-pill">
              <span className="br-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
