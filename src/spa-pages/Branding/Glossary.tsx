interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Strategy' | 'Identity' | 'System' | 'Voice' | 'Application';
}

const TERMS: Term[] = [
  {
    short: 'Equity',
    long: 'Brand Equity',
    category: 'Strategy',
    desc: 'The cumulative value a brand carries in patient memory + decision-making. Compounds slowly, leaks fast.',
  },
  {
    short: 'Position',
    long: 'Positioning Statement',
    category: 'Strategy',
    desc: "One sentence: who you serve, what you offer, why it matters, who you're not for. The decision the rest of the brand inherits.",
  },
  {
    short: 'Mark',
    long: 'Primary Mark / Logomark',
    category: 'Identity',
    desc: 'The single visual signature of the brand. Most-used asset; should work at 16px and on a billboard.',
  },
  {
    short: 'Lockup',
    long: 'Logo Lockup',
    category: 'Identity',
    desc: 'A specific combination of mark + wordmark + tagline + variant. 4-6 lockups give the brand layout flexibility.',
  },
  {
    short: 'Tokens',
    long: 'Design Tokens',
    category: 'System',
    desc: 'Named values (color-primary-500, type-display-md) that enforce consistency across Figma + code + print.',
  },
  {
    short: 'System',
    long: 'Design System',
    category: 'System',
    desc: 'Tokens + components + patterns + rules. The brand operating manual the team applies without designer review.',
  },
  {
    short: 'Voice',
    long: 'Brand Voice',
    category: 'Voice',
    desc: "The consistent personality across every word the brand writes. Stable; doesn't change by channel.",
  },
  {
    short: 'Tone',
    long: 'Brand Tone',
    category: 'Voice',
    desc: 'How voice adapts to context. Same brand voice; different tone in an ad vs. a post-visit email vs. a recall reminder.',
  },
  {
    short: 'A11y',
    long: 'Accessibility',
    category: 'System',
    desc: 'WCAG 2.2 AA contrast + typography compliance. Healthcare brand failing A11y is a legal + UX risk.',
  },
  {
    short: 'Guidelines',
    long: 'Brand Guidelines',
    category: 'Application',
    desc: "The documented rule-set: usage do's + don'ts, voice rules, photography direction. Not a 200-page PDF; a working manual.",
  },
  {
    short: 'Refresh',
    long: 'Brand Refresh',
    category: 'Application',
    desc: 'Evolution within the existing system. Updates type, color, photography - keeps mark and positioning.',
  },
  {
    short: 'Rebrand',
    long: 'Full Rebrand',
    category: 'Application',
    desc: 'Reset of positioning, identity, voice. Disruptive; reserved for M&A, name changes, or 10+ year drift.',
  },
];

const Glossary = () => {
  return (
    <section className="sl-section br-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve terms <em>your next brand call should not translate.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="br-glossary-intro">
          Brand strategy has accumulated a dictionary of its own. Here are the twelve terms that
          decide whether a rebrand earns its keep - or just looks expensive.
        </p>

        <div className="br-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="br-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="br-glossary-top">
                <span className="br-glossary-short">{t.short}</span>
                <span className="br-glossary-cat">{t.category}</span>
              </div>
              <div className="br-glossary-long">{t.long}</div>
              <p className="br-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
