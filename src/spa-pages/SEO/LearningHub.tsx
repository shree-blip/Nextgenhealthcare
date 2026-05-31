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
    title: 'The healthcare SEO playbook (2026 edition)',
    desc: 'A 28-page guide on what actually moves bookings - written for practice owners, not SEOs.',
    readTime: '18 min read',
    to: '/blog',
  },
  {
    tag: 'Tutorial',
    title: 'How to set up GA4 without breaking HIPAA',
    desc: 'The exact server-side configuration we ship for every client. Copy-paste ready.',
    readTime: '12 min read',
    to: '/blog',
  },
  {
    tag: 'Framework',
    title: 'E-E-A-T for medical content: a working checklist',
    desc: 'The 24-point list our medical reviewers run before any condition page goes live.',
    readTime: '9 min read',
    to: '/blog',
  },
  {
    tag: 'Deep dive',
    title: 'Why AI Overviews quote your competitor (and how to flip it)',
    desc: 'A teardown of the schema, content, and signal stack that wins answer-engine citations.',
    readTime: '15 min read',
    to: '/blog',
  },
  {
    tag: 'Audit',
    title: 'The 12-point local SEO self-audit',
    desc: 'Print it, run it, fix the obvious wins this weekend - no consultant needed.',
    readTime: '7 min read',
    to: '/blog',
  },
  {
    tag: 'Template',
    title: 'Service-line keyword map (Notion + spreadsheet)',
    desc: 'The intent-tiered keyword framework we use for every new engagement.',
    readTime: '5 min setup',
    to: '/blog',
  },
];

const LearningHub = () => {
  return (
    <section className="sl-section seo-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - Learning hub</div>
            <h2 className="sl-sec-title">
              SEO knowledge that <em>actually moves bookings.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="seo-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="seo-learn-card">
              <div className="seo-learn-top">
                <span className="seo-learn-tag">{r.tag}</span>
                <span className="seo-learn-time">{r.readTime}</span>
              </div>
              <h3 className="seo-learn-title">{r.title}</h3>
              <p className="seo-learn-desc">{r.desc}</p>
              <span className="seo-learn-cta">
                Read
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="seo-learn-footer">
          <Link to="/blog" className="seo-learn-more">
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
