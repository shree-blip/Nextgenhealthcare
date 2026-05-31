interface Phase {
  num: string;
  name: string;
  desc: string;
  time: string;
  deliver: string;
}

const PHASES: Phase[] = [
  {
    num: '01',
    name: 'Audit + NAP lock',
    desc: 'Profile teardown, NAP audit across 70+ directories, ownership transfer if needed, verification troubleshooting.',
    time: 'Week 1',
    deliver: 'Scored gap report',
  },
  {
    num: '02',
    name: 'Rebuild',
    desc: 'Categories mapped, services + products filled, hours + holidays set, attributes maxed, photos uploaded, description rewritten.',
    time: 'Week 2-3',
    deliver: 'Profile at 100% completeness',
  },
  {
    num: '03',
    name: 'Review program',
    desc: 'Request automation wired into the EHR or PMS, HIPAA-safe response templates, 24-hour SLA, negative-review escalation path.',
    time: 'Week 3-4',
    deliver: 'Live review velocity',
  },
  {
    num: '04',
    name: 'Citations + clean-up',
    desc: '70+ directory citations cleaned for NAP consistency. Duplicate listings claimed + removed. Apple + Bing seeded from same canonical data.',
    time: 'Week 4-6',
    deliver: 'Citation consistency report',
  },
  {
    num: '05',
    name: 'Activity cadence',
    desc: 'Weekly posts, Q&A seeding, photo drip, messaging on. The activity signal that compounds rank quietly.',
    time: 'Week 6+',
    deliver: 'Weekly Loom · monthly retro',
  },
  {
    num: '06',
    name: 'Rank + scale',
    desc: 'Daily rank tracking, geo-grid mapping, scale plan for additional locations or competitor displacement.',
    time: 'Month 3+',
    deliver: 'Quarterly geo-grid map',
  },
];

const Process = () => {
  return (
    <section className="sl-section gb-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>Map movement by week 4.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named local lead
            <br />
            multi-location console
          </div>
        </div>

        <div className="gb-process-rail">
          <div className="gb-process-line" aria-hidden="true" />
          <div className="gb-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="gb-process-card">
                <div className="gb-process-dot">{p.num}</div>
                <div className="gb-process-time">{p.time}</div>
                <h3 className="gb-process-name">{p.name}</h3>
                <p className="gb-process-desc">{p.desc}</p>
                <div className="gb-process-deliver">
                  <span className="gb-process-deliver-lbl">Deliverable</span>
                  <span className="gb-process-deliver-val">{p.deliver}</span>
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
