import type { ReactNode } from 'react';

export const COLORS = {
  navy: '#1A2438',
  navy2: '#2D3748',
  body: '#4A5568',
  muted: '#718096',
  cta: '#576DB5',
  ctaSoft: 'rgba(87, 109, 181, 0.12)',
  ctaWash: 'rgba(87, 109, 181, 0.05)',
  tan: '#B38B6D',
  sage: '#5A8F5A',
  mint: '#EBF4DD',
  paper: '#FAFAF8',
};

export type ShiftKey = 'answerEngine' | 'underwriting' | 'editorial';
export interface Shift {
  key: ShiftKey;
}
export const SHIFTS: Shift[] = [
  { key: 'answerEngine' },
  { key: 'underwriting' },
  { key: 'editorial' },
];

export type GroupKey = 'entity' | 'content' | 'operations';
export interface SchemaGroup {
  key: GroupKey;
  types: string[];
  tone: { hex: string; soft: string };
}

export const GROUPS: SchemaGroup[] = [
  {
    key: 'entity',
    types: ['Organization', 'MedicalClinic', 'Physician', 'LocalBusiness'],
    tone: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.14)' },
  },
  {
    key: 'content',
    types: ['MedicalCondition', 'MedicalProcedure', 'FAQPage', 'Article'],
    tone: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.16)' },
  },
  {
    key: 'operations',
    types: ['OpeningHours', 'AcceptedInsurance', 'AreaServed', 'Review'],
    tone: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.18)' },
  },
];

const IconValidated = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconAnswerable = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7" />
    <line x1="12" y1="17" x2="12" y2="17.5" />
  </svg>
);
const IconSourced = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
  </svg>
);

export type ReadinessKey = 'validated' | 'answerable' | 'sourced';
export interface Readiness {
  key: ReadinessKey;
  icon: ReactNode;
}

export const READINESS: Readiness[] = [
  { key: 'validated', icon: <IconValidated /> },
  { key: 'answerable', icon: <IconAnswerable /> },
  { key: 'sourced', icon: <IconSourced /> },
];
