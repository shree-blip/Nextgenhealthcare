import { Link } from 'react-router-dom';

interface SubLink { to: string; name: string; desc: string; tag: string }

const LINKS: SubLink[] = [
  { to: '/services/seo', name: 'SEO Services', desc: 'Wire each new article into the technical SEO + link strategy. Content earns rank; SEO captures it.', tag: 'Search' },
  { to: '/aeo-schema', name: 'AEO & Schema', desc: 'Make every article eligible for AI Overviews, ChatGPT search, and Perplexity citations.', tag: 'AI Search' },
  { to: '/services/social-media-marketing', name: 'Social Media Marketing', desc: 'Distribute every long-form piece into a month of Reels, posts, and stories. One asset, twelve touches.', tag: 'Distribution' },
  { to: '/services/email-drip-campaigns', name: 'Email Drip Campaigns', desc: 'Nurture flows fueled by your content library. Welcome → educate → re-engage → book.', tag: 'Lifecycle' },
  { to: '/services/website-design-dev', name: 'Website + Landing Pages', desc: 'The technical foundation that lets content rank - sub-2s LCP, accessible templates, clean schema.', tag: 'Foundation' },
  { to: '/services/google-ads', name: 'Google Ads', desc: 'Service-line landing pages double as ad destinations. SEO content + paid traffic share the same asset.', tag: 'Paid Search' },
  { to: '/services/brand-identity-design', name: 'Brand Identity & Design', desc: 'Template kits + visual systems so every article looks like one brand, not five WordPress themes.', tag: 'Visual' },
  { to: '/services/google-business-profile', name: 'Google Business Profile', desc: 'Surface your best content directly on the SERP via GBP posts. Reaches the patients who skip the click.', tag: 'Local' },
];

const SubServices = () => {
  return (
    <section className="sl-section cm-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              Content compounds <em>with the rest of the stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="cm-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="cm-sub-card">
              <div className="cm-sub-top">
                <span className="cm-sub-tag">{l.tag}</span>
                <span className="cm-sub-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="cm-sub-name">{l.name}</h3>
              <p className="cm-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
