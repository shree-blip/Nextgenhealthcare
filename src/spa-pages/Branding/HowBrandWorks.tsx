interface Pillar {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const PILLARS: Pillar[] = [
  {
    letter: 'R',
    name: 'Recognition',
    weight: 'Pillar 1',
    desc: 'How fast a patient identifies you - the mark, the color, the typographic feel - across signage, ads, and a SERP result. Built by repetition + distinctiveness.',
    examples: [
      'Distinctive primary mark',
      'Ownable color palette',
      'Recognizable typographic signature',
    ],
  },
  {
    letter: 'R',
    name: 'Reputation',
    weight: 'Pillar 2',
    desc: "What's already in the patient's head before they read a single word. Built by reviews, referrals, press, and the patient experiences the brand stands behind.",
    examples: ['Review volume + velocity', 'Provider press mentions', 'Patient-story library'],
  },
  {
    letter: 'C',
    name: 'Consistency',
    weight: 'Pillar 3',
    desc: 'The brand showing up the same way on a Google ad, a TikTok reel, an exam-room wall, and a printed referral pad. The pillar most clinics fail at first.',
    examples: [
      'Design tokens enforced everywhere',
      'Voice rules in every brief',
      'Photography looking like one shoot',
    ],
  },
  {
    letter: 'R',
    name: 'Resonance',
    weight: 'Pillar 4',
    desc: 'How the brand makes the patient feel - calm, capable, cared for. The pillar that turns a one-visit booking into a 10-year relationship + a referral engine.',
    examples: [
      'Patient-promise statement',
      'Tone calibrated to specialty',
      'Emotional benefit framing',
    ],
  },
];

const FORMULA = [
  { token: 'Brand Equity', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'Recognition', kind: 'var', tone: 'r' },
  { token: '×', kind: 'op' },
  { token: 'Reputation', kind: 'var', tone: 'rp' },
  { token: '+', kind: 'op' },
  { token: 'Consistency', kind: 'var', tone: 'c' },
  { token: '+', kind: 'op' },
  { token: 'Resonance', kind: 'var', tone: 'rs' },
];

const HowBrandWorks = () => {
  return (
    <section className="sl-section br-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How brands work</div>
            <h2 className="sl-sec-title">
              Brand equity isn&rsquo;t a logo. <em>It&rsquo;s four pillars.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Compounds quietly
            <br />
            ships loudly
          </div>
        </div>

        <p className="br-how-intro">
          A new logo will not save a clinic that&rsquo;s leaking trust on its review pages, its
          voicemail, or its waiting-room signage.
          <strong> Brand equity</strong> is the compounding output of four pillars working together
          - recognition, reputation, consistency, resonance. Healthcare brands that win build all
          four; brands that stall ship a beautiful Figma file and stop there.
        </p>

        <div className="br-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`br-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="br-how-grid">
          {PILLARS.map((p, i) => (
            <article key={p.name + i} className="br-how-card" data-pos={i}>
              <div className="br-how-letter" aria-hidden="true">
                {p.letter}
              </div>
              <div className="br-how-meta">
                <h3 className="br-how-name">{p.name}</h3>
                <span className="br-how-weight">{p.weight}</span>
              </div>
              <p className="br-how-desc">{p.desc}</p>
              <ul className="br-how-examples">
                {p.examples.map((e) => (
                  <li key={e}>
                    <span className="br-how-bullet" aria-hidden="true">
                      →
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="br-how-callout">
          <div className="br-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            Healthcare is the highest-stakes category a brand can operate in. A patient choosing
            between two dermatologists isn&rsquo;t comparing logos - they&rsquo;re comparing trust
            signals built from <em>recognition + reputation + consistency + resonance</em>. We build
            all four in parallel. The logo is the easy part; the system that keeps the brand honest
            across 50+ touchpoints is what actually moves bookings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowBrandWorks;
