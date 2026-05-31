interface Badge {
  name: string;
}

const BADGES: Badge[] = [
  { name: 'WCAG 2.2 AA Accessibility' },
  { name: 'Core Web Vitals · Sub-2s LCP' },
  { name: 'HIPAA-aware forms + analytics' },
  { name: 'WordPress + Next.js + Webflow' },
  { name: 'Schema.org structured data' },
  { name: 'GA4 + Search Console wired' },
  { name: 'Lighthouse 95+ at handover' },
  { name: 'Owner-managed CMS handoff' },
];

const TrustBar = () => {
  return (
    <section className="wd-trust" aria-label="Build standards and trust signals">
      <div className="container-shell">
        <div className="wd-trust-head">
          <span className="wd-trust-lbl">Standards we ship against · Healthcare-only</span>
          <span className="wd-trust-sep" aria-hidden="true" />
          <span>Audited at handover</span>
        </div>
        <div className="wd-trust-track">
          {BADGES.map((b) => (
            <span key={b.name} className="wd-trust-pill">
              <span className="wd-trust-dot" aria-hidden="true" />
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
