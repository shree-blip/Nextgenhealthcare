import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { CHANNELS } from './data';

/* ---------- CHANNELS ---------- */
const Channels = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(64px,8.5vw,120px)]">
        {/* Header on top — eyebrow + big H2 on the left, kicker on the right */}
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-line font-mono text-[12px] tracking-[0.22em] uppercase mb-5">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-accent-soft" />
              {t('pages:healthcareGrowthEngine.channels.eyebrow')}
            </div>
            <h2 className="text-heading font-extrabold tracking-[-0.03em] leading-[1.04] text-[clamp(36px,4.6vw,68px)]">
              {t('pages:healthcareGrowthEngine.channels.titleLine1')}
              <br />
              {t('pages:healthcareGrowthEngine.channels.titleLine2')}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-20">
            <p className="text-body text-[15px] leading-[1.65] max-w-[44ch]">
              {t('pages:healthcareGrowthEngine.channels.kicker')}
            </p>
          </div>
        </div>

        {/* Three cards in a row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CHANNELS.map((c) => {
            const title = t(`pages:healthcareGrowthEngine.channels.items.${c.key}.title`);
            const bullets = t(`pages:healthcareGrowthEngine.channels.items.${c.key}.bullets`, {
              returnObjects: true,
            }) as string[];
            return (
              <Link
                to={c.href}
                key={c.n}
                aria-label={`${title} ${t('pages:healthcareGrowthEngine.channels.ariaLearnMoreSuffix')}`}
                className="group bg-bg border border-line-faint rounded-[24px] p-4 flex flex-col transition-all duration-300 hover:border-line hover:shadow-[0_28px_56px_-28px_rgba(10,20,38,0.28)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-line"
              >
                <div className="relative aspect-square overflow-hidden rounded-[18px] bg-bg-soft">
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-line text-white text-[11px] uppercase tracking-[0.18em] font-bold">
                    {t(`pages:healthcareGrowthEngine.channels.items.${c.key}.tag`)}
                  </div>
                </div>
                <div className="px-2 pt-5 pb-2 flex flex-col gap-3 flex-1">
                  <h3 className="text-heading text-[22px] sm:text-[24px] font-extrabold leading-[1.15] tracking-[-0.022em]">
                    {title}
                  </h3>
                  <p className="text-body text-[14.5px] leading-[1.55]">
                    {t(`pages:healthcareGrowthEngine.channels.items.${c.key}.body`)}
                  </p>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-3 pt-1">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-heading text-[12.5px] font-semibold tracking-[-0.005em]"
                      >
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-line shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 text-line text-[14px] font-semibold tracking-[-0.005em] transition-all duration-300 group-hover:gap-3 border-t border-line-faint">
                    <span className="pt-3">{t('pages:healthcareGrowthEngine.channels.learnMore')}</span>
                    <ArrowIcon className="mt-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Channels;
