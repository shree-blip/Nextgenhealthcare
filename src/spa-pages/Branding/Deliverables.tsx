import type { ReactElement } from 'react';

interface Deliverable {
  num: string;
  name: string;
  layer: string;
  desc: string;
  bestFor: string;
  outputs: string[];
  icon: ReactElement;
}

const IdentityIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const VoiceIcon = () => (
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
const PositionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M2 12h20" />
  </svg>
);
const SystemIcon = () => (
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
const ExperienceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
  </svg>
);
const GuidelinesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const DELIVERABLES: Deliverable[] = [
  {
    num: '01',
    name: 'Visual Identity',
    layer: 'Foundation',
    desc: 'Mark, lockups, color, typography, photography direction. The signature that walks into every patient interaction first.',
    bestFor: 'Best for: rebrands, M&A consolidation, refreshes after 7+ years.',
    outputs: [
      'Primary mark + lockups',
      'Color tokens + accessibility pairs',
      'Type system (display + body + UI)',
      'Photography art direction',
    ],
    icon: <IdentityIcon />,
  },
  {
    num: '02',
    name: 'Voice & Messaging',
    layer: 'Tone',
    desc: 'Tagline, value proposition, voice rules, sample copy. The words your front desk, your provider bios, and your ad headlines all share.',
    bestFor: 'Best for: practices that sound generic next to competitors.',
    outputs: [
      'Positioning statement',
      'Voice + tone framework',
      'Tagline + 5 headlines',
      'Sample copy library',
    ],
    icon: <VoiceIcon />,
  },
  {
    num: '03',
    name: 'Positioning',
    layer: 'Strategy',
    desc: "What you stand for, who you're not for, why a patient would choose you over the clinic 2 miles closer. The hardest part - and the part that compounds the longest.",
    bestFor: 'Best for: crowded specialties, new-market entries, MSO unification.',
    outputs: [
      'Competitive map',
      'Audience archetypes',
      'Value-prop hierarchy',
      'Positioning brief',
    ],
    icon: <PositionIcon />,
  },
  {
    num: '04',
    name: 'Brand System',
    layer: 'Application',
    desc: 'Design tokens, component library, layout rules. The system every page, post, and ad inherits from - so the team can ship on-brand without designer review.',
    bestFor: 'Best for: multi-location networks, high-volume content teams.',
    outputs: [
      'Figma design tokens',
      'Component library',
      'Layout templates',
      'Asset naming conventions',
    ],
    icon: <SystemIcon />,
  },
  {
    num: '05',
    name: 'Patient Experience',
    layer: 'Touchpoints',
    desc: 'Signage, intake forms, post-visit notes, room art, on-hold music, scrub colors. The 50+ touchpoints where the brand actually meets the patient.',
    bestFor: 'Best for: practices investing in physical experience + service design.',
    outputs: [
      'Touchpoint inventory',
      'Signage system',
      'Print collateral',
      'Environmental brand kit',
    ],
    icon: <ExperienceIcon />,
  },
  {
    num: '06',
    name: 'Brand Guidelines',
    layer: 'Governance',
    desc: "The documented system your team applies without us in the room. Logo do's + don'ts, color usage, voice examples, photography rules. Not a 200-page PDF - a working manual.",
    bestFor: 'Best for: every engagement. Non-negotiable deliverable.',
    outputs: [
      '40-60 page guidelines PDF',
      'Component-level web reference',
      'Voice + tone playbook',
      'Quarterly review framework',
    ],
    icon: <GuidelinesIcon />,
  },
];

const Deliverables = () => {
  return (
    <section className="sl-section br-del-section" id="deliverables">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Deliverables</div>
            <h2 className="sl-sec-title">
              Six layers. <em>One coherent system.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Pressure-tested
            <br />
            before sign-off
          </div>
        </div>

        <div className="br-del-grid">
          {DELIVERABLES.map((d) => (
            <article key={d.num} className="br-del-card">
              <div className="br-del-top">
                <div className="br-del-icon">{d.icon}</div>
                <div className="br-del-meta">
                  <span className="br-del-num">{d.num}</span>
                  <span className="br-del-layer">{d.layer}</span>
                </div>
              </div>
              <h3 className="br-del-name">{d.name}</h3>
              <p className="br-del-desc">{d.desc}</p>
              <div className="br-del-best">{d.bestFor}</div>
              <ul className="br-del-outputs">
                {d.outputs.map((o) => (
                  <li key={o}>
                    <span className="br-del-bullet" aria-hidden="true" />
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

export default Deliverables;
