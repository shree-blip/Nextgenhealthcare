interface Term {
  short: string;
  long: string;
  desc: string;
  category: 'Metrics' | 'Auth' | 'Lifecycle' | 'Compliance' | 'Deliverability';
}

const TERMS: Term[] = [
  { short: 'OR', long: 'Open Rate', category: 'Metrics', desc: 'Opens / delivered. Healthcare lifecycle benchmark: 45-65%. Apple\'s MPP inflates this - track click rate alongside.' },
  { short: 'CTR', long: 'Click Rate', category: 'Metrics', desc: 'Clicks / delivered. The real engagement metric. 10%+ on lifecycle drips is strong.' },
  { short: 'CTOR', long: 'Click-to-Open Rate', category: 'Metrics', desc: 'Clicks / opens. Measures content quality independent of subject line. 15-30% is the target band.' },
  { short: 'SPF', long: 'Sender Policy Framework', category: 'Auth', desc: 'DNS record that says "these IPs are allowed to send for my domain". One of three required.' },
  { short: 'DKIM', long: 'DomainKeys Identified Mail', category: 'Auth', desc: 'Cryptographic signature on every send. Proves the mail wasn\'t altered in transit.' },
  { short: 'DMARC', long: 'Domain-based Auth Reporting', category: 'Auth', desc: 'Policy that tells receiving servers what to do with mail that fails SPF or DKIM. p=quarantine min.' },
  { short: 'Drip', long: 'Drip Campaign', category: 'Lifecycle', desc: 'A sequence of timed emails triggered by a date or behavior. The opposite of one-off promotional sends.' },
  { short: 'BAA', long: 'Business Associate Agreement', category: 'Compliance', desc: 'HIPAA contract with any vendor that touches PHI. Without it, the ESP can\'t legally send healthcare email.' },
  { short: 'MPP', long: 'Mail Privacy Protection', category: 'Metrics', desc: 'Apple Mail feature that pre-fetches all images, inflating open rates ~40%. Real OR is lower; trust clicks.' },
  { short: 'CTA', long: 'Call To Action', category: 'Lifecycle', desc: 'The primary button/link in the email. One per email, action-verb, 60-second outcome.' },
  { short: 'Bounce', long: 'Hard / Soft Bounce', category: 'Deliverability', desc: 'Hard = invalid address (auto-suppress). Soft = full mailbox or temporary issue (retry).' },
  { short: 'Hygiene', long: 'List Hygiene', category: 'Deliverability', desc: 'Active suppression of inactives, bouncers, complainers. The pillar most healthcare lists never get.' },
];

const Glossary = () => {
  return (
    <section className="sl-section em-glossary-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">08 - The vocabulary</div>
            <h2 className="sl-sec-title">
              Twelve terms <em>your next ESP call should not translate.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Read once
            <br />
            understand the deck
          </div>
        </div>

        <p className="em-glossary-intro">
          Email marketing is acronym-dense by design. Here are the twelve
          that decide whether your list compounds or quietly rots.
        </p>

        <div className="em-glossary-grid">
          {TERMS.map((t) => (
            <article key={t.short} className="em-glossary-card" data-cat={t.category.toLowerCase()}>
              <div className="em-glossary-top">
                <span className="em-glossary-short">{t.short}</span>
                <span className="em-glossary-cat">{t.category}</span>
              </div>
              <div className="em-glossary-long">{t.long}</div>
              <p className="em-glossary-desc">{t.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Glossary;
