interface Signal {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const SIGNALS: Signal[] = [
  {
    letter: 'R',
    name: 'Relationships',
    weight: 'Signal 1',
    desc: 'How often each viewer interacts with your account specifically. Likes, comments, saves, profile visits, DMs - all weighted.',
    examples: ['Engagement velocity (first hour)', 'Save rate', 'Profile visits per impression'],
  },
  {
    letter: 'I',
    name: 'Interest match',
    weight: 'Signal 2',
    desc: 'How well your post matches what each viewer has historically engaged with. Algorithm pattern-matches content type, topic, and creator behavior.',
    examples: ['Topic clustering', 'Caption keyword signals', 'On-screen text (Reels OCR)'],
  },
  {
    letter: 'P',
    name: 'Post performance',
    weight: 'Signal 3',
    desc: 'How the post is performing for similar-audience viewers right now. The first 30 minutes decide the next 30 days.',
    examples: ['First-hour engagement rate', 'Watch time (Reels/Shorts)', 'Shares + sends'],
  },
  {
    letter: 'C',
    name: 'Creator authority',
    weight: 'Signal 4',
    desc: 'Your account\'s topical authority on a specific subject. Healthcare-only accounts that consistently post on one topic outperform broad accounts 4-6×.',
    examples: ['Posting consistency', 'Topical clustering', 'Bio + handle keyword match'],
  },
];

const FORMULA = [
  { token: 'Reach', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'Relationships', kind: 'var', tone: 'r' },
  { token: '×', kind: 'op' },
  { token: 'Interest', kind: 'var', tone: 'i' },
  { token: '+', kind: 'op' },
  { token: 'Performance', kind: 'var', tone: 'p' },
  { token: '+', kind: 'op' },
  { token: 'Authority', kind: 'var', tone: 'c' },
];

const HowSocialWorks = () => {
  return (
    <section className="sl-section sm-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How the algorithm works</div>
            <h2 className="sl-sec-title">
              Reach is earned. <em>Four signals decide it.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Not followers
            <br />
            Not luck
          </div>
        </div>

        <p className="sm-how-intro">
          Followers are vanity. <strong>Reach</strong> is the only metric that
          decides whether your content actually finds the patients you treat.
          Every major platform - Instagram, TikTok, YouTube, LinkedIn -
          weights the same four signals to decide who sees what. Healthcare
          accounts that win do so by engineering all four, not chasing one.
        </p>

        <div className="sm-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`sm-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="sm-how-grid">
          {SIGNALS.map((s, i) => (
            <article key={s.name} className="sm-how-card" data-pos={i}>
              <div className="sm-how-letter" aria-hidden="true">{s.letter}</div>
              <div className="sm-how-meta">
                <h3 className="sm-how-name">{s.name}</h3>
                <span className="sm-how-weight">{s.weight}</span>
              </div>
              <p className="sm-how-desc">{s.desc}</p>
              <ul className="sm-how-examples">
                {s.examples.map((e) => (
                  <li key={e}>
                    <span className="sm-how-bullet" aria-hidden="true">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="sm-how-callout">
          <div className="sm-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            Healthcare accounts that bounce between topics (a recipe today, a
            patient story tomorrow, a clinic event the day after) get
            algorithmically punished. Topical authority compounds: an account
            posting consistently about <em>one</em> service line - say,
            cosmetic dentistry - will out-reach a 10x-larger generalist
            account in that audience. We pick your pillars first, content
            second.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowSocialWorks;
