import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { HEAD_META_KEYS } from './data';

const Hero = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:reviewsReputation.breadcrumb.current')} />
        <div className="mt-6 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-line font-mono text-[12px] tracking-[0.22em] uppercase">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-accent-soft" />
              {t('pages:reviewsReputation.hero.eyebrow')}
            </div>
            <h1 className="mt-6 text-heading font-extrabold leading-[0.98] tracking-[-0.038em] text-[clamp(44px,6.4vw,86px)]">
              {t('pages:reviewsReputation.hero.titleLine1')}
              <br />
              <span className="text-line">{t('pages:reviewsReputation.hero.titleAccent')}</span>
              {t('pages:reviewsReputation.hero.titleSuffix')}
            </h1>
            <p className="mt-7 text-body text-[17px] leading-[1.65] max-w-[58ch]">
              {t('pages:reviewsReputation.hero.lede')}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border-t-2 border-heading">
              {HEAD_META_KEYS.map((key) => (
                <div
                  key={key}
                  className="grid grid-cols-2 py-3 border-b border-line-faint text-[13px]"
                >
                  <span className="text-muted font-medium">
                    {t(`pages:reviewsReputation.headMeta.${key}.label`)}
                  </span>
                  <span className="text-heading font-semibold text-right">
                    {t(`pages:reviewsReputation.headMeta.${key}.value`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
