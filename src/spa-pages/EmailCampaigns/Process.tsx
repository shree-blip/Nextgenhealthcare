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
    name: 'Audit + auth',
    desc: 'List health teardown, SPF/DKIM/DMARC configured, BAA-covered ESP chosen, sender warm-up scheduled.',
    time: 'Week 1',
    deliver: 'Auth + deliverability report',
  },
  {
    num: '02',
    name: 'Welcome + post-visit',
    desc: 'The two highest-leverage sequences ship first. Provider voice captured, templates designed, tracking wired.',
    time: 'Week 2',
    deliver: '2 flows live · 6 emails',
  },
  {
    num: '03',
    name: 'Recall + referral',
    desc: 'Win-back drip targeting dormant patients, plus a referral-ask drip that compounds without front-desk involvement.',
    time: 'Week 3',
    deliver: '4 flows live · 12 emails',
  },
  {
    num: '04',
    name: 'Attribution + tuning',
    desc: 'Every send tied to booked revenue in the dashboard. Low-performers pruned, winners doubled, sender reputation monitored daily.',
    time: 'Week 6',
    deliver: 'Live ROAS dashboard',
  },
  {
    num: '05',
    name: 'Optimize',
    desc: 'Weekly subject A/B tests, send-time tuning, segment refinement. Open rate, click rate, and revenue moved in tandem.',
    time: 'Week 8+',
    deliver: 'Weekly Loom · monthly retro',
  },
  {
    num: '06',
    name: 'Deepen library',
    desc: 'New seasonal drips, service-line nurtures, NPS-triggered campaigns. The library that compounds quietly into a real revenue layer.',
    time: 'Month 4+',
    deliver: 'Quarterly campaign refit',
  },
];

const Process = () => {
  return (
    <section className="sl-section em-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>Four flows live in 21 days.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named lead
            <br />
            from day one
          </div>
        </div>

        <div className="em-process-rail">
          <div className="em-process-line" aria-hidden="true" />
          <div className="em-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="em-process-card">
                <div className="em-process-dot">{p.num}</div>
                <div className="em-process-time">{p.time}</div>
                <h3 className="em-process-name">{p.name}</h3>
                <p className="em-process-desc">{p.desc}</p>
                <div className="em-process-deliver">
                  <span className="em-process-deliver-lbl">Deliverable</span>
                  <span className="em-process-deliver-val">{p.deliver}</span>
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
