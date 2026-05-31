interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Quality' | 'Structure' | 'Surface' | 'Authority' | 'Production';
}

const TERMS: Term[] = [
  { short: 'E-E-A-T', long: 'Experience · Expertise · Authority · Trust', category: 'Quality', desc: 'Google\'s quality framework for YMYL content. Healthcare can\'t rank without proving all four.' },
  { short: 'YMYL', long: 'Your Money or Your Life', category: 'Quality', desc: 'Google\'s classification for high-stakes content (health, finance, legal). Strictest quality bar on the web.' },
  { short: 'Pillar', long: 'Pillar Page', category: 'Structure', desc: '2,500+ word definitive guide to a service line. The hub every supporting article links back to.' },
  { short: 'Cluster', long: 'Topic Cluster', category: 'Structure', desc: 'Pillar + 8-12 supporting articles around one theme. How topical authority compounds.' },
  { short: 'AEO', long: 'Answer Engine Optimization', category: 'Surface', desc: 'Optimizing content for AI search (AI Overviews, ChatGPT, Perplexity) rather than just classic SERPs.' },
  { short: 'SERP', long: 'Search Engine Results Page', category: 'Surface', desc: 'The Google results page itself. Ranking + features (snippets, AI Overviews, People Also Ask).' },
  { short: 'CTR', long: 'Click-Through Rate', category: 'Surface', desc: 'Clicks / impressions on the SERP. Strongest for #1-3 positions; AI Overviews are eroding this band.' },
  { short: 'DA', long: 'Domain Authority', category: 'Authority', desc: 'Aggregate signal of how authoritative the whole domain is. Built over years; harder to fake.' },
  { short: 'Schema', long: 'Schema.org Markup', category: 'Structure', desc: 'Structured-data JSON-LD that helps Google + AI parse the page. MedicalWebPage + FAQPage are critical.' },
  { short: 'Refresh', long: 'Content Refresh', category: 'Production', desc: 'Quarterly update of older articles. Updates last-reviewed date, adds citations, restores ranking.' },
  { short: 'Intent', long: 'Search Intent', category: 'Quality', desc: 'What the searcher actually wants (informational, navigational, transactional, commercial). One per article.' },
  { short: 'Decay', long: 'Content Decay', category: 'Production', desc: 'The 10-30%/quarter ranking erosion of un-refreshed pages after month 9. Active management required.' },
];

const Glossary = () => {
  return (
    <section className="sl-section cm-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve terms <em>your next content call should not translate.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="cm-glossary-intro">
          Content marketing has acquired a dictionary&rsquo;s worth of
          acronyms in the AI-search era. Here are the twelve that decide
          whether your content ranks, compounds, and earns AI citation.
        </p>

        <div className="cm-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="cm-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="cm-glossary-top">
                <span className="cm-glossary-short">{t.short}</span>
                <span className="cm-glossary-cat">{t.category}</span>
              </div>
              <div className="cm-glossary-long">{t.long}</div>
              <p className="cm-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
