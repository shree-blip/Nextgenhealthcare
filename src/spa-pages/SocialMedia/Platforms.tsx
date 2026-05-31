import type { ReactElement } from 'react';

interface Platform {
  num: string;
  name: string;
  tone: string;
  audience: string;
  desc: string;
  bestFor: string;
  formats: string[];
  icon: ReactElement;
}

const InstaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <polygon points="10 9 16 12 10 15" fill="currentColor" />
  </svg>
);
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 19c.5-2 1.5-6 1.5-6M8 9.5a4 4 0 1 1 8 0c0 2-1 4-3 4-2 0-2.5-2-2-3.5" />
  </svg>
);

const PLATFORMS: Platform[] = [
  {
    num: '01',
    name: 'Instagram',
    tone: 'Visual trust',
    audience: '18-54 · skews female',
    desc: 'The default channel for healthcare. Reels carry reach, Stories carry community, the grid carries credibility. The platform where most patients quietly research you before booking.',
    bestFor: 'Best for: cosmetic, dental, derm, OBGYN, pediatrics, wellness.',
    formats: ['Reels (45-60s)', 'Stories (24h cycle)', 'Carousels (6-10 slides)', 'Lives (Q&A)', 'Highlights (always-on)'],
    icon: <InstaIcon />,
  },
  {
    num: '02',
    name: 'Facebook',
    tone: 'Community + Reviews',
    audience: '35-65+ · trust-driven',
    desc: 'Where older patients live, where review velocity compounds, and where local community groups can fill a panel without paid ads. Underestimated, especially for primary care.',
    bestFor: 'Best for: primary care, orthopedics, audiology, vision, cardiology.',
    formats: ['Long-form posts', 'Events (educational)', 'Groups (private)', 'Review prompts', 'Boosted posts'],
    icon: <FbIcon />,
  },
  {
    num: '03',
    name: 'LinkedIn',
    tone: 'Recruiting + B2H',
    audience: 'Providers + referrers',
    desc: 'Not for patients - for the people who refer them. Specialty referrals, ASC partnerships, payer relations, recruiting. The only platform where your CMO\'s post can fill a board seat.',
    bestFor: 'Best for: specialty groups, hospital systems, MSO networks, recruiting.',
    formats: ['Provider thought leadership', 'Case-study posts', 'Recruiting carousels', 'Newsletter', 'Lives (CMEs)'],
    icon: <LinkedinIcon />,
  },
  {
    num: '04',
    name: 'TikTok',
    tone: 'Discovery + Education',
    audience: '16-34 · search-first',
    desc: 'Now a search engine for under-30s. The clinic with the doctor who can explain a condition in 28 seconds wins the share, the save, and the consult booking.',
    bestFor: 'Best for: derm, dental, mental health, fertility, urgent care.',
    formats: ['Short-form vertical (15-60s)', 'Series content', 'Stitches + duets', 'TikTok Search SEO', 'Live Q&A'],
    icon: <TiktokIcon />,
  },
  {
    num: '05',
    name: 'YouTube Shorts',
    tone: 'Long-shelf authority',
    audience: 'All ages · intent-rich',
    desc: 'The most evergreen short-form on the internet. A Shorts that ranks today still earns views in 18 months - and feeds the long-form library that powers SEO.',
    bestFor: 'Best for: surgical, oncology, cardiology, fertility, complex specialty.',
    formats: ['Shorts (15-60s)', 'Long-form (8-15 min)', 'Patient testimonials', 'Procedure walkthroughs', 'Series playlists'],
    icon: <YoutubeIcon />,
  },
  {
    num: '06',
    name: 'Pinterest',
    tone: 'Research + Save',
    audience: '25-54 · planning-mode',
    desc: 'Quietly the highest-intent platform in healthcare. Patients save procedures they\'re researching for months. Pins drive booked consults at one-fifth the CPL of Meta.',
    bestFor: 'Best for: cosmetic, dental aesthetic, fertility, weddings/elective.',
    formats: ['Idea pins (multi-frame)', 'Standard pins', 'Procedure boards', 'Before/after (compliance-checked)', 'Pinterest SEO'],
    icon: <PinterestIcon />,
  },
];

const Platforms = () => {
  return (
    <section className="sl-section sm-plat-section" id="platforms">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Platforms</div>
            <h2 className="sl-sec-title">
              Six platforms. <em>We pick two for you.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Run deep
            <br />
            not thin
          </div>
        </div>

        <div className="sm-plat-grid">
          {PLATFORMS.map((p) => (
            <article key={p.num} className="sm-plat-card">
              <div className="sm-plat-top">
                <div className="sm-plat-icon">{p.icon}</div>
                <div className="sm-plat-meta">
                  <span className="sm-plat-num">{p.num}</span>
                  <span className="sm-plat-tone">{p.tone}</span>
                </div>
              </div>
              <h3 className="sm-plat-name">{p.name}</h3>
              <div className="sm-plat-audience">
                <span className="sm-plat-audience-lbl">Audience</span>
                <span>{p.audience}</span>
              </div>
              <p className="sm-plat-desc">{p.desc}</p>
              <div className="sm-plat-best">{p.bestFor}</div>
              <ul className="sm-plat-formats">
                {p.formats.map((f) => (
                  <li key={f}>
                    <span className="sm-plat-bullet" aria-hidden="true" />
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

export default Platforms;
