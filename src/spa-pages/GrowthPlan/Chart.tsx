import { useTranslation } from 'react-i18next';
import { PHASES, TRAJECTORY } from './data';

/* ────────────────────────────────────────────────────────────────────
   SVG CHART - the page's single, authoritative visualisation.
   ──────────────────────────────────────────────────────────────────── */

const ChartWidth = 1280;
const ChartHeight = 460;
const PadL = 64;
const PadR = 64;
const PadT = 56;
const PadB = 64;

const xFor = (m: number) => PadL + (m / 12) * (ChartWidth - PadL - PadR);
const yFor = (mult: number) => {
  const yMin = 0.8;
  const yMax = 4.2;
  const t = (mult - yMin) / (yMax - yMin);
  return ChartHeight - PadB - t * (ChartHeight - PadT - PadB);
};

const PHASE_FILL: Record<string, string> = {
  sage: 'rgba(143, 188, 143, 0.10)',
  tan: 'rgba(179, 139, 109, 0.10)',
  cta: 'rgba(87, 109, 181, 0.10)',
  heading: 'rgba(45, 55, 72, 0.06)',
};

const TrajectoryChart = () => {
  const { t } = useTranslation('pages');
  const linePath = TRAJECTORY.map(
    (p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.m).toFixed(1)} ${yFor(p.mult).toFixed(1)}`
  ).join(' ');
  const areaPath =
    linePath + ` L ${xFor(12)} ${ChartHeight - PadB} L ${xFor(0)} ${ChartHeight - PadB} Z`;

  return (
    <svg
      viewBox={`0 0 ${ChartWidth} ${ChartHeight}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={t('pages:growthPlan.chart.ariaLabel')}
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="gp-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#576DB5" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#576DB5" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Phase bands */}
      {PHASES.map((p) => (
        <rect
          key={p.n}
          x={xFor(p.range[0])}
          y={PadT}
          width={xFor(p.range[1]) - xFor(p.range[0])}
          height={ChartHeight - PadT - PadB}
          fill={PHASE_FILL[p.tone]}
        />
      ))}

      {/* Horizontal rule (baseline) */}
      <line
        x1={PadL}
        y1={yFor(1)}
        x2={ChartWidth - PadR}
        y2={yFor(1)}
        stroke="rgba(45,55,72,0.18)"
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
            stroke="rgba(45,55,72,0.4)"
            strokeWidth={1}
          />
          <text
            x={xFor(i)}
            y={ChartHeight - PadB + 26}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
            fill="#718096"
            letterSpacing="0.08em"
          >
            M{String(i).padStart(2, '0')}
          </text>
        </g>
      ))}

      {/* Phase labels (top) */}
      {PHASES.map((p) => {
        const mid = (xFor(p.range[0]) + xFor(p.range[1])) / 2;
        return (
          <g key={p.n}>
            <text
              x={mid}
              y={PadT - 26}
              textAnchor="middle"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize="11"
              fill="#B38B6D"
              letterSpacing="0.22em"
            >
              {p.n}
            </text>
            <text
              x={mid}
              y={PadT - 8}
              textAnchor="middle"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="14"
              fontWeight="700"
              fill="#2D3748"
              letterSpacing="-0.01em"
            >
              {t(`pages:growthPlan.chart.phaseLabels.${p.key}`)}
            </text>
          </g>
        );
      })}

      {/* Area + Line */}
      <path d={areaPath} fill="url(#gp-area)" />
      <path
        d={linePath}
        fill="none"
        stroke="#576DB5"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Annotated points */}
      {TRAJECTORY.filter((p) => p.labelKey).map((p) => (
        <g key={p.m}>
          <circle
            cx={xFor(p.m)}
            cy={yFor(p.mult)}
            r={5.5}
            fill="#fff"
            stroke="#576DB5"
            strokeWidth={2}
          />
          <line
            x1={xFor(p.m)}
            y1={yFor(p.mult) - 8}
            x2={xFor(p.m)}
            y2={yFor(p.mult) - 36}
            stroke="#B38B6D"
            strokeWidth={1}
          />
          <text
            x={xFor(p.m)}
            y={yFor(p.mult) - 44}
            textAnchor="middle"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontSize="11.5"
            fontWeight="600"
            fill="#2D3748"
          >
            {t(`pages:growthPlan.chart.trajectoryLabels.${p.labelKey!}`)}
          </text>
          <text
            x={xFor(p.m)}
            y={yFor(p.mult) - 60}
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="10"
            fill="#B38B6D"
            letterSpacing="0.16em"
          >
            M{String(p.m).padStart(2, '0')} · {p.mult.toFixed(2)}×
          </text>
        </g>
      ))}

      {/* Y-axis labels */}
      {[1, 2, 3, 4].map((v) => (
        <text
          key={v}
          x={PadL - 16}
          y={yFor(v) + 4}
          textAnchor="end"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="11"
          fill="#718096"
        >
          {v}.0×
        </text>
      ))}

      {/* Final figure on right axis */}
      <text
        x={ChartWidth - PadR + 8}
        y={yFor(3.8) + 4}
        textAnchor="start"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="14"
        fontWeight="800"
        fill="#576DB5"
        letterSpacing="-0.01em"
      >
        3.80×
      </text>
    </svg>
  );
};

const Chart = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(48px,7vw,96px)]">
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-y-3">
          <div>
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.chart.eyebrow')}
            </div>
            <h2 className="mt-3 text-heading text-[clamp(22px,2vw,28px)] font-bold tracking-[-0.02em]">
              {t('pages:growthPlan.chart.titleLine1')}{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #B38B6D 0%, #8FBC8F 50%, #576DB5 100%)',
                }}
              >
                {t('pages:growthPlan.chart.titleAccent')}
              </span>
              {t('pages:growthPlan.chart.titleSuffix')}
            </h2>
          </div>
          <div className="flex items-baseline gap-6 text-[12px]">
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-cta/20" />{' '}
              {t('pages:growthPlan.chart.legend.area')}
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-3 h-px bg-heading/40" />{' '}
              {t('pages:growthPlan.chart.legend.baseline')}
            </span>
          </div>
        </div>

        <div className="bg-white border border-line-faint p-4 sm:p-8">
          <TrajectoryChart />
        </div>

        <p className="mt-5 text-muted text-[13px] leading-[1.6] max-w-[64ch]">
          {t('pages:growthPlan.chart.footer')}
        </p>
      </div>
    </section>
  );
};

export default Chart;
