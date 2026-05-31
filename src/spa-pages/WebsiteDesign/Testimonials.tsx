interface Quote {
  q: string;
  name: string;
  role: string;
  initials: string;
}

const QUOTES: Quote[] = [
  {
    q: 'The redesign paid for itself in four months. Page speed went from a 41 to a 96 on Lighthouse, our cost-per-booking dropped 38%, and the editorial team can finally publish a service page without filing a dev ticket.',
    name: 'Dr. Hannah Levy',
    role: 'Practice Owner · Aesthetic + Dermatology Group',
    initials: 'HL',
  },
  {
    q: 'We&rsquo;d been quoted six figures by two other agencies. TheNextGen shipped a faster, more accessible, more conversion-focused site for less, on time, and trained our team to run it. No vendor lock-in is the part I tell every other practice owner about.',
    name: 'Marcus Patel',
    role: 'Director of Growth · Multi-Site Clinic Network',
    initials: 'MP',
  },
  {
    q: 'The accessibility audit alone was worth the engagement. A patient with a screen reader emailed us in the second week to say it was the first medical site they&rsquo;d been able to book on without calling for help. That moment changed how I think about our digital presence.',
    name: 'Dr. Anjali Rao',
    role: 'Founder · Specialty Care Practice',
    initials: 'AR',
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const Testimonials = () => {
  return (
    <section className="sl-section wd-tx-section" id="testimonials">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - In their words</div>
            <h2 className="sl-sec-title">
              Practice owners who <em>own their new website.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            40+ healthcare builds
            <br />
            shipped since 2021
          </div>
        </div>

        <div className="wd-tx-grid">
          {QUOTES.map((t) => (
            <article key={t.name} className="wd-tx-card">
              <div className="wd-tx-stars" aria-label="5 out of 5 stars">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p
                className="wd-tx-quote"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${t.q}&rdquo;` }}
              />
              <div className="wd-tx-meta">
                <div className="wd-tx-avatar">{t.initials}</div>
                <div className="wd-tx-handle">
                  <span className="wd-tx-name">{t.name}</span>
                  <span className="wd-tx-role">{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
