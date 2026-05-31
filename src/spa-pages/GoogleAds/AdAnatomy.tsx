interface Part {
  num: string;
  name: string;
  what: string;
  why: string;
}

const PARTS: Part[] = [
  {
    num: '01',
    name: 'Sponsored badge',
    what: 'Google\'s required disclosure label.',
    why: 'Builds trust when paired with a strong domain - hides nothing.',
  },
  {
    num: '02',
    name: 'Display URL + path',
    what: 'Your domain + two custom path segments.',
    why: 'Reinforces relevance. "/dental/emergency" outperforms a bare URL.',
  },
  {
    num: '03',
    name: 'Headline 1 + 2 + 3',
    what: 'Up to three 30-character headlines, machine-mixed.',
    why: 'The single biggest CTR lever. We feed Google 12-15 per ad group.',
  },
  {
    num: '04',
    name: 'Description 1 + 2',
    what: 'Two 90-character lines beneath the headline.',
    why: 'Where benefits, urgency, and proof live. Pin the strongest line first.',
  },
  {
    num: '05',
    name: 'Sitelink extensions',
    what: '2-6 deep links into specific pages (Conditions, Locations, Insurance).',
    why: 'Raises ad size, CTR, and Quality Score - and costs nothing extra.',
  },
  {
    num: '06',
    name: 'Callout extensions',
    what: 'Short proof points: "Same-day appointments", "In-network insurance".',
    why: 'Pre-empts objections before the click. We track which ones convert.',
  },
  {
    num: '07',
    name: 'Structured snippets',
    what: 'Categorized lists: services, brands, conditions, locations.',
    why: 'Signals depth and relevance. Google rewards structured ads with rank.',
  },
  {
    num: '08',
    name: 'Call + location',
    what: 'Click-to-call button + map pin on mobile.',
    why: 'The fastest path from impression to booked patient. Mandatory for clinics.',
  },
];

const AdAnatomy = () => {
  return (
    <section className="sl-section ga-anatomy-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - Anatomy of a winning ad</div>
            <h2 className="sl-sec-title">
              Eight parts. <em>Every one of them earns its space.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Every ad we ship
            <br />
            runs at full coverage
          </div>
        </div>

        <div className="ga-anatomy-grid">
          <div className="ga-anatomy-preview" aria-hidden="true">
            <div className="ga-anatomy-ad">
              <div className="ga-anatomy-line">
                <span className="ga-anatomy-marker">01</span>
                <span className="ga-anatomy-badge">Sponsored</span>
              </div>
              <div className="ga-anatomy-line">
                <span className="ga-anatomy-marker">02</span>
                <span className="ga-anatomy-url">yourpractice.com<span className="path">/dental/emergency</span></span>
              </div>
              <div className="ga-anatomy-line">
                <span className="ga-anatomy-marker">03</span>
                <h3 className="ga-anatomy-h">
                  Emergency Dentist Open Saturday | Same-Day Care | Yourtown
                </h3>
              </div>
              <div className="ga-anatomy-line">
                <span className="ga-anatomy-marker">04</span>
                <p className="ga-anatomy-d">
                  Walk-in welcome. Insurance accepted. Sedation available.
                  Book online in 60 seconds - or call for immediate care.
                </p>
              </div>
              <div className="ga-anatomy-line ga-anatomy-sites">
                <span className="ga-anatomy-marker">05</span>
                <div className="ga-anatomy-sitelinks">
                  <span>Emergency Care</span>
                  <span>Insurance Accepted</span>
                  <span>Book Online</span>
                  <span>Our Locations</span>
                </div>
              </div>
              <div className="ga-anatomy-line">
                <span className="ga-anatomy-marker">06</span>
                <div className="ga-anatomy-callouts">
                  <span>Same-day appointments</span>·
                  <span>In-network insurance</span>·
                  <span>24/7 phone line</span>·
                  <span>5,000+ patients served</span>
                </div>
              </div>
              <div className="ga-anatomy-line">
                <span className="ga-anatomy-marker">07</span>
                <div className="ga-anatomy-snippets">
                  <strong>Services:</strong> Emergency · Cosmetic · Sedation · Pediatric · Implants
                </div>
              </div>
              <div className="ga-anatomy-line ga-anatomy-cta-row">
                <span className="ga-anatomy-marker">08</span>
                <span className="ga-anatomy-callbtn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.74 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.37 1.83.62 2.79.74A2 2 0 0 1 22 16.92z" /></svg>
                  Call now
                </span>
                <span className="ga-anatomy-pin">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  0.4 mi · Open now
                </span>
              </div>
            </div>
          </div>

          <ol className="ga-anatomy-list">
            {PARTS.map((p) => (
              <li key={p.num} className="ga-anatomy-item">
                <span className="ga-anatomy-num">{p.num}</span>
                <div>
                  <h3 className="ga-anatomy-pname">{p.name}</h3>
                  <p className="ga-anatomy-pwhat">{p.what}</p>
                  <p className="ga-anatomy-pwhy"><strong>Why it matters: </strong>{p.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AdAnatomy;
