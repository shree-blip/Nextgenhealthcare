import type { JSX } from 'react';
import { SITE } from '@/content/site';

export type WorkflowKey = 'intake' | 'reminder' | 'review' | 'insurance' | 'triage' | 'recall';

export const WORKFLOWS: { n: string; key: WorkflowKey }[] = [
  { n: '01', key: 'intake' },
  { n: '02', key: 'insurance' },
  { n: '03', key: 'reminder' },
  { n: '04', key: 'triage' },
  { n: '05', key: 'review' },
  { n: '06', key: 'recall' },
];

export type CoverageKey = 'front' | 'billing' | 'marketing' | 'clinical';

export const COVERAGE: {
  key: CoverageKey;
  low: number;
  high: number;
}[] = [
  { key: 'front', low: 8, high: 14 },
  { key: 'billing', low: 4, high: 9 },
  { key: 'marketing', low: 5, high: 12 },
  { key: 'clinical', low: 2, high: 6 },
];

export type StackKey = 'engine' | 'integrations' | 'ai' | 'reporting';

export const STACK: { key: StackKey }[] = [
  { key: 'engine' },
  { key: 'integrations' },
  { key: 'ai' },
  { key: 'reporting' },
];

export type MetricKey = 'noShow' | 'savings' | 'intake' | 'audit';

export const METRICS: {
  key: MetricKey;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}[] = [
  { key: 'noShow', value: 54, suffix: '%' },
  { key: 'savings', value: 32, prefix: '$', suffix: 'k' },
  { key: 'intake', value: 90, prefix: '< ', suffix: 's' },
  { key: 'audit', value: 99.8, suffix: '%', decimals: 1 },
];

export type ProcessKey = 'audit' | 'pilot' | 'scale' | 'govern';

export const PROCESS: { n: string; key: ProcessKey }[] = [
  { n: '01', key: 'audit' },
  { n: '02', key: 'pilot' },
  { n: '03', key: 'scale' },
  { n: '04', key: 'govern' },
];

/* ---------------- ICONS ---------------- */

const ICON = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const IntakeIcon = () => (
  <svg {...ICON}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3v3h6V3" />
    <path d="m9 13 2 2 4-4" />
  </svg>
);
const InsuranceIcon = () => (
  <svg {...ICON}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const ReminderIcon = () => (
  <svg {...ICON}>
    <path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);
const TriageIcon = () => (
  <svg {...ICON}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="9" cy="12" r="1.2" />
    <circle cx="15" cy="12" r="1.2" />
    <path d="M12 18v2" />
  </svg>
);
const ReviewIcon = () => (
  <svg {...ICON}>
    <path d="m12 4 2.5 5.2 5.7.8-4.1 4 .9 5.7L12 17l-5 2.6.8-5.7L3.8 10l5.7-.8Z" />
  </svg>
);
const RecallIcon = () => (
  <svg {...ICON}>
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 4v5h-5" />
  </svg>
);

export const WORKFLOW_ICON: Record<WorkflowKey, () => JSX.Element> = {
  intake: IntakeIcon,
  reminder: ReminderIcon,
  review: ReviewIcon,
  insurance: InsuranceIcon,
  triage: TriageIcon,
  recall: RecallIcon,
};

const FrontIcon = () => (
  <svg {...ICON}>
    <path d="M3 6h12v9H7l-4 4Z" />
    <path d="M11 10h.01M8 10h.01M14 10h.01" />
  </svg>
);
const BillingIcon = () => (
  <svg {...ICON}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h3" />
  </svg>
);
const MarketingIcon = () => (
  <svg {...ICON}>
    <path d="m4 11 12-6v14L4 13Z" />
    <path d="M8 12v6" />
    <path d="M16 9a3 3 0 0 1 0 6" />
  </svg>
);
const ClinicalIcon = () => (
  <svg {...ICON}>
    <path d="M8 3v6a4 4 0 0 0 8 0V3" />
    <circle cx="18" cy="14" r="3" />
    <path d="M12 13v2a4 4 0 0 0 3 3.9" />
  </svg>
);

export const COVERAGE_ICON: Record<CoverageKey, () => JSX.Element> = {
  front: FrontIcon,
  billing: BillingIcon,
  marketing: MarketingIcon,
  clinical: ClinicalIcon,
};

const EngineIcon = () => (
  <svg {...ICON}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 14H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.3 7.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1c0 .7.4 1.3 1 1.5a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8c.2.6.8 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </svg>
);
const IntegrationsIcon = () => (
  <svg {...ICON}>
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);
const AiIcon = () => (
  <svg {...ICON}>
    <path d="m12 3 1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6Z" />
    <path d="m19 15 .9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9L16 17.8l1.9-.9Z" />
  </svg>
);
const ReportingIcon = () => (
  <svg {...ICON}>
    <path d="M3 21h18" />
    <path d="M6 17v-5" />
    <path d="M11 17V8" />
    <path d="M16 17v-7" />
    <path d="M21 17v-3" />
  </svg>
);

export const STACK_ICON: Record<StackKey, () => JSX.Element> = {
  engine: EngineIcon,
  integrations: IntegrationsIcon,
  ai: AiIcon,
  reporting: ReportingIcon,
};

const AuditIcon = () => (
  <svg {...ICON}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.3-4.3" />
  </svg>
);
const PilotIcon = () => (
  <svg {...ICON}>
    <path d="M4 21V4l13 6.5L4 17" />
    <path d="M11 13v8" />
  </svg>
);
const ScaleIcon = () => (
  <svg {...ICON}>
    <path d="M3 21h18" />
    <path d="M7 21V11" />
    <path d="M12 21V7" />
    <path d="M17 21V4" />
  </svg>
);
const GovernIcon = () => (
  <svg {...ICON}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
  </svg>
);

export const PROCESS_ICON: Record<ProcessKey, () => JSX.Element> = {
  audit: AuditIcon,
  pilot: PilotIcon,
  scale: ScaleIcon,
  govern: GovernIcon,
};

export const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Medical Automation for Healthcare Clinics',
  serviceType: 'Healthcare Workflow Automation · HIPAA-Aware',
  provider: { '@id': `${SITE.url}#organization` },
  description:
    'HIPAA-aware automation for healthcare practices: patient intake, appointment reminders, review capture, insurance verification, AI triage, and recall - built on a BAA-covered stack and connected to your EHR.',
  areaServed: 'United States',
  offers: {
    '@type': 'Offer',
    description: '8-week pilot to deploy all six workflows in production with full audit trail.',
  },
};
