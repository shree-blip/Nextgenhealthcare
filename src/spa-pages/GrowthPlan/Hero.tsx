import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { CheckIcon } from '@/components/icons';
import { PHASES } from './data';
import { Eyebrow, GradientText, CtaPair } from './parts';

const PHASE_DOT: Record<string, string> = {
  sage: '#5A8F5A',
  tan: '#B38B6D',
  cta: '#576DB5',
  heading: '#2D3748',
};

const Hero = ({ onBook }: { onBook: () => void }) => {
  const { t } = useTranslation('pages');
  const reassure = t('pages:growthPlan.hero.reassure', { returnObjects: true }) as string[];

  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:growthPlan.breadcrumb.current')} />

        <div className="mt-10 grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          {/* ── Copy + actions ── */}
          <div className="lg:col-span-7">
            <Eyebrow>{t('pages:growthPlan.hero.eyebrow')}</Eyebrow>

            <h1 className="mt-6 max-w-[15ch] text-[clamp(40px,5.6vw,74px)] font-extrabold leading-[1.02] tracking-[-0.036em] text-heading">
              {t('pages:growthPlan.hero.titleLine1')}{' '}
              <GradientText>{t('pages:growthPlan.hero.titleAccent')}</GradientText>
              {t('pages:growthPlan.hero.titleSuffix')}
            </h1>

            <p className="mt-7 max-w-[56ch] text-[17px] leading-[1.7] text-body">
              {t('pages:growthPlan.hero.lede')}
            </p>

            <div className="mt-9">
              <CtaPair onBook={onBook} />
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-line-faint pt-7">
              {reassure.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-[14px] font-medium text-heading">
                  <span
                    className="inline-grid h-5 w-5 shrink-0 place-items-center rounded-full"
                    style={{ background: 'rgba(143, 188, 143, 0.18)', color: '#5A8F5A' }}
                    aria-hidden="true"
                  >
                    <CheckIcon size={11} strokeWidth={3.2} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Tangible plan preview: the 12-month sequence at a glance ── */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[24px] border border-line-faint bg-white/80 p-7 shadow-card backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {t('pages:growthPlan.system.eyebrow')}
                </span>
                <span className="font-mono text-[11px] font-bold text-cta">12 MO</span>
              </div>

              <ol className="mt-6 flex flex-col gap-3">
                {PHASES.map((p) => {
                  const dot = PHASE_DOT[p.tone] ?? PHASE_DOT.heading;
                  return (
                    <li
                      key={p.n}
                      className="group flex items-center gap-4 rounded-[14px] border border-line-faint bg-bg-alt px-4 py-3.5 transition-colors hover:border-heading/15"
                    >
                      <span
                        className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 bg-white font-mono text-[13px] font-bold"
                        style={{ borderColor: dot, color: dot }}
                      >
                        {p.n}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[15px] font-bold leading-tight text-heading">
                          {t(`pages:growthPlan.system.phases.${p.key}.name`)}
                        </div>
                        <div className="font-mono text-[11px] tracking-[0.06em] text-muted">
                          {t(`pages:growthPlan.system.phases.${p.key}.window`)}
                        </div>
                      </div>
                      <span
                        className="ml-auto h-2 w-2 shrink-0 rounded-full"
                        style={{ background: dot }}
                        aria-hidden="true"
                      />
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
                <div
                  className="h-full rounded-full"
                  style={{ width: '100%', backgroundImage: 'linear-gradient(90deg, #5A8F5A, #B38B6D, #576DB5)' }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
