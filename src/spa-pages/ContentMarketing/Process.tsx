interface Phase {
  num: string;
  name: string;
  desc: string;
  time: string;
  deliver: string;
}

const PHASES: Phase[] = [
  { num: '01', name: 'Audit + gap', desc: 'Content inventory, competitor delta, ranking review. Every page graded against E-E-A-T standards.', time: 'Week 1', deliver: 'Gap report + cluster map' },
  { num: '02', name: 'Editorial plan', desc: 'Pillar selection, topic clusters built around service lines. Provider voice captured in a kickoff session.', time: 'Week 2', deliver: '90-day calendar' },
  { num: '03', name: 'Production', desc: 'Pillar page + 4 supporting articles drafted, clinician-reviewed, schema embedded. Real bylines, real reviewers.', time: 'Week 3-6', deliver: '5 articles live' },
  { num: '04', name: 'Distribution', desc: 'Internal-link cluster wired, social/email/AEO distribution shipped, backlink outreach kicks off.', time: 'Week 7+', deliver: 'Distribution package' },
  { num: '05', name: 'Ranking + refresh', desc: 'Weekly rank tracking, content decay alerts, quarterly refresh of declining pages. Winners doubled, dead pages pruned.', time: 'Month 3+', deliver: 'Weekly Loom · monthly retro' },
  { num: '06', name: 'Authority compound', desc: 'Editorial-driven backlinks, AI Overview citations, brand mentions. Each new article compounds on prior audience.', time: 'Month 6+', deliver: 'Quarterly authority audit' },
];

const Process = () => {
  return (
    <section className="sl-section cm-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>Long-tail traffic by week 10.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named editor
            <br />
            named clinician reviewer
          </div>
        </div>

        <div className="cm-process-rail">
          <div className="cm-process-line" aria-hidden="true" />
          <div className="cm-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="cm-process-card">
                <div className="cm-process-dot">{p.num}</div>
                <div className="cm-process-time">{p.time}</div>
                <h3 className="cm-process-name">{p.name}</h3>
                <p className="cm-process-desc">{p.desc}</p>
                <div className="cm-process-deliver">
                  <span className="cm-process-deliver-lbl">Deliverable</span>
                  <span className="cm-process-deliver-val">{p.deliver}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
