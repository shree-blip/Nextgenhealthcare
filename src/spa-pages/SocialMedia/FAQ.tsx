import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const SM_FAQ_ITEMS: QA[] = [
  {
    q: 'Does social media actually drive bookings for healthcare?',
    a: 'Rarely directly. Social drives the trust between a Google click and the booking. Most patients quietly research you on Instagram or Facebook before they call. We measure assisted conversions, direct-search lift, and review velocity - not vanity follower counts.',
  },
  {
    q: 'Which platforms do you cover?',
    a: 'Instagram, Facebook, LinkedIn, TikTok, YouTube Shorts, and Pinterest. But we never recommend running more than two on day one. Two channels at 4 posts/week beats six channels at one post/week - every time.',
  },
  {
    q: 'How do you stay HIPAA-safe in public comments and DMs?',
    a: 'We use a published moderation playbook: never confirm a patient relationship in public, redirect specifics to a private channel, log every interaction, scrub identifying details from screenshots. A licensed clinician reviews any non-routine response before it ships.',
  },
  {
    q: 'Do you produce the content, or does our team?',
    a: 'Both. We script, schedule, edit, and publish 100% of it. For on-camera clinical content, we send a quarterly shot list your providers can record in under an hour at the clinic. We bring the gear or you film on a phone - both produce broadcast-quality output.',
  },
  {
    q: 'How long until we see meaningful reach lift?',
    a: 'First lift in week 4 (when posting cadence and pillar discipline kick in). Material reach lift by week 8-10. Compounding growth by month 4-6, once the algorithm has classified your account topically and audience graph has filled in.',
  },
  {
    q: 'What about patient before/after photos?',
    a: 'We treat them as the highest-risk asset on the page. Written consent is required, even when verbal would technically suffice. Faces are never shown without explicit opt-in. We default to anonymized framing or composite imagery - the conversion lift from named patients vs. anonymized is smaller than most agencies claim.',
  },
  {
    q: 'How much does paid amplification cost?',
    a: 'Separate from our retainer. For most clinics, $500-$3,000/mo on Meta is plenty - we only boost proven organic winners, never net-new creative. You\'ll usually 4-6× the reach of a winning organic post for under $200 in spend.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. 90-day initial ramp because production rhythm takes a quarter to compound, then month-to-month. We do ask for a 30-day exit notice so the editorial calendar handles the transition cleanly. Average client tenure: 27 months.',
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
    <section className="sl-section sm-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              Healthcare social media — <em>eight questions clinic owners ask before posting.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="sm-faq-list">
          {SM_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`sm-faq-item${isOpen ? ' is-open' : ''}`}>
                <button type="button" className="sm-faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="sm-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
