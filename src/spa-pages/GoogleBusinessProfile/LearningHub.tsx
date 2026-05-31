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
    title: 'The healthcare GBP playbook (2026)',
    desc: 'A 28-page guide on Local Pack ranking, multi-location strategy, and HIPAA-safe review response.',
    readTime: '18 min read',
    to: '/blog',
  },
  {
    tag: 'Framework',
    title: 'The category-stacking strategy for specialties',
    desc: 'How to use the primary + 9 secondary categories to capture every service-line search.',
    readTime: '12 min read',
    to: '/blog',
  },
  {
    tag: 'Tutorial',
    title: 'HIPAA-safe review responses, with templates',
    desc: 'The exact response library we ship for every engagement. 14 scenarios, all compliance-cleared.',
    readTime: '10 min read',
    to: '/blog',
  },
  {
    tag: 'Audit',
    title: 'The 15-point GBP self-audit',
    desc: 'Walk through your profile this weekend. Score it against the same vectors we use - find the leaks.',
    readTime: '8 min read',
    to: '/blog',
  },
  {
    tag: 'Deep dive',
    title: "Why proximity isn't destiny for Local Pack",
    desc: 'How a clinic 2.5 miles away beats one 2 blocks away. Real geo-grid data from 30 healthcare audits.',
    readTime: '14 min read',
    to: '/blog',
  },
  {
    tag: 'Template',
    title: 'Posts + Q&A starter library (Google Sheet)',
    desc: 'Six weeks of post copy + the 20 most-asked patient Q&As. Yours to copy, adapt, and run.',
    readTime: '6 min setup',
    to: '/blog',
  },
];

const LearningHub = () => {
  return (
    <section className="sl-section gb-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              GBP knowledge that <em>moves the map, not just the dashboard.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="gb-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="gb-learn-card">
              <div className="gb-learn-top">
                <span className="gb-learn-tag">{r.tag}</span>
                <span className="gb-learn-time">{r.readTime}</span>
              </div>
              <h3 className="gb-learn-title">{r.title}</h3>
              <p className="gb-learn-desc">{r.desc}</p>
              <span className="gb-learn-cta">
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

        <div className="gb-learn-footer">
          <Link to="/blog" className="gb-learn-more">
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
