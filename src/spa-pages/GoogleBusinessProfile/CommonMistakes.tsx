interface Mistake {
  num: string;
  bad: string;
  cost: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    num: '01',
    bad: 'Keyword-stuffing the business name',
    cost: 'Profile suspension. Reinstatement can take 4-12 weeks.',
    fix: 'Legal business name exactly. Categories carry the relevance signal, not the name.',
  },
  {
    num: '02',
    bad: 'Shared profile across multiple locations',
    cost: "Patients can't tell which clinic is nearest. Google penalizes; you lose all locations' map ranks.",
    fix: 'One GBP per physical location, each with a unique landing page + phone number.',
  },
  {
    num: '03',
    bad: 'NAP inconsistency across the web',
    cost: 'Citation signal collapses. Map rank drops 5-10 positions until cleaned.',
    fix: 'Lock canonical NAP. Update consistently across 70+ directories quarterly.',
  },
  {
    num: '04',
    bad: 'Empty services + products fields',
    cost: 'Lost relevance score on service-specific queries. Competitors with these filled rank above.',
    fix: 'Every service line listed with description. Updated quarterly.',
  },
  {
    num: '05',
    bad: 'Replying to negative reviews emotionally',
    cost: 'Screenshots circulate. New patients see the response, not the resolution.',
    fix: 'HIPAA-safe template + private channel redirect. Never confirm patient relationship publicly.',
  },
  {
    num: '06',
    bad: 'Set up once, never updated',
    cost: 'Activity signal drops to zero. Holiday hours wrong. Photos year-old. Posts blank for 6 months.',
    fix: 'Weekly posts. Quarterly photo refresh. Monthly hours + holidays. Activity is a ranking signal.',
  },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section gb-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            What a bad profile
            <br />
            actually costs
          </div>
        </div>

        <div className="gb-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="gb-mistakes-card">
              <div className="gb-mistakes-top">
                <span className="gb-mistakes-num">{m.num}</span>
                <span className="gb-mistakes-tag">Leak</span>
              </div>
              <h3 className="gb-mistakes-bad">{m.bad}</h3>
              <p className="gb-mistakes-cost">
                <span className="gb-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="gb-mistakes-fix">
                <span className="gb-mistakes-fix-lbl">Fix</span>
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
