interface RankingFactor {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const FACTORS: RankingFactor[] = [
  {
    letter: 'E',
    name: 'Experience',
    weight: 'YMYL critical',
    desc: 'First-hand experience of the topic. For healthcare, that means real patient outcomes, real procedure pages, real provider voices.',
    examples: ['Provider bios with credentials', 'First-person case studies', 'Procedure photos & videos'],
  },
  {
    letter: 'E',
    name: 'Expertise',
    weight: 'High weight',
    desc: 'Clinical depth. Author credentials, medical review workflows, and condition coverage that reads like a clinician wrote it.',
    examples: ['MD-reviewed content', 'Author schema', 'Medical citations + sources'],
  },
  {
    letter: 'A',
    name: 'Authoritativeness',
    weight: 'High weight',
    desc: 'Who else recognises you? Citations from health directories, hospital affiliations, and local press signal real-world standing.',
    examples: ['Hospital affiliations', 'Medical directory listings', 'Local & trade press features'],
  },
  {
    letter: 'T',
    name: 'Trust',
    weight: 'Override factor',
    desc: 'The largest single weight in Google\'s quality rater guidelines. Without trust signals, the other three do not help you rank.',
    examples: ['HTTPS + clean security', 'Real address + hours', 'Transparent policies + reviews'],
  },
];

const ALGO_INPUTS = [
  { name: 'Helpful content system', desc: 'Site-wide quality signal that demotes thin or AI-spam content.' },
  { name: 'Core ranking updates', desc: 'Recalibration of relevance + quality models, run every few months.' },
  { name: 'Reviews system', desc: 'Rewards in-depth, first-hand product/service reviews over thin summaries.' },
  { name: 'Spam updates', desc: 'Targets manipulative link patterns and cloaking.' },
  { name: 'Local pack ranking', desc: 'Distance + relevance + prominence, weighted live by Google.' },
  { name: 'AI Overview eligibility', desc: 'Structured content, clear answers, and source-able claims.' },
];

const HowGoogleRanks = () => {
  return (
    <section className="sl-section seo-rank-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">04 - How Google ranks</div>
            <h2 className="sl-sec-title">
              The four letters that decide <em>healthcare visibility.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Quality Rater
            <br />
            Guidelines · Aug 2025
          </div>
        </div>

        <p className="seo-rank-intro">
          Google&rsquo;s quality framework for medical sites is E-E-A-T:
          Experience, Expertise, Authoritativeness, Trust. Healthcare is
          flagged as YMYL (Your Money or Your Life), which means these
          signals are weighted harder than they are for almost any other
          industry. Everything we build maps to one of these four letters.
        </p>

        <div className="seo-rank-grid">
          {FACTORS.map((f, i) => (
            <article key={f.name} className="seo-rank-card" data-pos={i}>
              <div className="seo-rank-letter" aria-hidden="true">{f.letter}</div>
              <div className="seo-rank-meta">
                <h3 className="seo-rank-name">{f.name}</h3>
                <span className="seo-rank-weight">{f.weight}</span>
              </div>
              <p className="seo-rank-desc">{f.desc}</p>
              <ul className="seo-rank-examples">
                {f.examples.map((e) => (
                  <li key={e}>
                    <span className="seo-rank-bullet" aria-hidden="true">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="seo-rank-algo">
          <div className="seo-rank-algo-head">
            <span className="seo-rank-algo-eyebrow">Plus six live algorithm inputs we watch each release cycle</span>
          </div>
          <div className="seo-rank-algo-grid">
            {ALGO_INPUTS.map((a) => (
              <div key={a.name} className="seo-rank-algo-card">
                <h4 className="seo-rank-algo-name">{a.name}</h4>
                <p className="seo-rank-algo-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowGoogleRanks;
