import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import imgClosing from '../../assets/nextgen-image/Clinicalimg1.png';

/* ---------- CLOSING ---------- */
const Closing = () => {
  const { t } = useTranslation('pages');
  const bullets = t('pages:healthcareGrowthEngine.closing.bullets', {
    returnObjects: true,
  }) as string[];
  return (
    <section className="border-t border-line-faint bg-bg">
      <div className="container-shell py-[clamp(64px,8.5vw,120px)]">
        {/* Bigger header on top */}
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-6 mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-line font-mono text-[13px] tracking-[0.18em]">
                {t('pages:healthcareGrowthEngine.closing.no')}
              </span>
              <span className="h-px flex-1 bg-line-soft" />
            </div>
            <h2 className="text-heading font-extrabold tracking-[-0.03em] leading-[1.04] text-[clamp(40px,5vw,72px)]">
              {t('pages:healthcareGrowthEngine.closing.title')}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <p className="text-body text-[clamp(16px,1.35vw,19px)] leading-[1.55] max-w-[44ch]">
              {t('pages:healthcareGrowthEngine.closing.kicker')}
            </p>
          </div>
        </div>

        {/* Audit panel — pastel gradient background */}
        <article
          className="rounded-[20px] overflow-hidden border border-line-faint grid md:grid-cols-[1.2fr_1fr] text-heading"
          style={{
            background:
              'linear-gradient(90deg, #DBD4EC 0%, #C6D7EF 22%, #B9DDDB 48%, #CBE5BE 74%, #E8E1A8 100%)',
          }}
        >
          <div className="p-10 sm:p-14 relative flex flex-col">
            <div className="font-mono text-[11.5px] tracking-[0.22em] text-heading/65 font-semibold mb-6">
              {t('pages:healthcareGrowthEngine.closing.panelTag')}
            </div>
            <h3 className="text-heading text-[clamp(28px,3.4vw,48px)] font-extrabold leading-[1.04] tracking-[-0.028em] max-w-[18ch]">
              {t('pages:healthcareGrowthEngine.closing.panelTitle')}
            </h3>
            <p className="mt-5 text-heading/80 text-[15.5px] leading-[1.6] max-w-[50ch]">
              {t('pages:healthcareGrowthEngine.closing.panelBody')}
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-[40ch]">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-heading/85 text-[14px] font-medium"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-heading"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link to="/free-growth-audit" className="btn-primary">
                {t('pages:healthcareGrowthEngine.closing.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link
                to="/contact"
                className="text-heading/85 text-[14px] font-semibold underline-offset-4 hover:underline"
              >
                {t('pages:healthcareGrowthEngine.closing.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px] md:min-h-[460px] overflow-hidden">
            <img
              src={imgClosing}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-95"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Closing;
