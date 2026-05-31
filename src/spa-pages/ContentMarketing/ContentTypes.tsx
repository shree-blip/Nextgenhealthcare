import type { ReactElement } from 'react';

interface Type {
  num: string;
  name: string;
  funnel: string;
  desc: string;
  bestFor: string;
  outputs: string[];
  icon: ReactElement;
}

const PillarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="9" y1="4" x2="9" y2="20" />
  </svg>
);
const BlogIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const AeoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const StoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 11V8m-2 1.5l-2-1m4 0l-2 1" />
  </svg>
);
const NewsletterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const TYPES: Type[] = [
  {
    num: '01',
    name: 'Pillar pages',
    funnel: 'Authority',
    desc: '2,500-4,000 word definitive guides to a service line. The page Google and AI Overviews cite when someone searches the parent topic.',
    bestFor: 'Best for: high-margin service lines, competitive head terms.',
    outputs: ['Topic-cluster blueprint', '4-section editorial outline', 'Clinician-reviewed draft', 'FAQPage schema embedded'],
    icon: <PillarIcon />,
  },
  {
    num: '02',
    name: 'Supporting articles',
    funnel: 'Long-tail',
    desc: '800-1,600 words on the questions branching off each pillar. Where 70% of long-tail organic traffic actually compounds.',
    bestFor: 'Best for: condition-specific, prep, recovery, comparison queries.',
    outputs: ['Search intent classification', 'Internal-link plan', 'AEO-ready summary', 'Author + reviewer byline'],
    icon: <BlogIcon />,
  },
  {
    num: '03',
    name: 'Location pages',
    funnel: 'Conversion',
    desc: 'Bespoke per-location pages with real photography, real reviews, and locally-relevant condition coverage. The highest-converting page type in healthcare SEO.',
    bestFor: 'Best for: multi-location clinics, urgent care networks, MSOs.',
    outputs: ['Local schema (LocalBusiness)', 'Service + insurance grid', 'Provider + photo embeds', 'Review pull-through'],
    icon: <LocationIcon />,
  },
  {
    num: '04',
    name: 'AEO answer pages',
    funnel: 'AI surface',
    desc: 'Short-form definitive answers engineered for Google AI Overviews, ChatGPT search, and Perplexity. The new top-of-funnel.',
    bestFor: 'Best for: head terms losing CTR to AI Overviews.',
    outputs: ['Question-first structure', 'Citable stats + studies', 'FAQ + HowTo schema', 'Citation-friendly source list'],
    icon: <AeoIcon />,
  },
  {
    num: '05',
    name: 'Patient stories',
    funnel: 'Trust',
    desc: 'De-identified or signed-consent narratives that turn the practice into a brand. The highest emotional conversion lever - and the highest compliance bar.',
    bestFor: 'Best for: surgical, oncology, fertility, mental health, specialty.',
    outputs: ['Signed authorization workflow', 'Composite-story templates', 'Provider co-author byline', 'Outcome data anonymized'],
    icon: <StoryIcon />,
  },
  {
    num: '06',
    name: 'Newsletters + nurture',
    funnel: 'Retention',
    desc: 'Monthly long-form for engaged patients. Provider voice, seasonal hooks, the pillar that keeps the list warm between visits.',
    bestFor: 'Best for: specialty groups, mission-driven brands, opt-in lists.',
    outputs: ['Monthly editorial calendar', 'Provider Q&A copy', 'Service-line spotlights', 'Annual impact report'],
    icon: <NewsletterIcon />,
  },
];

const ContentTypes = () => {
  return (
    <section className="sl-section cm-types-section" id="content-types">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Content types</div>
            <h2 className="sl-sec-title">
              Six formats. <em>One editorial engine.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Every piece
            <br />
            tied to intent
          </div>
        </div>

        <div className="cm-types-grid">
          {TYPES.map((t) => (
            <article key={t.num} className="cm-types-card">
              <div className="cm-types-top">
                <div className="cm-types-icon">{t.icon}</div>
                <div className="cm-types-meta">
                  <span className="cm-types-num">{t.num}</span>
                  <span className="cm-types-funnel">{t.funnel}</span>
                </div>
              </div>
              <h3 className="cm-types-name">{t.name}</h3>
              <p className="cm-types-desc">{t.desc}</p>
              <div className="cm-types-best">{t.bestFor}</div>
              <ul className="cm-types-outputs">
                {t.outputs.map((o) => (
                  <li key={o}>
                    <span className="cm-types-bullet" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentTypes;
