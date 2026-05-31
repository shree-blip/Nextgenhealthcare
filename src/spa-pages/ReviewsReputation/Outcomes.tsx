import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { OUTCOMES } from './data';

const Outcomes = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:reviewsReputation.outcomesSection.no')}
          eyebrow={t('pages:reviewsReputation.outcomesSection.eyebrow')}
          title={<>{t('pages:reviewsReputation.outcomesSection.title')}</>}
          kicker={t('pages:reviewsReputation.outcomesSection.kicker')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OUTCOMES.map((o, i) => (
            <article
              key={o.key}
              className="bg-white border border-line-faint rounded-[18px] p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-line"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-line font-bold">
                0{i + 1}
              </span>
              <div className="text-heading font-extrabold text-[clamp(40px,4.8vw,60px)] leading-[0.95] tracking-[-0.035em] tabular-nums">
                {t(`pages:reviewsReputation.outcomesSection.items.${o.key}.v`)}
              </div>
              <div className="text-[11px] uppercase tracking-[0.20em] text-muted font-bold">
                {t(`pages:reviewsReputation.outcomesSection.items.${o.key}.k`)}
              </div>
              <p className="text-body text-[13.5px] leading-[1.6] max-w-[30ch]">
                {t(`pages:reviewsReputation.outcomesSection.items.${o.key}.d`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
