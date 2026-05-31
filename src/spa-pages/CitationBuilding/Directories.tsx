import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { COLORS, TIERS } from './data';

const Directories = () => {
  const { t } = useTranslation('pages');
  return (
    <section
      className="border-t"
      style={{ borderColor: 'rgba(26, 36, 56, 0.08)', background: '#FAFAF8' }}
    >
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:citationBuilding.directories.no')}
          eyebrow={t('pages:citationBuilding.directories.eyebrow')}
          title={<>{t('pages:citationBuilding.directories.title')}</>}
          kicker={t('pages:citationBuilding.directories.kicker')}
        />

        <div className="space-y-6 lg:space-y-7">
          {TIERS.map((tier) => (
            <article
              key={tier.num}
              className="bg-white rounded-[24px] border overflow-hidden grid lg:grid-cols-[280px_1fr]"
              style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
            >
              <div
                className="p-7 lg:p-8 border-b lg:border-b-0 lg:border-r flex flex-col gap-4 justify-between"
                style={{ background: COLORS.mint, borderColor: 'rgba(26, 36, 56, 0.10)' }}
              >
                <div>
                  <div
                    className="font-mono text-[11.5px] tracking-[0.22em] uppercase font-bold"
                    style={{ color: COLORS.sage }}
                  >
                    {t('pages:citationBuilding.directories.tierLabel')} {tier.num}
                  </div>
                  <h3
                    className="mt-2 text-[28px] font-extrabold tracking-[-0.022em] leading-none"
                    style={{ color: COLORS.navy }}
                  >
                    {t(`pages:citationBuilding.directories.tiers.${tier.key}.label`)}
                  </h3>
                </div>
                <p className="text-[13.5px] leading-[1.55]" style={{ color: COLORS.body }}>
                  {t(`pages:citationBuilding.directories.tiers.${tier.key}.tagline`)}
                </p>
                <div
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: COLORS.sage }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.sage }} />
                  {tier.entryKeys.length}{' '}
                  {tier.entryKeys.length === 1
                    ? t('pages:citationBuilding.directories.directoryLabelOne')
                    : t('pages:citationBuilding.directories.directoryLabelMany')}
                </div>
              </div>
              <div className="p-2 sm:p-3 grid sm:grid-cols-3 gap-2">
                {tier.entryKeys.map((eKey) => (
                  <div
                    key={eKey}
                    className="p-5 rounded-[16px] flex flex-col gap-3"
                    style={{ background: '#F8F9FA' }}
                  >
                    <h4
                      className="text-[16px] font-bold tracking-[-0.012em] leading-[1.2]"
                      style={{ color: COLORS.navy }}
                    >
                      {t(`pages:citationBuilding.directories.tiers.${tier.key}.entries.${eKey}.name`)}
                    </h4>
                    <p className="text-[13px] leading-[1.55]" style={{ color: COLORS.body }}>
                      {t(`pages:citationBuilding.directories.tiers.${tier.key}.entries.${eKey}.note`)}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directories;
