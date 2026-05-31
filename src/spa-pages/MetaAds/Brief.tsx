const POINTS = [
  {
    h: 'What it is',
    d: 'Paid ads on Facebook, Instagram, Messenger, and WhatsApp — the four apps owned by Meta.',
  },
  {
    h: 'Who it reaches',
    d: 'Roughly 4 billion monthly users. We narrow it to the 1-3 mile radius around your clinic.',
  },
  {
    h: 'How we pay',
    d: 'Cost-per-result bidding tied to a real conversion event: booking, call, or qualified lead.',
  },
  {
    h: 'What you get',
    d: 'A live dashboard, weekly Loom walk-through, and a named campaign lead — not a ticket queue.',
  },
];

const Brief = () => {
  return (
    <section className="sl-section ma-brief-section" id="brief">
      <div className="container-shell">
        <div className="ma-brief-grid">
          <div>
            <span className="ma-brief-eyebrow">In plain English</span>
            <h2 className="ma-brief-title">
              Meta Ads, <em>without the jargon.</em>
            </h2>
            <p className="ma-brief-lead">
              Meta Ads are the paid posts you see on Facebook and Instagram while you scroll —
              the ones with a small <em>Sponsored</em> label. They&rsquo;re the fastest way to
              put your clinic in front of the right patient at the right moment.
            </p>
            <p className="ma-brief-body">
              We run them end-to-end: strategy, creative, targeting, tracking, and weekly
              optimization. You see exactly which ad, which audience, and which dollar produced
              every booked appointment — and you can shut any of them off in a single click.
            </p>

            <div className="ma-brief-row">
              {POINTS.map((p) => (
                <div key={p.h} className="ma-brief-pt">
                  <span className="ma-brief-pt-h">{p.h}</span>
                  <span className="ma-brief-pt-d">{p.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ma-brief-art" aria-hidden="true">
            <div className="ma-brief-art-card tall">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" fill="currentColor" /></svg>
              </span>
              <span className="nm">Instagram</span>
              <span className="sub">Reels · Stories · Feed</span>
            </div>
            <div className="ma-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-1 9v11h7.5a2 2 0 0 0 2-1.7l1.4-9a2 2 0 0 0-2-2.3z" /><line x1="7" y1="22" x2="7" y2="11" /></svg>
              </span>
              <span className="nm">Facebook</span>
              <span className="sub">Feed · Lead forms</span>
            </div>
            <div className="ma-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </span>
              <span className="nm">WhatsApp</span>
              <span className="sub">Click-to-chat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brief;
