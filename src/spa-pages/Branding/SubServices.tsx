import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  {
    to: '/services/website-design-dev',
    name: 'Website Design & Dev',
    desc: 'Translate the new identity into a converting clinic site. Brand-first build with design tokens enforced.',
    tag: 'Foundation',
  },
  {
    to: '/services/content-copywriting',
    name: 'Content & Copywriting',
    desc: 'Voice + tone framework scaffolds every blog, landing page, and provider bio. One voice everywhere.',
    tag: 'Editorial',
  },
  {
    to: '/services/social-media-marketing',
    name: 'Social Media Marketing',
    desc: 'Templated, on-brand posts the team can ship every week without designer review. Token-first social.',
    tag: 'Social',
  },
  {
    to: '/services/email-drip-campaigns',
    name: 'Email Drip Campaigns',
    desc: 'Recall, post-visit, win-back emails rebuilt on the new identity. Consistent brand from inbox to chair.',
    tag: 'Lifecycle',
  },
  {
    to: '/services/seo',
    name: 'SEO Services',
    desc: 'On-brand schema, OG images, and AEO-ready content. Brand identity that ranks alongside it.',
    tag: 'Search',
  },
  {
    to: '/services/google-ads',
    name: 'Google Ads',
    desc: 'Ad creative templated from the brand system. Performance + identity moving together, not against.',
    tag: 'Paid',
  },
  {
    to: '/services/google-business-profile',
    name: 'Google Business Profile',
    desc: 'Photography, cover image, post templates - every GBP touchpoint rebranded together.',
    tag: 'Local',
  },
  {
    to: '/services/analytics-reporting',
    name: 'Analytics & Reporting',
    desc: 'Brand-health scorecard built into the dashboard. Track recall, sentiment, share-of-voice quarterly.',
    tag: 'Insight',
  },
];

const SubServices = () => {
  return (
    <section className="sl-section br-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              Brand compounds <em>with the rest of the stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="br-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="br-sub-card">
              <div className="br-sub-top">
                <span className="br-sub-tag">{l.tag}</span>
                <span className="br-sub-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="br-sub-name">{l.name}</h3>
              <p className="br-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
