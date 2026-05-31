import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import type { StackGroup } from './data';

/* ---------- LAYOUT PRIMITIVE ---------- */
export const Section = ({
  no,
  title,
  kicker,
  children,
  tone = 'bg',
}: {
  no: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  tone?: 'bg' | 'alt';
}) => (
  <section className={`border-t border-line-faint ${tone === 'alt' ? 'bg-bg-alt' : 'bg-bg'}`}>
    <div className="container-shell py-[clamp(64px,8.5vw,120px)]">
      <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className="lg:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="text-line font-mono text-[13px] tracking-[0.18em]">{no}</span>
            <span className="h-px flex-1 bg-line-soft" />
          </div>
          <h2 className="mt-4 text-heading text-[clamp(22px,2vw,30px)] font-bold tracking-[-0.02em] leading-[1.1]">
            {title}
          </h2>
          {kicker && (
            <p className="mt-3 text-muted text-[14px] leading-[1.6] max-w-[34ch]">{kicker}</p>
          )}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  </section>
);

// Triggers once when an element scrolls into view. Disconnects after firing.
export const useInView = <T extends HTMLElement>(threshold = 0.3) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
};

export const CountUp = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1700,
  trigger,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    if (typeof window === 'undefined' || !window.requestAnimationFrame) {
      setN(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, value, duration]);
  return (
    <span aria-live="polite">
      {prefix}
      <span className="tabular-nums">{n}</span>
      {suffix}
    </span>
  );
};

export const ToolTile = ({
  name,
  mark,
  use,
  idx,
  category,
}: {
  name: string;
  mark: string;
  use: string;
  idx: number;
  category: string;
}) => {
  const { t } = useTranslation('pages');
  return (
    <div className="relative h-full w-full rounded-[18px] overflow-hidden bg-heading isolate">
      <span
        aria-hidden="true"
        className="absolute -top-16 -left-12 w-56 h-56 rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle at 50% 50%, #8FBC8F 0%, transparent 60%)' }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-20 -right-16 w-64 h-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle at 50% 50%, #B38B6D 0%, transparent 60%)' }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(0deg, #fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className="w-14 h-14 rounded-[12px] bg-white/[0.08] backdrop-blur border border-white/15 grid place-items-center text-white font-mono font-bold text-[15px] tracking-[0.04em]">
            {mark}
          </span>
          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] backdrop-blur border border-white/15 text-[9.5px] uppercase tracking-[0.22em] font-bold text-accent-soft">
              <span className="h-1 w-1 rounded-full bg-accent-soft" />
              {t('pages:healthcareGrowthEngine.stack.syncedLabel')}
            </span>
            <span className="font-mono text-[9.5px] text-white/45 tracking-[0.22em] uppercase">
              {category} · 0{idx + 1}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-14 bg-accent-soft/70 rounded-full" />
            <span className="h-1.5 flex-1 bg-white/15 rounded-full" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-9 bg-white/40 rounded-full" />
            <span className="h-1.5 flex-1 bg-white/15 rounded-full" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-20 bg-white/25 rounded-full" />
            <span className="h-1.5 w-6 bg-line/70 rounded-full" />
          </div>
          <div className="flex items-end gap-1.5 mt-3 h-12">
            {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-accent-soft' : 'bg-white/20'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-white font-extrabold text-[22px] tracking-[-0.02em] leading-tight">
            {name}
          </div>
          <div className="text-white/65 text-[12.5px] leading-[1.5] mt-1.5 max-w-[34ch]">{use}</div>
        </div>
      </div>
    </div>
  );
};

export const StackCard = ({
  group,
  idx,
  total,
}: {
  group: StackGroup;
  idx: number;
  total: number;
}) => {
  const { t } = useTranslation('pages');
  const [active, setActive] = useState(0);
  const label = t(`pages:healthcareGrowthEngine.stack.groups.${group.key}.label`);
  const tagline = t(`pages:healthcareGrowthEngine.stack.groups.${group.key}.tagline`);
  const ariaLabel = `${label} ${t('pages:healthcareGrowthEngine.stack.toolsAriaSuffix')}`;

  return (
    <article className="snap-start shrink-0 w-[300px] sm:w-[340px] lg:w-[380px] bg-bg border border-line-faint rounded-[22px] overflow-hidden flex flex-col transition-all duration-300 hover:border-line hover:shadow-[0_28px_56px_-28px_rgba(10,20,38,0.28)]">
      <div className="relative aspect-[4/5] bg-bg-soft overflow-hidden">
        {group.tools.map((tool, i) => (
          <div
            key={tool.toolKey}
            className={`absolute inset-2 transition-all duration-500 ease-out ${
              i === active
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-[0.98] pointer-events-none'
            }`}
            aria-hidden={i !== active}
          >
            <ToolTile
              name={tool.name}
              mark={tool.mark}
              use={t(
                `pages:healthcareGrowthEngine.stack.groups.${group.key}.tools.${tool.toolKey}`
              )}
              idx={i}
              category={label}
            />
          </div>
        ))}

        <span className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur font-mono text-[10.5px] tracking-[0.2em] text-heading font-bold uppercase">
          {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="px-5 sm:px-6 pt-5 pb-4 flex items-center gap-3 border-b border-line-faint">
        <span className="shrink-0 w-8 h-8 rounded-[8px] bg-bg-soft border border-line-faint text-line grid place-items-center">
          <span className="w-4 h-4 block">{group.icon}</span>
        </span>
        <div className="flex flex-col min-w-0">
          <span className="text-heading text-[13px] font-bold uppercase tracking-[0.18em]">
            {label}
          </span>
          <span className="text-muted text-[11.5px] leading-tight truncate">{tagline}</span>
        </div>
      </div>

      <ul role="tablist" aria-label={ariaLabel} className="flex flex-col p-2">
        {group.tools.map((tool, i) => {
          const isActive = i === active;
          return (
            <li key={tool.toolKey}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-heading text-white shadow-[0_8px_22px_-12px_rgba(10,20,38,0.4)]'
                    : 'hover:bg-bg-soft'
                }`}
              >
                <span
                  className={`shrink-0 w-8 h-8 rounded-[7px] grid place-items-center font-mono text-[10.5px] tracking-[0.04em] font-bold transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'bg-heading text-white'
                  }`}
                >
                  {tool.mark}
                </span>
                <span
                  className={`text-[14px] font-semibold tracking-[-0.005em] flex-1 ${
                    isActive ? 'text-white' : 'text-heading'
                  }`}
                >
                  {tool.name}
                </span>
                <span
                  className={`shrink-0 transition-all ${
                    isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                  }`}
                  aria-hidden="true"
                >
                  <ArrowIcon size={14} strokeWidth={2.6} className="text-accent-soft" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
};
