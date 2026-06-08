import { useMemo } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from '../site';

export interface HelpRow {
  href: string;
  tag: string;
  value: string;
  icon: ReactElement;
}

const HOTLINE_ICON = (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SMS_ICON = (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EMAIL_ICON = (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/** React hook for the Contact help-card rows. */
export function useHelpRows(): readonly HelpRow[] {
  const { t } = useTranslation('contact');
  return useMemo(
    () => [
      {
        href: `tel:${SITE.phone.tel}`,
        tag: t('help.rows.hotline.tag'),
        value: t('help.rows.hotline.value'),
        icon: HOTLINE_ICON,
      },
      {
        href: `sms:${SITE.phone.tel}`,
        tag: t('help.rows.sms.tag'),
        value: t('help.rows.sms.value'),
        icon: SMS_ICON,
      },
      {
        href: `mailto:${SITE.email}`,
        tag: t('help.rows.email.tag'),
        value: SITE.email,
        icon: EMAIL_ICON,
      },
    ],
    [t]
  );
}

export interface SocialLink {
  href: string;
  label: string;
  icon: ReactElement;
}

const FACEBOOK_ICON = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9c1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
  </svg>
);

const LINKEDIN_ICON = (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.4 20.4h-3.5v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6H9.5V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8c3.6 0 4.3 2.4 4.3 5.5v6.1zM5.6 7.4a2 2 0 1 1 0-4.1a2 2 0 0 1 0 4.1zM7.3 20.4H3.8V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
  </svg>
);

const TWITTER_ICON = (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/** React hook for the Contact social link list. */
export function useSocials(): readonly SocialLink[] {
  const { t } = useTranslation('contact');
  return useMemo(
    () => [
      { href: SITE.social.facebook, label: t('help.socials.facebook'), icon: FACEBOOK_ICON },
      { href: SITE.social.x, label: t('help.socials.twitter'), icon: TWITTER_ICON },
      { href: SITE.social.linkedin, label: t('help.socials.linkedin'), icon: LINKEDIN_ICON },
    ],
    [t]
  );
}
