import { useTranslation } from 'react-i18next';
import loopVisual from '../../assets/nextgen-image/Analytics&report.png';
import SectionHeader from './SectionHeader';
import { FLOW } from './data';

const Flow = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:reviewsReputation.flow.no')}
          eyebrow={t('pages:reviewsReputation.flow.eyebrow')}
          title={
            <>
              {t('pages:reviewsReputation.flow.titleDetect')} <span className="text-line">→</span>{' '}
              {t('pages:reviewsReputation.flow.titleSort')} <span className="text-line">→</span>{' '}
              {t('pages:reviewsReputation.flow.titleRespond')} <span className="text-line">→</span>{' '}
              {t('pages:reviewsReputation.flow.titleReport')}{' '}
              {t('pages:reviewsReputation.flow.titleSuffix')}
            </>
          }
          kicker={t('pages:reviewsReputation.flow.kicker')}
        />

        {/* Flow cards on soft gradient panel with connecting line */}
        <div
          className="relative rounded-[24px] p-6 sm:p-10 lg:p-14"
          style={{
            background: 'linear-gradient(90deg, #DDD9E5 0%, #DDE3DC 50%, #EFE7CD 100%)',
          }}
        >
          {/* Feature visual — system at work, set inside the gradient panel */}
          <div className="relative mb-8 lg:mb-12 grid lg:grid-cols-[2fr_3fr] gap-6 lg:gap-10 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm font-mono text-[11px] tracking-[0.18em] uppercase text-line font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
                {t('pages:reviewsReputation.flow.featureTag')}
              </span>
              <h3 className="mt-4 text-heading text-[clamp(22px,2.4vw,32px)] font-extrabold tracking-[-0.022em] leading-[1.08]">
                {t('pages:reviewsReputation.flow.featureTitle')}
              </h3>
              <p className="mt-3 text-body text-[14.5px] leading-[1.6] max-w-[44ch]">
                {t('pages:reviewsReputation.flow.featureBody')}
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-[18px] overflow-hidden border border-white/60 bg-white shadow-[0_28px_60px_-32px_rgba(45,55,72,0.30)]">
                <img
                  src={loopVisual}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Decorative dashed connecting curve (desktop) */}
          <svg
            className="hidden lg:block absolute left-0 right-0 bottom-[200px] w-full h-[40px] pointer-events-none"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 80 20 C 280 -10, 380 50, 580 20 S 880 -10, 1120 20"
              fill="none"
              stroke="url(#fline)"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <defs>
              <linearGradient id="fline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5A8F5A" />
                <stop offset="33%" stopColor="#B38B6D" />
                <stop offset="66%" stopColor="#576DB5" />
                <stop offset="100%" stopColor="#2D3748" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {FLOW.map((f) => (
              <article
                key={f.n}
                className="group bg-white border border-line-faint rounded-[18px] p-6 sm:p-7 flex flex-col gap-5 shadow-[0_18px_38px_-28px_rgba(45,55,72,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_48px_-26px_rgba(45,55,72,0.28)]"
              >
                <div className="flex items-start justify-between">
                  <span
                    className="inline-grid place-items-center w-12 h-12 rounded-full font-mono text-[15px] font-bold border-2 bg-white"
                    style={{ borderColor: f.tone.hex, color: f.tone.hex }}
                  >
                    {f.n}
                  </span>
                  <span
                    className="inline-grid place-items-center w-12 h-12 rounded-[12px] shrink-0"
                    style={{ background: f.tone.soft, color: f.tone.hex }}
                    aria-hidden="true"
                  >
                    <span className="w-6 h-6 block">{f.icon}</span>
                  </span>
                </div>
                <h3 className="text-heading text-[26px] font-extrabold tracking-[-0.022em] leading-[1.05]">
                  {t(`pages:reviewsReputation.flow.steps.${f.key}.k`)}
                  <span style={{ color: f.tone.hex }}>.</span>
                </h3>
                <p className="text-body text-[14px] leading-[1.6]">
                  {t(`pages:reviewsReputation.flow.steps.${f.key}.d`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flow;
