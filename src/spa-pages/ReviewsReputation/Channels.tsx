import { useTranslation } from 'react-i18next';
import channelsVisual from '../../assets/nextgen-image/Ouradvantageimg1.png';
import SectionHeader from './SectionHeader';
import { CHANNELS } from './data';

const Channels = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <SectionHeader
          no={t('pages:reviewsReputation.channelsSection.no')}
          eyebrow={t('pages:reviewsReputation.channelsSection.eyebrow')}
          title={<>{t('pages:reviewsReputation.channelsSection.title')}</>}
          kicker={t('pages:reviewsReputation.channelsSection.kicker')}
        />

        {/* Wide feature image — sets the visual context for the channel grid */}
        <div className="mb-8 lg:mb-12 relative rounded-[20px] overflow-hidden border border-line-faint bg-bg-soft aspect-[21/9] shadow-[0_24px_56px_-32px_rgba(45,55,72,0.24)]">
          <img
            src={channelsVisual}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(26, 36, 56, 0.55) 0%, rgba(26, 36, 56, 0.05) 55%, rgba(26, 36, 56, 0) 100%)',
            }}
          />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 max-w-[40ch] text-white">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase font-bold text-white/85">
              {t('pages:reviewsReputation.channelsSection.featureTag')}
            </span>
            <h3 className="mt-2 text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.022em] leading-[1.1]">
              {t('pages:reviewsReputation.channelsSection.featureTitle')}
            </h3>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {CHANNELS.map((c, i) => (
            <article
              key={c.key}
              className="group relative bg-white border border-line-faint rounded-[20px] overflow-hidden p-7 sm:p-9 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_48px_-24px_rgba(45,55,72,0.22)]"
            >
              {/* Top accent strip in the channel's tone */}
              <span
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: c.tone.hex }}
                aria-hidden="true"
              />

              <div className="flex items-start justify-between">
                <span className="font-mono text-[12px] text-muted tracking-[0.18em] font-bold">
                  0{i + 1}.
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] uppercase tracking-[0.18em] font-bold"
                  style={{ background: c.tone.soft, color: c.tone.hex }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: c.tone.hex }}
                    aria-hidden="true"
                  />
                  {t(`pages:reviewsReputation.channelsSection.items.${c.key}.focus`)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className="inline-grid place-items-center w-14 h-14 rounded-[14px] shrink-0"
                  style={{ background: c.tone.soft, color: c.tone.hex }}
                  aria-hidden="true"
                >
                  <span className="w-7 h-7 block">{c.icon}</span>
                </span>
                <h3 className="text-heading text-[32px] font-extrabold tracking-[-0.024em] leading-none">
                  {t(`pages:reviewsReputation.channelsSection.items.${c.key}.name`)}
                </h3>
              </div>

              <p className="text-body text-[15px] leading-[1.65]">
                {t(`pages:reviewsReputation.channelsSection.items.${c.key}.d`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Channels;
