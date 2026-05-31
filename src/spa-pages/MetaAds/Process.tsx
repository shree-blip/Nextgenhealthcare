interface Phase {
  num: string;
  name: string;
  desc: string;
  time: string;
  out: string;
}

const PHASES: Phase[] = [
  {
    num: '01',
    name: 'Audit + intake',
    desc: 'We open your Business Manager, pull the trailing 90 days, and flag every leak — pixel gaps, broken events, banned creative, audience overlap.',
    time: 'Week 1',
    out: 'Audit report you keep',
  },
  {
    num: '02',
    name: 'Tracking rebuild',
    desc: 'Conversions API, server-side events, deduped event IDs, PHI scrubbing. The dashboard finally tells the truth post iOS-14.',
    time: 'Week 2',
    out: 'Clean event stack',
  },
  {
    num: '03',
    name: 'Strategy + creative',
    desc: 'Service-line audience map, vertical-first creative kit, lead form copy, WhatsApp flow scripts. All briefed against your real patient panel.',
    time: 'Week 3-4',
    out: 'Launch-ready calendar',
  },
  {
    num: '04',
    name: 'Launch + test',
    desc: 'Structured A/B sets. Three creative concepts × two audiences × two placements. Cut losers fast, scale winners on day five.',
    time: 'Week 5-6',
    out: 'Winning combinations',
  },
  {
    num: '05',
    name: 'Optimize + scale',
    desc: 'Weekly Loom reviews, monthly retros, lookalike refresh, retargeting laddering. Quarterly creative refit so fatigue never bites.',
    time: 'Month 2+',
    out: 'Ongoing growth engine',
  },
];

const Process = () => {
  return (
    <section className="sl-section ma-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How we run your account</div>
            <h2 className="sl-sec-title">
              Five phases. <em>First leads inside four weeks.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named campaign lead
            <br />
            from day one
          </div>
        </div>

        <div className="ma-process-rail">
          <div className="ma-process-line" aria-hidden="true" />
          <div className="ma-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="ma-process-card">
                <div className="ma-process-dot">{p.num}</div>
                <div className="ma-process-time">{p.time}</div>
                <h3 className="ma-process-name">{p.name}</h3>
                <p className="ma-process-desc">{p.desc}</p>
                <div className="ma-process-out">
                  <span className="ma-process-out-lbl">Output</span>
                  <span className="ma-process-out-val">{p.out}</span>
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
