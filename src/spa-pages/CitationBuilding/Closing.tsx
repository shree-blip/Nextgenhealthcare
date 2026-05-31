import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import closingImg from '../../assets/nextgen-image/Ouradvantageimg1.png';
import { COLORS } from './data';

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="border-t" style={{ borderColor: 'rgba(26, 36, 56, 0.08)' }}>
      <div className="container-shell py-[clamp(72px,9vw,128px)]">
        <article
          className="relative rounded-[28px] overflow-hidden grid lg:grid-cols-[1.3fr_1fr]"
          style={{ background: 'linear-gradient(90deg, #DDD9E5 0%, #DDE3DC 50%, #EFE7CD 100%)' }}
        >
          <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
            <div
              className="font-mono text-[12px] tracking-[0.24em] uppercase font-bold"
              style={{ color: COLORS.tan }}
            >
              {t('pages:citationBuilding.closing.tag')}
            </div>
            <h3
              className="mt-5 font-extrabold leading-[1.04] tracking-[-0.028em] text-[clamp(30px,4vw,52px)] max-w-[22ch]"
              style={{ color: COLORS.navy }}
            >
              {t('pages:citationBuilding.closing.title')}
            </h3>
            <p
              className="mt-6 text-[16px] leading-[1.65] max-w-[58ch]"
              style={{ color: COLORS.body }}
            >
              {t('pages:citationBuilding.closing.body')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link to="/contact" className="btn-primary">
                {t('pages:citationBuilding.closing.ctaPrimary')}
              </Link>
              <Link
                to="/services/seo"
                className="text-[14px] font-semibold underline-offset-4 hover:underline"
                style={{ color: COLORS.navy }}
              >
                {t('pages:citationBuilding.closing.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px] lg:min-h-[440px] overflow-hidden">
            <img
              src={closingImg}
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
