import type { JSX } from 'react';

export const HEAD_META_KEYS = ['scope', 'lens', 'toolkit', 'updated'] as const;
export type HeadMetaKey = (typeof HEAD_META_KEYS)[number];

export type StageKey = 'search' | 'decide' | 'book' | 'visit' | 'followup';

export const JOURNEY: {
  n: string;
  key: StageKey;
  /** Typical drop-off risk before intervention, 0-100. Drives the small bar inside the node. */
  risk: number;
}[] = [
  { n: '01', key: 'search', risk: 22 },
  { n: '02', key: 'decide', risk: 31 },
  { n: '03', key: 'book', risk: 38 },
  { n: '04', key: 'visit', risk: 12 },
  { n: '05', key: 'followup', risk: 18 },
];

export const FRICTION = [
  { stage: 'Search', before: 22, after: 5, delta: '-17pt' },
  { stage: 'Decide', before: 31, after: 8, delta: '-23pt' },
  { stage: 'Book', before: 38, after: 9, delta: '-29pt' },
  { stage: 'Visit', before: 12, after: 3, delta: '-9pt' },
  { stage: 'Follow-up', before: 18, after: 6, delta: '-12pt' },
];

export const TOUCHPOINTS: { key: StageKey }[] = [
  { key: 'search' },
  { key: 'decide' },
  { key: 'book' },
  { key: 'visit' },
  { key: 'followup' },
];

export type MetricKey = 'cvr' | 'dropoff' | 'repeats' | 'noshows';

export const METRICS: {
  key: MetricKey;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}[] = [
  { key: 'cvr', value: 8.4, suffix: '%', decimals: 1 },
  { key: 'dropoff', value: 62, prefix: '−', suffix: '%' },
  { key: 'repeats', value: 34, prefix: '+', suffix: '%' },
  { key: 'noshows', value: 48, prefix: '−', suffix: '%' },
];

export type ProcessKey = 'map' | 'audit' | 'pilot';

export const PROCESS: {
  n: string;
  key: ProcessKey;
}[] = [
  { n: '01', key: 'map' },
  { n: '02', key: 'audit' },
  { n: '03', key: 'pilot' },
];

/* ---------------- ICONS ---------------- */

const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const SearchIcon = () => (
  <svg {...ICON_PROPS}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.3-4.3" />
  </svg>
);
const DecideIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M12 3v18" />
    <path d="M5 8h14" />
    <path d="m5 8-2 6a4 4 0 0 0 8 0Z" />
    <path d="m19 8-2 6a4 4 0 0 0 8 0Z" />
  </svg>
);
const BookIcon = () => (
  <svg {...ICON_PROPS}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M8 3v4" />
    <path d="M16 3v4" />
    <circle cx="12" cy="15" r="1.5" />
  </svg>
);
const VisitIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M4 21V8l8-5 8 5v13" />
    <path d="M9 21v-7h6v7" />
    <path d="M4 21h16" />
  </svg>
);
const FollowupIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z" />
    <circle cx="9" cy="12" r="0.8" />
    <circle cx="12" cy="12" r="0.8" />
    <circle cx="15" cy="12" r="0.8" />
  </svg>
);
const MapIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M9 4v16M15 8v12" />
    <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2Z" />
  </svg>
);
const AuditIcon = () => (
  <svg {...ICON_PROPS}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4v3h6V4" />
    <path d="m9 13 2 2 4-4" />
  </svg>
);
const PilotIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M4 21V4l13 6.5L4 17" />
    <path d="M11 13v8" />
  </svg>
);

export const STAGE_ICON: Record<StageKey, () => JSX.Element> = {
  search: SearchIcon,
  decide: DecideIcon,
  book: BookIcon,
  visit: VisitIcon,
  followup: FollowupIcon,
};

export const PROCESS_ICON: Record<'map' | 'audit' | 'pilot', () => JSX.Element> = {
  map: MapIcon,
  audit: AuditIcon,
  pilot: PilotIcon,
};
