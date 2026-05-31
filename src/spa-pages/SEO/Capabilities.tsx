import type { ReactElement } from 'react';

interface Capability {
  num: string;
  name: string;
  tag: string;
  desc: string;
  features: string[];
  icon: ReactElement;
}

const TechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 14h2M7 17h2" />
    <path d="M13 14h4M13 17h2" />
  </svg>
);
const OnPageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h12l4 4v12a0 0 0 0 1 0 0H4z" />
    <polyline points="16 4 16 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);
const OffPageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 1 0-7-7l-1 1" />
    <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 1 0 7 7l1-1" />
  </svg>
);
const LocalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const AeoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M7 12h10" />
    <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" opacity=".35" />
  </svg>
);
const ContentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16v16H4z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="12" y2="17" />
  </svg>
);

const CAPABILITIES: Capability[] = [
  {
    num: '01',
    name: 'Technical SEO',
    tag: 'Foundation',
    desc: 'The plumbing Google has to crawl, render, and trust before any ranking conversation begins.',
    features: ['Core Web Vitals', 'Crawl + index audit', 'Schema markup', 'XML sitemaps', 'Robots.txt + canonicals'],
    icon: <TechIcon />,
  },
  {
    num: '02',
    name: 'On-Page SEO',
    tag: 'Relevance',
    desc: 'Title tags, headings, semantic structure, and internal linking tuned per page, per intent.',
    features: ['Meta + title tags', 'Heading architecture', 'Internal linking maps', 'Content scoring', 'Cannibalization fixes'],
    icon: <OnPageIcon />,
  },
  {
    num: '03',
    name: 'Off-Page SEO',
    tag: 'Authority',
    desc: 'Backlinks earned, not bought. Medical directories, local press, partner clinics, digital PR.',
    features: ['Link prospecting', 'Digital PR', 'Citation building', 'Disavow management', 'Anchor diversification'],
    icon: <OffPageIcon />,
  },
  {
    num: '04',
    name: 'Local SEO',
    tag: 'Map Pack',
    desc: 'GBP, citations, reviews, geo-clusters - the trust signals Map Pack ranking depends on.',
    features: ['GBP optimization', 'Citation cleanup', 'Review velocity', 'Location pages', 'Service-area targeting'],
    icon: <LocalIcon />,
  },
  {
    num: '05',
    name: 'AEO & Schema',
    tag: 'AI Visibility',
    desc: 'Structured data and answer-engine-ready content so AI Overviews quote you, not your competitor.',
    features: ['FAQ schema', 'MedicalEntity schema', 'AI-Overview content design', 'Featured snippet plays', 'Conversational queries'],
    icon: <AeoIcon />,
  },
  {
    num: '06',
    name: 'Content SEO',
    tag: 'Compounding',
    desc: 'Condition pillars, procedure deep-dives, location pages - clinically accurate, search-aligned.',
    features: ['Topical clusters', 'Condition pillars', 'Procedure pages', 'Editorial calendar', 'YMYL review workflow'],
    icon: <ContentIcon />,
  },
];

const Capabilities = () => {
  return (
    <section className="sl-section seo-cap-section" id="capabilities">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Capabilities</div>
            <h2 className="sl-sec-title">
              Six pillars. <em>One accountable team.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Every retainer
            <br />
            covers all six
          </div>
        </div>

        <div className="seo-cap-grid">
          {CAPABILITIES.map((c) => (
            <article key={c.num} className="seo-cap-card">
              <div className="seo-cap-top">
                <div className="seo-cap-icon">{c.icon}</div>
                <div className="seo-cap-meta">
                  <span className="seo-cap-num">{c.num}</span>
                  <span className="seo-cap-tag">{c.tag}</span>
                </div>
              </div>
              <h3 className="seo-cap-name">{c.name}</h3>
              <p className="seo-cap-desc">{c.desc}</p>
              <ul className="seo-cap-features">
                {c.features.map((f) => (
                  <li key={f}>
                    <span className="seo-cap-bullet" aria-hidden="true" />
                    {f}
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

export default Capabilities;
