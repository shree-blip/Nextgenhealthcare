interface Quote {
  q: string;
  name: string;
  role: string;
  initials: string;
}

const QUOTES: Quote[] = [
  {
    q: 'They rebuilt our tracking, ripped out three dead audiences, and inside a month our cost per booked patient was down 38%. The weekly Loom is the part I actually look forward to.',
    name: 'Dr. Priya Mehta',
    role: 'Owner · Aesthetic Clinic, Bangalore',
    initials: 'PM',
  },
  {
    q: 'Two agencies before this one promised the world and burned spend on lookalikes that never converted. TheNextGen audit was honest, the creative is finally on-brand, and the WhatsApp flow alone pays the retainer.',
    name: 'Rohan Iyer',
    role: 'Practice Manager · Dental Group, Mumbai',
    initials: 'RI',
  },
  {
    q: 'I&rsquo;m a clinician, not a marketer. They translate everything into bookings on the calendar, and they tell me when something isn&rsquo;t working before I have to ask. That alone is rare.',
    name: 'Dr. Anjali Rao',
    role: 'Founder · Skin & Hair Studio, Hyderabad',
    initials: 'AR',
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const Testimonials = () => {
  return (
    <section className="sl-section ma-tx-section" id="testimonials">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - In their words</div>
            <h2 className="sl-sec-title">
              Clinic owners who <em>kept their audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            40+ active accounts
            <br />
            healthcare-only
          </div>
        </div>

        <div className="ma-tx-grid">
          {QUOTES.map((t) => (
            <article key={t.name} className="ma-tx-card">
              <div className="ma-tx-stars" aria-label="5 out of 5 stars">
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p
                className="ma-tx-quote"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${t.q}&rdquo;` }}
              />
              <div className="ma-tx-meta">
                <div className="ma-tx-avatar">{t.initials}</div>
                <div className="ma-tx-handle">
                  <span className="ma-tx-name">{t.name}</span>
                  <span className="ma-tx-role">{t.role}</span>
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
