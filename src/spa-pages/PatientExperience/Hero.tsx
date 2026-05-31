import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { HEAD_META_KEYS, JOURNEY, STAGE_ICON } from './data';

const Hero = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:patientExperience.breadcrumb.current')} />
        <div className="mt-6 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-line font-mono text-[12px] tracking-[0.22em] uppercase">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-accent-soft" />
              {t('pages:patientExperience.hero.eyebrow')}
            </div>
            <h1 className="mt-6 text-heading font-extrabold leading-[0.98] tracking-[-0.038em] text-[clamp(44px,6.4vw,86px)]">
              {t('pages:patientExperience.hero.titleLine1')}
              <br />
              <span className="text-line italic">{t('pages:patientExperience.hero.titleAccent')}</span>.
            </h1>
            <p className="mt-7 text-body text-[17px] leading-[1.65] max-w-[58ch]">
              {t('pages:patientExperience.hero.lede')}
            </p>

            {/* Inline 5-stage primer — gives the visual story before they scroll */}
            <div className="mt-10 flex items-center gap-2 sm:gap-4 max-w-[560px]" aria-hidden="true">
              {JOURNEY.map((j, i) => {
                const Icon = STAGE_ICON[j.key];
                return (
                  <div key={j.key} className="flex items-center flex-1 last:flex-initial">
                    <div className="flex flex-col items-center gap-2 group">
                      <div className="h-9 w-9 rounded-full border border-line-faint bg-bg flex items-center justify-center text-line transition-colors group-hover:border-heading group-hover:text-heading">
                        <Icon />
                      </div>
                      <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
                        {t(`pages:patientExperience.journey.stages.${j.key}.stage`)}
                      </span>
                    </div>
                    {i < JOURNEY.length - 1 && (
                      <span className="flex-1 h-px bg-line-faint mx-2 sm:mx-3" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border-t-2 border-heading">
              {HEAD_META_KEYS.map((key) => (
                <div
                  key={key}
                  className="grid grid-cols-2 py-3 border-b border-line-faint text-[14px]"
                >
                  <span className="text-muted font-medium">
                    {t(`pages:patientExperience.headMeta.${key}.label`)}
                  </span>
                  <span className="text-heading font-semibold text-right">
                    {t(`pages:patientExperience.headMeta.${key}.value`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
