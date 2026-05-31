interface Model {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const MODELS: Model[] = [
  {
    letter: 'F',
    name: 'First-touch',
    weight: 'Model 1',
    desc: 'Credits 100% to the first channel a patient touched. Useful for measuring awareness; bad for budget decisions.',
    examples: ['Organic search awareness', 'Top-of-funnel YouTube', 'First-time GBP discovery'],
  },
  {
    letter: 'L',
    name: 'Last-touch',
    weight: 'Model 2',
    desc: 'Credits 100% to the last channel before booking. The default GA4 model. Systematically over-credits paid search.',
    examples: ['Default GA4 attribution', 'Brand-search inflation', 'Coupon-click bias'],
  },
  {
    letter: '◆',
    name: 'Position-based',
    weight: 'Model 3',
    desc: '40% to first touch, 40% to last, 20% spread across middle touches. The honest middle - shows the full journey.',
    examples: ['U-shaped 40/20/40', 'W-shaped (3-key-touches)', 'Custom weighting'],
  },
  {
    letter: '∞',
    name: 'Data-driven',
    weight: 'Model 4',
    desc: 'Machine-learning model that weights each touch by its statistical contribution to the conversion. Requires conversion volume.',
    examples: ['Markov-chain weighting', 'Shapley value attribution', 'GA4 DDA (when eligible)'],
  },
];

const FORMULA = [
  { token: 'Channel Credit', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'First', kind: 'var', tone: 'f' },
  { token: '+', kind: 'op' },
  { token: 'Middle', kind: 'var', tone: 'm' },
  { token: '+', kind: 'op' },
  { token: 'Last', kind: 'var', tone: 'l' },
  { token: '×', kind: 'op' },
  { token: 'Weight', kind: 'var', tone: 'w' },
];

const HowAttributionWorks = () => {
  return (
    <section className="sl-section an-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How attribution works</div>
            <h2 className="sl-sec-title">
              Last-click lies. <em>Four models tell the real story.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            One number
            <br />
            four ways to slice it
          </div>
        </div>

        <p className="an-how-intro">
          A typical healthcare patient touches your brand 7-12 times before booking: Google search,
          AI Overview, GBP listing, Instagram reel, Facebook ad, email, friend referral, direct
          visit. Default GA4 gives 100% of that journey to the <strong>last touch</strong> - usually
          brand search. The result: paid steals credit from SEO, SEO steals credit from social, and
          budget decisions get made on half a story. We run all four attribution models in parallel
          so you can argue from data instead of intuition.
        </p>

        <div className="an-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`an-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="an-how-grid">
          {MODELS.map((m, i) => (
            <article key={m.name} className="an-how-card" data-pos={i}>
              <div className="an-how-letter" aria-hidden="true">
                {m.letter}
              </div>
              <div className="an-how-meta">
                <h3 className="an-how-name">{m.name}</h3>
                <span className="an-how-weight">{m.weight}</span>
              </div>
              <p className="an-how-desc">{m.desc}</p>
              <ul className="an-how-examples">
                {m.examples.map((e) => (
                  <li key={e}>
                    <span className="an-how-bullet" aria-hidden="true">
                      →
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="an-how-callout">
          <div className="an-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            Healthcare patient journeys are long, multi-touch, and cross-device. A patient who
            Googles &ldquo;urgent care near me,&rdquo; sees your TikTok the next day, reads a
            friend&rsquo;s Google review, and then books via direct URL - that&rsquo;s a 4- touch
            journey GA4 records as <em>100% direct</em>. We deploy server-side conversion APIs,
            hashed-ID matching across devices, and the position-based model as the operational
            default. Budget decisions get made on the journey - not on the last click.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowAttributionWorks;
