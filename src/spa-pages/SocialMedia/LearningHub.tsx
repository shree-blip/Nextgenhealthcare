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
    title: 'The healthcare social media playbook (2026)',
    desc: 'A 38-page guide on running healthcare social without HIPAA exposure - and without sounding like a brochure.',
    readTime: '22 min read',
    to: '/blog',
  },
  {
    tag: 'Tutorial',
    title: 'The 1-hour quarterly capture day',
    desc: 'The exact shot list, gear, and angles we use to turn one provider hour into six weeks of content.',
    readTime: '12 min read',
    to: '/blog',
  },
  {
    tag: 'Framework',
    title: 'The 40-20-15-15-10 content mix',
    desc: 'Why the share matters, how to calibrate it by specialty, and what to ditch when you only have time for one pillar.',
    readTime: '10 min read',
    to: '/blog',
  },
  {
    tag: 'Deep dive',
    title: 'Save rate vs. like rate: what to actually optimize',
    desc: 'Likes are vanity. Saves are intent. Here\'s how to engineer for saves without sacrificing reach.',
    readTime: '14 min read',
    to: '/blog',
  },
  {
    tag: 'Audit',
    title: 'The 20-point social media self-audit',
    desc: 'Print it, walk through your account, find the leaks. No agency needed - yet.',
    readTime: '8 min read',
    to: '/blog',
  },
  {
    tag: 'Template',
    title: 'The HIPAA-safe comment-moderation playbook',
    desc: 'Decision tree + canned responses for the 14 most common public comments healthcare accounts receive.',
    readTime: '6 min setup',
    to: '/blog',
  },
];

const LearningHub = () => {
  return (
    <section className="sl-section sm-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              Social knowledge <em>that compounds reach, not follower counts.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="sm-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="sm-learn-card">
              <div className="sm-learn-top">
                <span className="sm-learn-tag">{r.tag}</span>
                <span className="sm-learn-time">{r.readTime}</span>
              </div>
              <h3 className="sm-learn-title">{r.title}</h3>
              <p className="sm-learn-desc">{r.desc}</p>
              <span className="sm-learn-cta">
                Read
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="sm-learn-footer">
          <Link to="/blog" className="sm-learn-more">
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
