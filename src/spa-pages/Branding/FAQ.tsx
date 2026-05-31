import { useState } from 'react';

interface QA {
  q: string;
  a: string;
}

export const BR_FAQ_ITEMS: QA[] = [
  {
    q: 'Will a rebrand actually move bookings, or just look prettier?',
    a: "A rebrand alone won't move bookings. A rebrand paired with a redesigned site, ad creative, voice framework, and review flow does - because every patient trust signal gets re-tuned at once. We sequence the work so the lift is measurable, not aesthetic.",
  },
  {
    q: 'How disruptive is this for a multi-location practice?',
    a: 'Zero clinical downtime. We run rebrands in phased rollout: digital + clinical printables first, signage and exteriors last. No clinic ever closes. The whole network can be operating under the new brand digitally within 9 weeks while physical signage rolls out on its own timeline.',
  },
  {
    q: 'Can you keep our existing name?',
    a: "Most engagements keep the name and refresh the system - mark, color, type, voice, photography. Full renames are rare and disruptive; we'll talk you out of one unless legal, M&A, or major positioning shift forces it.",
  },
  {
    q: 'What deliverables do we own at the end?',
    a: 'Source files in Figma + Illustrator, a working guidelines manual (PDF + web), a templated asset library, master logo lockups, all photography raws, and complete voice framework. You keep editing rights end-to-end. No platform lock-in.',
  },
  {
    q: 'How is this different from a freelance designer?',
    a: 'We come with the marketing dashboard, the ad team, the SEO team, and 40+ healthcare rebrands behind us. The brand system is pressure-tested against actual campaigns before sign-off - not approved in isolation on a moodboard.',
  },
  {
    q: 'How long does a full rebrand take?',
    a: "12-14 weeks for a multi-location practice. 8-10 weeks for a single-location clinic. We don't race - rushed rebrands need refreshes within 18 months. We invest the time once.",
  },
  {
    q: 'What about photography - do we really need a custom shoot?',
    a: 'Yes, almost always. Stock photography is the single biggest trust leak in healthcare branding - patients pattern-match against the same photo at three other clinics. We coordinate a quarterly shoot day; real providers, real patients (consented), real space.',
  },
  {
    q: 'How do you handle brand-health tracking post-launch?',
    a: 'Quarterly brand-health review against a 12-signal scorecard (aided + unaided recall, branded search lift, sentiment, review velocity, NPS, share-of-voice). Built into your analytics dashboard so trends compound visibly over time.',
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
    <section className="sl-section br-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">12 - FAQ</div>
            <h2 className="sl-sec-title">
              The eight questions <em>that come up before kickoff.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Direct answers
            <br />
            no marketing-speak
          </div>
        </div>

        <ul className="br-faq-list">
          {BR_FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`br-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="br-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="br-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
