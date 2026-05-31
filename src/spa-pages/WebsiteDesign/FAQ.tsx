import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const WD_FAQ_ITEMS: QA[] = [
  {
    q: 'How long does a new healthcare website take to build?',
    a: 'Ten weeks is our standard window for a single-location clinic — two weeks of discovery, three of design, four of build, and a controlled launch in week ten. Multi-location and specialty groups typically run 12-16 weeks. We will not start without a written plan that fits the calendar.',
  },
  {
    q: 'How much does it cost?',
    a: 'Essential single-location builds start at $7,500. Growth-tier programs (multi-service, multi-template) start at $14,500. Enterprise and multi-location custom builds start at $28,000. Pricing is fixed-fee, scoped against a written brief — no hourly billing, no scope-creep invoices.',
  },
  {
    q: 'Do you build on WordPress, Webflow, or something custom?',
    a: 'Whatever your team can actually maintain after handover. Our default for new builds is Next.js + headless WordPress (best of both worlds), but we also ship Webflow, Shopify Hydrogen, and full-custom React when the situation calls for it. We are framework-agnostic on purpose.',
  },
  {
    q: 'Will my new site be HIPAA-compliant?',
    a: 'Yes. Forms, intake flows, and analytics are configured to strip PHI at the source and route data only through BAA-covered tools. The configuration is auditable by your compliance officer in writing, and we document the entire data path so future updates do not break compliance.',
  },
  {
    q: 'What about accessibility?',
    a: 'WCAG 2.2 AA is in the contract, not the wish list. Keyboard nav, screen-reader audits, contrast scoring, and remediation run in every sprint. axe and Lighthouse CI fail the build on regression. You get a VPAT-ready accessibility statement at launch.',
  },
  {
    q: 'How fast will it be?',
    a: 'Sub-2-second LCP and 95+ Lighthouse Performance on launch day — written into the contract. We ship performance budgets per template and audit at handover. Average across 2025 healthcare launches: 1.4s LCP and Lighthouse 98.',
  },
  {
    q: 'Do you handle SEO, Google Ads, and the rest, or just the website?',
    a: 'Full service. SEO, Google Ads, Meta Ads, content, automation, reviews, and field marketing all live under the same roof. The new website is the foundation everything else runs on — and it compounds when the rest of the stack is built right.',
  },
  {
    q: 'Will I own the code and the CMS?',
    a: 'Yes. Full code repository with commit history, owner-managed CMS, your domain, your hosting account, your data. No proprietary platform. No re-licensing trap. If you ever want to switch agencies, the next team can pick it up on day one — we even document the migration.',
  },
  {
    q: 'Can you redesign just the homepage, or do we have to rebuild everything?',
    a: 'We will tell you honestly which option fits. About 30% of engagements start as a homepage and key-template redesign on the existing CMS. The rest are full rebuilds because the foundation needs replacing. The audit makes that call before we propose a number.',
  },
  {
    q: 'What happens after launch?',
    a: 'A 30-day tuning sprint to fix what real traffic surfaces, then an optional monthly care plan covering security patching, CRO experiments, content updates, and performance audits. Most clinics stay on care plans for the long run, but they are month-to-month and never required.',
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
    <section className="sl-section wd-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - FAQ</div>
            <h2 className="sl-sec-title">
              Questions practice owners <em>actually ask us.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="wd-faq-list">
          {WD_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`wd-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="wd-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="wd-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
