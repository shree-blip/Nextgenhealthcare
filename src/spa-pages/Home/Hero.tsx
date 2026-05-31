import type { ReactNode, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionButton, Parallax } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';

interface HeroProps {
  children?: ReactNode;
}

interface FloatingPill {
  slot: 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6';
  /** Translation key under `home:hero.pills`. */
  i18nKey:
    | 'seoLocal'
    | 'paidMedia'
    | 'branding'
    | 'automation'
    | 'webDesign'
    | 'content';
  icon: ReactElement;
}

const SearchIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ChartIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const StarIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);
const SettingsIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const LayoutIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
const ChatIcon = () => (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const FLOATING_PILLS: FloatingPill[] = [
  { slot: 'f1', i18nKey: 'seoLocal', icon: <SearchIcon /> },
  { slot: 'f2', i18nKey: 'paidMedia', icon: <ChartIcon /> },
  { slot: 'f3', i18nKey: 'branding', icon: <StarIcon /> },
  { slot: 'f4', i18nKey: 'automation', icon: <SettingsIcon /> },
  { slot: 'f5', i18nKey: 'webDesign', icon: <LayoutIcon /> },
  { slot: 'f6', i18nKey: 'content', icon: <ChatIcon /> },
];

interface HubBubble {
  slot: 'b1' | 'b2' | 'b3' | 'b4' | 'b5';
  tone: 'fb' | 'ig' | 'wa' | 'li' | 'em';
  /** Translation key under `common:social`. */
  socialKey: 'facebook' | 'instagram' | 'whatsapp' | 'linkedin' | 'email';
  icon: ReactElement;
}

const FacebookIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.1c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l.9 2.2c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.4.7 1 1.5 1.6 2 .8.6 1.5.9 1.7 1 .2.1.4.1.6-.1l.7-.8c.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4 0 .1 0 .8-.3 1.5Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.5A1.5 1.5 0 1 1 8 6 1.5 1.5 0 0 1 6.5 7.5ZM19 19h-3v-5.3c0-1.3-.5-1.8-1.4-1.8a1.6 1.6 0 0 0-1.6 1.7V19h-3V9h2.9v1.4a3.4 3.4 0 0 1 3-1.7c1.8 0 3.1 1.1 3.1 3.5V19Z" />
  </svg>
);
const EmailIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const HUB_BUBBLES: HubBubble[] = [
  { slot: 'b1', tone: 'fb', socialKey: 'facebook', icon: <FacebookIcon /> },
  { slot: 'b2', tone: 'ig', socialKey: 'instagram', icon: <InstagramIcon /> },
  { slot: 'b3', tone: 'wa', socialKey: 'whatsapp', icon: <WhatsAppIcon /> },
  { slot: 'b4', tone: 'li', socialKey: 'linkedin', icon: <LinkedInIcon /> },
  { slot: 'b5', tone: 'em', socialKey: 'email', icon: <EmailIcon /> },
];

const Hero = ({ children }: HeroProps) => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-bg-stack" aria-hidden="true">
        <div className="hero-grid-pattern" />
      </div>

      <div className="container-shell">
        <div className="hero-grid">
          {/* LEFT - copy + CTAs */}
          <div className="hero-content">
            <div className="hero-eyebrow reveal d1">
              <span className="hero-pulse" aria-hidden="true" />
              {t('home:hero.eyebrow')}
            </div>

            <h1 id="hero-title" className="hero-title reveal d2">
              {t('home:hero.titleLine1')}
              <br />
              <span className="accent-text">{t('home:hero.titleAccent')}</span>
            </h1>

            <p className="hero-lede reveal d3">{t('home:hero.lede')}</p>

            <div className="hero-cta-row reveal d4">
              <MotionButton to="/free-growth-audit" className="m-btn-cta hero-mbtn">
                {t('home:hero.ctaPrimary')}
                <ArrowIcon strokeWidth={2} />
              </MotionButton>

              <Link to="/our-work" className="link-secondary">
                {t('home:hero.ctaSecondary')}
                <ArrowIcon size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <Parallax
            as="div"
            speed={0.04}
            className="hero-visual hero-svc-orbit-wrap reveal d3"
            aria-hidden="true"
          >
            <div className="svc-orbit" aria-hidden="true">
              <div className="svc-orbit-hub">
                {HUB_BUBBLES.map(({ slot, tone, socialKey, icon }) => (
                  <span
                    key={slot}
                    className={`hub-bubble ${slot} t-${tone}`}
                    aria-label={t(`common:social.${socialKey}`)}
                  >
                    {icon}
                  </span>
                ))}
                <div className="svc-orbit-hub-inner">
                  <div className="svc-orbit-hub-mark">N+</div>
                  <span className="svc-orbit-hub-name">{t('home:hero.hubName')}</span>
                  <span className="svc-orbit-hub-tag">{t('home:hero.hubTag')}</span>
                </div>
              </div>

              {FLOATING_PILLS.map(({ slot, i18nKey, icon }) => (
                <span key={slot} className={`svc-float ${slot}`}>
                  <span className="tag-ico">{icon}</span>
                  {t(`home:hero.pills.${i18nKey}`)}
                </span>
              ))}
            </div>
          </Parallax>
        </div>

        {children}
      </div>
    </section>
  );
};

export default Hero;
