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
