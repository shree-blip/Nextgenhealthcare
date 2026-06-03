import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowIcon, CheckIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const reassure = t('pages:growthPlan.hero.reassure', { returnObjects: true }) as string[];

  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:growthPlan.breadcrumb.current')} />
        <div className="mt-8 grid lg:grid-cols-12 gap-x-16 gap-y-10 items-end">
          <div className="lg:col-span-7">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.hero.eyebrow')}
            </div>
            <h1 className="mt-7 text-heading font-extrabold leading-[1.02] tracking-[-0.036em] text-[clamp(40px,5.6vw,76px)] max-w-[16ch]">
              {t('pages:growthPlan.hero.titleLine1')}{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #B38B6D 0%, #8FBC8F 50%, #576DB5 100%)',
                }}
              >
                {t('pages:growthPlan.hero.titleAccent')}
              </span>
              {t('pages:growthPlan.hero.titleSuffix')}
            </h1>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/free-growth-audit" className="btn-primary text-[15px] px-6 py-3.5">
                {t('pages:growthPlan.hero.ctaPrimary')}
                <ArrowIcon size={16} />
              </Link>
              <a
                href="#gp-system"
                className="inline-flex items-center gap-2 text-heading text-[14px] font-semibold underline-offset-4 hover:underline"
              >
                {t('pages:growthPlan.hero.ctaSecondary')}
                <ArrowIcon size={14} className="rotate-90" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-body text-[17px] leading-[1.7] max-w-[52ch]">
              {t('pages:growthPlan.hero.lede')}
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {reassure.map((r) => (
                <li key={r} className="flex items-center gap-3 text-heading text-[14px] font-medium">
                  <span
                    className="inline-grid place-items-center w-5 h-5 rounded-full shrink-0"
                    style={{ background: 'rgba(143, 188, 143, 0.18)', color: '#5A8F5A' }}
                    aria-hidden="true"
                  >
                    <CheckIcon size={11} strokeWidth={3.2} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
