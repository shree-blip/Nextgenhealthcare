import { useTranslation } from 'react-i18next';
import { PACKAGE } from './data';

/* ---------- ENGAGEMENT PACKAGE ---------- */
const Package = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(64px,8.5vw,120px)]">
        {/* Editorial hero header */}
        <div className="flex items-center gap-3 text-line font-mono text-[11px] tracking-[0.22em] uppercase mb-7">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
          {t('pages:healthcareGrowthEngine.packageSection.eyebrow')}
        </div>
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6 items-end mb-12 lg:mb-16">
          <h2 className="lg:col-span-7 text-heading font-extrabold leading-[0.96] tracking-[-0.038em] text-[clamp(36px,5.4vw,74px)]">
            {t('pages:healthcareGrowthEngine.packageSection.titleLine1')}
            <br />
            {t('pages:healthcareGrowthEngine.packageSection.titleLine2')}
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 text-body text-[15.5px] leading-[1.65] max-w-[44ch]">
            {t('pages:healthcareGrowthEngine.packageSection.kicker')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {PACKAGE.map((p, i) => {
            const items = t(`pages:healthcareGrowthEngine.packageSection.items.${p.key}.items`, {
              returnObjects: true,
            }) as string[];
            return (
              <article
                key={p.key}
                className="relative bg-bg rounded-[18px] p-7 sm:p-8 flex flex-col gap-5 border-2 border-line-faint transition-all duration-300 hover:border-line hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-line font-bold">
                    {t('pages:healthcareGrowthEngine.packageSection.phaseLabel', {
                      num: String(i + 1).padStart(2, '0'),
                    })}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted font-semibold">
                    {t(`pages:healthcareGrowthEngine.packageSection.items.${p.key}.cadence`)}
                  </span>
                </div>
                <h3 className="text-heading text-[30px] sm:text-[32px] font-extrabold tracking-[-0.024em] leading-[1.05]">
                  {t(`pages:healthcareGrowthEngine.packageSection.items.${p.key}.title`)}
                </h3>
                <span className="h-px bg-line-faint" />
                <ul className="space-y-3.5">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[15px] leading-[1.5]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 mt-1 text-line"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-semibold text-heading">{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Package;
