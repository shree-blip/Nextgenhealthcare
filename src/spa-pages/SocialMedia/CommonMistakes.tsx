interface Mistake {
  num: string;
  bad: string;
  cost: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    num: '01',
    bad: 'Posting on every platform, mastering none',
    cost: 'All channels stuck under 1% engagement. Algorithm punishes inconsistency.',
    fix: 'Pick two channels. Run them at 4×/wk for 6 months before adding a third.',
  },
  {
    num: '02',
    bad: 'Promotional content without earning the right',
    cost: 'Followers ignore or unfollow. Reach drops 60-80% within 30 days.',
    fix: 'Keep promotional under 10%. Earn the post with 90% educational + community first.',
  },
  {
    num: '03',
    bad: 'Posting in marketing voice, not provider voice',
    cost: 'Engagement caps out at 1-2%. No one shares a brochure.',
    fix: 'Provider-on-camera content outperforms brand-voice 4-6× in healthcare.',
  },
  {
    num: '04',
    bad: 'Responding to medical questions in public comments',
    cost: 'HIPAA exposure, board complaints, screenshot risk.',
    fix: 'Public acknowledgement + DM redirect playbook. Every team member trained.',
  },
  {
    num: '05',
    bad: 'Ignoring saves and shares; chasing likes',
    cost: 'Optimizing for the wrong signal. Algorithm rewards saves 8× more than likes.',
    fix: 'Score every post on save rate + share rate. That\'s what compounds reach.',
  },
  {
    num: '06',
    bad: 'No paid amplification on organic winners',
    cost: 'A post that organically hits 50K reach can become 500K with $200 in boosted spend.',
    fix: 'Boost the proven winners. Don\'t spray-and-pray on net-new creative.',
  },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section sm-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            What bad social
            <br />
            actually costs
          </div>
        </div>

        <div className="sm-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="sm-mistakes-card">
              <div className="sm-mistakes-top">
                <span className="sm-mistakes-num">{m.num}</span>
                <span className="sm-mistakes-tag">Leak</span>
              </div>
              <h3 className="sm-mistakes-bad">{m.bad}</h3>
              <p className="sm-mistakes-cost">
                <span className="sm-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="sm-mistakes-fix">
                <span className="sm-mistakes-fix-lbl">Fix</span>
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
