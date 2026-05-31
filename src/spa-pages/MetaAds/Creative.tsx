interface CreativeType {
  num: string;
  name: string;
  desc: string;
  where: string;
  tag: string;
}

const CREATIVE: CreativeType[] = [
  {
    num: '01',
    name: 'UGC patient stories',
    desc: 'Real patients, real outcomes, real phones — the format that outperforms every studio shoot. Briefed, edited, and compliance-screened in-house.',
    where: 'Reels · Stories · Facebook Feed',
    tag: 'Top performer',
  },
  {
    num: '02',
    name: 'Static carousels',
    desc: 'Before-and-after, service menus, pricing transparency — the workhorses that quietly drive the bottom of the funnel for high-intent searchers.',
    where: 'Feed · Marketplace',
    tag: 'Always-on',
  },
  {
    num: '03',
    name: 'In-clinic video',
    desc: 'High-production walkthroughs filmed inside your practice — clinician interviews, equipment tours, procedure explainers patients actually watch.',
    where: 'Reels · Feed · YouTube cross-post',
    tag: 'Brand depth',
  },
  {
    num: '04',
    name: 'Lead-form ads',
    desc: 'Pre-qualifying lead forms with 3-5 screening questions. Submissions flow straight into your CRM via webhook — no manual export, no leakage.',
    where: 'Facebook · Instagram',
    tag: 'Highest volume',
  },
  {
    num: '05',
    name: 'Click-to-WhatsApp',
    desc: 'Tap-the-ad-and-chat. The shortest distance between scroll and booking, and the surface every clinic underuses. We script the bot flow too.',
    where: 'Reels · Stories · Feed',
    tag: 'Highest CVR',
  },
  {
    num: '06',
    name: 'Retargeting collections',
    desc: 'Scroll-stopping creative that follows the 80% of site visitors who left without booking — service-specific, not generic brand awareness.',
    where: 'Feed · Marketplace · Audience Network',
    tag: 'Recovery',
  },
];

const Creative = () => {
  return (
    <section className="sl-section ma-creative-section" id="creative">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">02 - What we ship</div>
            <h2 className="sl-sec-title">
              Six creative formats. <em>One editorial standard.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Scripted, shot, edited
            <br />
            and compliance-screened
          </div>
        </div>

        <p className="ma-creative-intro">
          Meta&rsquo;s algorithm rewards creative variety — not budget size. Our in-house team
          produces <strong>8-12 fresh assets every month</strong> per active account, tested in
          structured A/B sets so the winner is obvious by week three. Nothing recycled from a
          stock library. Nothing that won&rsquo;t pass Meta&rsquo;s healthcare policy review.
        </p>

        <div className="ma-creative-grid">
          {CREATIVE.map((c) => (
            <article key={c.num} className="ma-creative-card">
              <div className="ma-creative-num">{c.num}</div>
              <h3 className="ma-creative-name">{c.name}</h3>
              <p className="ma-creative-desc">{c.desc}</p>
              <div className="ma-creative-meta">
                <span className="ma-creative-where">{c.where}</span>
                <span className="ma-creative-pill">{c.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Creative;
