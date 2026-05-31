import type { ReactNode } from 'react';

export type PillarKey = 'administrative' | 'physical' | 'technical';

export interface Pillar {
  num: string;
  key: PillarKey;
  tone: 'sage' | 'tan' | 'periwinkle';
  icon: ReactNode;
}

export const PILLARS: Pillar[] = [
  {
    num: '01',
    key: 'administrative',
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
    num: '02',
    key: 'physical',
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
    num: '03',
    key: 'technical',
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

export type CoverageKey = 'website' | 'adPlatforms' | 'emailSms' | 'analytics' | 'reviewsSocial';

export interface CoverageRow {
  key: CoverageKey;
  icon: ReactNode;
}

export const COVERAGE: CoverageRow[] = [
  {
    key: 'website',
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    ),
  },
  {
    key: 'adPlatforms',
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8" />
        <path d="M16 6l-4-4-4 4" />
        <path d="M12 2v14" />
      </svg>
    ),
  },
  {
    key: 'emailSms',
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    key: 'analytics',
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="12" y1="20" x2="12" y2="8" />
        <line x1="18" y1="20" x2="18" y2="11" />
      </svg>
    ),
  },
  {
    key: 'reviewsSocial',
    icon: (
      <svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 L 14 8 L 20 8.5 L 15.5 12.5 L 17 19 L 12 15.5 L 7 19 L 8.5 12.5 L 4 8.5 L 10 8 Z" />
      </svg>
    ),
  },
];

export type LoopStepKey = 'scope' | 'replace' | 'train' | 'verify';

export interface LoopStep {
  num: string;
  key: LoopStepKey;
}

export const STEPS: LoopStep[] = [
  { num: '01', key: 'scope' },
  { num: '02', key: 'replace' },
  { num: '03', key: 'train' },
  { num: '04', key: 'verify' },
];

export const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'HIPAA-Compliant Healthcare Marketing',
  serviceType: 'HIPAA + HITECH Compliance for Marketing Operations',
  audience: 'Healthcare practices, clinics, networks',
};
