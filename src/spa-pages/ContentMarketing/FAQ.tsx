import { useState } from 'react';

interface QA { q: string; a: string }

export const CM_FAQ_ITEMS: QA[] = [
  {
    q: 'Is AI-written content okay for healthcare SEO in 2026?',
    a: 'AI scaffolding is fine; AI without clinician review is not. We use AI for outlines and structural drafts, then a credentialed reviewer rewrites and signs. Google\'s helpful-content updates explicitly reward this hybrid model - and explicitly penalize unreviewed AI in YMYL categories. Healthcare content without a clinician byline simply can\'t rank top-3 anymore.',
  },
  {
    q: 'How many articles per month do we actually need?',
    a: 'Four well-researched pieces beat twenty thin ones. We target two pillar articles plus two supporting pieces a month for a single-location clinic, scaling to 6-12 for multi-location systems with AEO ambitions. Depth compounds; volume just dilutes.',
  },
  {
    q: 'Who writes the content - in-house staff or contractors?',
    a: 'A small, vetted team of healthcare-specialist writers (most with clinical backgrounds), paired with licensed clinician reviewers on staff. No offshore content mills, no AI-only output, no generalist freelance pools. Every piece carries a real human byline.',
  },
  {
    q: 'How long until content starts ranking?',
    a: 'Long-tail condition queries land in 6-10 weeks. Competitive head terms compound at 4-7 months. AI Overview citations typically start at month 3-4 once topical authority is established. We track each article\'s rank, CTR, and assisted conversion every week.',
  },
  {
    q: 'Do you write location pages too?',
    a: 'Yes - and they\'re usually the highest-converting page type. Each location page is bespoke, with real photography, real reviews, and locally-relevant condition coverage. Spun copy never ships from us. For multi-location networks, we maintain a template + variation framework that scales without losing voice.',
  },
  {
    q: 'How do you handle HIPAA when using real patient stories?',
    a: 'Three options: composite case stories (fictionalized but representative), fully de-identified narratives, or signed HIPAA authorization for named stories. Every published piece passes a compliance checklist before going live. The default is composite + de-identified; named stories are reserved for cases where the patient explicitly wants to share.',
  },
  {
    q: 'What about AEO and AI search?',
    a: 'Built into every brief from day one. We engineer articles for AI surfacing - question-first structure, citable stats, FAQPage schema, primary-source references. Most of our 2025 cohort sees AI Overview citations within 90 days of pillar publication.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'Content marketing genuinely needs 6-12 months to compound. We ask for a 6-month initial commitment, then month-to-month indefinitely. You own every asset - articles, schema, briefs, editorial calendar - from day one. Most clients stay 24+ months because the library compounds.',
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
    <section className="sl-section cm-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              Healthcare content marketing — <em>eight questions before commissioning a quarter.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="cm-faq-list">
          {CM_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`cm-faq-item${isOpen ? ' is-open' : ''}`}>
                <button type="button" className="cm-faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="cm-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
