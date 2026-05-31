import type { ReactElement } from 'react';

interface Capability {
  num: string;
  name: string;
  desc: string;
  tags: string[];
  icon: ReactElement;
}

const StrategyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);
const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="10.5" r="2.5" />
    <circle cx="8.5" cy="7.5" r="2.5" />
    <circle cx="6.5" cy="12.5" r="2.5" />
    <path d="M12 22a9 9 0 1 1 9-9 4 4 0 0 1-4 4h-1.5a2 2 0 0 0-1.4 3.4 2 2 0 0 1-1.6 3.6z" />
  </svg>
);
const DevIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const SeoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const AccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const CareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const CAPS: Capability[] = [
  {
    num: '01',
    name: 'Strategy &amp; UX',
    desc: 'Audience research, conversion goals, sitemap, and wireframes — built around what your patients actually do, not what they say in interviews.',
    tags: ['Stakeholder interviews', 'Sitemap', 'Wireframes', 'Conversion plan'],
    icon: <StrategyIcon />,
  },
  {
    num: '02',
    name: 'Visual design',
    desc: 'Editorial-grade design systems with tokens, components, and page templates. Built to flex across service lines without breaking the brand.',
    tags: ['Design system', 'Component kit', 'Brand pages', 'Motion'],
    icon: <DesignIcon />,
  },
  {
    num: '03',
    name: 'Custom development',
    desc: 'Next.js, headless WordPress, or Webflow — chosen by what your team can actually maintain. Clean code, owner-managed CMS, no platform lock-in.',
    tags: ['Next.js', 'Headless WP', 'Webflow', 'Shopify'],
    icon: <DevIcon />,
  },
  {
    num: '04',
    name: 'SEO &amp; content',
    desc: 'Technical SEO, schema, content briefs, and editorial writing — so the new site ranks for the queries that actually book patients.',
    tags: ['Technical SEO', 'Schema', 'Copywriting', 'Local SEO'],
    icon: <SeoIcon />,
  },
  {
    num: '05',
    name: 'Accessibility',
    desc: 'WCAG 2.2 AA in the contract, not the wish list. Keyboard nav, screen-reader audits, contrast scoring, and remediation in every sprint.',
    tags: ['WCAG 2.2 AA', 'Keyboard nav', 'Screen-reader QA', 'VPAT-ready'],
    icon: <AccessIcon />,
  },
  {
    num: '06',
    name: 'Care &amp; growth',
    desc: 'Post-launch: monthly performance review, conversion-rate experiments, security patching, and content updates so the site keeps compounding.',
    tags: ['Monthly retainer', 'CRO experiments', 'Patching', 'Content updates'],
    icon: <CareIcon />,
  },
];

const Capabilities = () => {
  return (
    <section className="sl-section wd-cap-section" id="capabilities">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">01 - What we ship</div>
            <h2 className="sl-sec-title">
              Six capabilities. <em>One finished website.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Strategy through care
            <br />
            no vendor handoffs
          </div>
        </div>

        <div className="wd-cap-grid">
          {CAPS.map((c) => (
            <article key={c.num} className="wd-cap-card">
              <div className="wd-cap-top">
                <div className="wd-cap-icon">{c.icon}</div>
                <span className="wd-cap-num">{c.num}</span>
              </div>
              <h3
                className="wd-cap-name"
                dangerouslySetInnerHTML={{ __html: c.name }}
              />
              <p
                className="wd-cap-desc"
                dangerouslySetInnerHTML={{ __html: c.desc }}
              />
              <ul className="wd-cap-list">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
