import type { ReactElement } from 'react';

interface Flow {
  num: string;
  name: string;
  trigger: string;
  desc: string;
  bestFor: string;
  emails: string[];
  icon: ReactElement;
}

const WelcomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
  </svg>
);
const PostVisitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4" />
    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.39 0 4.68.94 6.36 2.64" />
  </svg>
);
const RecallIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const WinbackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
const ReferralIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 11h-6M20 8v6" />
  </svg>
);
const NewsletterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);

const FLOWS: Flow[] = [
  {
    num: '01',
    name: 'Welcome series',
    trigger: 'New patient signup',
    desc: 'The first 7 days set every later relationship. Three emails that explain what to expect, what to bring, and how to reach you - before the first visit.',
    bestFor: 'Best for: new-patient activation, no-show prevention.',
    emails: ['Email 1: Welcome + 3 things to know', 'Email 2: What to bring + parking', 'Email 3: Meet the team (Reel embed)'],
    icon: <WelcomeIcon />,
  },
  {
    num: '02',
    name: 'Post-visit follow-up',
    trigger: 'Appointment completed',
    desc: 'Highest-intent moment in the patient journey. Confirms aftercare, asks for review, captures the booking for the next visit while gratitude is fresh.',
    bestFor: 'Best for: review velocity, aftercare adherence, next-visit booking.',
    emails: ['Email 1: Aftercare instructions (Day 0)', 'Email 2: Review request (Day 2)', 'Email 3: Next-visit prompt (Day 7)'],
    icon: <PostVisitIcon />,
  },
  {
    num: '03',
    name: 'Recall + reactivation',
    trigger: 'No visit in N months',
    desc: 'The single highest-ROI drip in healthcare. Patients want to come back - they just need a low-friction reminder and a 60-second booking link.',
    bestFor: 'Best for: dental, dermatology, optometry, derm, primary care.',
    emails: ['Email 1: Friendly nudge + booking link (3 mo)', 'Email 2: What\'s new at the practice (6 mo)', 'Email 3: Final outreach + provider voice (9 mo)'],
    icon: <RecallIcon />,
  },
  {
    num: '04',
    name: 'Win-back',
    trigger: 'Dormant 12+ months',
    desc: 'Quietly reactivates patients who drifted. Personal voice, no offers in email one, soft incentive in email three. 4-9% reactivation is normal.',
    bestFor: 'Best for: any practice with a list older than 18 months.',
    emails: ['Email 1: Personal check-in from the provider', 'Email 2: What\'s changed since you were last in', 'Email 3: Optional comeback offer'],
    icon: <WinbackIcon />,
  },
  {
    num: '05',
    name: 'Referral ask',
    trigger: 'Post-positive-review',
    desc: 'Triggered automatically after a 4-5 star review. The compounding lever most practices never automate - earns 3-7% of new-patient acquisition by month 6.',
    bestFor: 'Best for: established practices, NPS-positive networks.',
    emails: ['Email 1: Thank-you + shareable link (Day 1)', 'Email 2: Friends-and-family offer (Day 14)', 'Email 3: Holiday/seasonal referral push'],
    icon: <ReferralIcon />,
  },
  {
    num: '06',
    name: 'Newsletter + nurture',
    trigger: 'Monthly cadence',
    desc: 'Educational long-form for engaged patients. Not transactional. The pillar that turns the practice into a brand and keeps the list warm between visits.',
    bestFor: 'Best for: specialty groups, mission-driven brands, opt-in lists.',
    emails: ['Monthly: Provider Q&A + seasonal tips', 'Quarterly: Service-line spotlight', 'Annual: Year-in-review impact report'],
    icon: <NewsletterIcon />,
  },
];

const FlowTypes = () => {
  return (
    <section className="sl-section em-flow-section" id="flows">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - Flow types</div>
            <h2 className="sl-sec-title">
              Six flows. <em>Sequenced for compounding.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Ship four
            <br />
            in 21 days
          </div>
        </div>

        <div className="em-flow-grid">
          {FLOWS.map((f) => (
            <article key={f.num} className="em-flow-card">
              <div className="em-flow-top">
                <div className="em-flow-icon">{f.icon}</div>
                <div className="em-flow-meta">
                  <span className="em-flow-num">{f.num}</span>
                  <span className="em-flow-trigger">{f.trigger}</span>
                </div>
              </div>
              <h3 className="em-flow-name">{f.name}</h3>
              <p className="em-flow-desc">{f.desc}</p>
              <div className="em-flow-best">{f.bestFor}</div>
              <ul className="em-flow-emails">
                {f.emails.map((e) => (
                  <li key={e}>
                    <span className="em-flow-bullet" aria-hidden="true" />
                    {e}
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

export default FlowTypes;
