interface Badge {
  name: string;
}

const BADGES: Badge[] = [
  { name: 'Meta Business Partner' },
  { name: 'Conversions API Certified' },
  { name: 'Meta Blueprint Buying' },
  { name: 'Meta Blueprint Creative' },
  { name: 'WhatsApp Business Solution' },
  { name: 'HIPAA-aware tracking' },
  { name: 'BAA on every downstream tool' },
  { name: 'Healthcare creative review pipeline' },
];

const TrustBar = () => {
  return (
    <section className="ma-trust" aria-label="Certifications and trust signals">
      <div className="container-shell">
        <div className="ma-trust-head">
          <span className="ma-trust-lbl">Meta-certified · Built for healthcare</span>
          <span className="ma-trust-sep" aria-hidden="true" />
          <span>Audited quarterly</span>
        </div>
        <div className="ma-trust-track">
          {BADGES.map((b) => (
            <span key={b.name} className="ma-trust-pill">
              <span className="ma-trust-dot" aria-hidden="true" />
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
