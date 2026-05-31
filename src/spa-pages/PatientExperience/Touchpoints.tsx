import { useTranslation } from 'react-i18next';
import Section from '@/components/editorial/Section';
import { TOUCHPOINTS, STAGE_ICON } from './data';

const Touchpoints = () => {
  const { t } = useTranslation('pages');
  return (
    <Section
      no={t('pages:patientExperience.touchpoints.no')}
      title={t('pages:patientExperience.touchpoints.title')}
      kicker={t('pages:patientExperience.touchpoints.kicker')}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-[1px] bg-line-faint border border-line-faint">
        {TOUCHPOINTS.map((tp, i) => {
          const Icon = STAGE_ICON[tp.key];
          const list = t(`pages:patientExperience.touchpoints.items.${tp.key}.list`, {
            returnObjects: true,
          }) as string[];
          return (
            <div key={tp.key} className="bg-bg p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-line tracking-[0.18em]">0{i + 1}.</span>
                <span className="h-8 w-8 rounded-full border border-line-faint flex items-center justify-center text-line">
                  <Icon />
                </span>
              </div>
              <h4 className="text-heading text-[18px] font-bold tracking-[-0.015em]">
                {t(`pages:patientExperience.touchpoints.items.${tp.key}.tag`)}
              </h4>
              <ul className="space-y-2 text-[13px] text-body mt-auto">
                {list.map((l) => (
                  <li key={l} className="flex gap-2 items-baseline">
                    <span className="text-line">-</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Touchpoints;
