import type { ReactElement } from 'react';

interface Source {
  num: string;
  name: string;
  layer: string;
  desc: string;
  bestFor: string;
  inputs: string[];
  icon: ReactElement;
}

const AdsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-5" />
    <polyline points="14 5 20 5 20 11" />
  </svg>
);
const SeoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);
const GbpIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CrmIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M17 11l2 2 4-4" />
  </svg>
);
const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const CallIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.74 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.37 1.83.62 2.79.74A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SOURCES: Source[] = [
  {
    num: '01',
    name: 'Ad platforms',
    layer: 'Spend',
    desc: 'Google Ads, Meta, LinkedIn, TikTok, YouTube, Local Services Ads. Spend, clicks, CPM, CPC, CPA - normalized into one schema across every platform.',
    bestFor: 'Best for: blended ROAS, channel mix optimization.',
    inputs: [
      'Google Ads API',
      'Meta Marketing API',
      'LinkedIn Campaign Manager',
      'TikTok Ads + LSA',
    ],
    icon: <AdsIcon />,
  },
  {
    num: '02',
    name: 'GA4 + Search Console',
    layer: 'Site',
    desc: "Pageviews, sessions, conversions, search-query data, Core Web Vitals - via server-side events so adblockers and iOS tracking-protection can't blind the data.",
    bestFor: 'Best for: organic + paid blended attribution.',
    inputs: ['GA4 server-side', 'Search Console API', 'Bing Webmaster', 'Web Vitals beacon'],
    icon: <SeoIcon />,
  },
  {
    num: '03',
    name: 'GBP + Maps',
    layer: 'Local',
    desc: 'Profile views, direction requests, calls, photo views per location. The local-pack signal most dashboards ignore - and the one that converts.',
    bestFor: 'Best for: multi-location networks, urgent care, primary care.',
    inputs: [
      'GBP API per location',
      'Apple Business Connect',
      'Bing Places',
      'Geo-grid rank tracker',
    ],
    icon: <GbpIcon />,
  },
  {
    num: '04',
    name: 'CRM + EHR',
    layer: 'Patients',
    desc: 'Lead-to-patient conversion, lifecycle stage, lifetime value. Hashed identifiers only - no PHI ever leaves your network into the warehouse.',
    bestFor: 'Best for: specialty groups, MSO networks, growth-stage practices.',
    inputs: ['HubSpot / Salesforce', 'Epic + Athena APIs', 'PMS exports', 'Hashed-ID matching'],
    icon: <CrmIcon />,
  },
  {
    num: '05',
    name: 'Booking + scheduling',
    layer: 'Conversion',
    desc: "Booked appointments, no-show rate, completed visits, revenue per booking. The conversion line that proves marketing is working - or isn't.",
    bestFor: 'Best for: any practice that runs paid acquisition.',
    inputs: [
      'NexHealth / Zocdoc',
      'Open Dental + Solutionreach',
      'Direct booking widgets',
      'Server-side conversion API',
    ],
    icon: <BookIcon />,
  },
  {
    num: '06',
    name: 'Call tracking + chat',
    layer: 'Touchpoint',
    desc: 'CallRail, AvidTrak, chatbots, AI receptionists. Speech-to-text + intent scoring so the dashboard sees the conversation, not just the connect.',
    bestFor: 'Best for: high call-volume practices (urgent, primary, derm).',
    inputs: ['CallRail BAA', 'AvidTrak', 'Dynamic Number Insertion', 'Chatbot transcripts'],
    icon: <CallIcon />,
  },
];

const DataSources = () => {
  return (
    <section className="sl-section an-src-section" id="sources">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Data sources</div>
            <h2 className="sl-sec-title">
              Six layers. <em>One unified schema.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            10+ systems
            <br />
            one source of truth
          </div>
        </div>

        <div className="an-src-grid">
          {SOURCES.map((s) => (
            <article key={s.num} className="an-src-card">
              <div className="an-src-top">
                <div className="an-src-icon">{s.icon}</div>
                <div className="an-src-meta">
                  <span className="an-src-num">{s.num}</span>
                  <span className="an-src-layer">{s.layer}</span>
                </div>
              </div>
              <h3 className="an-src-name">{s.name}</h3>
              <p className="an-src-desc">{s.desc}</p>
              <div className="an-src-best">{s.bestFor}</div>
              <ul className="an-src-inputs">
                {s.inputs.map((i) => (
                  <li key={i}>
                    <span className="an-src-bullet" aria-hidden="true" />
                    {i}
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

export default DataSources;
