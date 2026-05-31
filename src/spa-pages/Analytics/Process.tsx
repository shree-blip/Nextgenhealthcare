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
    name: 'Stack audit',
    desc: 'Every tool catalogued. Tracking gaps documented. PHI exposure mapped. BAAs verified or queued for renegotiation.',
    time: 'Week 1',
    deliver: 'Tracking gap report',
  },
  {
    num: '02',
    name: 'Schema lock',
    desc: 'KPI taxonomy + dimension model. The shared vocabulary the dashboard uses across Ads, GA4, CRM, EHR, booking - so totals match wherever you click.',
    time: 'Week 2',
    deliver: 'KPI dictionary + dim model',
  },
  {
    num: '03',
    name: 'Tracking deploy',
    desc: 'Server-side conversion APIs, hashed-ID matching, UTM standards, call tracking. PHI-scrubbing at every join.',
    time: 'Week 3-4',
    deliver: 'Clean conversion stack',
  },
  {
    num: '04',
    name: 'Dashboard build',
    desc: 'Live executive dashboard in Looker Studio (or your BI tool). Drill-through to source. Anomaly alerts wired. Team trained on it.',
    time: 'Week 4-5',
    deliver: 'Live dashboard + training',
  },
  {
    num: '05',
    name: 'Reporting cadence',
    desc: 'Weekly Loom walkthrough, monthly written read-out, quarterly strategy retro. The narrative around the numbers.',
    time: 'Week 6+',
    deliver: 'Weekly + monthly + quarterly',
  },
  {
    num: '06',
    name: 'Optimize + forecast',
    desc: 'Attribution-model refits, predictive forecast (next-quarter bookings + revenue), cohort + LTV deepening.',
    time: 'Month 3+',
    deliver: 'Quarterly forecast',
  },
];

const Process = () => {
  return (
    <section className="sl-section an-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>Trusted dashboard by week 5.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            You own the
            <br />
            data warehouse
          </div>
        </div>

        <div className="an-process-rail">
          <div className="an-process-line" aria-hidden="true" />
          <div className="an-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="an-process-card">
                <div className="an-process-dot">{p.num}</div>
                <div className="an-process-time">{p.time}</div>
                <h3 className="an-process-name">{p.name}</h3>
                <p className="an-process-desc">{p.desc}</p>
                <div className="an-process-deliver">
                  <span className="an-process-deliver-lbl">Deliverable</span>
                  <span className="an-process-deliver-val">{p.deliver}</span>
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
