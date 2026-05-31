import nextHeroImg1 from '@/assets/nextgen-image/Ourworkbannerimg.png';
import nextHeroImg2 from '@/assets/nextgen-image/Bookimg.png';

export const IMG = {
  spotlight: nextHeroImg1,
  studio: nextHeroImg2,
};

export const STATS = [
  { v: '200+', l: 'Practices grown' },
  { v: '$24M+', l: 'Pipeline moved' },
  { v: '47M', l: 'Impressions delivered' },
  { v: '4.1×', l: 'Median ROAS' },
];

export const CAPABILITY_TAGS = [
  'Discovery',
  'Acquisition',
  'Brand',
  'Web',
  'Lifecycle',
  'Operations',
] as const;

/* Per-card stat triplet — three quick facts shown at the bottom of each card.
   Order matches CAPABILITY_DETAILS / CAPABILITY_TAGS. */
export const CAPABILITY_STATS: { v: string; l: string }[][] = [
  // 01 Local search systems · Discovery
  [
    { v: '90 d', l: 'Time to lift' },
    { v: 'Map Pack', l: 'Channel' },
    { v: 'Compound', l: 'Trajectory' },
  ],
  // 02 Paid media · Acquisition
  [
    { v: '7 d', l: 'To live' },
    { v: 'Google + Meta', l: 'Platforms' },
    { v: 'Pay-back', l: 'Goal' },
  ],
  // 03 Identities · Brand
  [
    { v: '6 wk', l: 'Sprint' },
    { v: 'Visual + Voice', l: 'Scope' },
    { v: 'Refresh', l: 'Outcome' },
  ],
  // 04 Booking-first websites · Web
  [
    { v: '8 wk', l: 'Build' },
    { v: 'Booking-first', l: 'Approach' },
    { v: 'Convert', l: 'Focus' },
  ],
  // 05 Recall + nurture · Lifecycle
  [
    { v: '30 d', l: 'Setup' },
    { v: 'Automated', l: 'Type' },
    { v: 'Retain', l: 'Goal' },
  ],
  // 06 Automations · Operations
  [
    { v: '21 d', l: 'Install' },
    { v: 'EHR-link', l: 'Integration' },
    { v: 'AI Triage', l: 'Layer' },
  ],
];

export const ENGAGEMENT_DELTAS = ['+274', '+89', '+216'] as const;

export const ENGAGEMENT_SECTORS = ['Emergency Room', 'Wellness Clinic', 'Urgent Care'] as const;

export const ENGAGEMENT_HEADLINES = [
  'Hospital-level emergency care, neighbourhood-level wait times.',
  'Built a clinical-grade wellness funnel that compounds on continuity.',
  'Won the suburban same-day search without chasing the national chain.',
] as const;

export const COLLECTION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Our Work - Healthcare Marketing Portfolio',
  url: 'https://thenextgenhealth.com/our-work',
  description:
    'A retrospective of marketing, branding, web, and automation work shipped for clinics, medspas, urgent care, and multi-location healthcare brands.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'TheNextGen Healthcare Marketing',
    url: 'https://thenextgenhealth.com',
  },
  about: [
    { '@type': 'Thing', name: 'Healthcare SEO' },
    { '@type': 'Thing', name: 'Healthcare paid media' },
    { '@type': 'Thing', name: 'Medical brand identity' },
    { '@type': 'Thing', name: 'Healthcare automation' },
  ],
};
