import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const SEO_FAQ_ITEMS: QA[] = [
  {
    q: 'How long does SEO actually take for a healthcare practice?',
    a: 'Technical fixes show up in 2-4 weeks. Local Pack movement begins around week 6. Sustainable organic traffic growth - the kind that scales bookings - lands between months 3 and 6, then compounds. Anyone promising week-1 results is either lying or stuffing keywords in a way that will catch up to you.',
  },
  {
    q: 'Is SEO HIPAA-compliant?',
    a: 'SEO itself does not touch PHI, but the tracking that surrounds it can. We deploy server-side conversion APIs, scrub PHI before any data leaves your site, and only use BAA-covered tools for downstream analytics. We can hand the configuration to your compliance officer without a redaction pass.',
  },
  {
    q: 'How is healthcare SEO different from regular SEO?',
    a: 'Three things. (1) YMYL weighting - Google treats medical content with the highest quality bar. (2) Local Pack matters more than national rankings for most practice types. (3) Compliance constrains tracking, copy, and review collection in ways no e-commerce SEO ever deals with. A generalist agency learns this on your retainer; we built around it.',
  },
  {
    q: 'Do you guarantee #1 rankings?',
    a: 'No - and any agency that does is misleading you. Google explicitly prohibits guaranteeing rankings. What we guarantee is the work, the methodology, and that you will see the leading indicators (impressions, average position, indexed pages, Local Pack share) move in the right direction inside the first 90 days.',
  },
  {
    q: 'What is AEO and do we need it?',
    a: 'Answer Engine Optimization is the discipline of getting your content quoted by AI answer engines - Google AI Overview, Perplexity, ChatGPT search. It now sits alongside SEO, not after it. For healthcare, AEO is becoming the first impression for many patient queries. If you wait until your competitor is the cited source, you are years behind.',
  },
  {
    q: 'How much does healthcare SEO cost?',
    a: 'Retainers start at $2,500/mo (Starter), $4,500/mo (Growth), $7,500/mo (Scale). The differences are not feature gates - they are how much of the workload we own end-to-end vs. share with your in-house team. No 12-month lock-in; we work quarter-to-quarter.',
  },
  {
    q: 'Will SEO replace our Google Ads spend?',
    a: 'Not immediately, but it should compound past it. The math we see across clients: paid spend stays flat or drops 20-30%, while organic share rises from ~10% to ~55% of total inbound. Together they cost less and bring in more. We rarely recommend dropping Ads entirely - they cover what SEO is still climbing toward.',
  },
  {
    q: 'Who actually does the work?',
    a: 'A named lead with at least four years of healthcare SEO experience, supported by an in-house team for technical, content, and link work. No offshore hand-off, no junior-rotation, no white-label resellers. You can meet them on the first call.',
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
    <section className="sl-section seo-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">10 - FAQ</div>
            <h2 className="sl-sec-title">
              What practice owners <em>actually ask first.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="seo-faq-list">
          {SEO_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`seo-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="seo-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="seo-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
