import { useTranslation } from 'react-i18next';
import Section from '@/components/editorial/Section';
import { Reveal } from '@/lib/motion';
import { JOURNEY, STAGE_ICON } from './data';

const Journey = () => {
  const { t } = useTranslation('pages');
  return (
    <Section
      no={t('pages:patientExperience.journey.no')}
      title={t('pages:patientExperience.journey.title')}
      kicker={t('pages:patientExperience.journey.kicker')}
    >
      {/* Desktop / tablet: horizontal connected diagram */}
      <div className="hidden md:block">
        <Reveal variant="up">
          <div className="relative border-t-2 border-heading pt-12 pb-6">
            {/* dotted connector line behind the stops */}
            <div className="absolute left-0 right-0 top-[88px] h-px border-t border-dashed border-line-faint pointer-events-none" />
            <ol className="relative grid grid-cols-5 gap-4">
              {JOURNEY.map((j) => {
                const Icon = STAGE_ICON[j.key];
                return (
                  <li key={j.key} className="flex flex-col items-center text-center group">
                    <span className="font-mono text-[12px] text-muted tracking-[0.18em]">{j.n}</span>
                    <div className="mt-3 h-14 w-14 rounded-full bg-bg border-2 border-heading flex items-center justify-center text-heading transition-transform group-hover:scale-105">
                      <Icon />
                    </div>
                    <h3 className="mt-5 text-heading text-[22px] font-extrabold tracking-[-0.018em] leading-[1.1]">
                      {t(`pages:patientExperience.journey.stages.${j.key}.stage`)}
                    </h3>
                    <div className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-muted font-semibold">
                      {t(`pages:patientExperience.journey.stages.${j.key}.moment`)}
                    </div>
                    {/* risk indicator */}
                    <div className="mt-4 w-full max-w-[140px]">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">
                        <span>{t('pages:patientExperience.journey.dropOffLabel')}</span>
                        <span className="text-heading tabular-nums">{j.risk}%</span>
                      </div>
                      <div className="mt-1.5 h-[3px] bg-line-faint rounded-full overflow-hidden">
                        <div className="h-full bg-cta" style={{ width: `${j.risk * 2.4}%` }} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        {/* descriptions below — same order, indexed visually */}
        <div className="mt-10 grid grid-cols-5 gap-4">
          {JOURNEY.map((j) => (
            <p key={j.key} className="text-body text-[13px] leading-[1.55]">
              {t(`pages:patientExperience.journey.stages.${j.key}.note`)}
            </p>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack with connector */}
      <div className="md:hidden border-t-2 border-heading">
        {JOURNEY.map((j, i) => {
          const Icon = STAGE_ICON[j.key];
          return (
            <div key={j.key} className="relative py-6 border-b border-line-faint">
              {i < JOURNEY.length - 1 && (
                <span className="absolute left-[27px] top-[60px] bottom-0 w-px border-l border-dashed border-line-faint" />
              )}
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-bg border-2 border-heading flex items-center justify-center text-heading shrink-0">
                  <Icon />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] text-muted tracking-[0.18em]">{j.n}</span>
                    <h3 className="text-heading text-[22px] font-extrabold tracking-[-0.018em] leading-none">
                      {t(`pages:patientExperience.journey.stages.${j.key}.stage`)}
                    </h3>
                  </div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-muted font-semibold">
                    {t(`pages:patientExperience.journey.stages.${j.key}.moment`)}
                  </div>
                  <p className="mt-3 text-body text-[14.5px] leading-[1.55]">
                    {t(`pages:patientExperience.journey.stages.${j.key}.note`)}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-muted font-semibold">
                      <span>{t('pages:patientExperience.journey.dropOffLabel')}</span>
                      <span className="text-heading tabular-nums">{j.risk}%</span>
                    </div>
                    <div className="mt-1.5 h-[3px] bg-line-faint rounded-full overflow-hidden">
                      <div className="h-full bg-cta" style={{ width: `${j.risk * 2.4}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Journey;
