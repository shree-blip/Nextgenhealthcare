import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const GA_FAQ_ITEMS: QA[] = [
  {
    q: 'How much should a healthcare practice spend on Google Ads?',
    a: 'Below $3,000/mo you’re mostly testing - Google needs spend volume for smart bidding to learn. Sweet spot for single-location clinics is $5,000-$15,000/mo. Multi-location networks should expect $15,000-$60,000/mo. Our retainer is separate from your ad spend; we never markup media.',
  },
  {
    q: 'How quickly will CPA come down?',
    a: 'Most clinics see meaningful CPA reductions in the first 30 days from negative-keyword cleanup and conversion-tracking fixes alone. Sustained reductions land in months 2-3 once smart bidding has enough clean conversion data. Our average across 180 accounts: −42% CPA inside the first 90 days.',
  },
  {
    q: 'Is Google Ads HIPAA-compliant?',
    a: 'Google Ads itself does not touch PHI, but the default Google tag can. We deploy server-side conversion APIs, strip PHI from URLs and form payloads before any data leaves your site, and only use BAA-covered tools downstream. The configuration is auditable by your compliance officer.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. We run a 90-day ramp, then month-to-month indefinitely. Most clients stay because the dashboard makes the spend defensible - not because the contract forces them to. Average tenure: 31 months.',
  },
  {
    q: 'Will you take over an existing Google Ads account?',
    a: 'Yes - it’s about 70% of how we start. We import history, preserve learning, audit the structure, and stabilize before we change anything aggressive. You keep ownership of the account at all times; we just operate it.',
  },
  {
    q: 'What’s the difference between Performance Max and Search?',
    a: 'Search is text ads on Google search results - the highest-intent traffic. PMax is one AI-driven campaign that runs across all Google surfaces. For most clinics, Search is the foundation; PMax is layered on top once Search is profitable and there\'s enough conversion data to feed the AI.',
  },
  {
    q: 'Do we need Google Ads if we already do SEO?',
    a: 'They’re complementary, not redundant. SEO captures patients who want to compare and research; Ads captures patients who need help right now. The math we see: Ads + SEO together cost less per booked patient than either alone, because each fills the other’s gaps.',
  },
  {
    q: 'Who actually does the work?',
    a: 'A named lead with 5+ years of Google Ads experience in healthcare, supported by an in-house team for tracking, landing pages, and creative. No offshore, no white-label, no junior-rotation. You can meet them on the first call.',
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
    <section className="sl-section ga-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              Healthcare Google Ads — <em>eight questions clinic owners ask before launch.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="ga-faq-list">
          {GA_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`ga-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="ga-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="ga-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
