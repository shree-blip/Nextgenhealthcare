const BADGES = [
  'Healthcare clinicians on staff',
  'E-E-A-T compliant authoring',
  'HONcode-adjacent review process',
  'AMA Style Manual editing',
  'Cited in AI Overview results',
  'Schema.org MedicalWebPage',
  'YMYL content standards',
  'BAA-covered for case studies',
];

const TrustBar = () => {
  return (
    <section className="cm-trust" aria-label="Editorial standards and trust signals">
      <div className="container-shell">
        <div className="cm-trust-head">
          <span className="cm-trust-lbl">Editorial-grade · Clinician-reviewed</span>
          <span className="cm-trust-sep" aria-hidden="true" />
          <span className="cm-trust-meta">Reviewed quarterly · audited annually</span>
        </div>
        <div className="cm-trust-track">
          {BADGES.map((b) => (
            <span key={b} className="cm-trust-pill">
              <span className="cm-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
