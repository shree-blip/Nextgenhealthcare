import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  { to: '/services/analytics-reporting', name: 'Analytics & Reporting', desc: 'Tie every send to attributed revenue, not just opens. Server-side tracking + booking attribution.', tag: 'Insight' },
  { to: '/services/google-ads', name: 'Google Ads', desc: 'Re-engage every lead that clicked the ad but didn\'t book the first time. Email cuts effective CPA in half.', tag: 'Paid Search' },
  { to: '/meta-ads', name: 'Meta Ads', desc: 'Capture Facebook + Instagram leads into a welcome flow before they cool off. Same-day automation.', tag: 'Paid Social' },
  { to: '/reviews-reputation', name: 'Reviews & Reputation', desc: 'Trigger a Google review request the day after a positive post-visit reply. Compliance-aware automation.', tag: 'Trust' },
  { to: '/medical-automation', name: 'Medical Automation', desc: 'n8n + custom workflows that handle intake, reminders, follow-up. Email is one channel - this is the orchestrator.', tag: 'Automation' },
  { to: '/services/content-copywriting', name: 'Content & Copywriting', desc: 'The same writers behind your blog write your emails - voice stays consistent across every touchpoint.', tag: 'Editorial' },
  { to: '/services/social-media-marketing', name: 'Social Media Marketing', desc: 'Capture new followers into a welcome flow before the algorithm forgets them in 3 days.', tag: 'Social' },
  { to: '/services/seo', name: 'SEO Services', desc: 'Capture organic visitors before they bounce. Lead-magnet → welcome drip → booked patient.', tag: 'Organic' },
];

const SubServices = () => {
  return (
    <section className="sl-section em-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              Email compounds <em>with the rest of the stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="em-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="em-sub-card">
              <div className="em-sub-top">
                <span className="em-sub-tag">{l.tag}</span>
                <span className="em-sub-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="em-sub-name">{l.name}</h3>
              <p className="em-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
