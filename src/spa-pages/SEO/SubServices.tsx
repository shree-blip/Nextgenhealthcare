import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  {
    to: '/services/google-business-profile',
    name: 'Google Business Profile',
    desc: 'Weekly posts, photo cadence, review responses, Q&A management - GBP run as the asset it actually is.',
    tag: 'Local',
  },
  {
    to: '/services/website-design-dev',
    name: 'Website Design & Dev',
    desc: 'Fast, accessible, schema-clean sites - the foundation every other SEO lever leans on.',
    tag: 'Foundation',
  },
  {
    to: '/citation-building',
    name: 'Citation Building',
    desc: '50+ medical and local directories, NAP parity, drift monitoring. The boring work that compounds.',
    tag: 'Off-Page',
  },
  {
    to: '/hyper-local-content',
    name: 'Hyper-Local Content',
    desc: 'Neighborhood pages, location-of-service pages, geo-clusters - the content layer Map Pack needs.',
    tag: 'Content',
  },
  {
    to: '/aeo-schema',
    name: 'AEO & Schema',
    desc: 'Structured data, FAQ schema, MedicalEntity markup - so AI Overviews quote you, not your competitor.',
    tag: 'AEO',
  },
  {
    to: '/services/content-copywriting',
    name: 'Content & Copywriting',
    desc: 'Condition pillars, procedure deep-dives, location pages - clinically reviewed, search-aligned.',
    tag: 'Content',
  },
  {
    to: '/services/analytics-reporting',
    name: 'Analytics & Reporting',
    desc: 'HIPAA-safe tracking, live dashboards, multi-touch attribution. The signal SEO needs to compound.',
    tag: 'Insight',
  },
  {
    to: '/reviews-reputation',
    name: 'Reviews & Reputation',
    desc: 'Review velocity, response cadence, sentiment monitoring - the trust signal SEO depends on.',
    tag: 'Trust',
  },
];

const SubServices = () => {
  return (
    <section className="sl-section seo-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">09 - Sub-services</div>
            <h2 className="sl-sec-title">
              Every SEO discipline, <em>as a focused engagement.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="seo-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="seo-sub-card">
              <div className="seo-sub-top">
                <span className="seo-sub-tag">{l.tag}</span>
                <span className="seo-sub-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="seo-sub-name">{l.name}</h3>
              <p className="seo-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
