export type ChannelKey = 'events' | 'referrals' | 'doorDrops' | 'sponsorships';

export interface FieldChannel {
  n: string;
  key: ChannelKey;
}

export const FIELD_CHANNELS: FieldChannel[] = [
  { n: '01', key: 'events' },
  { n: '02', key: 'referrals' },
  { n: '03', key: 'doorDrops' },
  { n: '04', key: 'sponsorships' },
];

export type DeliverableKey = 'fieldOps' | 'leadCapture' | 'reporting' | 'compliance';

export interface Deliverable {
  key: DeliverableKey;
}

export const DELIVERABLES: Deliverable[] = [
  { key: 'fieldOps' },
  { key: 'leadCapture' },
  { key: 'reporting' },
  { key: 'compliance' },
];

export type ProcessKey = 'map' | 'build' | 'activate' | 'compound';

export interface ProcessStep {
  n: string;
  key: ProcessKey;
}

export const PROCESS: ProcessStep[] = [
  { n: '01', key: 'map' },
  { n: '02', key: 'build' },
  { n: '03', key: 'activate' },
  { n: '04', key: 'compound' },
];

import { SITE } from '@/content/site';

export const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Onsite Field Marketing for Healthcare',
  serviceType: 'Field Marketing · Community Activations · B2B Referrals',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: ['Dallas', 'Fort Worth', 'Austin', 'Houston', 'San Antonio'],
  description:
    'Community activations, B2B referral visits, geo-targeted print, and sponsorships — staffed, attributed, and reported. Field marketing for clinics, medspas, urgent care, and multi-location healthcare brands.',
  offers: {
    '@type': 'Offer',
    description: '90-day field marketing pilot with full attribution dashboard.',
  },
};
