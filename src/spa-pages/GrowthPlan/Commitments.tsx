import { useTranslation } from 'react-i18next';

interface Commitment {
  metric: string;
  delta: string;
  by: string;
  detail: string;
}

const Commitments = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:growthPlan.commitments.items', { returnObjects: true }) as Commitment[];
  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 mb-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.commitments.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1]">
              {t('pages:growthPlan.commitments.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted text-[13px] leading-[1.65] max-w-[44ch]">
              {t('pages:growthPlan.commitments.lede')}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-[1px] bg-heading">
          {items.map((c, i) => (
            <div key={c.metric} className="bg-bg p-8 flex flex-col gap-5">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-line tracking-[0.2em]">0{i + 1}</span>
                <span className="font-mono text-[11px] text-muted tracking-[0.16em]">{c.by}</span>
              </div>
              <div className="text-cta font-extrabold text-[64px] leading-none tracking-[-0.04em] tabular-nums">
                {c.delta}
              </div>
              <h3 className="text-heading text-[18px] font-bold leading-[1.2] tracking-[-0.012em]">
                {c.metric}
              </h3>
              <p className="text-body text-[13.5px] leading-[1.6] mt-auto">{c.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Commitments;
