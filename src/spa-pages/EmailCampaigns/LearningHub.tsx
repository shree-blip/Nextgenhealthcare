import { Link } from 'react-router-dom';

interface Resource {
  tag: string;
  title: string;
  desc: string;
  readTime: string;
  to: string;
}

const RESOURCES: Resource[] = [
  { tag: 'Guide', title: 'The healthcare email playbook (2026)', desc: 'A 34-page guide on BAA-covered email, deliverability, and the flow library every practice should run.', readTime: '20 min read', to: '/blog' },
  { tag: 'Tutorial', title: 'SPF · DKIM · DMARC in 30 minutes', desc: 'The exact DNS records, in the exact order, with the exact monitoring policy we ship for every engagement.', readTime: '12 min read', to: '/blog' },
  { tag: 'Framework', title: 'The 4-email recall sequence that lifts re-booking 18%', desc: 'Copy, timing, segmentation, and the one trigger most practices miss. Yours to copy-paste.', readTime: '10 min read', to: '/blog' },
  { tag: 'Deep dive', title: 'Apple MPP and why your open rate is lying', desc: 'How privacy-protected opens inflate metrics by 40% - and what to track instead.', readTime: '14 min read', to: '/blog' },
  { tag: 'Audit', title: 'The 15-point email self-audit', desc: 'Print it, run it on your account this weekend. Find the leaks before they cost you bookings.', readTime: '8 min read', to: '/blog' },
  { tag: 'Template', title: 'Welcome + post-visit sequence (Google Doc)', desc: 'The exact six emails we ship in week 2 of every engagement. Yours to copy and rebrand.', readTime: '6 min setup', to: '/blog' },
];

const LearningHub = () => {
  return (
    <section className="sl-section em-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              Email knowledge that <em>compounds revenue, not just opens.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="em-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="em-learn-card">
              <div className="em-learn-top">
                <span className="em-learn-tag">{r.tag}</span>
                <span className="em-learn-time">{r.readTime}</span>
              </div>
              <h3 className="em-learn-title">{r.title}</h3>
              <p className="em-learn-desc">{r.desc}</p>
              <span className="em-learn-cta">
                Read
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="em-learn-footer">
          <Link to="/blog" className="em-learn-more">
            See the full blog
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningHub;
