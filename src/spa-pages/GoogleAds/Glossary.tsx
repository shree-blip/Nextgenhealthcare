interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Metrics' | 'Bidding' | 'Account' | 'Quality' | 'Targeting';
}

const TERMS: Term[] = [
  { short: 'CPC', long: 'Cost Per Click', category: 'Metrics', desc: 'What you pay each time someone clicks your ad. Healthcare CPCs run $5-$200 depending on service line.' },
  { short: 'CTR', long: 'Click-Through Rate', category: 'Metrics', desc: 'Clicks divided by impressions. Above 5% is strong for healthcare search; 10%+ is excellent.' },
  { short: 'CPA', long: 'Cost Per Acquisition', category: 'Metrics', desc: 'What you pay to acquire one booked patient. The single most important number on the dashboard.' },
  { short: 'ROAS', long: 'Return on Ad Spend', category: 'Metrics', desc: 'Revenue divided by ad spend. 4x means $4 of revenue for every $1 spent. Healthcare benchmark: 3-6x.' },
  { short: 'QS', long: 'Quality Score', category: 'Quality', desc: 'Google\'s 1-10 score of ad + landing-page quality. Higher QS = lower CPC for the same position.' },
  { short: 'tCPA', long: 'Target CPA Bidding', category: 'Bidding', desc: 'You set the CPA you’re willing to pay; Google bids automatically to hit it.' },
  { short: 'tROAS', long: 'Target ROAS Bidding', category: 'Bidding', desc: 'You set the ROAS you need; Google optimizes spend mix to hit it.' },
  { short: 'PMax', long: 'Performance Max', category: 'Account', desc: 'AI-driven campaign that runs across Search, Display, YouTube, Discover, Maps, and Gmail.' },
  { short: 'LSA', long: 'Local Services Ads', category: 'Account', desc: 'Pay-per-lead Google ads that appear above search results - for licensed local services.' },
  { short: 'SQR', long: 'Search Query Report', category: 'Quality', desc: 'The actual searches that triggered your ads. Mining this weekly is where wasted spend dies.' },
  { short: 'Negatives', long: 'Negative Keywords', category: 'Targeting', desc: 'Keywords you tell Google NOT to show ads for. The first list saves 30-50% of wasted spend.' },
  { short: 'IS', long: 'Impression Share', category: 'Metrics', desc: 'How often your ad shows vs. how often it was eligible. Low IS = budget cap or low Ad Rank.' },
];

const Glossary = () => {
  return (
    <section className="sl-section ga-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve acronyms <em>your next agency call should not need translation for.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="ga-glossary-intro">
          Google Ads is acronym-dense by design. Here are the twelve terms
          that matter - the ones that decide whether you&rsquo;re spending
          smartly or burning budget.
        </p>

        <div className="ga-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="ga-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="ga-glossary-top">
                <span className="ga-glossary-short">{t.short}</span>
                <span className="ga-glossary-cat">{t.category}</span>
              </div>
              <div className="ga-glossary-long">{t.long}</div>
              <p className="ga-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
