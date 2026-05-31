import type { ReactElement } from 'react';

interface Campaign {
  num: string;
  name: string;
  short: string;
  desc: string;
  best: string;
  features: string[];
  icon: ReactElement;
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const PmaxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const DisplayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <polygon points="10 9 16 12 10 15" fill="currentColor" />
  </svg>
);
const ShoppingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 6h15l-1.5 9h-13L6 6z" />
    <path d="M6 6L4 3H2" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
);
const LsaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <path d="M9 10l2 2 4-4" />
  </svg>
);

const CAMPAIGNS: Campaign[] = [
  {
    num: '01',
    name: 'Search Ads',
    short: 'Intent-first',
    desc: 'Text ads on Google search results - the highest-intent traffic on the internet. Patients typing "urgent care near me" are 2 minutes from booking.',
    best: 'Best for: emergency, primary, urgent, dental, specialty practices.',
    features: ['Service-line keyword maps', 'Smart bidding (tCPA, tROAS)', 'Sitelinks + callouts + structured snippets', 'Local + radius targeting'],
    icon: <SearchIcon />,
  },
  {
    num: '02',
    name: 'Performance Max',
    short: 'Cross-channel',
    desc: 'One campaign, every Google surface - Search, Display, YouTube, Discover, Maps, Gmail. AI optimizes the spend mix against your conversion goals.',
    best: 'Best for: multi-location networks, packaged services, established brands.',
    features: ['Asset group strategy', 'Audience signal seeding', 'Brand exclusions', 'Channel reporting workarounds'],
    icon: <PmaxIcon />,
  },
  {
    num: '03',
    name: 'Display Network',
    short: 'Awareness',
    desc: 'Image and responsive display ads across 2M+ partner sites and apps. Perfect for keeping your brand in front of past site visitors.',
    best: 'Best for: branded protection, remarketing, top-of-funnel awareness.',
    features: ['Remarketing lists', 'In-market audiences', 'Custom intent segments', 'Brand-safe placements'],
    icon: <DisplayIcon />,
  },
  {
    num: '04',
    name: 'YouTube Ads',
    short: 'Video reach',
    desc: 'In-stream, in-feed, and Shorts ads. The most cost-effective video reach in healthcare - and the only place AI Overviews regularly cite.',
    best: 'Best for: cosmetic, aesthetic, dental, fertility, surgical practices.',
    features: ['Skippable + non-skippable formats', 'Audience-first targeting', 'Bumper sequences', 'Drive-to-site action ads'],
    icon: <YoutubeIcon />,
  },
  {
    num: '05',
    name: 'Shopping Ads',
    short: 'Product feed',
    desc: 'Visual product listings for clinics that sell physical goods - hearing aids, contact lenses, supplements, dental aligners.',
    best: 'Best for: optometry, audiology, derm, supplement-selling clinics.',
    features: ['Merchant Center setup', 'Feed optimization', 'Smart Shopping → PMax migration', 'Local inventory ads'],
    icon: <ShoppingIcon />,
  },
  {
    num: '06',
    name: 'Local Services Ads',
    short: 'Pay-per-lead',
    desc: 'Google-screened, pay-per-lead listings above the search results. The fastest growth lever for licensed practices that qualify.',
    best: 'Best for: dental, dermatology, chiropractic, mental health.',
    features: ['License + insurance verification', 'Google-screened badge', 'Pay-per-lead pricing', 'Review-driven ranking'],
    icon: <LsaIcon />,
  },
];

const CampaignTypes = () => {
  return (
    <section className="sl-section ga-cap-section" id="campaign-types">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Campaign types</div>
            <h2 className="sl-sec-title">
              Six campaign types. <em>One unified strategy.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            We pick the mix
            <br />
            based on your goals
          </div>
        </div>

        <div className="ga-cap-grid">
          {CAMPAIGNS.map((c) => (
            <article key={c.num} className="ga-cap-card">
              <div className="ga-cap-top">
                <div className="ga-cap-icon">{c.icon}</div>
                <div className="ga-cap-meta">
                  <span className="ga-cap-num">{c.num}</span>
                  <span className="ga-cap-tag">{c.short}</span>
                </div>
              </div>
              <h3 className="ga-cap-name">{c.name}</h3>
              <p className="ga-cap-desc">{c.desc}</p>
              <div className="ga-cap-best">{c.best}</div>
              <ul className="ga-cap-features">
                {c.features.map((f) => (
                  <li key={f}>
                    <span className="ga-cap-bullet" aria-hidden="true" />
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

export default CampaignTypes;
