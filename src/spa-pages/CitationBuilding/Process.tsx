import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';
import { COLORS, PROCESS } from './data';

const Process = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t" style={{ borderColor: 'rgba(26, 36, 56, 0.08)' }}>
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:citationBuilding.process.no')}
          eyebrow={t('pages:citationBuilding.process.eyebrow')}
          title={<>{t('pages:citationBuilding.process.title')}</>}
          kicker={t('pages:citationBuilding.process.kicker')}
        />

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Connecting line (desktop only) */}
          <svg
            className="hidden lg:block absolute top-[88px] left-0 right-0 w-full h-[2px] pointer-events-none"
            viewBox="0 0 1200 2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="80"
              y1="1"
              x2="1120"
              y2="1"
              stroke={COLORS.sage}
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeDasharray="4 8"
            />
          </svg>

          {PROCESS.map((s, i) => (
            <article
              key={s.key}
              className="relative bg-white rounded-[20px] border p-7 flex flex-col gap-4"
              style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="inline-grid place-items-center w-14 h-14 rounded-full text-white relative z-10"
                  style={{
                    background: COLORS.sage,
                    boxShadow: '0 12px 32px -12px rgba(90, 143, 90, 0.6)',
                  }}
                >
                  <span className="w-7 h-7 block">{s.icon}</span>
                </span>
                <span
                  className="font-mono text-[13px] tracking-[0.16em] font-bold"
                  style={{ color: COLORS.sage }}
                >
                  0{i + 1}
                </span>
              </div>
              <h3
                className="text-[26px] font-extrabold tracking-[-0.02em] leading-[1.08]"
                style={{ color: COLORS.navy }}
              >
                {t(`pages:citationBuilding.process.items.${s.key}.k`)}
              </h3>
              <p className="text-[14px] leading-[1.6]" style={{ color: COLORS.body }}>
                {t(`pages:citationBuilding.process.items.${s.key}.d`)}
              </p>
              <div
                className="mt-2 pt-4 border-t inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold"
                style={{ borderColor: 'rgba(26, 36, 56, 0.08)', color: COLORS.muted }}
              >
                <span>{t('pages:citationBuilding.process.outputLabel')}</span>
                <span className="font-bold" style={{ color: COLORS.navy }}>
                  · {t(`pages:citationBuilding.process.items.${s.key}.out`)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
