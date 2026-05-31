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
    title: 'The healthcare analytics playbook (2026)',
    desc: 'A 36-page guide on building HIPAA-safe attribution dashboards from Ads, GA4, CRM, and EHR.',
    readTime: '24 min read',
    to: '/blog',
  },
  {
    tag: 'Tutorial',
    title: 'Server-side GA4 + Meta CAPI in 60 minutes',
    desc: 'The exact server-side conversion stack we ship - DNS, Cloud Run, hashed-ID matching, the works.',
    readTime: '18 min read',
    to: '/blog',
  },
  {
    tag: 'Framework',
    title: 'The position-based attribution model for healthcare',
    desc: '40/20/40 weighting + the reasoning behind it. Why it beats last-click for clinics every time.',
    readTime: '12 min read',
    to: '/blog',
  },
  {
    tag: 'Deep dive',
    title: 'Apple MPP, adblockers, and the death of GA4 accuracy',
    desc: 'How 15-40% of conversions go missing - and the server-side fix that recovers them.',
    readTime: '14 min read',
    to: '/blog',
  },
  {
    tag: 'Audit',
    title: 'The 20-point analytics self-audit',
    desc: 'Walk your stack this weekend. Find the PHI leaks, the unattributed conversions, the broken UTMs.',
    readTime: '10 min read',
    to: '/blog',
  },
  {
    tag: 'Template',
    title: 'KPI dictionary template (Google Sheet)',
    desc: 'The same KPI taxonomy we lock with every engagement. Yours to copy + adapt to your stack.',
    readTime: '6 min setup',
    to: '/blog',
  },
];

const LearningHub = () => {
  return (
    <section className="sl-section an-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              Analytics knowledge that <em>moves spend, not just charts.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="an-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="an-learn-card">
              <div className="an-learn-top">
                <span className="an-learn-tag">{r.tag}</span>
                <span className="an-learn-time">{r.readTime}</span>
              </div>
              <h3 className="an-learn-title">{r.title}</h3>
              <p className="an-learn-desc">{r.desc}</p>
              <span className="an-learn-cta">
                Read
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="an-learn-footer">
          <Link to="/blog" className="an-learn-more">
            See the full blog
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
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
