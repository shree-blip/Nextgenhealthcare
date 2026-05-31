interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Technical' | 'On-Page' | 'Off-Page' | 'Local' | 'AEO' | 'Metrics';
}

const TERMS: Term[] = [
  { short: 'SERP', long: 'Search Engine Results Page', category: 'Metrics', desc: 'The page Google returns for a query. Mix of organic links, ads, local pack, AI overview.' },
  { short: 'CTR', long: 'Click-Through Rate', category: 'Metrics', desc: 'Clicks divided by impressions. The single best lever for getting more from existing rankings.' },
  { short: 'CWV', long: 'Core Web Vitals', category: 'Technical', desc: 'LCP, INP, CLS. Google\'s three speed + stability metrics. Required to pass.' },
  { short: 'E-E-A-T', long: 'Experience, Expertise, Authority, Trust', category: 'On-Page', desc: 'The quality framework Google applies hardest to healthcare and finance sites.' },
  { short: 'YMYL', long: 'Your Money or Your Life', category: 'On-Page', desc: 'Topics that can affect health, safety, or finance. Held to the highest E-E-A-T bar.' },
  { short: 'Schema', long: 'Schema.org Structured Data', category: 'AEO', desc: 'Machine-readable tags that help Google understand your content - and quote it in AI Overviews.' },
  { short: 'GBP', long: 'Google Business Profile', category: 'Local', desc: 'Your Maps and Local Pack listing. The single largest local ranking factor.' },
  { short: 'NAP', long: 'Name, Address, Phone', category: 'Local', desc: 'Your business citation triplet. Must be identical across every directory.' },
  { short: 'Map Pack', long: 'Local 3-Pack', category: 'Local', desc: 'The three local listings Google shows above organic results. 78% of local clicks land here.' },
  { short: 'Canonical', long: 'Canonical URL', category: 'Technical', desc: 'The tag telling Google which version of a duplicate page is the real one.' },
  { short: 'Anchor Text', long: 'Anchor Text', category: 'Off-Page', desc: 'The clickable text of a backlink. Diversity matters; over-optimization triggers penalties.' },
  { short: 'AEO', long: 'Answer Engine Optimization', category: 'AEO', desc: 'Optimizing to be quoted by AI answer engines (Google AI Overview, Perplexity, ChatGPT).' },
];

const Glossary = () => {
  return (
    <section className="sl-section seo-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">05 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Speak SEO <em>before</em> your next agency call.
            </h2>
          </div>
          <div className="sl-sec-meta">
            Twelve terms
            <br />
            you need to know
          </div>
        </div>

        <p className="seo-glossary-intro">
          Practice owners get sold a lot of acronyms. Here are the twelve
          that actually matter - so the next agency pitch you sit through
          is a conversation, not a translation exercise.
        </p>

        <div className="seo-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="seo-glossary-card" data-cat={t.category.toLowerCase().replace(' ', '-')}>
              <div className="seo-glossary-top">
                <span className="seo-glossary-short">{t.short}</span>
                <span className="seo-glossary-cat">{t.category}</span>
              </div>
              <div className="seo-glossary-long">{t.long}</div>
              <p className="seo-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
