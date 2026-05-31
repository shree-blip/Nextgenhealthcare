import { SITE } from '@/content/site';

export interface Section {
  id: string;
  /** i18n key under `pages:infrastructure.complianceProtocol.specs.sections`. */
  i18nKey: 's1' | 's2' | 's3' | 's4' | 's5' | 's6';
  /** spec field keys (under `.specs`) in display order. */
  specKeys: string[];
}

export const SECTIONS: Section[] = [
  {
    id: 's1',
    i18nKey: 's1',
    specKeys: ['turnaround', 'cadence', 'subProcessors', 'storage'],
  },
  {
    id: 's2',
    i18nKey: 's2',
    specKeys: ['boundary', 'analytics', 'adPlatforms', 'capi'],
  },
  {
    id: 's3',
    i18nKey: 's3',
    specKeys: ['transit', 'atRest', 'rotation', 'consent'],
  },
  {
    id: 's4',
    i18nKey: 's4',
    specKeys: ['provider', 'networking', 'iam', 'iac'],
  },
  {
    id: 's5',
    i18nKey: 's5',
    specKeys: ['retention', 'review', 'offboarding', 'alerting'],
  },
  {
    id: 's6',
    i18nKey: 's6',
    specKeys: ['tiers', 'response', 'notice', 'postMortem'],
  },
];

export interface Safeguard {
  /** i18n key under `pages:infrastructure.complianceProtocol.safeguards.items`. */
  i18nKey: 'administrative' | 'physical' | 'technical';
  tone: 'sage' | 'periwinkle' | 'tan';
  icon: React.ReactNode;
}

export const SAFEGUARDS: Safeguard[] = [
  {
    i18nKey: 'administrative',
    tone: 'sage',
    icon: (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21a6 6 0 0 1 12 0" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M14 21a4 4 0 0 1 8 0" />
      </svg>
    ),
  },
  {
    i18nKey: 'physical',
    tone: 'tan',
    icon: (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    i18nKey: 'technical',
    tone: 'periwinkle',
    icon: (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
        <path d="M9 12 L 11 14 L 15 10" />
      </svg>
    ),
  },
];

export const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Compliance Protocol - HIPAA-Aligned Marketing Infrastructure',
  serviceType: 'Compliance & Data Security',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: 'Healthcare practices, clinics, healthcare networks',
};
