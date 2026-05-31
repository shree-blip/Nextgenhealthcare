interface ToolPill {
  name: string;
  short: string;
}

const TOOLS: ToolPill[] = [
  { name: 'Google Search Console', short: 'GSC' },
  { name: 'Google Analytics 4', short: 'GA4' },
  { name: 'Google Business Profile', short: 'GBP' },
  { name: 'Bing Webmaster', short: 'Bing' },
  { name: 'Semrush', short: 'Semrush' },
  { name: 'Ahrefs', short: 'Ahrefs' },
  { name: 'Screaming Frog', short: 'SF' },
  { name: 'Schema.org', short: 'Schema' },
  { name: 'PageSpeed Insights', short: 'PSI' },
  { name: 'Lighthouse', short: 'LH' },
];

const TrustBar = () => {
  return (
    <section className="seo-trust" aria-label="Tools and platforms we use">
      <div className="container-shell">
        <div className="seo-trust-head">
          <span className="seo-trust-lbl">Built on the stack the best SEOs use</span>
          <span className="seo-trust-sep" aria-hidden="true" />
          <span className="seo-trust-meta">HIPAA-compatible · BAA where required</span>
        </div>
        <div className="seo-trust-track">
          {TOOLS.map((t) => (
            <span key={t.name} className="seo-trust-pill" title={t.name}>
              <span className="seo-trust-dot" aria-hidden="true" />
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
