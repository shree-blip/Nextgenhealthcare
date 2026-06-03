import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@/components/icons';

interface PrincipleItem {
  title: string;
  body: string;
}

const Principles = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:growthPlan.principles.items', { returnObjects: true }) as PrincipleItem[];

  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 mb-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.principles.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1] max-w-[20ch]">
              {t('pages:growthPlan.principles.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-body text-[15px] leading-[1.7] max-w-[44ch]">
              {t('pages:growthPlan.principles.lede')}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9">
          {items.map((it) => (
            <div key={it.title} className="flex gap-4">
              <span
                className="inline-grid place-items-center w-7 h-7 rounded-full shrink-0 mt-0.5"
                style={{ background: 'rgba(87, 109, 181, 0.12)', color: '#576DB5' }}
                aria-hidden="true"
              >
                <CheckIcon size={14} strokeWidth={3} />
              </span>
              <div>
                <h3 className="text-heading text-[16px] font-bold tracking-[-0.012em] leading-[1.3]">
                  {it.title}
                </h3>
                <p className="mt-2 text-body text-[14px] leading-[1.6]">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Principles;
