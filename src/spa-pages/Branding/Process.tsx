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
    name: 'Discovery + audit',
    desc: 'Stakeholder interviews, competitor map, current-brand teardown, patient survey when scope allows. The "where we actually stand" pass.',
    time: 'Week 1-2',
    deliver: 'Brand audit + competitive map',
  },
  {
    num: '02',
    name: 'Strategy',
    desc: 'Positioning, audience archetypes, value-prop hierarchy, voice direction. The decision the system gets built around.',
    time: 'Week 3',
    deliver: 'Positioning brief + voice framework',
  },
  {
    num: '03',
    name: 'Identity design',
    desc: 'Marks, palette, type, photography direction. Iterative rounds against live patient-facing surfaces - not isolated moodboards.',
    time: 'Week 4-7',
    deliver: 'Identity system v1',
  },
  {
    num: '04',
    name: 'System build',
    desc: 'Design tokens, component library, templates. Pressure-tested against the next-quarter campaign calendar before sign-off.',
    time: 'Week 7-9',
    deliver: 'Working Figma library',
  },
  {
    num: '05',
    name: 'Application + rollout',
    desc: 'Web, social, signage, print - phased so no clinic ever closes. Digital first, signage last, patient-facing pages graded weekly.',
    time: 'Week 9-14',
    deliver: 'Live brand across touchpoints',
  },
  {
    num: '06',
    name: 'Governance + health',
    desc: 'Guidelines PDF, internal training, quarterly brand-health review, refresh cadence agreed.',
    time: 'Month 4+',
    deliver: 'Guidelines + quarterly retro',
  },
];

const Process = () => {
  return (
    <section className="sl-section br-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>Working brand by week 9.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Phased rollout
            <br />
            zero downtime
          </div>
        </div>

        <div className="br-process-rail">
          <div className="br-process-line" aria-hidden="true" />
          <div className="br-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="br-process-card">
                <div className="br-process-dot">{p.num}</div>
                <div className="br-process-time">{p.time}</div>
                <h3 className="br-process-name">{p.name}</h3>
                <p className="br-process-desc">{p.desc}</p>
                <div className="br-process-deliver">
                  <span className="br-process-deliver-lbl">Deliverable</span>
                  <span className="br-process-deliver-val">{p.deliver}</span>
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
