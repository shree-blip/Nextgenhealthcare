import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { COLORS, SHIFTS } from './data';

const Shifts = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t" style={{ borderColor: 'rgba(26, 36, 56, 0.08)' }}>
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:aeoSchema.shifts.no')}
          eyebrow={t('pages:aeoSchema.shifts.eyebrow')}
          title={<>{t('pages:aeoSchema.shifts.title')}</>}
          kicker={t('pages:aeoSchema.shifts.kicker')}
        />

        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {SHIFTS.map((s) => (
            <article
              key={s.key}
              className="bg-white rounded-[22px] border p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(45,55,72,0.22)]"
              style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-mono text-[28px] font-extrabold leading-none tracking-[-0.02em]"
                  style={{ color: COLORS.cta, opacity: 0.32 }}
                >
                  {t(`pages:aeoSchema.shifts.items.${s.key}.n`)}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10.5px] uppercase tracking-[0.18em] font-bold"
                  style={{ background: COLORS.ctaSoft, color: COLORS.cta }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.cta }} />
                  {t('pages:aeoSchema.shifts.shiftBadge')}
                </span>
              </div>
              <h3
                className="text-[22px] font-extrabold tracking-[-0.018em] leading-[1.18]"
                style={{ color: COLORS.navy }}
              >
                {t(`pages:aeoSchema.shifts.items.${s.key}.headline`)}
              </h3>
              <p className="text-[14.5px] leading-[1.65]" style={{ color: COLORS.body }}>
                {t(`pages:aeoSchema.shifts.items.${s.key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shifts;
