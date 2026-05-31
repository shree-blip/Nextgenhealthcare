interface Mistake {
  num: string;
  bad: string;
  cost: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    num: '01',
    bad: 'No SPF, DKIM, or DMARC configured',
    cost: '30-50% of legitimate sends land in spam. Sender reputation never recovers.',
    fix: 'Configure all three before the first send. DMARC at p=quarantine minimum.',
  },
  {
    num: '02',
    bad: 'Sending PHI in the email body',
    cost: 'HIPAA violation per affected patient. Mandatory breach notification.',
    fix: 'Email carries an invitation to a portal - never patient health data itself.',
  },
  {
    num: '03',
    bad: 'No list pruning - sending to inactives forever',
    cost: 'Engagement rate craters. Gmail starts deprioritizing the whole sender.',
    fix: 'Auto-suppress inactives at 180 days. Re-permission campaign before suppression.',
  },
  {
    num: '04',
    bad: 'Two CTAs in one email',
    cost: 'Click-through rate drops 30-40%. Reader picks neither.',
    fix: 'One primary action per email. Soft secondary as text link only.',
  },
  {
    num: '05',
    bad: 'Brand name in From field, not provider name',
    cost: 'Open rate down 20-35%. Patients don\'t recognize "Coastal Dental Marketing".',
    fix: 'Provider name in From. "Dr. Marin · Coastal Dental" beats brand-only every time.',
  },
  {
    num: '06',
    bad: 'No attribution between send and booking',
    cost: 'Can\'t prove email moves revenue. Budget gets cut.',
    fix: 'UTM-tag every link. Pass through to booking system. Tie back to revenue.',
  },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section em-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            What bad email
            <br />
            actually costs
          </div>
        </div>

        <div className="em-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="em-mistakes-card">
              <div className="em-mistakes-top">
                <span className="em-mistakes-num">{m.num}</span>
                <span className="em-mistakes-tag">Leak</span>
              </div>
              <h3 className="em-mistakes-bad">{m.bad}</h3>
              <p className="em-mistakes-cost">
                <span className="em-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="em-mistakes-fix">
                <span className="em-mistakes-fix-lbl">Fix</span>
                {m.fix}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonMistakes;
