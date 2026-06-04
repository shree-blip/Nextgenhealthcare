import { useTranslation } from 'react-i18next';
import { PHASES, TRAJECTORY } from './data';
import { Eyebrow, GradientText } from './parts';

/* ────────────────────────────────────────────────────────────────────
   THE TRAJECTORY — a single compounding curve, phase-banded and indexed
   to the practice's own baseline. Milestones are surfaced as cards below
   the chart rather than as floating labels, so the figure stays legible
   on small screens.
   ──────────────────────────────────────────────────────────────────── */

const ChartWidth = 1280;
const ChartHeight = 420;
const PadL = 56;
const PadR = 56;
const PadT = 48;
const PadB = 56;

const xFor = (m: number) => PadL + (m / 12) * (ChartWidth - PadL - PadR);
const yFor = (mult: number) => {
  const yMin = 0.8;
  const yMax = 4.2;
  const r = (mult - yMin) / (yMax - yMin);
  return ChartHeight - PadB - r * (ChartHeight - PadT - PadB);
};

const PHASE_FILL: Record<string, string> = {
  sage: 'rgba(143, 188, 143, 0.10)',
  tan: 'rgba(179, 139, 109, 0.09)',
  cta: 'rgba(87, 109, 181, 0.09)',
  heading: 'rgba(45, 55, 72, 0.05)',
};

const MILESTONE_MONTHS = [0, 4, 7, 12];

const TrajectoryChart = ({ ariaLabel }: { ariaLabel: string }) => {
  const { t } = useTranslation('pages');
  const linePath = TRAJECTORY.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.m).toFixed(1)} ${yFor(p.mult).toFixed(1)}`
  ).join(' ');
  const areaPath =
    linePath + ` L ${xFor(12)} ${ChartHeight - PadB} L ${xFor(0)} ${ChartHeight - PadB} Z`;
  const multFor = (m: number) => TRAJECTORY.find((p) => p.m === m)?.mult ?? 1;

  return (
    <svg
      viewBox={`0 0 ${ChartWidth} ${ChartHeight}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={ariaLabel}
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="gp-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#576DB5" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#576DB5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gp-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5A8F5A" />
          <stop offset="33%" stopColor="#B38B6D" />
          <stop offset="66%" stopColor="#576DB5" />
          <stop offset="100%" stopColor="#2D3748" />
        </linearGradient>
      </defs>

      {/* Phase bands + labels */}
      {PHASES.map((p) => {
        const mid = (xFor(p.range[0]) + xFor(p.range[1])) / 2;
        return (
          <g key={p.n}>
            <rect
              x={xFor(p.range[0])}
              y={PadT}
              width={xFor(p.range[1]) - xFor(p.range[0])}
              height={ChartHeight - PadT - PadB}
              fill={PHASE_FILL[p.tone]}
            />
            <text
              x={mid}
              y={PadT - 14}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="11"
              fill="#718096"
              letterSpacing="0.22em"
            >
              {t(`pages:growthPlan.trajectory.phaseLabels.${p.key}`)}
            </text>
          </g>
        );
      })}

      {/* Baseline */}
      <line
        x1={PadL}
        y1={yFor(1)}
        x2={ChartWidth - PadR}
        y2={yFor(1)}
        stroke="rgba(45,55,72,0.22)"
        strokeWidth={1}
        strokeDasharray="2 6"
      />

      {/* X-axis ticks */}
      {Array.from({ length: 13 }).map((_, i) => (
        <g key={i}>
          <line
            x1={xFor(i)}
            y1={ChartHeight - PadB}
            x2={xFor(i)}
            y2={ChartHeight - PadB + 6}
            stroke="rgba(45,55,72,0.35)"
            strokeWidth={1}
          />
          <text
            x={xFor(i)}
            y={ChartHeight - PadB + 24}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
            fill="#718096"
            letterSpacing="0.06em"
          >
            M{String(i).padStart(2, '0')}
          </text>
        </g>
      ))}

      {/* Area + gradient line */}
      <path d={areaPath} fill="url(#gp-area)" />
      <path
        d={linePath}
        fill="none"
        stroke="url(#gp-line)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Milestone markers */}
      {MILESTONE_MONTHS.map((m) => (
        <circle
          key={m}
          cx={xFor(m)}
          cy={yFor(multFor(m))}
          r={6}
          fill="#fff"
          stroke="#576DB5"
          strokeWidth={2.4}
        />
      ))}

      {/* Y-axis labels */}
      {[1, 2, 3, 4].map((v) => (
        <text
          key={v}
          x={PadL - 14}
          y={yFor(v) + 4}
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="11"
          fill="#718096"
        >
          {v}.0×
        </text>
      ))}
    </svg>
  );
};

interface Milestone {
  m: string;
  label: string;
  detail: string;
}

const MILESTONE_TONES = ['#5A8F5A', '#B38B6D', '#576DB5', '#2D3748'];

const Trajectory = () => {
  const { t } = useTranslation('pages');
  const milestones = t('pages:growthPlan.trajectory.milestones', {
    returnObjects: true,
  }) as Milestone[];

  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <Eyebrow color="#8FBC8F">{t('pages:growthPlan.trajectory.eyebrow')}</Eyebrow>
            <h2 className="mt-5 max-w-[28ch] text-[clamp(24px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.02em] text-heading">
              {t('pages:growthPlan.trajectory.titleLine1')}{' '}
              <GradientText>{t('pages:growthPlan.trajectory.titleAccent')}</GradientText>
              {t('pages:growthPlan.trajectory.titleSuffix')}
            </h2>
          </div>
          <div className="flex items-baseline gap-6 text-[12px] text-muted">
            <span className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-sm bg-cta/20" />{' '}
              {t('pages:growthPlan.trajectory.legend.area')}
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-px w-3 bg-heading/40" />{' '}
              {t('pages:growthPlan.trajectory.legend.baseline')}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-line-faint bg-white shadow-card">
          <div className="border-b border-line-faint bg-bg-alt/60 px-5 py-3.5 sm:px-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {t('pages:growthPlan.trajectory.ariaLabel')}
            </span>
          </div>
          <div className="p-4 sm:p-8">
            <TrajectoryChart ariaLabel={t('pages:growthPlan.trajectory.ariaLabel')} />
          </div>
        </div>

        {/* Milestone cards */}
        <div className="mt-10">
          <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted mb-4">
            {t('pages:growthPlan.trajectory.milestonesTitle')}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((ms, i) => {
              const hex = MILESTONE_TONES[i] ?? MILESTONE_TONES[3];
              return (
                <article
                  key={ms.m}
                  className="bg-white border border-line-faint rounded-[14px] p-5 border-t-2"
                  style={{ borderTopColor: hex }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] font-bold tracking-[0.12em]" style={{ color: hex }}>
                      {ms.m}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: hex }}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-3 text-heading text-[15px] font-bold tracking-[-0.012em]">
                    {ms.label}
                  </h3>
                  <p className="mt-2 text-body text-[12.5px] leading-[1.55]">{ms.detail}</p>
                </article>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-muted text-[13px] leading-[1.6] max-w-[68ch]">
          {t('pages:growthPlan.trajectory.footer')}
        </p>
      </div>
    </section>
  );
};

export default Trajectory;
