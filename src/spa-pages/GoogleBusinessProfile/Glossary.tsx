interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Profile' | 'Ranking' | 'Authority' | 'Activity' | 'Metrics';
}

const TERMS: Term[] = [
  {
    short: 'GBP',
    long: 'Google Business Profile',
    category: 'Profile',
    desc: 'The free Google listing for local businesses. Formerly Google My Business (GMB). The asset that decides Local Pack ranking.',
  },
  {
    short: 'NAP',
    long: 'Name · Address · Phone',
    category: 'Profile',
    desc: 'The three identity fields that must be consistent across every directory on the open web. NAP inconsistency tanks rank.',
  },
  {
    short: 'Pack',
    long: 'Local Pack (3-Pack)',
    category: 'Ranking',
    desc: 'The three map listings Google shows above organic results for local searches. 78% of local clicks go here.',
  },
  {
    short: 'Proximity',
    long: 'Searcher Proximity',
    category: 'Ranking',
    desc: "Distance between searcher and business. The one ranking factor you can't change - but can engineer around.",
  },
  {
    short: 'Cat',
    long: 'Primary Category',
    category: 'Ranking',
    desc: 'The single most accurate Google category. Single biggest relevance lever. "Pediatric dentist" > "Dentist".',
  },
  {
    short: 'Citation',
    long: 'Business Citation',
    category: 'Authority',
    desc: 'A mention of your NAP on any directory (Yelp, BBB, Healthgrades, etc.). Volume + consistency = authority.',
  },
  {
    short: 'Review',
    long: 'Review Velocity',
    category: 'Authority',
    desc: 'Rate at which new reviews arrive. Strong velocity (10+ per month) signals an active, popular business.',
  },
  {
    short: 'Posts',
    long: 'Google Posts',
    category: 'Activity',
    desc: 'Short updates pinned to your GBP. Weekly cadence signals an active profile. Most clinics never post.',
  },
  {
    short: 'Q&A',
    long: 'GBP Questions & Answers',
    category: 'Activity',
    desc: 'Public Q&A on your profile. Anyone can answer. We pre-seed the 15-20 most-asked patient questions so you control the narrative.',
  },
  {
    short: 'Insights',
    long: 'GBP Insights / Performance',
    category: 'Metrics',
    desc: "Google's native dashboard - search queries, profile views, calls, direction requests, photo views.",
  },
  {
    short: 'Geo-grid',
    long: 'Geo-Grid Rank Tracking',
    category: 'Metrics',
    desc: 'A map of your rank at dozens of points around your catchment area. Shows where you win and where you lose.',
  },
  {
    short: 'Suspension',
    long: 'Profile Suspension',
    category: 'Profile',
    desc: 'When Google takes your profile offline. Caused by keyword stuffing, address violations, or category abuse. 4-12 weeks to reinstate.',
  },
];

const Glossary = () => {
  return (
    <section className="sl-section gb-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve terms <em>your next local-SEO call should not translate.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="gb-glossary-intro">
          Local SEO has its own dialect. Here are the twelve terms that decide whether your clinic
          owns the map - or hides on page two.
        </p>

        <div className="gb-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="gb-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="gb-glossary-top">
                <span className="gb-glossary-short">{t.short}</span>
                <span className="gb-glossary-cat">{t.category}</span>
              </div>
              <div className="gb-glossary-long">{t.long}</div>
              <p className="gb-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
