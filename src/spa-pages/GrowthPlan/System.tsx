import { useTranslation } from 'react-i18next';
import { PHASES } from './data';
import { CheckIcon } from '@/components/icons';
import { Eyebrow } from './parts';

const TONES: Record<string, { hex: string; soft: string }> = {
  sage: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.16)' },
  tan: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.16)' },
  cta: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.14)' },
  heading: { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' },
};

const System = () => {
  const { t } = useTranslation('pages');

  return (
    <section id="gp-system" className="scroll-mt-28 border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="mb-14 grid gap-x-16 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow color="#576DB5">{t('pages:growthPlan.system.eyebrow')}</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
              {t('pages:growthPlan.system.title')}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="max-w-[60ch] text-[16px] leading-[1.7] text-body">
              {t('pages:growthPlan.system.lede')}
            </p>
          </div>
        </div>

        {/* Four phase cards — each a self-contained, scannable step */}
        <div className="grid gap-5 md:grid-cols-2">
          {PHASES.map((p, i) => {
            const tone = TONES[p.tone] ?? TONES.heading;
            const deliverables = t(`pages:growthPlan.system.phases.${p.key}.deliverables`, {
              returnObjects: true,
            }) as string[];
            return (
              <article
                key={p.n}
                className="relative flex flex-col overflow-hidden rounded-[20px] border border-line-faint bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:p-8"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: tone.hex }}
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between">
                  <span
                    className="inline-grid h-12 w-12 place-items-center rounded-[14px] font-mono text-[16px] font-bold"
                    style={{ background: tone.soft, color: tone.hex }}
                  >
                    {p.n}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, '0')} / {String(PHASES.length).padStart(2, '0')}
                  </span>
                </div>

                <div
                  className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ background: tone.soft, color: tone.hex }}
                >
                  {t(`pages:growthPlan.system.phases.${p.key}.window`)}
                </div>

                <h3 className="mt-3 text-[26px] font-extrabold leading-none tracking-[-0.024em] text-heading sm:text-[30px]">
                  {t(`pages:growthPlan.system.phases.${p.key}.name`)}
                  <span style={{ color: tone.hex }}>.</span>
                </h3>

                <p className="mt-3 text-[15px] leading-[1.65] text-body">
                  {t(`pages:growthPlan.system.phases.${p.key}.summary`)}
                </p>

                <div className="mt-6 border-t border-line-faint pt-5">
                  <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                    {t('pages:growthPlan.system.deliverablesLabel')}
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {deliverables.map((d) => (
                      <li
                        key={d}
                        className="inline-flex items-center gap-2 rounded-full border border-line-faint bg-bg-alt px-3 py-1.5 text-[13px] font-medium text-heading"
                      >
                        <span style={{ color: tone.hex }} aria-hidden="true">
                          <CheckIcon size={12} strokeWidth={3} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[14px] font-bold" style={{ color: tone.hex }}>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                    {t('pages:growthPlan.system.measureLabel')}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
                  {t(`pages:growthPlan.system.phases.${p.key}.measure`)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default System;
