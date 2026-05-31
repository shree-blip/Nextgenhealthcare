import { Link } from 'react-router-dom';

interface Resource { tag: string; title: string; desc: string; readTime: string; to: string }

const RESOURCES: Resource[] = [
  { tag: 'Guide', title: 'The healthcare content playbook (2026)', desc: 'A 40-page guide on E-E-A-T, AEO, and the editorial cadence every healthcare brand should run.', readTime: '24 min read', to: '/blog' },
  { tag: 'Framework', title: 'The pillar + cluster blueprint for YMYL', desc: 'How we structure topic clusters around healthcare service lines. Spreadsheet template included.', readTime: '14 min read', to: '/blog' },
  { tag: 'Deep dive', title: 'AEO: writing for AI Overviews + ChatGPT search', desc: 'The structure, schema, and citation patterns that get healthcare content cited by AI - not just ranked.', readTime: '18 min read', to: '/blog' },
  { tag: 'Tutorial', title: 'Schema for MedicalWebPage in 20 minutes', desc: 'The JSON-LD blocks every healthcare article should ship with. Copy-paste, with examples.', readTime: '10 min read', to: '/blog' },
  { tag: 'Audit', title: 'The 18-point content self-audit', desc: 'Walk through your existing library, score it against E-E-A-T, find the refresh candidates this weekend.', readTime: '9 min read', to: '/blog' },
  { tag: 'Template', title: 'Editorial brief template (Google Doc)', desc: 'The brief we hand to every clinician contributor. Yours to copy, adapt, and run with your team.', readTime: '5 min setup', to: '/blog' },
];

const LearningHub = () => {
  return (
    <section className="sl-section cm-learn-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - Learning hub</div>
            <h2 className="sl-sec-title">
              Content knowledge that <em>compounds authority, not output.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Free
            <br />
            No email gate
          </div>
        </div>

        <div className="cm-learn-grid">
          {RESOURCES.map((r) => (
            <Link key={r.title} to={r.to} className="cm-learn-card">
              <div className="cm-learn-top">
                <span className="cm-learn-tag">{r.tag}</span>
                <span className="cm-learn-time">{r.readTime}</span>
              </div>
              <h3 className="cm-learn-title">{r.title}</h3>
              <p className="cm-learn-desc">{r.desc}</p>
              <span className="cm-learn-cta">
                Read
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="cm-learn-footer">
          <Link to="/blog" className="cm-learn-more">
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
