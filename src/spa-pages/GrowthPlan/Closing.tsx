import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import closingImg from '@/assets/nextgen-image/Freegrowthauditimg.png';

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div
          className="rounded-[28px] overflow-hidden grid lg:grid-cols-2 items-stretch"
          style={{ backgroundColor: '#B4DBC3' }}
        >
          {/* Left half - image */}
          <div className="relative min-h-[320px] lg:min-h-[480px]">
            <img
              src={closingImg}
              alt={t('pages:growthPlan.closing.imgAlt')}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Right half - content */}
          <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
            <div className="font-mono text-[12px] tracking-[0.24em] uppercase text-heading/60">
              {t('pages:growthPlan.closing.eyebrow')}
            </div>
            <h2 className="mt-5 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.026em] max-w-[18ch] text-heading">
              {t('pages:growthPlan.closing.title')}
            </h2>
            <p className="mt-6 text-heading/75 text-[15.5px] leading-[1.65] max-w-[44ch]">
              {t('pages:growthPlan.closing.body')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link to="/contact" className="btn-primary">
                {t('pages:growthPlan.closing.ctaPrimary')}
              </Link>
              <Link
                to="/case-studies"
                className="text-heading/80 text-[14px] font-medium underline-offset-4 hover:underline"
              >
                {t('pages:growthPlan.closing.ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
