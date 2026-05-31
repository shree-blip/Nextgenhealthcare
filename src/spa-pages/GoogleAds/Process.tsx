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
    name: 'Inherit + audit',
    desc: 'We import history, audit account structure, freeze bad bids, and identify wasted-spend leaks in the first 48 hours.',
    time: 'Day 1–3',
    deliver: 'Audit + leak report',
  },
  {
    num: '02',
    name: 'Tracking fix',
    desc: 'Conversion APIs, server-side tags, PHI scrubbing, phone + booking events. The dashboard finally tells the truth.',
    time: 'Week 1',
    deliver: 'Clean conversion stack',
  },
  {
    num: '03',
    name: 'Restructure',
    desc: 'Service-line keyword maps, ad group rebuild, negative-keyword sweep, ad-extension coverage to 100%.',
    time: 'Week 2–3',
    deliver: 'New account architecture',
  },
  {
    num: '04',
    name: 'Smart bidding',
    desc: 'Switch to tCPA or tROAS once smart bidding has clean signal. Audiences layered, landing pages aligned.',
    time: 'Week 4–6',
    deliver: 'Automated bid strategy live',
  },
  {
    num: '05',
    name: 'Optimize',
    desc: 'Weekly negative-keyword mining, search query review, creative testing, bid-modifier tuning.',
    time: 'Week 6+',
    deliver: 'Weekly Loom + monthly retro',
  },
  {
    num: '06',
    name: 'Scale + diversify',
    desc: 'Expand into PMax, YouTube, LSAs, or new geographies based on what the data is telling you.',
    time: 'Month 4+',
    deliver: 'Quarterly strategy refit',
  },
];

const Process = () => {
  return (
    <section className="sl-section ga-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>CPA moving by week 4.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named lead
            <br />
            from day one
          </div>
        </div>

        <div className="ga-process-rail">
          <div className="ga-process-line" aria-hidden="true" />
          <div className="ga-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="ga-process-card">
                <div className="ga-process-dot">{p.num}</div>
                <div className="ga-process-time">{p.time}</div>
                <h3 className="ga-process-name">{p.name}</h3>
                <p className="ga-process-desc">{p.desc}</p>
                <div className="ga-process-deliver">
                  <span className="ga-process-deliver-lbl">Deliverable</span>
                  <span className="ga-process-deliver-val">{p.deliver}</span>
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
