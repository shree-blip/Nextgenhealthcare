interface Mistake {
  num: string;
  bad: string;
  cost: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    num: '01',
    bad: 'PHI in URL parameters or pixel payloads',
    cost: 'HIPAA violation per affected patient. Mandatory breach notification. Class-action risk.',
    fix: 'Server-side conversion APIs. PHI scrubbed before any data leaves the site. BAA on every tool.',
  },
  {
    num: '02',
    bad: 'Three dashboards, three different totals',
    cost: 'Leadership stops trusting any of them. Budget decisions made on intuition.',
    fix: 'Unified schema + canonical KPI dictionary. One number, defendable across every system.',
  },
  {
    num: '03',
    bad: 'Last-click attribution as the only model',
    cost: 'Paid steals credit from SEO. Budget shifts to the wrong channel. ~30% mis-allocation typical.',
    fix: 'Run last-click + position-based + data-driven in parallel. Operate on position-based, audit with the others.',
  },
  {
    num: '04',
    bad: 'No anomaly alerts wired up',
    cost: 'Bad campaigns burn 4-6 weeks of budget before anyone notices in the monthly review.',
    fix: 'Auto-alerts on +/-20% week-over-week deltas. Email + Slack the team before the call.',
  },
  {
    num: '05',
    bad: 'CPA without LTV',
    cost: '"Cheapest acquisition channel" turns out to be your worst when LTV is layered in.',
    fix: 'Cohort tables joining acquisition channel to 12-month patient LTV. CPA + LTV side-by-side, always.',
  },
  {
    num: '06',
    bad: 'Adblocker + iOS tracking blindness',
    cost: '15-40% of conversions go unattributed. GA4 reports become unreliable.',
    fix: "Server-side GA4 + Meta CAPI + hashed-ID matching. Capture conversions adblockers can't see.",
  },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section an-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            What bad analytics
            <br />
            actually costs
          </div>
        </div>

        <div className="an-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="an-mistakes-card">
              <div className="an-mistakes-top">
                <span className="an-mistakes-num">{m.num}</span>
                <span className="an-mistakes-tag">Leak</span>
              </div>
              <h3 className="an-mistakes-bad">{m.bad}</h3>
              <p className="an-mistakes-cost">
                <span className="an-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="an-mistakes-fix">
                <span className="an-mistakes-fix-lbl">Fix</span>
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
