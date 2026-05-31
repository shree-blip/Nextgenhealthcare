interface Mistake { num: string; bad: string; cost: string; fix: string }

const MISTAKES: Mistake[] = [
  { num: '01', bad: 'AI-generated articles with no clinician review', cost: 'Google\'s helpful-content classifier deprioritizes. AI Overviews never cite.', fix: 'AI for outline + scaffolding. Licensed clinician rewrites + signs.' },
  { num: '02', bad: 'Publishing volume over depth (20 thin posts)', cost: 'Topical authority dilutes. Long-tail traffic plateaus at 5K/mo.', fix: '4 deep pieces per month beats 20 thin ones. Pillar + 3 supporting = right rhythm.' },
  { num: '03', bad: 'No author bio, no reviewer byline', cost: 'YMYL content can\'t rank top-3. AI Overviews exclude.', fix: 'Real author + reviewer credentials on every YMYL piece. License # when applicable.' },
  { num: '04', bad: 'Stale content - never refreshed', cost: 'Pages decay 10-30% per quarter after month 9. Compounding goes backwards.', fix: 'Refresh top-25 quarterly. Update review date. Add new citations.' },
  { num: '05', bad: 'Keyword-stuffed H2s ignoring search intent', cost: 'Featured snippets and AI cites go to clearer competitors.', fix: 'H2s shaped as questions or actions. One intent per article.' },
  { num: '06', bad: 'No internal linking strategy', cost: 'Topical authority leaks. Pillar pages never compound their cluster.', fix: 'Every article links to 3-7 contextual neighbors. Pillar at the hub of every cluster.' },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section cm-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            What bad content
            <br />
            actually costs
          </div>
        </div>

        <div className="cm-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="cm-mistakes-card">
              <div className="cm-mistakes-top">
                <span className="cm-mistakes-num">{m.num}</span>
                <span className="cm-mistakes-tag">Leak</span>
              </div>
              <h3 className="cm-mistakes-bad">{m.bad}</h3>
              <p className="cm-mistakes-cost">
                <span className="cm-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="cm-mistakes-fix">
                <span className="cm-mistakes-fix-lbl">Fix</span>
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
