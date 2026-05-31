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
    name: 'Discover',
    desc: 'Stakeholder interviews, current-site audit, competitor scan, and a one-page strategy document everyone signs off on.',
    time: 'Week 1-2',
    out: 'Strategy document',
  },
  {
    num: '02',
    name: 'Design',
    desc: 'Sitemap, wireframes, design system, and full visual designs for every template — reviewed in working sessions, not over email.',
    time: 'Week 3-5',
    out: 'Design system + pages',
  },
  {
    num: '03',
    name: 'Build',
    desc: 'Frontend code, CMS setup, content migration, SEO + schema, analytics wiring, and accessibility checks on every component.',
    time: 'Week 6-9',
    out: 'Staging build',
  },
  {
    num: '04',
    name: 'Launch',
    desc: 'QA, redirects, DNS, Core Web Vitals pass, accessibility audit, and a controlled go-live with rollback plan in place.',
    time: 'Week 10',
    out: 'Live website',
  },
  {
    num: '05',
    name: 'Tune',
    desc: '30-day post-launch sprint to fix what real traffic surfaces. Then monthly care plan with CRO experiments and content updates.',
    time: 'Month 3+',
    out: 'Compounding growth',
  },
];

const Process = () => {
  return (
    <section className="sl-section wd-proc-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How we build</div>
            <h2 className="sl-sec-title">
              Five phases. <em>Ten weeks to launch.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Named project lead
            <br />
            from day one
          </div>
        </div>

        <div className="wd-proc-rail">
          <div className="wd-proc-line" aria-hidden="true" />
          <div className="wd-proc-grid">
            {PHASES.map((p) => (
              <article key={p.num} className="wd-proc-card">
                <div className="wd-proc-dot">{p.num}</div>
                <div className="wd-proc-time">{p.time}</div>
                <h3 className="wd-proc-name">{p.name}</h3>
                <p className="wd-proc-desc">{p.desc}</p>
                <div className="wd-proc-out">
                  <span className="wd-proc-out-lbl">Output</span>
                  <span className="wd-proc-out-val">{p.out}</span>
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
