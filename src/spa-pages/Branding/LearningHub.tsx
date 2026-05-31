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
    title: 'The healthcare brand playbook (2026)',
    desc: 'A 42-page guide on positioning, identity, voice, and rollout for clinics and multi-location practices.',
    readTime: '24 min read',
    to: '/blog',
  },
  {
    tag: 'Framework',
    title: 'The positioning brief template',
    desc: 'The four-question brief we lock with every client before pencil hits paper. Yours to copy + adapt.',
    readTime: '10 min read',
    to: '/blog',
  },
  {
    tag: 'Deep dive',
    title: 'Why healthcare logos look the same - and what to do',
    desc: 'A teardown of 100 healthcare logos. The four traps + the seven traits that actually stand out.',
    readTime: '14 min read',
    to: '/blog',
  },
  {
    tag: 'Tutorial',
    title: 'Building a Figma design-token library in 30 minutes',
    desc: "The exact token structure we ship - colors, type, spacing, motion. Token-first or you're re-doing it later.",
    readTime: '12 min read',
    to: '/blog',
  },
  {
    tag: 'Audit',
    title: 'The 15-point brand-health self-audit',
    desc: 'Walk your touchpoints this weekend - mark, color, voice, photography, signage. Find the leaks.',
    readTime: '9 min read',
    to: '/blog',
  },
  {
    tag: 'Template',
    title: 'Brand-guidelines starter template',
    desc: 'The 40-page guidelines skeleton we work from. Fill in the blanks; ship a working manual in a week.',
    readTime: '6 min setup',
    to: '/blog',
  },
];

const LearningHub = () => {
  return (
    <section className="sl-section br-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              Brand knowledge that <em>compounds equity, not output.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="br-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="br-learn-card">
              <div className="br-learn-top">
                <span className="br-learn-tag">{r.tag}</span>
                <span className="br-learn-time">{r.readTime}</span>
              </div>
              <h3 className="br-learn-title">{r.title}</h3>
              <p className="br-learn-desc">{r.desc}</p>
              <span className="br-learn-cta">
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

        <div className="br-learn-footer">
          <Link to="/blog" className="br-learn-more">
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
