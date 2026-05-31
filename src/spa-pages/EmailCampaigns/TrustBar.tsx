const BADGES = [
  'Mailchimp Pro Partner',
  'Klaviyo Master Elite',
  'HubSpot Solutions Partner',
  'ActiveCampaign Certified',
  'Postmark BAA-covered',
  'Customer.io Verified',
  'HIPAA-compliant sending',
  'SPF · DKIM · DMARC configured',
];

const TrustBar = () => {
  return (
    <section className="em-trust" aria-label="ESP partnerships and trust signals">
      <div className="container-shell">
        <div className="em-trust-head">
          <span className="em-trust-lbl">ESP-certified · BAA-covered</span>
          <span className="em-trust-sep" aria-hidden="true" />
          <span className="em-trust-meta">Reviewed quarterly · audited annually</span>
        </div>
        <div className="em-trust-track">
          {BADGES.map((b) => (
            <span key={b} className="em-trust-pill">
              <span className="em-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
