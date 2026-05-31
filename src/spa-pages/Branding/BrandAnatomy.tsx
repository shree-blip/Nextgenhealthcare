interface Part {
  num: string;
  name: string;
  what: string;
  why: string;
}

const PARTS: Part[] = [
  {
    num: '01',
    name: 'Primary mark + lockups',
    what: 'One ownable mark + 4-6 lockups for layout flexibility.',
    why: 'The first signal a patient parses. Distinctive marks recall 3x better than generic ones.',
  },
  {
    num: '02',
    name: 'Color palette + tokens',
    what: '1 primary + 1 secondary + 4 neutrals + accessibility-tested pairs.',
    why: 'Color owns recognition before shapes do. Tokens enforce consistency across every channel.',
  },
  {
    num: '03',
    name: 'Type system',
    what: 'Display + body + UI faces, with size + weight + line-height scales.',
    why: 'Typography carries voice silently. The wrong serif on a pediatric brand undoes the rest.',
  },
  {
    num: '04',
    name: 'Photography direction',
    what: 'Mood board + sample shoots + post-production rules.',
    why: 'Stock photos kill more healthcare brands than bad logos. Real patients beat stock 4-to-1 on trust.',
  },
  {
    num: '05',
    name: 'Voice + tone framework',
    what: 'Voice rules + 3-axis tone matrix + sample sentences.',
    why: 'Front desk, ad copy, and provider bios should sound like one practice. This is how.',
  },
  {
    num: '06',
    name: 'Iconography + illustration',
    what: 'Custom icon set + illustration approach matching the brand.',
    why: 'Stock icons leak personality. A small custom set sets healthcare brands apart instantly.',
  },
  {
    num: '07',
    name: 'Motion + interaction',
    what: 'Easing curves, transition rules, micro-interactions.',
    why: 'Modern brands live in motion. Calm easing reads "trustworthy"; snappy bounces read "cheap".',
  },
  {
    num: '08',
    name: 'Application library',
    what: 'Web · social · print · signage templates ready to ship.',
    why: "A brand that lives in Figma but never on signage is a brand that doesn't exist.",
  },
];

const BrandAnatomy = () => {
  return (
    <section className="sl-section br-anatomy-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - Anatomy of a brand system</div>
            <h2 className="sl-sec-title">
              Eight layers. <em>Every one shows up to work.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Pressure-tested
            <br />
            then shipped
          </div>
        </div>

        <div className="br-anatomy-grid">
          <div className="br-anatomy-preview" aria-hidden="true">
            <div className="br-anatomy-board">
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">01</span>
                <div className="br-anatomy-mark">
                  <div className="m-mono">
                    <span>BH</span>
                  </div>
                  <div className="m-word">
                    <span>Bayview</span>
                    <span>Health</span>
                  </div>
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">02</span>
                <div className="br-anatomy-palette">
                  <span className="sw a" />
                  <span className="sw b" />
                  <span className="sw c" />
                  <span className="sw d" />
                  <span className="sw e" />
                  <span className="sw f" />
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">03</span>
                <div className="br-anatomy-type">
                  <span className="display">Aa</span>
                  <span className="body">
                    <span className="big">Trust, set in type.</span>
                    <span className="small">Inter · Regular · 14px / 22px</span>
                  </span>
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">04</span>
                <div className="br-anatomy-photos">
                  <div className="ph p1" />
                  <div className="ph p2" />
                  <div className="ph p3" />
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">05</span>
                <div className="br-anatomy-voice">
                  <span className="quote">
                    &ldquo;Care that knows your name before you say it.&rdquo;
                  </span>
                  <span className="rules">Warm · clinical · never cute · never clinical-cold</span>
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">06</span>
                <div className="br-anatomy-icons">
                  <span className="ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" />
                    </svg>
                  </span>
                  <span className="ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </span>
                  <span className="ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <span className="ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">07</span>
                <div className="br-anatomy-motion">
                  <span className="curve" />
                  <span className="lbl">
                    Easing · standard · 280ms · cubic-bezier(.4, 0, .2, 1)
                  </span>
                </div>
              </div>
              <div className="br-anatomy-row">
                <span className="br-anatomy-marker">08</span>
                <div className="br-anatomy-apps">
                  <span className="app web">Web</span>
                  <span className="app social">Social</span>
                  <span className="app print">Print</span>
                  <span className="app sign">Signage</span>
                </div>
              </div>
            </div>
          </div>

          <ol className="br-anatomy-list">
            {PARTS.map((p) => (
              <li key={p.num} className="br-anatomy-item">
                <span className="br-anatomy-num">{p.num}</span>
                <div>
                  <h3 className="br-anatomy-pname">{p.name}</h3>
                  <p className="br-anatomy-pwhat">{p.what}</p>
                  <p className="br-anatomy-pwhy">
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

export default BrandAnatomy;
