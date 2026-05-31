interface Factor {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const FACTORS: Factor[] = [
  {
    letter: 'P',
    name: 'Proximity',
    weight: 'Lever 1',
    desc: "How close the searcher is to your clinic. The only lever you can't move - but the one you can engineer around with service-area strategy and multi-location coverage.",
    examples: ['Service-area radius', 'Multi-location footprint', 'Driving-time targeting'],
  },
  {
    letter: 'R',
    name: 'Relevance',
    weight: 'Lever 2',
    desc: 'How well your profile matches the search query. Categories, services, business description, and review keywords all signal what you actually do.',
    examples: ['Primary + secondary categories', 'Service-line listings', 'Review keyword density'],
  },
  {
    letter: 'A',
    name: 'Authority (Prominence)',
    weight: 'Lever 3',
    desc: 'How well-known, well-cited, and well-reviewed you are on the open web. Backlinks, citations, brand search volume, review velocity - all feed the prominence score.',
    examples: [
      'Citation count + consistency',
      'Review velocity + quality',
      'Branded search volume',
    ],
  },
  {
    letter: 'A',
    name: 'Activity',
    weight: 'Lever 4',
    desc: 'How actively the profile is maintained. Posts, photos, Q&A, message responses - Google rewards profiles that look alive vs. profiles set up once and forgotten.',
    examples: ['Weekly posts', 'Photo cadence', 'Q&A engagement', 'Message response rate'],
  },
];

const FORMULA = [
  { token: 'Map Rank', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'Proximity', kind: 'var', tone: 'p' },
  { token: '×', kind: 'op' },
  { token: 'Relevance', kind: 'var', tone: 'r' },
  { token: '+', kind: 'op' },
  { token: 'Authority', kind: 'var', tone: 'a1' },
  { token: '+', kind: 'op' },
  { token: 'Activity', kind: 'var', tone: 'a2' },
];

const HowMapRanksWork = () => {
  return (
    <section className="sl-section gb-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How map ranking works</div>
            <h2 className="sl-sec-title">
              The Local Pack is decided <em>by four signals.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Proximity is fixed
            <br />
            the other three aren&rsquo;t
          </div>
        </div>

        <p className="gb-how-intro">
          Google&rsquo;s Local Pack - the three map results above the organic listings - is decided
          by four signals. Most clinics assume <strong>proximity</strong> dominates (it
          doesn&rsquo;t). The three you actually control - <strong>relevance</strong>,
          <strong> authority</strong>, and <strong>activity</strong> - determine whether your clinic
          shows up to a patient one mile away or your competitor two blocks closer.
        </p>

        <div className="gb-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`gb-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="gb-how-grid">
          {FACTORS.map((f, i) => (
            <article key={f.name + i} className="gb-how-card" data-pos={i}>
              <div className="gb-how-letter" aria-hidden="true">
                {f.letter}
              </div>
              <div className="gb-how-meta">
                <h3 className="gb-how-name">{f.name}</h3>
                <span className="gb-how-weight">{f.weight}</span>
              </div>
              <p className="gb-how-desc">{f.desc}</p>
              <ul className="gb-how-examples">
                {f.examples.map((e) => (
                  <li key={e}>
                    <span className="gb-how-bullet" aria-hidden="true">
                      →
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="gb-how-callout">
          <div className="gb-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            Healthcare is the most competitive Local Pack category on the internet. A primary care
            clinic in a city competes against 50+ providers within a 3-mile radius. Proximity alone
            won&rsquo;t win you the top three. We see clinics rank #1 from <em>2.5 miles away</em>{' '}
            regularly - because we&rsquo;ve engineered the other three signals harder than the
            proximity advantage of their nearest competitor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowMapRanksWork;
