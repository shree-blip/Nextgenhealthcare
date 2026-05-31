interface Pillar {
  num: string;
  name: string;
  share: string;
  desc: string;
  examples: string[];
  tone: string;
}

const PILLARS: Pillar[] = [
  {
    num: '01',
    name: 'Educational',
    share: '40%',
    desc: 'Patient-language explanations of conditions, procedures, prep, recovery. The pillar that builds search authority and saves.',
    examples: ['"3 signs you need a cardiologist"', '"What to expect at your first visit"', 'Carousel: misconceptions about X'],
    tone: 'edu',
  },
  {
    num: '02',
    name: 'Behind-the-scenes',
    share: '20%',
    desc: 'Day-in-the-life, team intros, exam room tours, the dog at reception. Builds the parasocial trust that converts a click into a booking.',
    examples: ['Provider morning routine', 'Front-desk reel', 'Clinic walkthrough'],
    tone: 'bts',
  },
  {
    num: '03',
    name: 'Patient stories',
    share: '15%',
    desc: 'Consent-cleared testimonials and outcomes. Strongest conversion driver - and the highest compliance bar. Reviewed twice before posting.',
    examples: ['Before/after (with consent)', '60-second patient interview', 'Treatment journey series'],
    tone: 'stories',
  },
  {
    num: '04',
    name: 'Provider voice',
    share: '15%',
    desc: 'Your physicians on camera, in plain language, on one topic each. The pillar that turns the practice into a brand and the provider into a household name in the city.',
    examples: ['"Ask Dr. X" Q&A', 'Topical authority series', 'CME-adjacent explainers'],
    tone: 'voice',
  },
  {
    num: '05',
    name: 'Promotional',
    share: '10%',
    desc: 'New services, seasonal offers, open scheduling, event invitations. Earn the right to promote with the other 90% first.',
    examples: ['New service launch', 'Seasonal package', 'Event RSVP'],
    tone: 'promo',
  },
];

const ContentPillars = () => {
  return (
    <section className="sl-section sm-pillars-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - The content mix</div>
            <h2 className="sl-sec-title">
              Five pillars. <em>One disciplined mix.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            40 · 20 · 15 · 15 · 10
            <br />
            on purpose
          </div>
        </div>

        <p className="sm-pillars-intro">
          Most healthcare social fails because it&rsquo;s 80% promotional and
          20% afterthought. The mix below is what we run on every engagement
          - tuned by specialty, calibrated to what your audience actually
          saves and shares. The pillar share isn&rsquo;t a guess, it&rsquo;s
          the share that compounds reach.
        </p>

        <div className="sm-pillars-bar" role="presentation" aria-hidden="true">
          {PILLARS.map((p) => (
            <span
              key={p.num}
              className={`sm-pillars-seg seg-${p.tone}`}
              style={{ flexBasis: p.share }}
              title={`${p.name}: ${p.share}`}
            >
              <span className="sm-pillars-seg-lbl">{p.name}</span>
              <span className="sm-pillars-seg-share">{p.share}</span>
            </span>
          ))}
        </div>

        <div className="sm-pillars-grid">
          {PILLARS.map((p) => (
            <article key={p.num} className={`sm-pillars-card pillar-${p.tone}`}>
              <div className="sm-pillars-top">
                <span className="sm-pillars-num">{p.num}</span>
                <span className="sm-pillars-share">{p.share}</span>
              </div>
              <h3 className="sm-pillars-name">{p.name}</h3>
              <p className="sm-pillars-desc">{p.desc}</p>
              <ul className="sm-pillars-examples">
                {p.examples.map((e) => (
                  <li key={e}>
                    <span className="sm-pillars-bullet" aria-hidden="true">›</span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentPillars;
