interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Engagement' | 'Reach' | 'Conversion' | 'Production' | 'Algorithm';
}

const TERMS: Term[] = [
  { short: 'ER', long: 'Engagement Rate', category: 'Engagement', desc: 'Likes + comments + saves + shares / impressions. Healthcare benchmark: 1-2%. Anything above 4% is exceptional.' },
  { short: 'Reach', long: 'Unique Accounts Reached', category: 'Reach', desc: 'How many unique accounts saw the post. Different from impressions - the same viewer counts once.' },
  { short: 'Impr', long: 'Impressions', category: 'Reach', desc: 'Total times the post was displayed. One reach can produce several impressions if a viewer re-watches.' },
  { short: 'CPM', long: 'Cost Per Mille (1000)', category: 'Conversion', desc: 'Paid amplification cost per 1,000 impressions. Healthcare meta CPMs run $8-$30.' },
  { short: 'CPL', long: 'Cost Per Lead', category: 'Conversion', desc: 'Paid spend / leads generated. Strong healthcare benchmark: $40-$120 depending on specialty.' },
  { short: 'CTR', long: 'Click-Through Rate', category: 'Engagement', desc: 'Profile or link clicks / impressions. Anything over 1.5% on healthcare paid social is strong.' },
  { short: 'Save', long: 'Save Rate', category: 'Algorithm', desc: 'Saves / impressions. The single highest-weighted positive signal on Instagram + TikTok.' },
  { short: 'Share', long: 'Share Rate', category: 'Algorithm', desc: 'Shares-to-DM / impressions. Shares to non-followers are how reach compounds.' },
  { short: 'Hook', long: 'Hook Rate (3s)', category: 'Algorithm', desc: '% of viewers who watch past 3 seconds. Below 30% on Reels means rebuild the opening.' },
  { short: 'WT%', long: 'Watch-Through %', category: 'Algorithm', desc: 'Avg % of the video watched. Anything above 60% on a 30-second Reel is excellent.' },
  { short: 'UGC', long: 'User-Generated Content', category: 'Production', desc: 'Patient-created posts mentioning your clinic. Goldmine - if compliance + consent is handled right.' },
  { short: 'Pillar', long: 'Content Pillar', category: 'Production', desc: 'A topic theme your account commits to. Topical authority is built one pillar at a time.' },
];

const Glossary = () => {
  return (
    <section className="sl-section sm-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve terms <em>your next social call should not need to translate.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="sm-glossary-intro">
          Social-media reporting is dashboard-dense. Here are the twelve
          numbers that decide whether you&rsquo;re actually growing or just
          posting - and what each one tells you about what to do next.
        </p>

        <div className="sm-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="sm-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="sm-glossary-top">
                <span className="sm-glossary-short">{t.short}</span>
                <span className="sm-glossary-cat">{t.category}</span>
              </div>
              <div className="sm-glossary-long">{t.long}</div>
              <p className="sm-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
