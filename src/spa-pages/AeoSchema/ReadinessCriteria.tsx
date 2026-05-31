import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { COLORS, READINESS } from './data';

const ReadinessCriteria = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t" style={{ borderColor: 'rgba(26, 36, 56, 0.08)' }}>
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:aeoSchema.readiness.no')}
          eyebrow={t('pages:aeoSchema.readiness.eyebrow')}
          title={<>{t('pages:aeoSchema.readiness.title')}</>}
          kicker={t('pages:aeoSchema.readiness.kicker')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {READINESS.map((r, i) => (
            <article
              key={r.key}
              className="relative bg-white rounded-[22px] border p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(45,55,72,0.22)]"
              style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="inline-grid place-items-center w-14 h-14 rounded-[14px]"
                  style={{ background: COLORS.ctaSoft, color: COLORS.cta }}
                >
                  <span className="w-7 h-7 block">{r.icon}</span>
                </span>
                <span
                  className="inline-grid place-items-center w-9 h-9 rounded-full border font-mono text-[12px] font-bold"
                  style={{ borderColor: COLORS.cta, color: COLORS.cta }}
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="text-[26px] font-extrabold tracking-[-0.02em] leading-[1.08]"
                style={{ color: COLORS.navy }}
              >
                {t(`pages:aeoSchema.readiness.items.${r.key}.k`)}
                <span style={{ color: COLORS.cta }}>.</span>
              </h3>
              <p className="text-[14.5px] leading-[1.6]" style={{ color: COLORS.body }}>
                {t(`pages:aeoSchema.readiness.items.${r.key}.d`)}
              </p>
              <div
                className="mt-2 pt-4 border-t inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold"
                style={{ borderColor: 'rgba(26, 36, 56, 0.08)', color: COLORS.sage }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.sage }} />
                {t('pages:aeoSchema.readiness.gateLabel')}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadinessCriteria;
