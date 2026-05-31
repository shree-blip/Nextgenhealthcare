interface Factor {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const FACTORS: Factor[] = [
  {
    letter: '$',
    name: 'Your Bid',
    weight: 'Lever 1',
    desc: 'The maximum you’re willing to pay for a click. Higher bid alone does not win - Google rewards relevance, not deep pockets.',
    examples: ['Max CPC bid', 'Target CPA / ROAS', 'Bid adjustments by device, location, audience'],
  },
  {
    letter: 'Q',
    name: 'Quality Score',
    weight: 'Lever 2',
    desc: 'Google’s 1-10 score of your ad relevance, expected CTR, and landing-page experience. A 9/10 QS can pay half what a 5/10 QS pays for the same position.',
    examples: ['Expected click-through rate', 'Ad relevance to keyword', 'Landing-page experience'],
  },
  {
    letter: 'X',
    name: 'Ad Extensions',
    weight: 'Lever 3',
    desc: 'Sitelinks, callouts, structured snippets, call extensions, location extensions. They raise CTR and Quality Score - and they cost nothing extra.',
    examples: ['Sitelinks (Conditions, Locations, Insurance)', 'Call extensions', 'Location + structured snippets'],
  },
  {
    letter: 'C',
    name: 'Expected Impact',
    weight: 'Lever 4',
    desc: 'Google forecasts the likely CTR + conversion of every extension and asset combination. Strong, varied assets beat thin, repetitive ones.',
    examples: ['15+ headlines per ad group', '4+ descriptions', 'Pinned position strategy'],
  },
];

const FORMULA = [
  { token: 'Ad Rank', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'Bid', kind: 'var', tone: 'bid' },
  { token: '×', kind: 'op' },
  { token: 'Quality Score', kind: 'var', tone: 'qs' },
  { token: '+', kind: 'op' },
  { token: 'Extensions Impact', kind: 'var', tone: 'ext' },
];

const HowAdsWork = () => {
  return (
    <section className="sl-section ga-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How Google Ads works</div>
            <h2 className="sl-sec-title">
              The auction Google runs <em>millions of times a second.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Bid is just one
            <br />
            of four levers
          </div>
        </div>

        <p className="ga-how-intro">
          Every time someone searches, Google runs a live auction to decide
          which ads appear and in what order. The winning bidder is rarely
          the highest bidder. The winning bidder is the one whose
          <strong> Ad Rank </strong> is highest - and Ad Rank is a formula,
          not a number you can buy your way into.
        </p>

        <div className="ga-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`ga-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="ga-how-grid">
          {FACTORS.map((f, i) => (
            <article key={f.name} className="ga-how-card" data-pos={i}>
              <div className="ga-how-letter" aria-hidden="true">{f.letter}</div>
              <div className="ga-how-meta">
                <h3 className="ga-how-name">{f.name}</h3>
                <span className="ga-how-weight">{f.weight}</span>
              </div>
              <p className="ga-how-desc">{f.desc}</p>
              <ul className="ga-how-examples">
                {f.examples.map((e) => (
                  <li key={e}>
                    <span className="ga-how-bullet" aria-hidden="true">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="ga-how-callout">
          <div className="ga-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            Healthcare keywords are some of the most expensive on Google
            ($15-$200+ per click in specialty categories). Quality Score is
            the single biggest cost lever you have. The same keyword can
            cost a clinic with a 9 QS half what it costs a clinic with a 5 -
            for the same ad position. We optimize for Quality Score before
            we ever raise a bid.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowAdsWork;
