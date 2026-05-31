import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  {
    to: '/services/google-ads',
    name: 'Google Ads',
    desc: "Pour analytics signal back into smarter bids. Server-side conversions feed Google's smart-bidding the truth.",
    tag: 'Paid Search',
  },
  {
    to: '/services/seo',
    name: 'SEO Services',
    desc: 'See exactly which rankings - Local Pack, organic, AEO - are producing booked patients. Not just clicks.',
    tag: 'Search',
  },
  {
    to: '/medical-automation',
    name: 'Medical Automation',
    desc: 'Trigger workflows from the same data the dashboard reports on. Marketing analytics → operational action.',
    tag: 'Automation',
  },
  {
    to: '/services/email-drip-campaigns',
    name: 'Email Drip Campaigns',
    desc: 'Behavioral triggers fed from the warehouse - no one re-builds segments in two tools.',
    tag: 'Lifecycle',
  },
  {
    to: '/services/google-business-profile',
    name: 'Google Business Profile',
    desc: 'GBP per-location insights pulled into one network-wide dashboard. Direction requests + calls + revenue together.',
    tag: 'Local',
  },
  {
    to: '/meta-ads',
    name: 'Meta Ads',
    desc: 'Meta CAPI server-side - recover the 25-40% of iOS conversions Apple MPP hides from the pixel.',
    tag: 'Paid Social',
  },
  {
    to: '/services/social-media-marketing',
    name: 'Social Media Marketing',
    desc: 'Attribution-aware social so you can prove which content actually moved booked patients.',
    tag: 'Social',
  },
  {
    to: '/services/content-copywriting',
    name: 'Content & Copywriting',
    desc: 'Per-article ranking + assisted-booking attribution. Refresh decisions made from data, not guesswork.',
    tag: 'Editorial',
  },
];

const SubServices = () => {
  return (
    <section className="sl-section an-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              Analytics compounds <em>with the rest of the stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="an-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="an-sub-card">
              <div className="an-sub-top">
                <span className="an-sub-tag">{l.tag}</span>
                <span className="an-sub-arrow" aria-hidden="true">
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
              <h3 className="an-sub-name">{l.name}</h3>
              <p className="an-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
