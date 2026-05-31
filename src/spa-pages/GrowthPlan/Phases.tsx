import { useTranslation } from 'react-i18next';
import { PHASES } from './data';

const Phases = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 mb-12">
          <div className="lg:col-span-5">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.phases.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1]">
              {t('pages:growthPlan.phases.title')}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-body text-[16px] leading-[1.7] max-w-[60ch]">
              {t('pages:growthPlan.phases.lede')}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PHASES.map((p, i) => {
            const TONES: { hex: string; soft: string }[] = [
              { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.16)' }, // sage
              { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.16)' }, // tan
              { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.14)' }, // cta
              { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' }, // heading
            ];
            const tone = TONES[i] ?? TONES[3];
            const prev = TONES[i - 1]?.hex ?? tone.hex;
            const next = TONES[i + 1]?.hex ?? tone.hex;
            const flowGradient = `linear-gradient(90deg, ${prev} 0%, ${tone.hex} 50%, ${next} 100%)`;
            const isLast = i === PHASES.length - 1;
            const deliverables = t(`pages:growthPlan.phases.items.${p.key}.deliverables`, {
              returnObjects: true,
            }) as string[];
            return (
              <article
                key={p.n}
                className="group relative bg-white border border-line-faint rounded-[16px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(45,55,72,0.22)]"
                style={{ ['--tone' as string]: tone.hex }}
              >
                <div
                  className="h-1.5 rounded-t-[16px]"
                  style={{ background: flowGradient }}
                  aria-hidden="true"
                />

                {!isLast && (
                  <span
                    className="hidden lg:flex absolute top-1/2 -right-[18px] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-line-faint items-center justify-center shadow-[0_4px_12px_rgba(45,55,72,0.10)]"
                    aria-hidden="true"
                    style={{ color: next }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 6 15 12 9 18" />
                    </svg>
                  </span>
                )}

                <div className="p-6 sm:p-7 flex flex-col gap-5 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-grid place-items-center w-12 h-12 rounded-[10px] font-mono text-[15px] font-bold tracking-[0.06em]"
                      style={{ background: tone.soft, color: tone.hex }}
                    >
                      {p.n}
                    </span>
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.16em] uppercase"
                      style={{ background: tone.soft, color: tone.hex }}
                    >
                      M{String(p.range[0]).padStart(2, '0')} — M{String(p.range[1]).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-heading text-[30px] font-extrabold leading-none tracking-[-0.024em]">
                    {t(`pages:growthPlan.phases.items.${p.key}.name`)}
                    <span style={{ color: tone.hex }}>.</span>
                  </h3>

                  <p className="text-body text-[14.5px] leading-[1.6]">
                    {t(`pages:growthPlan.phases.items.${p.key}.summary`)}
                  </p>

                  <ul className="mt-auto pt-5 border-t border-line-faint space-y-2.5 text-[13.5px] text-heading">
                    {deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5 items-center">
                        <span
                          className="inline-grid place-items-center w-4 h-4 rounded-full shrink-0"
                          style={{ background: tone.soft }}
                          aria-hidden="true"
                        >
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke={tone.hex}
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="2.5 6.5 5 9 9.5 3.5" />
                          </svg>
                        </span>
                        <span className="font-medium">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Phases;
