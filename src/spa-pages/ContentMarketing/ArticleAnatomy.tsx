interface Part {
  num: string;
  name: string;
  what: string;
  why: string;
}

const PARTS: Part[] = [
  { num: '01', name: 'Title tag + H1', what: '50-60 chars, primary keyword early, no clickbait.', why: 'The single biggest CTR + ranking lever. AI Overviews use the H1 to decide if you\'re cited.' },
  { num: '02', name: 'Meta description', what: '140-160 chars summarising the answer, not the topic.', why: 'CTR from SERP is decided here. We rewrite under-performers monthly.' },
  { num: '03', name: 'Lede + TL;DR', what: 'First 80 words contain the direct answer.', why: 'AI Overviews pull from the first paragraph 78% of the time. Lede is the new headline.' },
  { num: '04', name: 'H2 structure', what: '5-7 H2s mapped to user intent, not keyword stuffing.', why: 'Featured snippets favor question-shaped H2s. Long-tail traffic compounds through them.' },
  { num: '05', name: 'Author + reviewer byline', what: 'Author credentials, reviewer credentials, license #, review date.', why: 'YMYL ranking requires E-E-A-T proof. No byline = no top-3 ranking in healthcare.' },
  { num: '06', name: 'Inline citations', what: 'Linked primary sources (NIH, JAMA, NEJM), not blogs.', why: 'Editorial trust + AI cite-ability. The page that cites cleanly gets cited cleanly.' },
  { num: '07', name: 'Internal-link cluster', what: '3-7 contextual links to supporting + pillar pages.', why: 'How topical authority compounds. The page that links well, ranks well.' },
  { num: '08', name: 'Schema markup', what: 'Article + MedicalWebPage + FAQPage + HowTo when applicable.', why: 'The structured data that earns rich results + AI citation eligibility.' },
];

const ArticleAnatomy = () => {
  return (
    <section className="sl-section cm-anatomy-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - Anatomy of a winning article</div>
            <h2 className="sl-sec-title">
              Eight elements. <em>Every one earns its place.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Every piece
            <br />
            ships at full coverage
          </div>
        </div>

        <div className="cm-anatomy-grid">
          <div className="cm-anatomy-preview" aria-hidden="true">
            <div className="cm-anatomy-page">
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">01</span>
                <h3 className="cm-anatomy-h">The 5 questions to ask before any cardiac stress test</h3>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">02</span>
                <p className="cm-anatomy-meta">If you&rsquo;ve been told you need a cardiac stress test, here are the 5 questions to ask your cardiologist - and what the answers mean for your care plan.</p>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">03</span>
                <div className="cm-anatomy-lede">
                  <span className="lbl">TL;DR</span>
                  <p>Stress tests come in three varieties. Choosing the right one depends on your medical history, what your cardiologist suspects, and what you can safely tolerate. Here&rsquo;s the framework.</p>
                </div>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">04</span>
                <ul className="cm-anatomy-h2s">
                  <li>1. Which type of stress test is this?</li>
                  <li>2. What does the result actually tell us?</li>
                  <li>3. Are there safer alternatives for me?</li>
                  <li>4. How should I prepare?</li>
                  <li>5. What happens next, either way?</li>
                </ul>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">05</span>
                <div className="cm-anatomy-byline">
                  <span className="av" />
                  <div>
                    <span className="name">By Dr. Lena Marin, MD · Cardiology, Bayview Health</span>
                    <span className="rev">Reviewed by Dr. R. Singh, MD (Lic. CA-187432) · Last reviewed Jan 14, 2026</span>
                  </div>
                </div>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">06</span>
                <p className="cm-anatomy-cite">
                  &ldquo;Exercise stress echocardiography has a sensitivity of 80-85%&hellip;&rdquo;
                  <span className="src">— <em>JAMA Cardiology, 2024</em></span>
                </p>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">07</span>
                <div className="cm-anatomy-internal">
                  <span className="lbl">Related</span>
                  <div className="links">
                    <span>→ Echocardiogram vs CT angiography</span>
                    <span>→ Recovery after a positive stress test</span>
                    <span>→ Pillar: cardiac diagnostic guide</span>
                  </div>
                </div>
              </div>
              <div className="cm-anatomy-row">
                <span className="cm-anatomy-marker">08</span>
                <code className="cm-anatomy-schema">
                  {`{ "@type": "MedicalWebPage", "reviewedBy": "Dr. R. Singh, MD", "lastReviewed": "2026-01-14" }`}
                </code>
              </div>
            </div>
          </div>

          <ol className="cm-anatomy-list">
            {PARTS.map((p) => (
              <li key={p.num} className="cm-anatomy-item">
                <span className="cm-anatomy-num">{p.num}</span>
                <div>
                  <h3 className="cm-anatomy-pname">{p.name}</h3>
                  <p className="cm-anatomy-pwhat">{p.what}</p>
                  <p className="cm-anatomy-pwhy"><strong>Why it matters: </strong>{p.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ArticleAnatomy;
