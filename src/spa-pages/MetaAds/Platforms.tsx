import type { ReactElement } from 'react';

interface Platform {
  key: string;
  name: string;
  tag: string;
  role: string;
  formats: string[];
  icon: ReactElement;
}

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 2 6.2 2 11.4c0 3 1.5 5.7 3.8 7.4V22l3.5-1.9c.9.2 1.8.4 2.7.4 5.5 0 10-4.2 10-9.4S17.5 2 12 2z" />
    <polyline points="6.5 13.2 10 9.5 12.5 12 17.5 8.8 14 12.5 11.5 10" />
  </svg>
);
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const PLATFORMS: Platform[] = [
  {
    key: 'instagram',
    name: 'Instagram',
    tag: 'Discovery',
    role: 'Reels and Stories are where new patients meet your clinic — short, vertical, and native to the feed.',
    formats: ['Reels', 'Stories', 'Feed', 'Explore'],
    icon: <InstagramIcon />,
  },
  {
    key: 'facebook',
    name: 'Facebook',
    tag: 'Convert',
    role: 'The workhorse for lead forms, retargeting, and the 40+ patient demographic that still books from a feed scroll.',
    formats: ['Feed', 'Lead Form', 'Marketplace', 'Right Rail'],
    icon: <FacebookIcon />,
  },
  {
    key: 'messenger',
    name: 'Messenger',
    tag: 'Nurture',
    role: 'Click-to-Messenger ads recover the 60-70% of leads who never finish a contact form on the first visit.',
    formats: ['Click-to-Message', 'Sponsored', 'Inbox', 'Stories'],
    icon: <MessengerIcon />,
  },
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    tag: 'Book',
    role: 'Click-to-WhatsApp is the highest-converting Meta surface for clinics — the booking happens inside the chat.',
    formats: ['Click-to-Chat', 'Status Ads', 'Business API', 'Flows'],
    icon: <WhatsappIcon />,
  },
];

const Platforms = () => {
  return (
    <section className="sl-section ma-platforms-section" id="platforms">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">01 - Where we run</div>
            <h2 className="sl-sec-title">
              Four surfaces. <em>One unified funnel.</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            We pick the mix
            <br />
            based on your patient
          </div>
        </div>

        <div className="ma-platforms-grid">
          {PLATFORMS.map((p) => (
            <article key={p.key} className="ma-platform-card" data-pl={p.key}>
              <div className="ma-platform-top">
                <div className="ma-platform-icon">{p.icon}</div>
                <span className="ma-platform-tag">{p.tag}</span>
              </div>
              <h3 className="ma-platform-name">{p.name}</h3>
              <p className="ma-platform-role">{p.role}</p>
              <div className="ma-platform-formats">
                {p.formats.map((f) => (
                  <span key={f} className="ma-platform-format">{f}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
