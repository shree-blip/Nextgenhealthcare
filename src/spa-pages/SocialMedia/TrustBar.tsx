const BADGES = [
  'Meta Business Partner',
  'Instagram Verified Creator Tools',
  'LinkedIn Marketing Partner',
  'TikTok for Business Verified',
  'YouTube Certified',
  'Pinterest Business',
  'HIPAA-aware moderation',
  'Clinical reviewer on every post',
];

const TrustBar = () => {
  return (
    <section className="sm-trust" aria-label="Platform partnerships and trust signals">
      <div className="container-shell">
        <div className="sm-trust-head">
          <span className="sm-trust-lbl">Platform-certified · Healthcare-only</span>
          <span className="sm-trust-sep" aria-hidden="true" />
          <span className="sm-trust-meta">Reviewed quarterly · audited annually</span>
        </div>
        <div className="sm-trust-track">
          {BADGES.map((b) => (
            <span key={b} className="sm-trust-pill">
              <span className="sm-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
