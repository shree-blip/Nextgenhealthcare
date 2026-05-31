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
    name: 'Audit + voice',
    desc: 'Channel-by-channel teardown, competitor benchmark, provider voice interviews. The clinic\'s actual tone, not a brand guideline.',
    time: 'Week 1',
    deliver: 'Channel audit + voice guide',
  },
  {
    num: '02',
    name: 'Pillar lock',
    desc: 'Two platforms, five pillars, content mix locked. Shot list for the next quarter built around what your team can actually film.',
    time: 'Week 2',
    deliver: '90-day calendar + shot list',
  },
  {
    num: '03',
    name: 'Production',
    desc: 'On-site or remote capture day. Two hours of footage becomes 4-6 weeks of content. Every clip clinically reviewed.',
    time: 'Week 3',
    deliver: '60+ assets ready to ship',
  },
  {
    num: '04',
    name: 'Launch + cadence',
    desc: 'Daily posting kicks off. Community manager covers DMs + comments inside business hours. First reach lift shows by week 4.',
    time: 'Week 4',
    deliver: '4x/wk per channel posting',
  },
  {
    num: '05',
    name: 'Double winners',
    desc: 'Weekly top-performer review. The format that worked gets rebuilt three more ways. Losers retired without ceremony.',
    time: 'Week 6+',
    deliver: 'Weekly Loom + monthly retro',
  },
  {
    num: '06',
    name: 'Scale + paid',
    desc: 'Top-performing organic posts get paid amplification. New channels added only when the first two have earned the bandwidth.',
    time: 'Month 4+',
    deliver: 'Boosted post strategy',
  },
];

const Process = () => {
  return (
    <section className="sl-section sm-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>Reach lift visible by week 4.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named creative lead
            <br />
            from day one
          </div>
        </div>

        <div className="sm-process-rail">
          <div className="sm-process-line" aria-hidden="true" />
          <div className="sm-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="sm-process-card">
                <div className="sm-process-dot">{p.num}</div>
                <div className="sm-process-time">{p.time}</div>
                <h3 className="sm-process-name">{p.name}</h3>
                <p className="sm-process-desc">{p.desc}</p>
                <div className="sm-process-deliver">
                  <span className="sm-process-deliver-lbl">Deliverable</span>
                  <span className="sm-process-deliver-val">{p.deliver}</span>
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
