interface Part {
  num: string;
  name: string;
  what: string;
  why: string;
}

const PARTS: Part[] = [
  {
    num: '01',
    name: 'From name + address',
    what: 'Recognizable sender. Provider name beats brand name 3-5×.',
    why: 'The single biggest open-rate lever. "Dr. Marin · Coastal Dental" outperforms "Coastal Dental Marketing" every time.',
  },
  {
    num: '02',
    name: 'Subject line',
    what: '40-60 chars. Lowercase, specific, one idea.',
    why: 'Decides the open. Personal-sounding, no all-caps, no emoji spam, no "Hi {first_name}" if the data is dirty.',
  },
  {
    num: '03',
    name: 'Preview text',
    what: 'The line under the subject in the inbox preview.',
    why: 'Free real estate most teams waste. Set it explicitly - never let the email body bleed in.',
  },
  {
    num: '04',
    name: 'Header + opening line',
    what: 'No "Dear Valued Patient." A human sentence, by name when clean.',
    why: 'Lifts read-through by 30-40%. The provider voice carried in here, not in a brochure header.',
  },
  {
    num: '05',
    name: 'Body content',
    what: 'Short. Specific. Plain text-feel. Mobile-first. No PHI.',
    why: 'Most healthcare email is too long. We aim for under 120 words to one CTA. Anything more and reply rate collapses.',
  },
  {
    num: '06',
    name: 'Primary CTA',
    what: 'One button. Action-verb. 60-second outcome.',
    why: 'Two CTAs = 0 CTAs. "Book in 60 seconds" outperforms "Schedule your appointment" because the friction reads lower.',
  },
  {
    num: '07',
    name: 'Soft secondary',
    what: 'A linked text line - call, FAQ, or reply.',
    why: 'For the 70% who won&rsquo;t click the primary. Reply-to-this-email is the highest-converting secondary in healthcare.',
  },
  {
    num: '08',
    name: 'Footer + compliance',
    what: 'Physical address, unsubscribe, opt-out preferences.',
    why: 'CAN-SPAM, CASL, and inbox-provider requirements. One missed footer item and the next send goes to spam by default.',
  },
];

const EmailAnatomy = () => {
  return (
    <section className="sl-section em-anatomy-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - Anatomy of a winning email</div>
            <h2 className="sl-sec-title">
              Eight parts. <em>Every one earns its line.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Every send
            <br />
            built this way
          </div>
        </div>

        <div className="em-anatomy-grid">
          <div className="em-anatomy-preview" aria-hidden="true">
            <div className="em-anatomy-email">
              <div className="em-anatomy-meta">
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">01</span>
                  <span className="em-anatomy-from">
                    <strong>Dr. Marin · Coastal Dental</strong>
                    <span className="addr">marin@coastaldental.health</span>
                  </span>
                </div>
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">02</span>
                  <span className="em-anatomy-subj">your cleaning is due — 60-second booking link inside</span>
                </div>
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">03</span>
                  <span className="em-anatomy-prev">Hi Sarah — quick note from Dr. Marin. We have Tuesday + Thursday morning openings...</span>
                </div>
              </div>
              <div className="em-anatomy-body">
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">04</span>
                  <span className="em-anatomy-hello">Hi Sarah,</span>
                </div>
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">05</span>
                  <p className="em-anatomy-p">
                    It&rsquo;s been five months since your last cleaning, and
                    we&rsquo;re starting to fill May&rsquo;s schedule. If
                    Tuesday or Thursday mornings work, the booking link
                    below takes about 60 seconds.
                  </p>
                </div>
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">06</span>
                  <span className="em-anatomy-cta">Book in 60 seconds →</span>
                </div>
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">07</span>
                  <span className="em-anatomy-secondary">
                    Prefer to call? <em>(415) 555-0142</em> — Mon-Fri 8 am-5 pm.
                  </span>
                </div>
              </div>
              <div className="em-anatomy-foot">
                <div className="em-anatomy-line">
                  <span className="em-anatomy-marker">08</span>
                  <div className="em-anatomy-footer">
                    <span>Coastal Dental · 240 Bayshore Ave, San Mateo CA 94401</span>
                    <span className="links">Unsubscribe · Update preferences</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ol className="em-anatomy-list">
            {PARTS.map((p) => (
              <li key={p.num} className="em-anatomy-item">
                <span className="em-anatomy-num">{p.num}</span>
                <div>
                  <h3 className="em-anatomy-pname">{p.name}</h3>
                  <p className="em-anatomy-pwhat">{p.what}</p>
                  <p className="em-anatomy-pwhy"><strong>Why it matters: </strong>{p.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EmailAnatomy;
