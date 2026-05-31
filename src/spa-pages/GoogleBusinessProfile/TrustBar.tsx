const BADGES = [
  'Google Business Profile verified',
  'Google Local Services certified',
  'Apple Business Connect partner',
  'Bing Places for Business',
  'Yelp Verified',
  'BBB-tracked',
  'HIPAA-aware review moderation',
  'Multi-location console enabled',
];

const TrustBar = () => {
  return (
    <section className="gb-trust" aria-label="GBP partnerships and trust signals">
      <div className="container-shell">
        <div className="gb-trust-head">
          <span className="gb-trust-lbl">Verified by every map provider · Healthcare-only</span>
          <span className="gb-trust-sep" aria-hidden="true" />
          <span className="gb-trust-meta">Reviewed weekly · audited monthly</span>
        </div>
        <div className="gb-trust-track">
          {BADGES.map((b) => (
            <span key={b} className="gb-trust-pill">
              <span className="gb-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
