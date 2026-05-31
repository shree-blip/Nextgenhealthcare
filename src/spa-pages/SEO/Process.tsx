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
    name: 'Diagnose',
    desc: 'Technical crawl, GBP audit, content gap analysis, competitor SERP teardown.',
    time: 'Week 1–2',
    deliver: '12-page audit',
  },
  {
    num: '02',
    name: 'Architect',
    desc: 'Keyword universe, topical clusters, redirect map, schema plan, dashboard schema.',
    time: 'Week 2–3',
    deliver: 'Strategy lockfile',
  },
  {
    num: '03',
    name: 'Foundation',
    desc: 'Technical fixes shipped: speed, schema, sitemaps, canonicals, mobile. The bar is "passes".',
    time: 'Week 3–5',
    deliver: 'Passing technical audit',
  },
  {
    num: '04',
    name: 'Authority',
    desc: 'GBP rebuilt, citations cleaned, review loop live, first digital PR placements landing.',
    time: 'Week 4–7',
    deliver: 'Local Pack visibility',
  },
  {
    num: '05',
    name: 'Compound',
    desc: 'Content cadence locked. Internal linking refit. Backlink prospecting on a weekly drum.',
    time: 'Week 6+',
    deliver: 'Monthly retro + roadmap',
  },
  {
    num: '06',
    name: 'Scale',
    desc: 'Pillar pages expanded, AEO content layered, new locations added. Compounding takes over.',
    time: 'Month 4+',
    deliver: 'Quarterly strategy refit',
  },
];

const Process = () => {
  return (
    <section className="sl-section seo-process-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - The process</div>
            <h2 className="sl-sec-title">
              Six phases. <em>First lift by week 6.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named lead
            <br />
            from day one
          </div>
        </div>

        <div className="seo-process-rail">
          <div className="seo-process-line" aria-hidden="true" />
          <div className="seo-process-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="seo-process-card">
                <div className="seo-process-dot">{p.num}</div>
                <div className="seo-process-time">{p.time}</div>
                <h3 className="seo-process-name">{p.name}</h3>
                <p className="seo-process-desc">{p.desc}</p>
                <div className="seo-process-deliver">
                  <span className="seo-process-deliver-lbl">Deliverable</span>
                  <span className="seo-process-deliver-val">{p.deliver}</span>
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
