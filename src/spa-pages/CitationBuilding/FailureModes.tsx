import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { COLORS, FAILURE_MODES } from './data';

const FailureModes = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t" style={{ borderColor: 'rgba(26, 36, 56, 0.08)' }}>
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:citationBuilding.failureModes.no')}
          eyebrow={t('pages:citationBuilding.failureModes.eyebrow')}
          title={<>{t('pages:citationBuilding.failureModes.title')}</>}
          kicker={t('pages:citationBuilding.failureModes.kicker')}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FAILURE_MODES.map((f) => (
            <article
              key={f.n}
              className="bg-white rounded-[20px] p-7 sm:p-8 border flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(45,55,72,0.22)]"
              style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-[12px] tracking-[0.18em] font-bold"
                  style={{ color: COLORS.muted }}
                >
                  {f.n}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] uppercase tracking-[0.16em] font-bold"
                  style={{ background: f.badgeBg, color: f.badgeColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.badgeColor }} />
                  {t(`pages:citationBuilding.failureModes.items.${f.key}.badge`)}
                </span>
              </div>
              <h3
                className="text-[24px] font-extrabold tracking-[-0.02em] leading-[1.1]"
                style={{ color: COLORS.navy }}
              >
                {t(`pages:citationBuilding.failureModes.items.${f.key}.title`)}
              </h3>
              <p className="text-[14.5px] leading-[1.65]" style={{ color: COLORS.body }}>
                {t(`pages:citationBuilding.failureModes.items.${f.key}.body`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FailureModes;
