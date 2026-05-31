interface Tool {
  tag: string;
  name: string;
  desc: string;
}

const TOOLS: Tool[] = [
  {
    tag: 'Frontend',
    name: 'Next.js + React',
    desc: 'Default for new builds. Edge-rendered, instant page loads, perfect Lighthouse scores out of the box.',
  },
  {
    tag: 'CMS',
    name: 'Headless WordPress',
    desc: 'Editor-friendly content authoring with a decoupled React frontend — the best of both worlds.',
  },
  {
    tag: 'No-code',
    name: 'Webflow',
    desc: 'When your team needs to ship marketing pages without a dev. Component library mapped to your design system.',
  },
  {
    tag: 'E-commerce',
    name: 'Shopify Hydrogen',
    desc: 'For practices that sell aesthetics, supplements, or appliances. Headless storefront on Shopify rails.',
  },
  {
    tag: 'Tooling',
    name: 'Figma → Storybook',
    desc: 'Design tokens, components, and pages versioned together. Designer and developer single source of truth.',
  },
  {
    tag: 'Hosting',
    name: 'Vercel + Cloudflare',
    desc: 'Global edge delivery, preview deploys, automatic image optimization, and DDoS protection on every build.',
  },
  {
    tag: 'Analytics',
    name: 'GA4 + Search Console',
    desc: 'Wired on day one with PHI scrubbing, conversion events, and a dashboard your team can actually read.',
  },
  {
    tag: 'A11y',
    name: 'axe + Lighthouse CI',
    desc: 'Accessibility and performance checks run on every pull request — regressions fail the build.',
  },
];

const Stack = () => {
  return (
    <section className="sl-section wd-stack-section" id="stack">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - The stack</div>
            <h2 className="sl-sec-title">
              Modern tools. <em>No platform tax.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            We pick the stack
            <br />
            your team can maintain
          </div>
        </div>

        <p className="wd-stack-intro">
          We are framework-agnostic on purpose. The right stack is the one your team can
          run two years after handover — not the one we like writing. We pick from a tight
          set of <strong>modern, owner-friendly tools</strong> and document everything we
          ship so future updates never depend on us.
        </p>

        <div className="wd-stack-grid">
          {TOOLS.map((t) => (
            <article key={t.name} className="wd-stack-card">
              <span className="wd-stack-tag">{t.tag}</span>
              <h3 className="wd-stack-name">{t.name}</h3>
              <p className="wd-stack-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
