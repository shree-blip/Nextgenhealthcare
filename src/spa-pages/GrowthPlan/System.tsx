import { useTranslation } from 'react-i18next';
import { PHASES } from './data';
import { CheckIcon } from '@/components/icons';

const TONES: Record<string, { hex: string; soft: string }> = {
  sage: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.16)' },
  tan: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.16)' },
  cta: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.14)' },
  heading: { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' },
};

const System = () => {
  const { t } = useTranslation('pages');

  return (
    <section id="gp-system" className="border-t border-line-faint scroll-mt-28">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 mb-14">
          <div className="lg:col-span-5">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.system.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1]">
              {t('pages:growthPlan.system.title')}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-body text-[16px] leading-[1.7] max-w-[60ch]">
              {t('pages:growthPlan.system.lede')}
            </p>
          </div>
        </div>

        <ol className="relative">
          {PHASES.map((p, i) => {
            const tone = TONES[p.tone] ?? TONES.heading;
            const isLast = i === PHASES.length - 1;
            const deliverables = t(`pages:growthPlan.system.phases.${p.key}.deliverables`, {
              returnObjects: true,
            }) as string[];
            return (
              <li key={p.n} className="relative grid grid-cols-[auto,1fr] gap-x-6 sm:gap-x-10">
                {/* Rail: number disc + connecting line */}
                <div className="flex flex-col items-center">
                  <span
                    className="inline-grid place-items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full font-mono text-[16px] font-bold shrink-0 border-2 bg-white"
                    style={{ borderColor: tone.hex, color: tone.hex }}
                  >
                    {p.n}
                  </span>
                  {!isLast && (
                    <span
                      className="w-px flex-1 my-2"
                      style={{
                        background: `linear-gradient(to bottom, ${tone.hex}, ${
                          TONES[PHASES[i + 1].tone]?.hex ?? tone.hex
                        })`,
                        opacity: 0.4,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={isLast ? 'pb-0' : 'pb-12 sm:pb-14'}>
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[11px] tracking-[0.16em] uppercase"
                    style={{ background: tone.soft, color: tone.hex }}
                  >
                    {t(`pages:growthPlan.system.phases.${p.key}.window`)}
                  </div>
                  <h3 className="mt-3 text-heading text-[26px] sm:text-[30px] font-extrabold leading-none tracking-[-0.024em]">
                    {t(`pages:growthPlan.system.phases.${p.key}.name`)}
                    <span style={{ color: tone.hex }}>.</span>
                  </h3>
                  <p className="mt-3 text-body text-[15px] leading-[1.65] max-w-[58ch]">
                    {t(`pages:growthPlan.system.phases.${p.key}.summary`)}
                  </p>

                  <div className="mt-6 grid sm:grid-cols-[1fr,auto] gap-6 items-start">
                    <div>
                      <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted mb-3">
                        {t('pages:growthPlan.system.deliverablesLabel')}
                      </div>
                      <ul className="flex flex-wrap gap-2.5">
                        {deliverables.map((d) => (
                          <li
                            key={d}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line-faint text-[13px] font-medium text-heading"
                          >
                            <span style={{ color: tone.hex }} aria-hidden="true">
                              <CheckIcon size={12} strokeWidth={3} />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sm:text-right">
                      <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted mb-2">
                        {t('pages:growthPlan.system.measureLabel')}
                      </div>
                      <div
                        className="inline-flex items-center gap-2 text-[14px] font-bold"
                        style={{ color: tone.hex }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: tone.hex }}
                          aria-hidden="true"
                        />
                        {t(`pages:growthPlan.system.phases.${p.key}.measure`)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default System;
