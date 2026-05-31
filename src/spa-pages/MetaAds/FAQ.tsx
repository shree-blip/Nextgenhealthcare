import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const MA_FAQ_ITEMS: QA[] = [
  {
    q: 'How much should a healthcare practice spend on Meta Ads?',
    a: 'For single-location clinics, the sweet spot is $1,500-$8,000/mo in ad spend. Below $1,000/mo Meta can&rsquo;t exit the learning phase, so the algorithm never stabilises. Multi-location and aesthetic networks typically run $8,000-$40,000/mo. Our retainer is separate from media — we never markup ad spend.',
  },
  {
    q: 'How quickly will we see leads?',
    a: 'First leads usually land in week four — once tracking is clean, creative is live, and the algorithm has exited the learning phase. Meaningful CPL reductions arrive in months two and three as the audience model fills out with quality signal.',
  },
  {
    q: 'Are Meta Ads HIPAA-compliant by default?',
    a: 'No. Meta&rsquo;s default pixel can leak PHI in URL parameters and form payloads. We deploy server-side Conversions API, strip PHI at the source, and route data only through BAA-covered tools downstream. The configuration is auditable by your compliance officer in writing.',
  },
  {
    q: 'Will you take over an existing Meta Ads account?',
    a: 'Yes — about 75% of how we start. You keep ownership of Business Manager and the ad account at all times. We get assigned-partner access, preserve historical learning, audit the structure, and stabilise before any aggressive restructure.',
  },
  {
    q: 'Do you produce the creative or do we have to send footage?',
    a: 'We produce. Our in-house team scripts, briefs, edits, and compliance-screens 8-12 fresh assets per month per active account. For UGC we coordinate with your existing patients or our talent network. We can also direct an in-clinic shoot when production value matters.',
  },
  {
    q: 'What if our last agency got our ad account flagged?',
    a: 'We&rsquo;ve handled it. We audit the violation history, write the appeal, restructure non-compliant audiences and creative, and rebuild trust signals before scaling spend. Most flagged accounts are back to full-strength inside six weeks.',
  },
  {
    q: 'Do you handle SEO, Google Ads, and the rest, or only Meta?',
    a: 'We&rsquo;re a full-service healthcare growth team — SEO, Google Ads, websites, branding, content, automation, and reviews all live under the same roof. Meta Ads is one of the strongest plays we run, and it compounds when the rest of the stack is built right.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. We run a 90-day ramp, then month-to-month indefinitely. Most clinics stay because the dashboard makes the spend defensible — not because the contract forces them to. Average tenure across our retained accounts is 27 months.',
  },
  {
    q: 'Who actually runs our account?',
    a: 'A named campaign lead with healthcare-specific Meta experience, backed by an in-house creative team and a tracking engineer. No offshore, no white-label, no junior-rotation. You can meet your lead on the first call before you sign anything.',
  },
  {
    q: 'What does the free audit actually include?',
    a: 'A two-week forensic readout. We open your Business Manager live, walk through account structure, creative, audience overlap, event quality, and policy risk, then deliver a written one-page summary with the three highest-impact fixes. You keep the audit whether you sign with us or not.',
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
    <section className="sl-section ma-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - FAQ</div>
            <h2 className="sl-sec-title">
              Questions clinic owners <em>actually ask us.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="ma-faq-list">
          {MA_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`ma-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="ma-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && (
                  <div
                    className="ma-faq-a"
                    dangerouslySetInnerHTML={{ __html: it.a }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
