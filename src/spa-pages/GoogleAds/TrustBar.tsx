interface Badge {
  name: string;
}

const BADGES: Badge[] = [
  { name: 'Google Partner' },
  { name: 'Google Ads Search Certified' },
  { name: 'Performance Max Certified' },
  { name: 'YouTube Ads Certified' },
  { name: 'Google Analytics 4 Certified' },
  { name: 'Local Services Ads Verified' },
  { name: 'HIPAA-aware tracking' },
  { name: 'BAA on every downstream tool' },
];

const TrustBar = () => {
  return (
    <section className="ga-trust" aria-label="Certifications and trust signals">
      <div className="container-shell">
        <div className="ga-trust-head">
          <span className="ga-trust-lbl">Certified by Google · Built for healthcare</span>
          <span className="ga-trust-sep" aria-hidden="true" />
          <span className="ga-trust-meta">Updated quarterly · audited annually</span>
        </div>
        <div className="ga-trust-track">
          {BADGES.map((b) => (
            <span key={b.name} className="ga-trust-pill">
              <span className="ga-trust-dot" aria-hidden="true" />
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
