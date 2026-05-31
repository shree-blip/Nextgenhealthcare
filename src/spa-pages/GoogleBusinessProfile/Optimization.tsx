import type { ReactElement } from 'react';

interface Area {
  num: string;
  name: string;
  weight: string;
  desc: string;
  bestFor: string;
  outputs: string[];
  icon: ReactElement;
}

const ProfileIcon = () => (
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
  </svg>
);
const CategoryIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const PhotoIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);
const ReviewIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const PostIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const InsightIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="20" x2="4" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="20" y1="20" x2="20" y2="14" />
  </svg>
);

const AREAS: Area[] = [
  {
    num: '01',
    name: 'Profile completeness',
    weight: 'Foundation',
    desc: 'Every field used: NAP, hours (including holidays), service area, attributes, services, products, FAQ, social links. Profiles at 100% completeness rank 2-3 positions higher on average.',
    bestFor: 'Best for: every clinic - this is the baseline.',
    outputs: [
      'NAP audit + lock',
      'Hours + holiday calendar',
      '40+ attribute fields filled',
      'Service-line listings',
    ],
    icon: <ProfileIcon />,
  },
  {
    num: '02',
    name: 'Categories & services',
    weight: 'Relevance',
    desc: 'Primary + 9 secondary categories matched to service lines. The single biggest lever for ranking against specific patient searches - "pediatric dentist" vs. broad "dentist".',
    bestFor: 'Best for: specialty practices, multi-service clinics.',
    outputs: [
      'Category map by location',
      'Service description copy',
      'Service-area cluster strategy',
      'Quarterly category review',
    ],
    icon: <CategoryIcon />,
  },
  {
    num: '03',
    name: 'Photos & visual',
    weight: 'Engagement',
    desc: 'Profiles with weekly fresh photos earn 35% more direction requests + 42% more calls. Quarterly capture day + drip cadence so the feed stays alive.',
    bestFor: 'Best for: clinics where the space, team, or experience matters.',
    outputs: [
      'Quarterly shoot day',
      'Weekly drip schedule',
      'Interior + team + exterior shots',
      'Geo-tagged uploads',
    ],
    icon: <PhotoIcon />,
  },
  {
    num: '04',
    name: 'Reviews & reputation',
    weight: 'Authority',
    desc: 'Review velocity, response cadence, and sentiment routing. The strongest map-rank signal after categories. HIPAA-safe templates so the front desk can respond fast without leaking PHI.',
    bestFor: 'Best for: every patient-facing practice.',
    outputs: [
      'Review-request automation',
      'HIPAA-safe response library',
      '24-hour response SLA',
      'Negative review escalation',
    ],
    icon: <ReviewIcon />,
  },
  {
    num: '05',
    name: 'Posts & Q&A',
    weight: 'Activity',
    desc: 'Weekly Google Posts signal an active profile to the algorithm. Q&A pre-seeded with the most-asked patient questions - controls the narrative before anyone else can.',
    bestFor: 'Best for: practices with seasonal services, events, offers.',
    outputs: [
      'Weekly post calendar',
      'Q&A seeding (15-20 entries)',
      'Event + offer posts',
      'Booking link CTAs',
    ],
    icon: <PostIcon />,
  },
  {
    num: '06',
    name: 'Insights & tracking',
    weight: 'Measurement',
    desc: 'Profile views, calls, direction requests, message volume, photo views - tracked daily, attributed to revenue. The dashboard that proves GBP is working.',
    bestFor: 'Best for: networks reporting to PE, boards, or executive teams.',
    outputs: [
      'Live dashboard per location',
      'Daily anomaly alerts',
      'Monthly written retro',
      'Booked-revenue attribution',
    ],
    icon: <InsightIcon />,
  },
];

const Optimization = () => {
  return (
    <section className="sl-section gb-opt-section" id="optimization">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - What we optimize</div>
            <h2 className="sl-sec-title">
              Six levers. <em>Each one moves the map.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Per location
            <br />
            every week
          </div>
        </div>

        <div className="gb-opt-grid">
          {AREAS.map((a) => (
            <article key={a.num} className="gb-opt-card">
              <div className="gb-opt-top">
                <div className="gb-opt-icon">{a.icon}</div>
                <div className="gb-opt-meta">
                  <span className="gb-opt-num">{a.num}</span>
                  <span className="gb-opt-weight">{a.weight}</span>
                </div>
              </div>
              <h3 className="gb-opt-name">{a.name}</h3>
              <p className="gb-opt-desc">{a.desc}</p>
              <div className="gb-opt-best">{a.bestFor}</div>
              <ul className="gb-opt-outputs">
                {a.outputs.map((o) => (
                  <li key={o}>
                    <span className="gb-opt-bullet" aria-hidden="true" />
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

export default Optimization;
