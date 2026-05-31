interface Mistake {
  num: string;
  bad: string;
  cost: string;
  fix: string;
}

const MISTAKES: Mistake[] = [
  {
    num: '01',
    bad: 'Logo-first thinking',
    cost: 'Beautiful mark, zero behavior change. The rebrand earns nothing in 12 months.',
    fix: 'Positioning first. Identity second. System third. Rollout last - never in reverse order.',
  },
  {
    num: '02',
    bad: 'Designing on moodboards, not surfaces',
    cost: 'Brand looks great in Figma. Falls apart on the live booking page + ad creative.',
    fix: 'Every round shown on live patient-facing surfaces. No isolated Figma approval.',
  },
  {
    num: '03',
    bad: 'No design tokens, no system',
    cost: 'Two months in, every page slowly drifts. Brand inconsistency on every channel.',
    fix: 'Token-first build (color, type, spacing, motion). Enforced via Figma + dev handoff.',
  },
  {
    num: '04',
    bad: 'Stock photography in healthcare',
    cost: 'Patient trust drops 30-50%. Identical stock photo shows up at a competitor clinic.',
    fix: 'Quarterly real-photo capture. Clinician + patient (consent) photography. No stock.',
  },
  {
    num: '05',
    bad: 'No voice + tone framework',
    cost: 'Front desk sounds different from ads. Provider bios sound different from social.',
    fix: 'Voice framework + 3-axis tone matrix + sample copy. One brand voice, every touchpoint.',
  },
  {
    num: '06',
    bad: 'Big-bang launch, signage included',
    cost: 'Multi-location practice closes for 2 days. Lost revenue + patient confusion.',
    fix: 'Digital first · clinic-printables next · signage last. Phased rollout · zero downtime.',
  },
];

const CommonMistakes = () => {
  return (
    <section className="sl-section br-mistakes-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">07 - Common mistakes</div>
            <h2 className="sl-sec-title">
              The six leaks <em>we find on every brand audit.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            What bad branding
            <br />
            actually costs
          </div>
        </div>

        <div className="br-mistakes-grid">
          {MISTAKES.map((m) => (
            <article key={m.num} className="br-mistakes-card">
              <div className="br-mistakes-top">
                <span className="br-mistakes-num">{m.num}</span>
                <span className="br-mistakes-tag">Leak</span>
              </div>
              <h3 className="br-mistakes-bad">{m.bad}</h3>
              <p className="br-mistakes-cost">
                <span className="br-mistakes-cost-lbl">Cost</span>
                {m.cost}
              </p>
              <p className="br-mistakes-fix">
                <span className="br-mistakes-fix-lbl">Fix</span>
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
