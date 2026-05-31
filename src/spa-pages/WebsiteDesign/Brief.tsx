const POINTS = [
  {
    h: 'What it is',
    d: 'A fast, accessible, conversion-tested website — strategy, design, code, content, and launch ops in one program.',
  },
  {
    h: 'Who it&rsquo;s for',
    d: 'Clinics, MedSpas, urgent care, and specialty groups that need their site to do real patient-acquisition work.',
  },
  {
    h: 'What we measure',
    d: 'Booked visits, calls, and form submits — tied back to page, device, and channel in your dashboard.',
  },
  {
    h: 'What you keep',
    d: 'Your code, your CMS, your hosting, your data. No vendor lock-in, no platform tax, no rebuild penalty.',
  },
];

const Brief = () => {
  return (
    <section className="sl-section wd-brief-section" id="brief">
      <div className="container-shell">
        <div className="wd-brief-grid">
          <div>
            <span className="wd-brief-eyebrow">In plain English</span>
            <h2 className="wd-brief-title">
              Website design &amp; development, <em>without the jargon.</em>
            </h2>
            <p className="wd-brief-lead">
              A new website is the most expensive marketing decision a clinic makes — and the
              one that quietly shapes every other channel. We build sites that load fast,
              read clearly, rank well, and turn the next thousand visitors into booked
              first visits.
            </p>
            <p className="wd-brief-body">
              You get strategy, UX, visual design, frontend code, CMS setup, content writing,
              technical SEO, accessibility, analytics, and a 30-day post-launch tuning sprint
              — handed off as one finished website with documentation, not a stack of
              invoices from five vendors.
            </p>

            <div className="wd-brief-row">
              {POINTS.map((p) => (
                <div key={p.h} className="wd-brief-pt">
                  <span
                    className="wd-brief-pt-h"
                    dangerouslySetInnerHTML={{ __html: p.h }}
                  />
                  <span className="wd-brief-pt-d">{p.d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="wd-brief-art" aria-hidden="true">
            <div className="wd-brief-art-card tall">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="14" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /></svg>
              </span>
              <span className="nm">Design system</span>
              <span className="sub">Tokens · Components · Pages</span>
            </div>
            <div className="wd-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
              </span>
              <span className="nm">Custom build</span>
              <span className="sub">Next.js · WP · Webflow</span>
            </div>
            <div className="wd-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><polyline points="7 14 11 10 14 13 21 6" /></svg>
              </span>
              <span className="nm">Live analytics</span>
              <span className="sub">GA4 · Search Console</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brief;
