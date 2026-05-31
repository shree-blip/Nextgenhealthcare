interface Stat {
  num: string;
  unit?: string;
  lbl: string;
  sub: string;
}

const STATS: Stat[] = [
  { num: '−42', unit: '%', lbl: 'Cost per lead', sub: 'Median CPL drop in the first 90 days across the active book.' },
  { num: '4.6', unit: '×', lbl: 'Return on ad spend', sub: 'Tracked ROAS across aesthetic, dental, and specialty practices.' },
  { num: '8.4', unit: '%', lbl: 'Booking conversion', sub: 'Landed-traffic booking rate for retained clinic accounts.' },
  { num: '+62', unit: '%', lbl: 'Lead quality', sub: 'Lift in lead-to-booked rate after pre-qualifying form filters.' },
];

const Results = () => {
  return (
    <section className="sl-section ma-data-section" id="results">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - What the dashboard reads</div>
            <h2 className="sl-sec-title">
              The numbers we&rsquo;re <em>actually paid on.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Aggregate of active
            <br />
            healthcare accounts
          </div>
        </div>

        <div className="ma-data-grid">
          {STATS.map((s) => (
            <article key={s.lbl} className="ma-data-card">
              <div className="ma-data-num">
                {s.num}
                {s.unit && <em>{s.unit}</em>}
              </div>
              <div className="ma-data-lbl">{s.lbl}</div>
              <p className="ma-data-sub">{s.sub}</p>
            </article>
          ))}
        </div>

        <p className="ma-data-note">
          <strong>Compliance note.</strong> Meta restricts targeting for certain regulated
          health categories. Our creative and audience frameworks are built against
          Meta&rsquo;s current healthcare policy — we don&rsquo;t promise prohibited targeting,
          and we don&rsquo;t risk your account on grey-area workarounds.
        </p>
      </div>
    </section>
  );
};

export default Results;
