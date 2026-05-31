import type { ReactElement } from 'react';

interface Pillar {
  pos: 0 | 1 | 2;
  tag: string;
  name: string;
  desc: string;
  list: string[];
  icon: ReactElement;
}

const PrecisionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);
const PerformanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const AccountabilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const PILLARS: Pillar[] = [
  {
    pos: 0,
    tag: 'Precision',
    name: 'Targeting that respects healthcare.',
    desc:
      'Meta restricts targeting on sensitive health categories. We build compliant audience stacks that still find your patient — no shortcuts, no policy strikes.',
    list: [
      'Geo + behavioural + lookalike stacks',
      'Healthcare-policy-screened audience plans',
      'Server-side Conversions API, not pixel-only',
      'Audience refresh cadence so fatigue never bites',
    ],
    icon: <PrecisionIcon />,
  },
  {
    pos: 1,
    tag: 'Performance',
    name: 'Creative that does the heavy lifting.',
    desc:
      'Algorithms reward creative variety. Our in-house production ships eight to twelve compliant assets a month — UGC, in-clinic, static, and motion — tested against winners, not opinions.',
    list: [
      'In-house scriptwriters and editors',
      'Structured A/B testing on every launch',
      'Vertical-native shoots, never repurposed',
      'Quarterly creative refit on retainer',
    ],
    icon: <PerformanceIcon />,
  },
  {
    pos: 2,
    tag: 'Accountability',
    name: 'A dashboard you can defend at the board.',
    desc:
      'Every dollar reconciled to a booked appointment. Named campaign lead on speed-dial. Month-to-month after the 90-day ramp — because if we&rsquo;re not delivering, you should be free to walk.',
    list: [
      'Live dashboard with patient-level attribution',
      'Weekly Loom walk-through, monthly retro',
      'Named lead, no offshore, no white-label',
      'No media markup — your ad spend is your ad spend',
    ],
    icon: <AccountabilityIcon />,
  },
];

const WhyUs = () => {
  return (
    <section className="sl-section ma-why-section" id="why-us">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - Why TheNextGen</div>
            <h2 className="sl-sec-title">
              Three things we won&rsquo;t <em>compromise on.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            The other options
            <br />
            cut all three
          </div>
        </div>

        <div className="ma-why-grid">
          {PILLARS.map((p) => (
            <article key={p.tag} className="ma-why-card" data-pos={p.pos}>
              <div className="ma-why-icon">{p.icon}</div>
              <div className="ma-why-tag">{p.tag}</div>
              <h3 className="ma-why-name">{p.name}</h3>
              <p className="ma-why-desc">{p.desc}</p>
              <ul className="ma-why-list">
                {p.list.map((item) => (
                  <li key={item}>
                    <span className="ma-why-tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    {item}
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

export default WhyUs;
