interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Metric' | 'Attribution' | 'Stack' | 'Compliance' | 'Modeling';
}

const TERMS: Term[] = [
  {
    short: 'KPI',
    long: 'Key Performance Indicator',
    category: 'Metric',
    desc: 'The 4-6 metrics leadership actually decides on. Everything else is supporting context.',
  },
  {
    short: 'CPA',
    long: 'Cost Per Acquisition',
    category: 'Metric',
    desc: 'Total spend / booked patients. The number every practice owner watches - rarely calculated correctly without LTV alongside.',
  },
  {
    short: 'LTV',
    long: 'Lifetime Value',
    category: 'Metric',
    desc: 'Revenue from a patient across their full relationship. CPA without LTV produces wrong budget decisions.',
  },
  {
    short: 'ROAS',
    long: 'Return on Ad Spend',
    category: 'Metric',
    desc: 'Revenue / ad spend. Healthcare benchmark: 3-6x. Anything below 2x is leaking.',
  },
  {
    short: 'GA4',
    long: 'Google Analytics 4',
    category: 'Stack',
    desc: "Google's current analytics platform. Powerful but PHI-blind by default; needs server-side hardening for healthcare.",
  },
  {
    short: 'CAPI',
    long: 'Conversions API (server-side)',
    category: 'Stack',
    desc: 'Server-side conversion send for Meta, Google, etc. Bypasses adblockers + iOS tracking protection. Required for healthcare.',
  },
  {
    short: 'UTM',
    long: 'Urchin Tracking Module',
    category: 'Attribution',
    desc: 'Tagged URL parameters (utm_source, utm_medium, etc.) that tell GA4 which campaign sent the click.',
  },
  {
    short: 'MTA',
    long: 'Multi-Touch Attribution',
    category: 'Attribution',
    desc: 'Crediting every channel that touched a converting patient, not just the last. The honest model.',
  },
  {
    short: 'DDA',
    long: 'Data-Driven Attribution',
    category: 'Attribution',
    desc: 'Machine-learned attribution that weights touches by statistical contribution. Requires conversion volume.',
  },
  {
    short: 'PHI',
    long: 'Protected Health Information',
    category: 'Compliance',
    desc: 'Patient-identifiable health data. Must never appear in analytics URLs, parameters, pixel payloads, or warehouse joins.',
  },
  {
    short: 'BAA',
    long: 'Business Associate Agreement',
    category: 'Compliance',
    desc: "Required HIPAA contract with any vendor that touches PHI. Without one, the tool can't legally process healthcare data.",
  },
  {
    short: 'Cohort',
    long: 'Cohort Analysis',
    category: 'Modeling',
    desc: 'Patients grouped by acquisition month + channel. The only honest way to compare CPA over time as LTV matures.',
  },
];

const Glossary = () => {
  return (
    <section className="sl-section an-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve terms <em>your next analytics call should not translate.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="an-glossary-intro">
          Marketing analytics is acronym-soup. Here are the twelve that decide whether your
          dashboard tells the truth - or just sounds like it does.
        </p>

        <div className="an-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="an-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="an-glossary-top">
                <span className="an-glossary-short">{t.short}</span>
                <span className="an-glossary-cat">{t.category}</span>
              </div>
              <div className="an-glossary-long">{t.long}</div>
              <p className="an-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
