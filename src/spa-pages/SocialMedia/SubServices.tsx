import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  { to: '/services/content-copywriting', name: 'Content & Copywriting', desc: 'The editorial backbone that fuels two months of social content from one strategy session.', tag: 'Editorial' },
  { to: '/services/brand-identity-design', name: 'Brand Identity & Design', desc: 'Template kits so every reel, story, and carousel looks like one practice - not five interns.', tag: 'Visual' },
  { to: '/meta-ads', name: 'Meta Ads', desc: 'Paid amplification on the organic winners. Boost what works - skip what doesn\'t.', tag: 'Paid Social' },
  { to: '/reviews-reputation', name: 'Reviews & Reputation', desc: 'Convert every positive social moment into a Google review. Automated, compliance-aware.', tag: 'Trust' },
  { to: '/services/seo', name: 'SEO Services', desc: 'YouTube and TikTok now feed Google search. Social is SEO\'s newest discovery surface.', tag: 'Search' },
  { to: '/services/google-business-profile', name: 'Google Business Profile', desc: 'Social proof drives GBP clicks. We tie review velocity and post cadence into one motion.', tag: 'Local' },
  { to: '/services/email-drip-campaigns', name: 'Email Drip Campaigns', desc: 'Capture new followers into a welcome flow before the algorithm forgets them in 3 days.', tag: 'Lifecycle' },
  { to: '/services/website-design-dev', name: 'Website + Landing Pages', desc: 'Where the link in bio lands. Service-line pages that match the post that sent them.', tag: 'Foundation' },
];

const SubServices = () => {
  return (
    <section className="sl-section sm-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              Social compounds <em>with the rest of the stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="sm-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="sm-sub-card">
              <div className="sm-sub-top">
                <span className="sm-sub-tag">{l.tag}</span>
                <span className="sm-sub-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="sm-sub-name">{l.name}</h3>
              <p className="sm-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
