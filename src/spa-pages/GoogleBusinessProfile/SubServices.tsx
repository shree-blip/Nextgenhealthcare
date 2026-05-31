import { Link } from 'react-router-dom';

interface SubLink {
  to: string;
  name: string;
  desc: string;
  tag: string;
}

const LINKS: SubLink[] = [
  {
    to: '/citation-building',
    name: 'Citation Building',
    desc: 'Lock NAP consistency across 70+ directories. The authority signal that feeds GBP rank.',
    tag: 'Local',
  },
  {
    to: '/reviews-reputation',
    name: 'Reviews & Reputation',
    desc: 'Compound the GBP signal that moves the map ranking the fastest. Request automation + HIPAA-safe responses.',
    tag: 'Trust',
  },
  {
    to: '/services/seo',
    name: 'SEO Services',
    desc: 'Layer GBP into a full Local Pack + organic strategy. Map + organic share the same authority signals.',
    tag: 'Search',
  },
  {
    to: '/services/google-ads',
    name: 'Google Ads + LSA',
    desc: 'Local Services Ads sit above the map. Pair GBP with paid local to dominate the SERP top.',
    tag: 'Paid',
  },
  {
    to: '/services/content-copywriting',
    name: 'Content & Copywriting',
    desc: 'Location pages, service-line pages, and the editorial fuel that powers GBP posts.',
    tag: 'Editorial',
  },
  {
    to: '/services/website-design-dev',
    name: 'Website + Landing Pages',
    desc: "Where the GBP link lands. Service-line pages that match the patient's search intent.",
    tag: 'Foundation',
  },
  {
    to: '/aeo-schema',
    name: 'AEO & Schema',
    desc: 'LocalBusiness + MedicalBusiness schema that reinforces every GBP claim to Google.',
    tag: 'AI Search',
  },
  {
    to: '/hyperlocal-content',
    name: 'Hyperlocal Content',
    desc: 'City + neighborhood content that builds the local authority signal Google uses to rank GBP.',
    tag: 'Local',
  },
];

const SubServices = () => {
  return (
    <section className="sl-section gb-sub-section">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">11 - Pair with</div>
            <h2 className="sl-sec-title">
              GBP compounds <em>with the rest of the local stack.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Hire one
            <br />
            or the whole stack
          </div>
        </div>

        <div className="gb-sub-grid">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="gb-sub-card">
              <div className="gb-sub-top">
                <span className="gb-sub-tag">{l.tag}</span>
                <span className="gb-sub-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </div>
              <h3 className="gb-sub-name">{l.name}</h3>
              <p className="gb-sub-desc">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubServices;
