import { useTranslation } from 'react-i18next';
import { Eyebrow } from './parts';

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
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="mb-12 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow color="#576DB5">{t('pages:growthPlan.commitments.eyebrow')}</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
              {t('pages:growthPlan.commitments.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[13px] leading-[1.65] text-muted">
              {t('pages:growthPlan.commitments.lede')}
            </p>
          </div>
        </div>

        {/* Dark scorecard panel — three numbers we put in writing */}
        <div
          className="relative overflow-hidden rounded-[24px] p-8 sm:p-12"
          style={{
            background:
              'radial-gradient(1100px 520px at 85% -10%, rgba(87,109,181,0.30), transparent 60%), radial-gradient(700px 420px at 5% 120%, rgba(143,188,143,0.18), transparent 60%), #2D3748',
          }}
        >
          <div className="grid gap-px overflow-hidden rounded-[16px] bg-white/10 sm:grid-cols-3">
            {items.map((c, i) => (
              <div key={c.metric} className="flex flex-col gap-4 bg-heading/40 p-7 backdrop-blur-sm sm:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-white/35">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
                    {c.by}
                  </span>
                </div>
                <div
                  className="bg-clip-text text-[clamp(40px,4.4vw,60px)] font-extrabold leading-none tracking-[-0.03em] text-transparent tabular-nums"
                  style={{ backgroundImage: 'linear-gradient(90deg, #B4DBC3, #9DB4F0)' }}
                >
                  {c.delta}
                </div>
                <h3 className="text-[18px] font-bold leading-[1.2] tracking-[-0.012em] text-white">
                  {c.metric}
                </h3>
                <p className="mt-auto text-[13.5px] leading-[1.6] text-white/65">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Commitments;
