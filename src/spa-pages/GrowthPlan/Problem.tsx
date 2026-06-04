import { useTranslation } from 'react-i18next';
import { Eyebrow, GradientText } from './parts';

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
        <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow color="#B38B6D">{t('pages:growthPlan.problem.eyebrow')}</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
              {t('pages:growthPlan.problem.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
              {t('pages:growthPlan.problem.lede')}
            </p>
          </div>
        </div>

        {/* Three failures — stacked rows, each with a big index and a tan rail */}
        <div className="overflow-hidden rounded-[20px] border border-line-faint bg-white">
          {items.map((it, i) => (
            <article
              key={it.n}
              className={`grid grid-cols-[auto,1fr] items-start gap-x-6 gap-y-2 p-7 sm:grid-cols-[88px,1fr] sm:gap-x-10 sm:p-9 ${
                i > 0 ? 'border-t border-line-faint' : ''
              }`}
            >
              <span className="font-mono text-[44px] font-extrabold leading-none tracking-[-0.02em] text-line/35 tabular-nums sm:text-[56px]">
                {it.n}
              </span>
              <div className="sm:flex sm:items-baseline sm:gap-10">
                <h3 className="text-[20px] font-bold leading-[1.2] tracking-[-0.012em] text-heading sm:w-[34%] sm:shrink-0">
                  {it.title}
                </h3>
                <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.7] text-body sm:mt-0">
                  {it.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bridge — a single full-width statement with a gradient hairline */}
        <div className="relative mt-10 overflow-hidden rounded-[20px] border border-line-faint bg-white p-8 sm:p-10">
          <span
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundImage: 'linear-gradient(90deg, #5A8F5A, #B38B6D, #576DB5)' }}
            aria-hidden="true"
          />
          <p className="max-w-[68ch] text-[clamp(18px,1.8vw,23px)] font-semibold leading-[1.45] tracking-[-0.012em] text-heading">
            <GradientText>{t('pages:growthPlan.problem.bridge')}</GradientText>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
