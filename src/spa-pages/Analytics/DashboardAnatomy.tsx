interface Part {
  num: string;
  name: string;
  what: string;
  why: string;
}

const PARTS: Part[] = [
  {
    num: '01',
    name: 'Executive header',
    what: 'Practice name, period selector, last-refresh timestamp.',
    why: 'Eliminates "is this current?" questions. Live timestamp builds trust at a glance.',
  },
  {
    num: '02',
    name: 'KPI row',
    what: '4-6 leadership numbers: booked patients, revenue, blended CPA, ROAS.',
    why: 'The screen leadership reads first. Numbers that decide whether to keep spending.',
  },
  {
    num: '03',
    name: 'Trend chart',
    what: 'Bookings, revenue, or leads over time - by channel.',
    why: 'The single most-screenshotted view. Shows the trajectory, not just the snapshot.',
  },
  {
    num: '04',
    name: 'Attribution funnel',
    what: 'Impressions → Clicks → Leads → Booked → Revenue.',
    why: 'Where the leaks live. Funnel reveals which stage is breaking even when totals look fine.',
  },
  {
    num: '05',
    name: 'Channel breakdown',
    what: 'Per-channel spend, leads, CPA, ROAS - sorted by ROAS.',
    why: 'The budget decision in one table. Shows which channels deserve more spend tomorrow.',
  },
  {
    num: '06',
    name: 'Cohort + LTV table',
    what: 'Patients grouped by acquisition month + service line + LTV.',
    why: 'The compounding view. CPA is meaningless without LTV; this is where it lives.',
  },
  {
    num: '07',
    name: 'Anomaly alerts',
    what: 'Auto-flagged deltas (>20% week-over-week) with explanations.',
    why: 'Surfaces issues before the weekly call. Email when ROAS drops 30%, before a month of waste.',
  },
  {
    num: '08',
    name: 'Drill-through links',
    what: 'Every metric clickable to source platform / row-level data.',
    why: 'Replaces the "what does this number actually mean" question. Auditable end-to-end.',
  },
];

const DashboardAnatomy = () => {
  return (
    <section className="sl-section an-anatomy-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - Anatomy of a winning dashboard</div>
            <h2 className="sl-sec-title">
              Eight panels. <em>Every one decides a question.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Built around
            <br />
            the questions you ask
          </div>
        </div>

        <div className="an-anatomy-grid">
          <div className="an-anatomy-preview" aria-hidden="true">
            <div className="an-anatomy-dash">
              <div className="an-anatomy-row r1">
                <span className="an-anatomy-marker">01</span>
                <div className="an-anatomy-head">
                  <span className="title">Bayview Health Network</span>
                  <span className="period">Oct 1 - Oct 31 · Last refresh 9:42 am</span>
                </div>
              </div>
              <div className="an-anatomy-row r2">
                <span className="an-anatomy-marker">02</span>
                <div className="an-anatomy-kpis">
                  <div className="kpi">
                    <span className="lbl">Booked</span>
                    <span className="val">1,284</span>
                    <span className="dlt up">↑62%</span>
                  </div>
                  <div className="kpi">
                    <span className="lbl">Revenue</span>
                    <span className="val">$847K</span>
                    <span className="dlt up">↑38%</span>
                  </div>
                  <div className="kpi">
                    <span className="lbl">CPA</span>
                    <span className="val">$28</span>
                    <span className="dlt up">↓42%</span>
                  </div>
                  <div className="kpi">
                    <span className="lbl">ROAS</span>
                    <span className="val">4.2×</span>
                    <span className="dlt up">↑0.9</span>
                  </div>
                </div>
              </div>
              <div className="an-anatomy-row r3">
                <span className="an-anatomy-marker">03</span>
                <div className="an-anatomy-chart">
                  <span className="lbl">Bookings by channel · 30d</span>
                  <svg viewBox="0 0 200 50" preserveAspectRatio="none">
                    <path
                      d="M0,40 C25,36 50,30 75,26 C100,22 125,18 150,12 C175,8 200,5 200,5"
                      fill="none"
                      stroke="#0EA5E9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,45 C30,42 60,38 90,34 C120,30 150,24 180,18 C195,15 200,13 200,13"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="an-anatomy-row r4">
                <span className="an-anatomy-marker">04</span>
                <div className="an-anatomy-funnel">
                  <div className="step">
                    <span className="lbl">Impressions</span>
                    <span className="bar" style={{ width: '100%' }} />
                    <span className="n">142K</span>
                  </div>
                  <div className="step">
                    <span className="lbl">Clicks</span>
                    <span className="bar" style={{ width: '70%' }} />
                    <span className="n">12.4K</span>
                  </div>
                  <div className="step">
                    <span className="lbl">Leads</span>
                    <span className="bar" style={{ width: '42%' }} />
                    <span className="n">2.8K</span>
                  </div>
                  <div className="step">
                    <span className="lbl">Booked</span>
                    <span className="bar" style={{ width: '22%' }} />
                    <span className="n">1.3K</span>
                  </div>
                </div>
              </div>
              <div className="an-anatomy-row r5">
                <span className="an-anatomy-marker">05</span>
                <div className="an-anatomy-table">
                  <div className="row head">
                    <span>Channel</span>
                    <span>Spend</span>
                    <span>Leads</span>
                    <span>ROAS</span>
                  </div>
                  <div className="row">
                    <span>Google Ads</span>
                    <span>$24K</span>
                    <span>1,420</span>
                    <span className="r">5.1×</span>
                  </div>
                  <div className="row">
                    <span>Local SEO</span>
                    <span>$8K</span>
                    <span>980</span>
                    <span className="r">6.4×</span>
                  </div>
                  <div className="row">
                    <span>Meta Ads</span>
                    <span>$12K</span>
                    <span>620</span>
                    <span className="r">2.8×</span>
                  </div>
                </div>
              </div>
              <div className="an-anatomy-row r6 alert">
                <span className="an-anatomy-marker">07</span>
                <div className="an-anatomy-alert">
                  <span className="ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span className="txt">
                    Meta CPL +38% week-over-week · check creative rotation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ol className="an-anatomy-list">
            {PARTS.map((p) => (
              <li key={p.num} className="an-anatomy-item">
                <span className="an-anatomy-num">{p.num}</span>
                <div>
                  <h3 className="an-anatomy-pname">{p.name}</h3>
                  <p className="an-anatomy-pwhat">{p.what}</p>
                  <p className="an-anatomy-pwhy">
                    <strong>Why it matters: </strong>
                    {p.why}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default DashboardAnatomy;
