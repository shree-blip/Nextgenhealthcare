interface Pillar {
  letter: string;
  name: string;
  weight: string;
  desc: string;
  examples: string[];
}

const PILLARS: Pillar[] = [
  {
    letter: 'E',
    name: 'Experience',
    weight: 'Signal 1',
    desc: 'First-hand experience demonstrated in the writing. The "I have actually done this procedure" voice that thin AI content can\'t fake.',
    examples: ['Practitioner-as-author', 'Real case anecdotes (de-identified)', 'Surgery + procedure walkthroughs'],
  },
  {
    letter: 'E',
    name: 'Expertise',
    weight: 'Signal 2',
    desc: 'Credentialed clinical knowledge. Healthcare YMYL content lives or dies on whether the author holds a relevant license.',
    examples: ['Author bio with credentials', 'Reviewer byline + license #', 'Topic-specific authorship'],
  },
  {
    letter: 'A',
    name: 'Authoritativeness',
    weight: 'Signal 3',
    desc: 'How well-cited and externally referenced the author and site are. Backlinks from medical sites, academic citations, press mentions.',
    examples: ['Medical-site backlinks', 'Press citations', 'Academic references'],
  },
  {
    letter: 'T',
    name: 'Trustworthiness',
    weight: 'Signal 4',
    desc: 'Editorial governance: HTTPS, transparency, contact info, sourcing, last-reviewed date, conflict-of-interest disclosure. The most weighted signal.',
    examples: ['"Reviewed by" + date', 'Citations to primary sources', 'Conflict disclosures'],
  },
];

const FORMULA = [
  { token: 'Topical Authority', kind: 'result' },
  { token: '=', kind: 'op' },
  { token: 'Experience', kind: 'var', tone: 'e1' },
  { token: '×', kind: 'op' },
  { token: 'Expertise', kind: 'var', tone: 'e2' },
  { token: '+', kind: 'op' },
  { token: 'Authority', kind: 'var', tone: 'a' },
  { token: '+', kind: 'op' },
  { token: 'Trust', kind: 'var', tone: 't' },
];

const HowContentCompounds = () => {
  return (
    <section className="sl-section cm-how-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">03 - How content compounds</div>
            <h2 className="sl-sec-title">
              Authority is earned. <em>Four signals decide it.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Google&rsquo;s YMYL
            <br />
            standard, in plain English
          </div>
        </div>

        <p className="cm-how-intro">
          Google&rsquo;s <strong>E-E-A-T</strong> framework is the rulebook
          for everything healthcare content can rank for. AI Overviews,
          ChatGPT, and Perplexity all weight versions of the same signals.
          Healthcare is classified as YMYL (&ldquo;Your Money or Your Life&rdquo;)
          - the strictest quality tier on the internet. Content that ignores
          these signals doesn&rsquo;t just rank lower; it doesn&rsquo;t
          rank at all.
        </p>

        <div className="cm-how-formula">
          {FORMULA.map((t, i) => (
            <span key={i} className={`cm-how-tok ${t.kind}${t.tone ? ' ' + t.tone : ''}`}>
              {t.token}
            </span>
          ))}
        </div>

        <div className="cm-how-grid">
          {PILLARS.map((p, i) => (
            <article key={p.name} className="cm-how-card" data-pos={i}>
              <div className="cm-how-letter" aria-hidden="true">{p.letter}</div>
              <div className="cm-how-meta">
                <h3 className="cm-how-name">{p.name}</h3>
                <span className="cm-how-weight">{p.weight}</span>
              </div>
              <p className="cm-how-desc">{p.desc}</p>
              <ul className="cm-how-examples">
                {p.examples.map((e) => (
                  <li key={e}>
                    <span className="cm-how-bullet" aria-hidden="true">→</span>
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="cm-how-callout">
          <div className="cm-how-callout-eyebrow">Why this matters for healthcare</div>
          <p>
            A generalist marketing agency writing &ldquo;5 signs of vitamin
            deficiency&rdquo; without a credentialed reviewer is invisible
            in 2026 healthcare SERPs. The same article with a licensed RD
            byline, a clinician reviewer, primary-source citations, and a
            last-reviewed date ranks - and gets cited by AI Overviews. The
            content isn&rsquo;t the moat; the editorial governance is.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowContentCompounds;
