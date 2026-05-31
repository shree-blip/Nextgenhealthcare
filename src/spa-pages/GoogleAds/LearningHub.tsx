import { Link } from 'react-router-dom';

interface Resource {
  tag: string;
  title: string;
  desc: string;
  readTime: string;
  to: string;
}

const RESOURCES: Resource[] = [
  {
    tag: 'Guide',
    title: 'The healthcare PPC playbook (2026)',
    desc: 'A 32-page guide on what actually drives booked patients - not just impressions and clicks.',
    readTime: '20 min read',
    to: '/blog',
  },
  {
    tag: 'Tutorial',
    title: 'HIPAA-safe conversion tracking, step by step',
    desc: 'The exact server-side setup we ship for every Google Ads engagement. Copy-paste ready.',
    readTime: '14 min read',
    to: '/blog',
  },
  {
    tag: 'Framework',
    title: 'The negative-keyword starter list for clinics',
    desc: 'The 400-term universal negative list that saves 30-50% of wasted spend on day one.',
    readTime: '8 min read',
    to: '/blog',
  },
  {
    tag: 'Deep dive',
    title: 'Performance Max for healthcare: when it works, when it doesn’t',
    desc: 'PMax is powerful and dangerous. A teardown of when to use it vs. classic Search.',
    readTime: '16 min read',
    to: '/blog',
  },
  {
    tag: 'Audit',
    title: 'The 15-point Google Ads self-audit',
    desc: 'Print it, run it, fix the obvious leaks this weekend - no consultant needed.',
    readTime: '9 min read',
    to: '/blog',
  },
  {
    tag: 'Template',
    title: 'Service-line ad-group map (Google Sheet)',
    desc: 'The structure we use to rebuild every account. Yours to copy and fill in.',
    readTime: '5 min setup',
    to: '/blog',
  },
];

const LearningHub = () => {
  return (
    <section className="sl-section ga-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              Google Ads knowledge that <em>moves CPA, not vanity metrics.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="ga-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="ga-learn-card">
              <div className="ga-learn-top">
                <span className="ga-learn-tag">{r.tag}</span>
                <span className="ga-learn-time">{r.readTime}</span>
              </div>
              <h3 className="ga-learn-title">{r.title}</h3>
              <p className="ga-learn-desc">{r.desc}</p>
              <span className="ga-learn-cta">
                Read
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="ga-learn-footer">
          <Link to="/blog" className="ga-learn-more">
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
