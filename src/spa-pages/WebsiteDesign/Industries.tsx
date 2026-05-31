import type { ReactElement } from 'react';

interface Industry {
  name: string;
  icon: ReactElement;
}

const StethIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4v6a4 4 0 0 0 8 0V4" />
    <path d="M12 14v3a4 4 0 0 0 8 0v-2" />
    <circle cx="20" cy="11" r="2" />
  </svg>
);
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 14 9 21 12 14 15 12 22 10 15 3 12 10 9 12 2" />
  </svg>
);
const ToothIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-2.5 0-5 1-6 3-1 2 0 6 1 9s1 8 3 8 2-4 2-6 1-3 0-3-1 6 1 6c2 0 2-5 3-8s2-7 1-9-3.5-3-5-3z" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const ErIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);
const PetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="8" r="2" />
    <circle cx="10" cy="4" r="2" />
    <circle cx="14" cy="4" r="2" />
    <circle cx="18" cy="8" r="2" />
    <path d="M8 14c0-2 2-4 4-4s4 2 4 4-2 6-4 6-4-4-4-6z" />
  </svg>
);
const SurgeryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4l-9 9 5 5 9-9-5-5z" />
    <path d="M5 13l-3 7 7-3" />
    <line x1="14" y1="4" x2="20" y2="10" />
  </svg>
);

const INDUSTRIES: Industry[] = [
  { name: 'Primary care &amp; family practice', icon: <StethIcon /> },
  { name: 'MedSpas &amp; aesthetic clinics', icon: <SparkleIcon /> },
  { name: 'Dental &amp; orthodontic groups', icon: <ToothIcon /> },
  { name: 'Cardiology &amp; specialty groups', icon: <HeartIcon /> },
  { name: 'Optometry &amp; eye care networks', icon: <EyeIcon /> },
  { name: 'Urgent care &amp; freestanding ER', icon: <ErIcon /> },
  { name: 'Veterinary &amp; animal hospitals', icon: <PetIcon /> },
  { name: 'Plastic surgery &amp; cosmetic centers', icon: <SurgeryIcon /> },
];

const Industries = () => {
  return (
    <section className="sl-section wd-ind-section" id="industries">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">06 - Who we build for</div>
            <h2 className="sl-sec-title">
              Eight healthcare verticals. <em>One playbook.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            Service-line nuance
            <br />
            shipped per template
          </div>
        </div>

        <div className="wd-ind-grid">
          {INDUSTRIES.map((i) => (
            <div key={i.name} className="wd-ind-card">
              <div className="wd-ind-icon">{i.icon}</div>
              <span
                className="wd-ind-name"
                dangerouslySetInnerHTML={{ __html: i.name }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
