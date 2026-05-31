import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import closingVisual from '../../assets/nextgen-image/Clinicalimg1.png';

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <article
          className="relative rounded-[24px] overflow-hidden grid lg:grid-cols-[1.3fr_1fr]"
          style={{
            background: 'linear-gradient(90deg, #DDD9E5 0%, #DDE3DC 50%, #EFE7CD 100%)',
          }}
        >
          <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
            <div className="font-mono text-[12px] tracking-[0.24em] text-line uppercase font-bold">
              {t('pages:reviewsReputation.closing.tag')}
            </div>
            <h3 className="mt-5 text-heading font-extrabold leading-[1.04] tracking-[-0.028em] text-[clamp(30px,4vw,52px)] max-w-[20ch]">
              {t('pages:reviewsReputation.closing.title')}
            </h3>
            <p className="mt-6 text-body text-[16px] leading-[1.65] max-w-[56ch]">
              {t('pages:reviewsReputation.closing.body')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to="/contact" className="btn-primary">
                {t('pages:reviewsReputation.closing.ctaPrimary')}
              </Link>
              <Link
                to="/case-studies"
                className="text-heading text-[14px] font-medium underline-offset-4 hover:underline"
              >
                {t('pages:reviewsReputation.closing.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-[480px] overflow-hidden">
            <img
              src={closingVisual}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(221, 227, 220, 0.45) 0%, rgba(221, 227, 220, 0) 30%, rgba(239, 231, 205, 0) 100%)',
              }}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Closing;
