interface Stat {
  num: string;
  unit?: string;
  lbl: string;
  sub: string;
}

const STATS: Stat[] = [
  { num: '−62', unit: '%', lbl: 'LCP drop', sub: 'Median Largest Contentful Paint improvement at launch vs. legacy build.' },
  { num: '+88', unit: '%', lbl: 'Booking CVR', sub: 'Median lift in form-fill and call-tap conversion after redesign.' },
  { num: '98', lbl: 'Lighthouse score', sub: 'Average Lighthouse Performance score at handover across 2025 launches.' },
  { num: '10', unit: ' wk', lbl: 'Build to launch', sub: 'Typical time from signed contract to a live, indexed website.' },
];

const Results = () => {
  return (
    <section className="sl-section wd-res-section" id="results">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - What we deliver</div>
            <h2 className="sl-sec-title">
              The numbers we ship <em>against, every build.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Aggregate of 2025
            <br />
            healthcare launches
          </div>
        </div>

        <div className="wd-res-grid">
          {STATS.map((s) => (
            <article key={s.lbl} className="wd-res-card">
              <div className="wd-res-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="wd-res-lbl">{s.lbl}</div>
              <p className="wd-res-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <p className="wd-res-note">
          <strong>How we report.</strong> These are medians across active 2025 clinic
          launches, sourced from PageSpeed Insights, GA4, and the CRM. We don&rsquo;t blend
          in industry averages, and we don&rsquo;t publish a number we can&rsquo;t reproduce
          on demand from your dashboard.
        </p>
      </div>
    </section>
  );
};

export default Results;
