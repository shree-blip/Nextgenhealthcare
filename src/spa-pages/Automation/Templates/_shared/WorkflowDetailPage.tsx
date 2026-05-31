import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  Network,
  Shield,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

/* ============================================================
   Shared layout for the six workflow detail pages under
   /automation/templates/*. Keeps Tailwind classes / structure /
   motion identical to the originals — only swaps i18n key roots
   and the per-section icon arrays.
   ============================================================ */

const NAVY = '#1A2942';

export interface WorkflowDetailPageProps {
  /** Sub-key under `automation:workflow.*` for this workflow's copy. */
  i18nKey: string;
  /** When true, the title uses `titleAmp` (` & `) instead of `titleSep` (` · `). */
  ampSeparator?: boolean;
  /** Icons aligned 1:1 with the `stats.s1..s4` keys. */
  statIcons: LucideIcon[];
  /** Icons aligned 1:1 with the `before` array. */
  beforeIcons: LucideIcon[];
  /** Icons aligned 1:1 with the `after` array. */
  afterIcons: LucideIcon[];
  /** Icons aligned 1:1 with the `nodes` array. */
  nodeIcons: LucideIcon[];
  /** Icons aligned 1:1 with the `outcomes` array. */
  outcomeIcons: LucideIcon[];
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-500">
    {children}
  </span>
);

const Divider = () => <div className="h-px w-full bg-slate-200" />;

const WorkflowDetailPage = ({
  i18nKey,
  ampSeparator = false,
  statIcons,
  beforeIcons,
  afterIcons,
  nodeIcons,
  outcomeIcons,
}: WorkflowDetailPageProps) => {
  const { t } = useTranslation(['automation']);
  const base = `automation:workflow.${i18nKey}`;
  const common = 'automation:workflow.common';

  const beforeItems = useMemo(() => {
    const arr = t(`${base}.before`, { returnObjects: true });
    return Array.isArray(arr) ? (arr as string[]) : [];
  }, [t, base]);
  const afterItems = useMemo(() => {
    const arr = t(`${base}.after`, { returnObjects: true });
    return Array.isArray(arr) ? (arr as string[]) : [];
  }, [t, base]);
  const nodes = useMemo(() => {
    const arr = t(`${base}.nodes`, { returnObjects: true });
    return Array.isArray(arr) ? (arr as { n: string; label: string; copy: string }[]) : [];
  }, [t, base]);
  const outcomes = useMemo(() => {
    const arr = t(`${base}.outcomes`, { returnObjects: true });
    return Array.isArray(arr) ? (arr as { label: string; copy: string }[]) : [];
  }, [t, base]);
  const setupSteps = useMemo(() => {
    const arr = t(`${base}.setupSteps`, { returnObjects: true });
    return Array.isArray(arr)
      ? (arr as { n: string; title: string; copy: string; minutes: string }[])
      : [];
  }, [t, base]);
  const footerBadges = useMemo(() => {
    const arr = t(`${base}.footerBadges`, { returnObjects: true });
    return Array.isArray(arr) ? (arr as string[]) : [];
  }, [t, base]);

  const stats = [
    { value: t(`${base}.stats.s1.value`), label: t(`${base}.stats.s1.label`) },
    { value: t(`${base}.stats.s2.value`), label: t(`${base}.stats.s2.label`) },
    { value: t(`${base}.stats.s3.value`), label: t(`${base}.stats.s3.label`) },
    { value: t(`${base}.stats.s4.value`), label: t(`${base}.stats.s4.label`) },
  ];

  const separator = ampSeparator ? t(`${base}.titleAmp`) : t(`${base}.titleSep`);

  return (
    <main className="bg-white text-slate-800 antialiased selection:bg-amber-100">
      {/* ============== 1 · HERO ============== */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: NAVY }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:px-8 md:pt-28 md:pb-24">
          <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase text-slate-500">
            <span style={{ color: NAVY }}>{t(`${base}.fig`)}</span>
            <span className="h-px w-8 bg-slate-300" />
            <span>{t(`${base}.category`)}</span>
          </div>

          <h1
            className="mt-8 max-w-4xl text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            style={{
              color: NAVY,
              fontWeight: 500,
            }}
          >
            {t(`${base}.titlePart1`)}
            <span className="text-slate-400">{separator}</span>
            <span className="italic">{t(`${base}.titleItalic`)}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            {t(`${base}.lede`)}
            <em className="text-slate-800">{t(`${base}.ledeEm`)}</em>
            {t(`${base}.ledeRest`, { defaultValue: '' })}
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: NAVY }}
            >
              {t(`${common}.getThisWorkflow`)}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {t(`${common}.seeHowItWorks`)}
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Stat strip */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-4">
            {stats.map(({ value, label }, i) => {
              const Icon = statIcons[i];
              return (
                <div
                  key={label}
                  className="flex flex-col gap-2 bg-white px-5 py-6 transition-colors hover:bg-slate-50"
                >
                  <Icon size={18} style={{ color: NAVY }} strokeWidth={1.6} />
                  <div className="mt-1 text-2xl font-semibold" style={{ color: NAVY }}>
                    {value}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-500">
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== 2 · BEFORE / AFTER ============== */}
      <section className="border-b border-slate-100 bg-[#FAFAF8]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>{t(`${common}.shift`)}</SectionLabel>
            <h2
              className="mt-4 text-3xl tracking-tight sm:text-4xl"
              style={{
                color: NAVY,
                fontWeight: 500,
              }}
            >
              {t(`${base}.shiftTitle`)}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-10">
            {/* Before */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <SectionLabel>{t(`${common}.before`)}</SectionLabel>
                <span className="text-[11px] font-mono text-slate-400">{t(`${common}.today`)}</span>
              </div>
              <h3
                className="mt-3 text-2xl"
                style={{
                  color: NAVY,
                  fontWeight: 500,
                }}
              >
                {t(`${base}.beforeTitle`)}
              </h3>
              <ul className="mt-7 space-y-4">
                {beforeItems.map((text, i) => {
                  const Icon = beforeIcons[i];
                  return (
                    <li key={text} className="flex items-start gap-3 text-slate-600">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Icon size={15} strokeWidth={1.7} />
                      </span>
                      <span className="leading-relaxed">{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* After */}
            <div
              className="relative rounded-2xl border p-8 sm:p-10"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F6FB 100%)',
                borderColor: 'rgba(26,41,66,0.15)',
              }}
            >
              <div className="flex items-center justify-between">
                <SectionLabel>{t(`${common}.after`)}</SectionLabel>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-white"
                  style={{ background: NAVY }}
                >
                  <Sparkles size={10} /> {t(`${common}.automated`)}
                </span>
              </div>
              <h3
                className="mt-3 text-2xl"
                style={{
                  color: NAVY,
                  fontWeight: 500,
                }}
              >
                {t(`${base}.afterTitle`)}
              </h3>
              <ul className="mt-7 space-y-4">
                {afterItems.map((text, i) => {
                  const Icon = afterIcons[i];
                  return (
                    <li key={text} className="flex items-start gap-3 text-slate-700">
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                        style={{ background: NAVY }}
                      >
                        <Icon size={15} strokeWidth={1.8} />
                      </span>
                      <span className="leading-relaxed">{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 3 · HOW IT WORKS (FLOW) ============== */}
      <section
        id="how-it-works"
        className="border-b border-slate-100 bg-white"
        aria-labelledby="hiw-title"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-28">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <SectionLabel>{t(`${common}.howItWorks`)}</SectionLabel>
              <h2
                id="hiw-title"
                className="mt-4 text-3xl tracking-tight sm:text-4xl"
                style={{
                  color: NAVY,
                  fontWeight: 500,
                }}
              >
                {t(`${base}.howTitle`)}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <Network size={14} strokeWidth={1.6} />
              <span>{t(`${common}.nodesSpec`, { count: nodes.length })}</span>
            </div>
          </div>

          <Divider />

          <div className="mt-14">
            <ol
              className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
              aria-label={t(`${common}.workflowNodesAria`)}
            >
              {nodes.map((node, i) => {
                const Icon = nodeIcons[i];
                const isLast = i === nodes.length - 1;
                return (
                  <li
                    key={node.n}
                    className="group relative flex flex-col"
                    aria-label={t(`${common}.stepLabel`, { n: i + 1, label: node.label })}
                  >
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute top-9 right-[-14px] hidden h-px w-7 bg-slate-200 lg:block"
                      />
                    )}
                    {!isLast && (
                      <ArrowRight
                        aria-hidden="true"
                        size={14}
                        strokeWidth={1.4}
                        className="absolute top-[28px] right-[-18px] hidden text-slate-300 lg:block"
                      />
                    )}

                    <div className="relative h-full rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ background: 'rgba(26,41,66,0.06)', color: NAVY }}
                        >
                          <Icon size={18} strokeWidth={1.7} />
                        </span>
                        <span className="font-mono text-xs tracking-widest text-slate-400">
                          {node.n}
                        </span>
                      </div>
                      <h3
                        className="mt-5 text-lg font-semibold leading-snug"
                        style={{ color: NAVY }}
                      >
                        {node.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{node.copy}</p>
                    </div>

                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="mx-auto mt-4 block h-6 w-px bg-slate-200 sm:hidden"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ============== 4 · WHAT YOU GET ============== */}
      <section className="border-b border-slate-100 bg-[#FAFAF8]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-28">
          <div className="max-w-2xl">
            <SectionLabel>{t(`${common}.whatYouGet`)}</SectionLabel>
            <h2
              className="mt-4 text-3xl tracking-tight sm:text-4xl"
              style={{
                color: NAVY,
                fontWeight: 500,
              }}
            >
              {t(`${base}.whatTitle`)}
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map(({ label, copy }, i) => {
              const Icon = outcomeIcons[i];
              return (
                <div
                  key={label}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(26,41,66,0.06)', color: NAVY }}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold" style={{ color: NAVY }}>
                    {label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== 5 · SETUP & REQUIREMENTS ============== */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionLabel>{t(`${common}.setup`)}</SectionLabel>
              <h2
                className="mt-4 text-3xl tracking-tight sm:text-4xl"
                style={{
                  color: NAVY,
                  fontWeight: 500,
                }}
              >
                {t(`${base}.setupTitle`)}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                {t(`${base}.setupIntro`)}
              </p>
            </div>

            <ol className="relative md:col-span-7" aria-label={t(`${common}.setupStepsAria`)}>
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-[19px] w-px bg-slate-200"
              />

              {setupSteps.map((step) => (
                <li key={step.n} className="relative flex gap-5 pb-8 last:pb-0">
                  <span
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold tracking-widest"
                    style={{ background: NAVY }}
                  >
                    {step.n}
                  </span>
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold" style={{ color: NAVY }}>
                        {step.title}
                      </h3>
                      <span className="font-mono text-[11px] tracking-wider text-slate-500">
                        {step.minutes}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Compliance callout */}
          <aside
            className="mt-14 flex flex-col gap-5 rounded-2xl border p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8"
            style={{
              background: 'rgba(26,41,66,0.04)',
              borderColor: 'rgba(26,41,66,0.18)',
            }}
            aria-label={t(`${common}.complianceAria`)}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
              style={{ background: NAVY }}
              aria-hidden="true"
            >
              <Shield size={22} strokeWidth={1.7} />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <SectionLabel>{t(`${common}.compliance`)}</SectionLabel>
                <span className="hidden h-px flex-1 bg-slate-300/60 sm:block" />
              </div>
              <h3
                className="mt-1 text-xl"
                style={{
                  color: NAVY,
                  fontWeight: 500,
                }}
              >
                {t(`${base}.complianceTitle`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {t(`${base}.complianceText`)}
              </p>
            </div>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white sm:self-auto"
              style={{ color: NAVY }}
            >
              {t(`${base}.complianceCta`)}
              <ArrowRight size={14} />
            </a>
          </aside>
        </div>
      </section>

      {/* ============== 6 · FINAL CTA ============== */}
      <section
        id="cta"
        className="relative overflow-hidden"
        style={{ background: NAVY }}
        aria-labelledby="cta-title"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:px-8 md:py-32">
          <span className="inline-block text-[11px] font-semibold tracking-[0.28em] uppercase text-white/60">
            {t(`${common}.readyWhenYouAre`)}
          </span>

          <blockquote
            id="cta-title"
            className="mx-auto mt-10 max-w-3xl text-4xl leading-tight italic tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{
              fontWeight: 400,
            }}
          >
            &ldquo;{t(`${base}.ctaQuote`)}&rdquo;
          </blockquote>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/70">
            {t(`${base}.ctaText`)}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ color: NAVY }}
            >
              {t(`${common}.getThisWorkflow`)}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/automation/templates"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/50 hover:text-white"
            >
              {t(`${common}.seeAllSix`)}
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
            {footerBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2">
                <CheckCircle2 size={12} /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkflowDetailPage;
