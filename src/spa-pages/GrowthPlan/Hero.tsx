import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';

const Hero = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:growthPlan.breadcrumb.current')} />
        <div className="mt-8 grid lg:grid-cols-12 gap-x-16 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.hero.eyebrow')}
            </div>
            <h1 className="mt-7 text-heading font-extrabold leading-[1.02] tracking-[-0.036em] text-[clamp(40px,5.6vw,76px)] max-w-[18ch]">
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
          </div>
          <div className="lg:col-span-5">
            <p className="text-body text-[17px] leading-[1.7] max-w-[52ch]">
              {t('pages:growthPlan.hero.lede')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
