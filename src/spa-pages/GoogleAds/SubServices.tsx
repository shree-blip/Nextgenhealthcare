import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  {
    to: '/meta-ads',
    name: 'Meta Ads',
    desc: 'Facebook + Instagram ads for healthcare. Pair with Google for full-funnel demand capture and retargeting.',
    tag: 'Paid Social',
  },
  {
    to: '/services/analytics-reporting',
    name: 'Analytics & Reporting',
    desc: 'HIPAA-safe tracking, live ROAS dashboard, multi-touch attribution. The signal Google Ads needs to learn from.',
    tag: 'Insight',
  },
  {
    to: '/services/seo',
    name: 'SEO Services',
    desc: 'Capture the high-intent searchers Google Ads can’t profitably bid on. SEO + Ads cost less together than either alone.',
    tag: 'Organic',
  },
  {
    to: '/services/email-drip-campaigns',
    name: 'Email Drip Campaigns',
    desc: 'Re-engage every lead that clicked but didn’t book the first time. Cuts your effective CPA in half.',
    tag: 'Lifecycle',
  },
  {
    to: '/services/google-business-profile',
    name: 'Google Business Profile',
    desc: 'GBP feeds Local Services Ads + Maps clicks. The companion asset to every paid local strategy.',
    tag: 'Local',
  },
  {
    to: '/services/website-design-dev',
    name: 'Website + Landing Pages',
    desc: 'Service-line landing pages that match ad headlines. The fastest way to lift Quality Score and conversion rate.',
    tag: 'Foundation',
  },
  {
    to: '/services/content-copywriting',
    name: 'Content & Copywriting',
    desc: 'Headlines, descriptions, landing-page copy - the same writers handling SEO write the ads, so voice stays consistent.',
    tag: 'Creative',
  },
  {
    to: '/reviews-reputation',
    name: 'Reviews & Reputation',
    desc: 'Review velocity and quality directly affect LSA ranking and ad-extension CTR. Treat reviews as paid-media fuel.',
    tag: 'Trust',
  },
];

const SubServices = () => {
  return (
    <section className="sl-section ga-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              Google Ads compounds <em>with the rest of the stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="ga-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="ga-sub-card">
              <div className="ga-sub-top">
                <span className="ga-sub-tag">{l.tag}</span>
                <span className="ga-sub-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="ga-sub-name">{l.name}</h3>
              <p className="ga-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
