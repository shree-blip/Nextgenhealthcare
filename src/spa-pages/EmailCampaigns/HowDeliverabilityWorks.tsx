interface Factor {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const FACTORS: Factor[] = [
  {
    letter: 'R',
    name: 'Sender Reputation',
    weight: 'Pillar 1',
    desc: 'Your domain + IP\'s history of clean sends, low complaints, low bounces. Built over months, lost in days.',
    examples: ['Domain age + warm-up', 'Complaint rate (<0.1%)', 'Hard-bounce rate (<2%)'],
  },
  {
    letter: 'A',
    name: 'Authentication',
    weight: 'Pillar 2',
    desc: 'SPF, DKIM, and DMARC records prove the mail really comes from you. Without all three, your sends never see the primary inbox.',
    examples: ['SPF record', 'DKIM signing', 'DMARC policy (p=quarantine min)'],
  },
  {
    letter: 'E',
    name: 'Engagement',
    weight: 'Pillar 3',
    desc: 'Opens, replies, clicks, and how often recipients move you out of spam. Gmail and Outlook weight this most heavily.',
    examples: ['Open rate (>20%)', 'Reply + click signals', 'Spam-folder rescue rate'],
  },
  {
    letter: 'H',
    name: 'List Hygiene',
    weight: 'Pillar 4',
    desc: 'Pruning inactives, removing role accounts, suppressing complaints. A dormant list silently destroys deliverability faster than any bad send.',
    examples: ['180-day inactive suppression', 'Bounce-handling rules', 'Re-permission campaigns'],
  },
];

const FORMULA = [
  { token: 'Inbox Placement', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'Reputation', kind: 'var', tone: 'r' },
  { token: '×', kind: 'op' },
  { token: 'Authentication', kind: 'var', tone: 'a' },
  { token: '+', kind: 'op' },
  { token: 'Engagement', kind: 'var', tone: 'e' },
  { token: '+', kind: 'op' },
  { token: 'Hygiene', kind: 'var', tone: 'h' },
];

const HowDeliverabilityWorks = () => {
  return (
    <section className="sl-section em-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How deliverability works</div>
            <h2 className="sl-sec-title">
              The inbox is earned. <em>Four pillars decide it.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Not the message
            <br />
            The infrastructure
          </div>
        </div>

        <p className="em-how-intro">
          The best subject line in the world doesn&rsquo;t matter if you
          never reach the inbox. Gmail, Outlook, Yahoo, and Apple Mail all
          weight the same four pillars to decide whether your send lands in
          Primary, Promotions, or Spam. Healthcare senders fail on these
          more often than on copywriting - and that&rsquo;s exactly the kind
          of failure no one notices until revenue stops moving.
        </p>

        <div className="em-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`em-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="em-how-grid">
          {FACTORS.map((f, i) => (
            <article key={f.name} className="em-how-card" data-pos={i}>
              <div className="em-how-letter" aria-hidden="true">{f.letter}</div>
              <div className="em-how-meta">
                <h3 className="em-how-name">{f.name}</h3>
                <span className="em-how-weight">{f.weight}</span>
              </div>
              <p className="em-how-desc">{f.desc}</p>
              <ul className="em-how-examples">
                {f.examples.map((e) => (
                  <li key={e}>
                    <span className="em-how-bullet" aria-hidden="true">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="em-how-callout">
          <div className="em-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            Most healthcare email is sent from a domain that&rsquo;s
            unauthenticated, on an IP shared with the EHR&rsquo;s
            transactional mail, with no DMARC policy. That stack lands 30-40%
            of legitimate patient mail in spam. The fix isn&rsquo;t writing
            better emails - it&rsquo;s rebuilding the sender infrastructure
            so the inbox treats you the way Mailchimp treats Mailchimp.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowDeliverabilityWorks;
