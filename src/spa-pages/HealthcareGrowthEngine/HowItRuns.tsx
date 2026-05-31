import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { STAGES } from './data';

/* ---------- HOW IT RUNS — top-aligned header + horizontal rail with moving indicator ---------- */
const HowItRuns = () => {
  const { t } = useTranslation('pages');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STAGES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [paused]);

  const progressPct = STAGES.length > 1 ? (active / (STAGES.length - 1)) * 100 : 0;

  return (
    <section className="border-t border-line-faint bg-bg">
      <div className="container-shell py-[clamp(64px,8.5vw,120px)]">
        {/* Header — kicker + heading on left, subtext on right (Advantages-style) */}
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-line font-semibold">
                {t('pages:healthcareGrowthEngine.howItRuns.eyebrow')}
              </span>
            </div>
            <h2 className="text-heading font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(34px,5vw,68px)]">
              {t('pages:healthcareGrowthEngine.howItRuns.title')}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-body text-[15.5px] leading-[1.65] max-w-[42ch]">
              {t('pages:healthcareGrowthEngine.howItRuns.kicker')}
            </p>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Horizontal connector with animated progress */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-0 right-0 top-[27px] px-[12.5%]"
          >
            <div className="relative h-px bg-line-soft">
              <span
                className="absolute top-0 left-0 h-px bg-heading transition-[width] duration-700 ease-out"
                style={{ width: `${progressPct}%` }}
              />
              <span
                className="absolute -top-[5px] h-[11px] w-[11px] rounded-full bg-heading shadow-[0_0_0_4px_rgba(255,255,255,1),0_0_0_5px_rgba(10,20,38,0.12)] transition-[left] duration-700 ease-out"
                style={{ left: `calc(${progressPct}% - 5px)` }}
              />
            </div>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-8 relative">
            {STAGES.map((s, i) => {
              const isActive = active === i;
              const k = t(`pages:healthcareGrowthEngine.howItRuns.stages.${s.key}.k`);
              return (
                <li
                  key={s.n}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  aria-current={isActive}
                  className="relative flex flex-col gap-4 cursor-pointer"
                >
                  <div
                    className={`relative w-14 h-14 rounded-[14px] border grid place-items-center transition-all duration-500 ${
                      isActive
                        ? 'border-line bg-line text-white -translate-y-0.5'
                        : 'border-line-faint bg-bg text-line'
                    }`}
                  >
                    <span className="w-5 h-5 block">{s.icon}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-mono text-[12px] text-line tracking-[0.18em] font-semibold">
                        {s.n}
                      </span>
                      <h4
                        className={`text-[22px] font-bold tracking-[-0.02em] transition-colors duration-500 ${
                          isActive ? 'text-heading' : 'text-heading/80'
                        }`}
                      >
                        {k}.
                      </h4>
                    </div>
                    <span className="text-muted text-[11.5px] uppercase tracking-[0.18em] font-semibold border border-line-faint rounded-full px-2.5 py-0.5 self-start">
                      {t(`pages:healthcareGrowthEngine.howItRuns.stages.${s.key}.cadence`)}
                    </span>
                    <p className="text-body text-[14.5px] leading-[1.65]">
                      {t(`pages:healthcareGrowthEngine.howItRuns.stages.${s.key}.d`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Mobile progress dots */}
          <div className="md:hidden mt-6 flex items-center justify-center gap-1.5">
            {STAGES.map((s, i) => {
              const k = t(`pages:healthcareGrowthEngine.howItRuns.stages.${s.key}.k`);
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  aria-label={t('pages:healthcareGrowthEngine.howItRuns.mobileShowLabel', {
                    stage: k,
                  })}
                  aria-current={active === i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-7 bg-heading' : 'w-1.5 bg-line-faint'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItRuns;
