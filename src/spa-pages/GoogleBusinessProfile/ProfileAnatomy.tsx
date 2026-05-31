interface Part {
  num: string;
  name: string;
  what: string;
  why: string;
}

const PARTS: Part[] = [
  {
    num: '01',
    name: 'Business name',
    what: 'Legal name exactly - no keyword stuffing.',
    why: 'Stuffing keywords ("Bayview Urgent Care - Fastest Walk-In") gets you suspended. Google enforces this strictly.',
  },
  {
    num: '02',
    name: 'Primary category',
    what: 'The single most accurate category. Not the broadest.',
    why: 'The single biggest relevance lever. "Pediatric dentist" beats "Dentist" for pediatric searches by 4-7 positions.',
  },
  {
    num: '03',
    name: 'Verified badge',
    what: "Google's blue checkmark after verification.",
    why: 'Required for ranking eligibility. Healthcare verification often requires video; we walk you through it.',
  },
  {
    num: '04',
    name: 'Hours + holidays',
    what: 'Including holiday hours, special hours, more-hours by service.',
    why: 'Profiles flagged "permanently closed" or "may be closed" lose 50%+ of visibility instantly. Holiday accuracy matters.',
  },
  {
    num: '05',
    name: 'Photos (interior, exterior, team)',
    what: '20-50 photos minimum, weekly fresh adds.',
    why: 'Direct-request lift +35% on profiles with active photo cadence. Patients scroll the gallery.',
  },
  {
    num: '06',
    name: 'Reviews + responses',
    what: 'Steady velocity, <24h response time, HIPAA-safe replies.',
    why: 'Review velocity + response rate are top-3 ranking signals. Quality > volume > recency.',
  },
  {
    num: '07',
    name: 'Services + products',
    what: 'Service-line listings with descriptions + prices when allowed.',
    why: 'Services field is queried by Google for relevance matching. Most clinics leave it empty.',
  },
  {
    num: '08',
    name: 'Posts + Q&A + attributes',
    what: 'Weekly posts, seeded Q&A, full attribute coverage.',
    why: 'The activity signal. A live profile beats a stale one - even at lower review counts.',
  },
];

const ProfileAnatomy = () => {
  return (
    <section className="sl-section gb-anatomy-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - Anatomy of a winning profile</div>
            <h2 className="sl-sec-title">
              Eight fields. <em>Every one earns its rank.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Every profile
            <br />
            shipped at full coverage
          </div>
        </div>

        <div className="gb-anatomy-grid">
          <div className="gb-anatomy-preview" aria-hidden="true">
            <div className="gb-anatomy-card">
              <div className="gb-anatomy-banner" />
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">01</span>
                <h3 className="gb-anatomy-name">Bayview Urgent Care</h3>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">02</span>
                <span className="gb-anatomy-cat">
                  Urgent care center · Walk-in clinic · Medical clinic
                </span>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">03</span>
                <div className="gb-anatomy-verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  Verified by Google
                </div>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">04</span>
                <div className="gb-anatomy-hours">
                  <div className="row">
                    <span>Mon–Fri</span>
                    <span>8 am – 9 pm</span>
                  </div>
                  <div className="row">
                    <span>Sat–Sun</span>
                    <span>9 am – 6 pm</span>
                  </div>
                  <div className="row holiday">
                    <span>Holiday hours</span>
                    <span>Updated weekly</span>
                  </div>
                </div>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">05</span>
                <div className="gb-anatomy-photos">
                  <div className="ph p1" />
                  <div className="ph p2" />
                  <div className="ph p3" />
                  <div className="ph p4">
                    <span>+47</span>
                  </div>
                </div>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">06</span>
                <div className="gb-anatomy-reviews">
                  <span className="stars">★★★★★</span>
                  <span className="count">
                    <strong>4.9</strong> · 487 reviews
                  </span>
                  <span className="resp">100% response · &lt;2h avg</span>
                </div>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">07</span>
                <div className="gb-anatomy-services">
                  <span>Walk-in care</span>
                  <span>X-ray on-site</span>
                  <span>Pediatric urgent</span>
                  <span>Occupational health</span>
                  <span>Telehealth</span>
                </div>
              </div>
              <div className="gb-anatomy-row">
                <span className="gb-anatomy-marker">08</span>
                <div className="gb-anatomy-post">
                  <span className="lbl">New post</span>
                  <span className="txt">
                    Now accepting walk-ins until 9 pm. Same-day X-ray on-site.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ol className="gb-anatomy-list">
            {PARTS.map((p) => (
              <li key={p.num} className="gb-anatomy-item">
                <span className="gb-anatomy-num">{p.num}</span>
                <div>
                  <h3 className="gb-anatomy-pname">{p.name}</h3>
                  <p className="gb-anatomy-pwhat">{p.what}</p>
                  <p className="gb-anatomy-pwhy">
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

export default ProfileAnatomy;
