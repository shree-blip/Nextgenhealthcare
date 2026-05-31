import { useState } from 'react';

interface QA { q: string; a: string }

export const EM_FAQ_ITEMS: QA[] = [
  {
    q: 'Is healthcare email actually HIPAA-compliant?',
    a: 'It can be - when the ESP signs a BAA, when PHI is never carried in the message body, when consent is captured the right way, and when authentication (SPF/DKIM/DMARC) is configured. We build every drip on that footing and document the trail so an audit reads cleanly.',
  },
  {
    q: 'Which ESPs do you support?',
    a: 'BAA-covered: Mailchimp Pro, Klaviyo, HubSpot, ActiveCampaign, Customer.io, Postmark. We never use a tool without a BAA in place. If your current vendor doesn\'t sign one, migration is part of week 1.',
  },
  {
    q: 'How is this different from our EHR\'s built-in messaging?',
    a: 'EHR messaging is transactional - reminders and confirmations. Drip campaigns are the relationship layer on top: education, reactivation, win-back, referral. They run in parallel without duplicating sends. Both are needed; they don\'t compete.',
  },
  {
    q: 'What open and click rates should we expect?',
    a: 'Lifecycle drips run 45-70% open rate and 10-25% click rate - dramatically higher than promotional sends. We grade against the right cohort, not a generic industry average. Apple MPP inflates open rate ~40%, so we report MPP-adjusted alongside raw.',
  },
  {
    q: 'How long does it take to launch?',
    a: 'Three weeks to four flows live (Welcome, Post-visit, Recall, Referral). Six weeks to attribution + tuning. The library deepens quarterly once we see what actually pulls bookings.',
  },
  {
    q: 'What about deliverability when we scale?',
    a: 'Treated as an active KPI, not a passive metric. We warm sending IPs, segment by engagement, prune inactive contacts every 90 days, and monitor DMARC reports weekly. Inbox placement is reviewed every Friday.',
  },
  {
    q: 'Do you write the copy, or do we?',
    a: 'We write it from a provider voice interview - your tone, your phrasing, your sign-off. You approve every email before it ships. Most clients spend 30 minutes a quarter on approvals; we handle the rest.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. 90-day initial ramp because deliverability needs a quarter to compound, then month-to-month indefinitely. You own the ESP account, the list, and every template at all times. Average client tenure: 29 months.',
  },
];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s ease' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sl-section em-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              Healthcare email & patient drips — <em>eight questions before launch.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="em-faq-list">
          {EM_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`em-faq-item${isOpen ? ' is-open' : ''}`}>
                <button type="button" className="em-faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="em-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
