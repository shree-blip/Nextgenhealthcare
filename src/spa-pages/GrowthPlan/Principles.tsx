import { useTranslation } from 'react-i18next';
import { Eyebrow } from './parts';

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
        <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow color="#5A8F5A">{t('pages:growthPlan.principles.eyebrow')}</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
              {t('pages:growthPlan.principles.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
              {t('pages:growthPlan.principles.lede')}
            </p>
          </div>
        </div>

        {/* Numbered principles — clean card grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="flex gap-4 rounded-[18px] border border-line-faint bg-white p-7 transition-colors hover:border-cta/30"
            >
              <span
                className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[13px] font-bold tabular-nums"
                style={{ background: 'rgba(87, 109, 181, 0.10)', color: '#576DB5' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.012em] text-heading">
                  {it.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-body">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Principles;
