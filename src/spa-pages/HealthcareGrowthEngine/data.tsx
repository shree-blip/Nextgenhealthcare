import type { ReactNode } from 'react';
import imgSeo from '../../assets/nextgen-image/Seoimg.png';
import imgAutomation from '../../assets/nextgen-image/Medicalautomationimg.png';
import imgPaid from '../../assets/nextgen-image/Paidmediaimg.png';
import { SITE } from '@/content/site';

/* ---------- TYPES ---------- */
export type ChannelKey = 'seo' | 'paid' | 'automation';
export interface Channel {
  n: string;
  key: ChannelKey;
  img: string;
  href: string;
}

export type StageKey = 'measure' | 'prioritise' | 'operate' | 'compound';
export interface Stage {
  n: string;
  key: StageKey;
  icon: ReactNode;
}

export type OutcomeKey = 'programs' | 'patientGrowth' | 'costPerVisit' | 'timeToLift';
export interface Outcome {
  key: OutcomeKey;
  v: string;
  num: number;
  prefix: string;
  suffix: string;
}

export type PackageKey = 'foundation' | 'operate' | 'compound';
export interface PackageItem {
  key: PackageKey;
}

export type FaqKey = 'difference' | 'contract' | 'cost' | 'speed' | 'ehr';
export interface FaqEntry {
  key: FaqKey;
  defaultOpen?: boolean;
}

export type PulseKey = 'bookedVisits' | 'cpv' | 'recallRecovery';
export interface PulseItem {
  key: PulseKey;
  v: string;
  dir: 'up' | 'down';
}

export type MetaKey = 'channels' | 'cycle' | 'reporting' | 'coverage';

export type StackGroupKey =
  | 'analytics'
  | 'acquisition'
  | 'automation'
  | 'clinical'
  | 'frontDesk'
  | 'reputation'
  | 'content';

export interface StackTool {
  mark: string;
  toolKey: string;
  name: string;
}

export interface StackGroup {
  key: StackGroupKey;
  icon: ReactNode;
  tools: StackTool[];
}

/* ---------- DATA ---------- */
export const HEAD_META_KEYS: MetaKey[] = ['channels', 'cycle', 'reporting', 'coverage'];

export const HERO_PULSE: PulseItem[] = [
  { key: 'bookedVisits', v: '+78%', dir: 'up' },
  { key: 'cpv', v: '−38%', dir: 'down' },
  { key: 'recallRecovery', v: '+22%', dir: 'up' },
];

export const GAP_ROW_KEYS = ['goal', 'cadence', 'team', 'reporting', 'spend', 'exit'] as const;
export type GapRowKey = (typeof GAP_ROW_KEYS)[number];

export const CHANNELS: Channel[] = [
  { n: '01', key: 'seo', img: imgSeo, href: '/services/seo' },
  { n: '02', key: 'paid', img: imgPaid, href: '/services/google-ads' },
  { n: '03', key: 'automation', img: imgAutomation, href: '/automation' },
];

const IconMeasure = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 3h18v18H3z" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);
const IconPriority = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 6h13" />
    <path d="M8 12h13" />
    <path d="M8 18h13" />
    <circle cx="3.5" cy="6" r="1.4" />
    <circle cx="3.5" cy="12" r="1.4" />
    <circle cx="3.5" cy="18" r="1.4" />
  </svg>
);
const IconOperate = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconCompound = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export const STAGES: Stage[] = [
  { n: '01', key: 'measure', icon: <IconMeasure /> },
  { n: '02', key: 'prioritise', icon: <IconPriority /> },
  { n: '03', key: 'operate', icon: <IconOperate /> },
  { n: '04', key: 'compound', icon: <IconCompound /> },
];

const IconStackAnalytics = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="6" y1="20" x2="6" y2="12" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="18" y1="20" x2="18" y2="14" />
  </svg>
);
const IconStackAcquisition = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
  </svg>
);
const IconStackEhr = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path d="M9 4v2h6V4" />
    <path d="M12 11v5M9.5 13.5h5" />
  </svg>
);
const IconStackAutomation = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="18" r="2" />
    <path d="M7 6h10M6 8l5 8M18 8l-5 8" />
  </svg>
);
const IconStackFrontDesk = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 13a8 8 0 0 1 16 0" />
    <path d="M4 13v3a2 2 0 0 0 2 2h1v-5H4Z" />
    <path d="M20 13v3a2 2 0 0 1-2 2h-1v-5h3Z" />
  </svg>
);
const IconStackReputation = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 3 14.6 9 21 9.6 16.2 14 17.7 20.4 12 17.2 6.3 20.4 7.8 14 3 9.6 9.4 9 12 3" />
  </svg>
);
const IconStackContent = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);

export const STACK_GROUPS: StackGroup[] = [
  {
    key: 'analytics',
    icon: <IconStackAnalytics />,
    tools: [
      { name: 'GA4', mark: 'GA', toolKey: 'ga4' },
      { name: 'Search Console', mark: 'SC', toolKey: 'searchConsole' },
      { name: 'Looker Studio', mark: 'LS', toolKey: 'lookerStudio' },
      { name: 'Hotjar', mark: 'HJ', toolKey: 'hotjar' },
    ],
  },
  {
    key: 'acquisition',
    icon: <IconStackAcquisition />,
    tools: [
      { name: 'Google Ads', mark: 'GA', toolKey: 'googleAds' },
      { name: 'Meta Ads', mark: 'MA', toolKey: 'metaAds' },
      { name: 'GBP', mark: 'GB', toolKey: 'gbp' },
      { name: 'Bing', mark: 'BG', toolKey: 'bing' },
    ],
  },
  {
    key: 'automation',
    icon: <IconStackAutomation />,
    tools: [
      { name: 'Zapier', mark: 'ZP', toolKey: 'zapier' },
      { name: 'HubSpot', mark: 'HS', toolKey: 'hubspot' },
      { name: 'Twilio', mark: 'TW', toolKey: 'twilio' },
      { name: 'Birdeye', mark: 'BE', toolKey: 'birdeye' },
    ],
  },
  {
    key: 'clinical',
    icon: <IconStackEhr />,
    tools: [
      { name: 'Epic', mark: 'EP', toolKey: 'epic' },
      { name: 'Athena', mark: 'AT', toolKey: 'athena' },
      { name: 'NextGen', mark: 'NG', toolKey: 'nextgen' },
      { name: 'Dentrix', mark: 'DX', toolKey: 'dentrix' },
    ],
  },
  {
    key: 'frontDesk',
    icon: <IconStackFrontDesk />,
    tools: [
      { name: 'Twilio', mark: 'TW', toolKey: 'twilio' },
      { name: 'Calendly', mark: 'CL', toolKey: 'calendly' },
      { name: 'Zoom Phone', mark: 'ZM', toolKey: 'zoomPhone' },
      { name: 'Klara', mark: 'KL', toolKey: 'klara' },
    ],
  },
  {
    key: 'reputation',
    icon: <IconStackReputation />,
    tools: [
      { name: 'Birdeye', mark: 'BE', toolKey: 'birdeye' },
      { name: 'Podium', mark: 'PD', toolKey: 'podium' },
      { name: 'GBP Reviews', mark: 'GR', toolKey: 'gbpReviews' },
      { name: 'Yelp', mark: 'YP', toolKey: 'yelp' },
    ],
  },
  {
    key: 'content',
    icon: <IconStackContent />,
    tools: [
      { name: 'WordPress', mark: 'WP', toolKey: 'wordpress' },
      { name: 'Webflow', mark: 'WF', toolKey: 'webflow' },
      { name: 'Surfer', mark: 'SF', toolKey: 'surfer' },
      { name: 'Frase', mark: 'FR', toolKey: 'frase' },
    ],
  },
];

export const OUTCOMES: Outcome[] = [
  { key: 'programs', v: '120+', num: 120, prefix: '', suffix: '+' },
  { key: 'patientGrowth', v: '+78%', num: 78, prefix: '+', suffix: '%' },
  { key: 'costPerVisit', v: '−38%', num: 38, prefix: '−', suffix: '%' },
  { key: 'timeToLift', v: '14 d', num: 14, prefix: '', suffix: ' d' },
];

export const PACKAGE: PackageItem[] = [
  { key: 'foundation' },
  { key: 'operate' },
  { key: 'compound' },
];

export const FAQS: FaqEntry[] = [
  { key: 'difference', defaultOpen: true },
  { key: 'contract' },
  { key: 'cost' },
  { key: 'speed' },
  { key: 'ehr' },
];

export const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'The Healthcare Growth Engine',
  serviceType: 'Healthcare Growth Engine',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  description:
    'Integrated SEO, paid media, and automation engineered for patient acquisition and retention across U.S. healthcare practices.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'USD', minPrice: 2500 },
  },
};
