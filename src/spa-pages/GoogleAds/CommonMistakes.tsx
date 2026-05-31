interface Mistake {
  num: string;
  bad: string;
  cost: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    num: '01',
    bad: 'Broad-match keywords with no negatives',
    cost: '40-70% of spend wasted on irrelevant searches',
    fix: 'Phrase + exact match by default. Negative list mined weekly.',
  },
  {
    num: '02',
    bad: 'One ad group per service line',
    cost: 'Quality Score caps out at 4-5; CPC double what it should be',
    fix: '5-15 keywords per ad group, tightly themed. Single-keyword ad groups for top spenders.',
  },
  {
    num: '03',
    bad: 'No conversion tracking - or tracking that leaks PHI',
    cost: 'Smart bidding flies blind. Compliance risk + lawsuit exposure.',
    fix: 'Server-side conversion API. PHI scrubbed before any data leaves your site.',
  },
  {
    num: '04',
    bad: 'Sending all traffic to homepage',
    cost: 'Quality Score tanks. Conversion rate 1/3 of what it should be.',
    fix: 'Dedicated landing page per service line, matched to ad headline.',
  },
  {
    num: '05',
    bad: 'Skipping ad extensions',
    cost: 'Lower CTR, lower QS, lower ad position - for the same bid',
    fix: 'Every ad runs at full extension coverage: sitelinks, callouts, snippets, call, location.',
  },
  {
    num: '06',
    bad: 'Monthly check-ins, never weekly',
    cost: 'Bad campaigns burn 4 weeks of budget before anyone notices',
    fix: 'Live dashboard + weekly Loom + monthly written read-out. Daily alerts for anomalies.',
  },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section ga-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            How much you’re
            <br />
            actually wasting
          </div>
        </div>

        <div className="ga-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="ga-mistakes-card">
              <div className="ga-mistakes-top">
                <span className="ga-mistakes-num">{m.num}</span>
                <span className="ga-mistakes-tag">Leak</span>
              </div>
              <h3 className="ga-mistakes-bad">{m.bad}</h3>
              <p className="ga-mistakes-cost">
                <span className="ga-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="ga-mistakes-fix">
                <span className="ga-mistakes-fix-lbl">Fix</span>
                {m.fix}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonMistakes;
