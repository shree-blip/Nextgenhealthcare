import type { ReactNode } from 'react';

export const HEAD_META_KEYS = ['coverage', 'frequency', 'response', 'updated'] as const;
export type HeadMetaKey = (typeof HEAD_META_KEYS)[number];

/* ─── Flow icons (4 steps) ─── */
const IconDetect = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M16 16l5 5" />
    <path d="M11 8v3l2 1" />
  </svg>
);
const IconSort = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 5h18l-7 9v6l-4-2v-4z" />
  </svg>
);
const IconRespond = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
  </svg>
);
const IconReport = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 3v18h18" />
    <path d="M7 14l3-4 4 3 5-7" />
  </svg>
);

export type FlowKey = 'detect' | 'sort' | 'respond' | 'report';

export interface FlowStep {
  n: string;
  key: FlowKey;
  icon: ReactNode;
  tone: { hex: string; soft: string };
}

export const FLOW: FlowStep[] = [
  {
    n: '01',
    key: 'detect',
    icon: <IconDetect />,
    tone: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.18)' },
  },
  {
    n: '02',
    key: 'sort',
    icon: <IconSort />,
    tone: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.18)' },
  },
  {
    n: '03',
    key: 'respond',
    icon: <IconRespond />,
    tone: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.16)' },
  },
  {
    n: '04',
    key: 'report',
    icon: <IconReport />,
    tone: { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' },
  },
];

/* ─── Channel glyphs (simplified vector marks, not trademark logos) ─── */
const IconGoogle = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-3.2-6.9" />
    <path d="M12 12h9" />
  </svg>
);
const IconYelp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 14.6 8.6 21.6 9.2 16.4 13.8 18 20.6 12 17 6 20.6 7.6 13.8 2.4 9.2 9.4 8.6" />
  </svg>
);
const IconHealthgrades = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.8 9.5c0 5.3-8.8 10-8.8 10s-8.8-4.7-8.8-10a5.5 5.5 0 0 1 10-3.2 5.5 5.5 0 0 1 7.6 3.2z" />
    <path d="M9 12h2v-2h2v2h2v2h-2v2h-2v-2H9z" />
  </svg>
);
const IconZocdoc = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 4h12L6 20h12" />
  </svg>
);

export type ChannelKey = 'google' | 'yelp' | 'healthgrades' | 'zocdoc';

export interface ChannelEntry {
  key: ChannelKey;
  icon: ReactNode;
  tone: { hex: string; soft: string };
}

export const CHANNELS: ChannelEntry[] = [
  {
    key: 'google',
    icon: <IconGoogle />,
    tone: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.14)' },
  },
  {
    key: 'yelp',
    icon: <IconYelp />,
    tone: { hex: '#B33A2B', soft: 'rgba(179, 58, 43, 0.12)' },
  },
  {
    key: 'healthgrades',
    icon: <IconHealthgrades />,
    tone: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.18)' },
  },
  {
    key: 'zocdoc',
    icon: <IconZocdoc />,
    tone: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.18)' },
  },
];

export type OutcomeKey = 'rating' | 'volume' | 'sla' | 'localPack';

export interface Outcome {
  key: OutcomeKey;
}

export const OUTCOMES: Outcome[] = [
  { key: 'rating' },
  { key: 'volume' },
  { key: 'sla' },
  { key: 'localPack' },
];
