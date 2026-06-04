import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import closingImg from '@/assets/nextgen-image/Freegrowthauditimg.png';

const Closing = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid items-stretch overflow-hidden rounded-[28px] border border-heading/10 bg-heading lg:grid-cols-2">
          {/* Left — content over a dark, ambient panel */}
          <div
            className="relative flex flex-col justify-center p-10 sm:p-14 lg:p-16"
            style={{
              background:
                'radial-gradient(900px 460px at 100% 0%, rgba(87,109,181,0.30), transparent 60%), radial-gradient(640px 420px at 0% 120%, rgba(143,188,143,0.16), transparent 60%), #2D3748',
            }}
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.24em] text-white/55">
              {t('pages:growthPlan.closing.eyebrow')}
            </div>
            <h2 className="mt-5 max-w-[18ch] text-[clamp(28px,3.4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.026em] text-white">
              {t('pages:growthPlan.closing.title')}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15.5px] leading-[1.65] text-white/70">
              {t('pages:growthPlan.closing.body')}
            </p>
            <div className="mt-9">
              <Link
                to="/free-growth-audit"
                className="group inline-flex items-center gap-2.5 rounded-[12px] bg-cta px-6 py-3.5 text-[15px] font-bold text-white shadow-cta transition hover:bg-cta-hover hover:-translate-y-px"
              >
                {t('pages:growthPlan.closing.ctaPrimary')}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon size={16} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right — supporting image */}
          <div className="relative min-h-[300px] lg:min-h-[480px]">
            <img
              src={closingImg}
              alt={t('pages:growthPlan.closing.imgAlt')}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, rgba(45,55,72,0.35), transparent 35%)' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
