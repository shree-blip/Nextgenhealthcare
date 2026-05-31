/* ────────────────────────────────────────────────────────────────────
   GROWTH-PLAN DATA - single source for the chart, phase cards, and timeline.
   Keep figures consistent so the visualisation, table, and KPI panel agree.
   ──────────────────────────────────────────────────────────────────── */

export type TrajectoryLabelKey =
  | 'baseline'
  | 'firstUplift'
  | 'rankingCrossover'
  | 'compoundZone';

export interface MonthPoint {
  m: number;
  mult: number;
  labelKey?: TrajectoryLabelKey;
}
// y axis: growth multiplier vs baseline (1.0 = month 0).
export const TRAJECTORY: MonthPoint[] = [
  { m: 0, mult: 1.0, labelKey: 'baseline' },
  { m: 1, mult: 0.98 },
  { m: 2, mult: 1.05 },
  { m: 3, mult: 1.18 },
  { m: 4, mult: 1.42, labelKey: 'firstUplift' },
  { m: 5, mult: 1.78 },
  { m: 6, mult: 2.15 },
  { m: 7, mult: 2.52, labelKey: 'rankingCrossover' },
  { m: 8, mult: 2.84 },
  { m: 9, mult: 3.1 },
  { m: 10, mult: 3.32 },
  { m: 11, mult: 3.55 },
  { m: 12, mult: 3.8, labelKey: 'compoundZone' },
];

export type PhaseKey = 'diagnose' | 'build' | 'launch' | 'optimize';

export const PHASES: { n: string; range: [number, number]; key: PhaseKey; tone: string }[] = [
  { n: '01', range: [0, 2], key: 'diagnose', tone: 'sage' },
  { n: '02', range: [2, 5], key: 'build', tone: 'tan' },
  { n: '03', range: [5, 8], key: 'launch', tone: 'cta' },
  { n: '04', range: [8, 12], key: 'optimize', tone: 'heading' },
];

export const QUARTER_ICONS: React.ReactNode[] = [
  // Q1 Foundation — clipboard check
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
    <polyline points="9 14 12 17 17 11" />
  </svg>,
  // Q2 Acquisition — megaphone
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2z" />
    <path d="M19 5a8 8 0 0 1 0 14" />
    <path d="M16 8a4 4 0 0 1 0 8" />
  </svg>,
  // Q3 Compounding — trending up
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
  // Q4 Optimising — refresh / loop
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
    <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
  </svg>,
];

export const QUARTER_TONES = [
  { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.22)' }, // sage
  { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.20)' }, // tan
  { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.20)' }, // cta
  { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.14)' }, // heading
];
