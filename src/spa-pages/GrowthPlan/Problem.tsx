import { useTranslation } from 'react-i18next';

interface ProblemItem {
  n: string;
  title: string;
  body: string;
}

const Problem = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:growthPlan.problem.items', { returnObjects: true }) as ProblemItem[];

  return (
    <section className="border-t border-line-faint bg-bg-alt">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 mb-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.problem.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1]">
              {t('pages:growthPlan.problem.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-body text-[15px] leading-[1.7] max-w-[44ch]">
              {t('pages:growthPlan.problem.lede')}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {items.map((it) => (
            <article
              key={it.n}
              className="relative bg-white border border-line-faint rounded-[16px] p-7 flex flex-col gap-4"
            >
              <span className="font-mono text-[40px] font-extrabold leading-none text-heading/10 tabular-nums">
                {it.n}
              </span>
              <h3 className="text-heading text-[19px] font-bold tracking-[-0.012em] leading-[1.2]">
                {it.title}
              </h3>
              <p className="text-body text-[14px] leading-[1.65]">{it.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-heading text-[clamp(17px,1.7vw,21px)] font-semibold leading-[1.5] max-w-[68ch] tracking-[-0.012em]">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #B38B6D 0%, #8FBC8F 50%, #576DB5 100%)',
            }}
          >
            {t('pages:growthPlan.problem.bridge')}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Problem;
