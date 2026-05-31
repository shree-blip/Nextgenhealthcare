import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const AN_FAQ_ITEMS: QA[] = [
  {
    q: 'Why do we need a custom dashboard when GA4 already exists?',
    a: 'GA4 sees clicks and pageviews. Practice owners need to see booked patients, attributed revenue, and channel ROI in one screen. We bridge GA4 to your booking system, CRM, EHR, and ad accounts so the dashboard answers the question you actually ask: did the spend pay off?',
  },
  {
    q: 'Can analytics actually be HIPAA-compliant?',
    a: 'Yes - with discipline. We strip PHI before any data leaves your site, run hashed identifiers for cross-system attribution, and only use BAA-covered tools downstream. You can hand the dashboard to legal without a redaction pass. The configuration is auditable end-to-end.',
  },
  {
    q: 'How long until the dashboard is reliable?',
    a: 'Two weeks to instrument and clean. Two more for back-fill and validation. By week 5 you should be making spend decisions off the report - not your gut.',
  },
  {
    q: "Do you replace our marketing agency's reports?",
    a: "We give you a neutral source of truth. Most clients keep their agency but stop trusting only the agency's own numbers. The friction usually improves the partnership - same data, no marking-their-own-homework problem.",
  },
  {
    q: 'What happens if we change CRMs or booking platforms?',
    a: 'We rebuild the connector inside one sprint. Your historical data is preserved in the warehouse layer so dashboards keep continuity across the migration. Tool changes never erase your reporting history.',
  },
  {
    q: 'Which BI tool do you use?',
    a: "We default to Looker Studio (free, Google-native, easy hand-off) but build in Tableau, Power BI, Metabase, or Hex when the team already uses one. The warehouse layer (BigQuery + dbt) is portable across all of them - you're never locked in.",
  },
  {
    q: 'Do you own our data, or do we?',
    a: 'You always own it. Warehouse + connectors + dashboards all live in your cloud account (BigQuery, Snowflake, Redshift). We operate it, you own it. If we ever part ways, nothing leaves with us.',
  },
  {
    q: 'How does pricing work?',
    a: 'Flat monthly retainer scaled to data sources + dashboard complexity. Most healthcare engagements land at $3K-$8K/mo. Setup is included, not billed separately. Warehouse + BI tool costs are passed through at cost ($50-$300/mo typical).',
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
    <section className="sl-section an-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              Healthcare marketing analytics — <em>eight questions before you instrument.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="an-faq-list">
          {AN_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`an-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="an-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="an-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
