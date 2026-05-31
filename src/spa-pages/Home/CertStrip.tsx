import { Fragment } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const GoogleIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.35 11.1H12v2.85h5.36c-.24 1.42-1.71 4.16-5.36 4.16-3.22 0-5.86-2.66-5.86-5.95s2.64-5.95 5.86-5.95c1.84 0 3.07.78 3.78 1.45l2.58-2.49C16.65 3.6 14.5 2.7 12 2.7 6.95 2.7 2.85 6.8 2.85 11.85s4.1 9.15 9.15 9.15c5.28 0 8.78-3.71 8.78-8.93 0-.6-.07-1.06-.16-1.5l-9.62.53z" />
  </svg>
);

const MetaIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const HipaaIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2 4 5v7c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const SeoIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PaidAdsIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="15 7 21 7 21 13" />
  </svg>
);

const WebDesignIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </svg>
);

const SeparatorIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="12" y1="3" x2="12" y2="21" />
  </svg>
);

interface CertDefinition {
  /** Translation key under `home:certStrip.items`. */
  i18nKey: 'hipaa' | 'google' | 'meta' | 'seo' | 'paidAds' | 'webDesign';
  /** Tone class - `g` Google blue, `m` Meta tan, `h` HIPAA sage, `b` navy, `o` gold. */
  tone: 'g' | 'm' | 'h' | 'b' | 'o';
  Icon: () => ReactElement;
}

const CERTS: CertDefinition[] = [
  { i18nKey: 'hipaa', tone: 'h', Icon: HipaaIcon },
  { i18nKey: 'google', tone: 'g', Icon: GoogleIcon },
  { i18nKey: 'meta', tone: 'm', Icon: MetaIcon },
  { i18nKey: 'seo', tone: 'b', Icon: SeoIcon },
  { i18nKey: 'paidAds', tone: 'o', Icon: PaidAdsIcon },
  { i18nKey: 'webDesign', tone: 'g', Icon: WebDesignIcon },
];

const TrackBlock = ({ keyPrefix }: { keyPrefix: string }) => {
  const { t } = useTranslation('home');
  return (
    <>
      {CERTS.map(({ i18nKey, tone, Icon }, i) => (
        <Fragment key={`${keyPrefix}-${i}`}>
          <span className="cert-item">
            <span className={`cert-ico ${tone}`}>
              <Icon />
            </span>
            {t(`certStrip.items.${i18nKey}`)}
          </span>
          <span className="cert-sep" aria-hidden="true">
            <SeparatorIcon />
          </span>
        </Fragment>
      ))}
    </>
  );
};

const CertStrip = () => {
  const { t } = useTranslation('home');
  return (
    <div className="certs reveal d5" aria-label={t('certStrip.ariaLabel')}>
      <div className="certs-label">
        <span className="dot" aria-hidden="true" />
        {t('certStrip.label')}
      </div>
      <div className="certs-pill">
        <div className="certs-track animate-marquee" aria-hidden="true">
          {/* Rendered twice for the seamless −50% translateX loop. */}
          <TrackBlock keyPrefix="a" />
          <TrackBlock keyPrefix="b" />
        </div>
      </div>
    </div>
  );
};

export default CertStrip;
