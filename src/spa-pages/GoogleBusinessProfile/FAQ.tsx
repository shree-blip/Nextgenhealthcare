import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const GB_FAQ_ITEMS: QA[] = [
  {
    q: 'How long until our Google Business Profile ranks in the Local Pack?',
    a: 'Movement starts inside week 4 once the profile is fully populated, categories are mapped, and the first wave of reviews comes in. Most clinics hit top-3 Local Pack on service-plus-city queries in 8-12 weeks. Competitive head terms ("urgent care + major city") take 4-6 months.',
  },
  {
    q: 'We have multiple locations - one profile or many?',
    a: "One profile per physical address, always. Each gets a unique landing page, phone number, review stream, and category map. We never share a profile across locations - Google penalizes that and patients can't tell which clinic is closest.",
  },
  {
    q: 'How do you keep review responses HIPAA-safe?',
    a: 'A published response playbook: never confirm a patient relationship publicly, never mention specifics, always redirect into a private channel. Every response from a 14-template library is reviewed by a clinician before deployment. Front desk can respond fast without leaking PHI.',
  },
  {
    q: 'What about photos - does it really matter?',
    a: 'Yes. Profiles with weekly fresh photos earn +35% direction requests and +42% calls vs. profiles updated quarterly. We coordinate a quarterly shoot day and supply a drip schedule so the front desk never has to think about it.',
  },
  {
    q: 'Do you manage Apple Business Connect and Bing Places?',
    a: 'Yes - both are folded into the retainer and seeded from the same canonical NAP data, so updates stay consistent across the open web. Bing matters more than you think (Edge default + ChatGPT search).',
  },
  {
    q: 'Can you reinstate a suspended profile?',
    a: 'Yes. Most suspensions trace back to keyword-stuffed names, address violations, or category abuse. We diagnose the cause, clean the listing, file the appeal, and follow up with Google support. Average reinstatement: 4-6 weeks.',
  },
  {
    q: 'How do you track Local Pack ranking?',
    a: 'Geo-grid tracking: a map of your rank at 64 points around your catchment area, refreshed daily. Shows where you win, where you lose, and which neighborhoods to target next. Beats single-point rank tracking by miles.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. 90-day initial ramp because verification + citation work needs that long to compound, then month-to-month indefinitely. You own the profile, the listing data, and the review history at all times. Average tenure: 28 months.',
  },
];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s ease' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sl-section gb-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              The eight questions <em>every multi-location practice asks.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="gb-faq-list">
          {GB_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`gb-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="gb-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="gb-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
