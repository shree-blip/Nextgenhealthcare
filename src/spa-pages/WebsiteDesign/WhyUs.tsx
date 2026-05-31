import type { ReactElement } from 'react';

interface Pillar {
  pos: 0 | 1 | 2;
  tag: string;
  name: string;
  desc: string;
  list: string[];
  icon: ReactElement;
}

const PerformanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const OwnershipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const PartnershipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const PILLARS: Pillar[] = [
  {
    pos: 0,
    tag: 'Performance',
    name: 'Speed is a feature, not an afterthought.',
    desc:
      'Sub-2-second LCP and 95+ Lighthouse scores are in the contract. We ship performance budgets, fail builds on regression, and audit at handover so nothing drifts post-launch.',
    list: [
      'Performance budget per template',
      'Lighthouse CI on every pull request',
      'Image, font, and JS budgets enforced',
      'WCAG 2.2 AA accessibility shipped, not promised',
    ],
    icon: <PerformanceIcon />,
  },
  {
    pos: 1,
    tag: 'Ownership',
    name: 'You leave with the keys, not a lease.',
    desc:
      'No proprietary CMS. No closed-source framework lock-in. No surprise re-licensing. Your code, your domain, your data — moveable to any other vendor on the day you want to leave.',
    list: [
      'Full code repo + commit history',
      'Owner-managed CMS at handover',
      'Documentation for editors and devs',
      'Migration guide if you ever switch teams',
    ],
    icon: <OwnershipIcon />,
  },
  {
    pos: 2,
    tag: 'Partnership',
    name: 'One team, accountable to one number.',
    desc:
      'Strategy, design, code, content, SEO, and care plan all under one roof. One named project lead. One weekly check-in. One dashboard tying every page to booked patients.',
    list: [
      'Named project lead from day one',
      'Weekly Loom + working session',
      'Conversion attribution rolled up monthly',
      'No vendor handoffs, no offshore, no white-label',
    ],
    icon: <PartnershipIcon />,
  },
];

const WhyUs = () => {
  return (
    <section className="sl-section wd-why-section" id="why-us">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - Why TheNextGen</div>
            <h2 className="sl-sec-title">
              Three things we won&rsquo;t <em>compromise on.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            The other agencies
            <br />
            cut all three
          </div>
        </div>

        <div className="wd-why-grid">
          {PILLARS.map((p) => (
            <article key={p.tag} className="wd-why-card" data-pos={p.pos}>
              <div className="wd-why-icon">{p.icon}</div>
              <div className="wd-why-tag">{p.tag}</div>
              <h3 className="wd-why-name">{p.name}</h3>
              <p className="wd-why-desc">{p.desc}</p>
              <ul className="wd-why-list">
                {p.list.map((item) => (
                  <li key={item}>
                    <span className="wd-why-tick" aria-hidden="true">
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
