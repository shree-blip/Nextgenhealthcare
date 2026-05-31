import type { ReactNode } from 'react';

export const COLORS = {
  navy: '#1A2438',
  body: '#4A5568',
  muted: '#718096',
  sage: '#5A8F5A',
  sageSoft: 'rgba(143, 188, 143, 0.18)',
  tan: '#B38B6D',
  tanSoft: 'rgba(179, 139, 109, 0.16)',
  ctaBlue: '#576DB5',
  mint: '#EBF4DD',
};

export type FailureKey = 'dilution' | 'leakage' | 'drift';

export interface FailureMode {
  n: string;
  key: FailureKey;
  badgeBg: string;
  badgeColor: string;
}

export const FAILURE_MODES: FailureMode[] = [
  {
    n: '01',
    key: 'dilution',
    badgeBg: 'rgba(212, 175, 124, 0.16)',
    badgeColor: '#8B6B4C',
  },
  {
    n: '02',
    key: 'leakage',
    badgeBg: 'rgba(220, 70, 70, 0.12)',
    badgeColor: '#B33A2B',
  },
  {
    n: '03',
    key: 'drift',
    badgeBg: 'rgba(143, 188, 143, 0.20)',
    badgeColor: '#3A6B3A',
  },
];

export type TierKey = 'anchor' | 'vertical' | 'general';

export interface TierGroup {
  num: string;
  key: TierKey;
  entryKeys: string[];
}

export const TIERS: TierGroup[] = [
  { num: '01', key: 'anchor', entryKeys: ['gbp', 'apple', 'bing'] },
  { num: '02', key: 'vertical', entryKeys: ['healthgrades', 'vitals', 'zocdoc'] },
  { num: '03', key: 'general', entryKeys: ['yelp', 'foursquare'] },
];

const StepIconAudit = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M16 16l5 5" />
    <path d="M8 11h6M11 8v6" />
  </svg>
);
const StepIconConsolidate = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 6h6M14 6h6" />
    <path d="M4 18h6M14 18h6" />
    <path d="M12 6v12" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const StepIconMonitor = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export type StepKey = 'audit' | 'consolidate' | 'monitor';

export interface Step {
  key: StepKey;
  icon: ReactNode;
}

export const PROCESS: Step[] = [
  { key: 'audit', icon: <StepIconAudit /> },
  { key: 'consolidate', icon: <StepIconConsolidate /> },
  { key: 'monitor', icon: <StepIconMonitor /> },
];
