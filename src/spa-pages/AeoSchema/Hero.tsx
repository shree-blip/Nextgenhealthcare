import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import heroImg from '../../assets/nextgen-image/Aeo&schemaimg.png';
import { COLORS } from './data';

interface Stat {
  v: string;
  l: string;
}

const Hero = () => {
  const { t } = useTranslation('pages');
  const stats = t('pages:aeoSchema.hero.stats', { returnObjects: true }) as Stat[];
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:aeoSchema.breadcrumb.current')} />
        <div className="mt-8 grid lg:grid-cols-12 gap-x-12 gap-y-12 items-end">
          <div className="lg:col-span-7">
            <div
              className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full"
              style={{ background: COLORS.ctaSoft, color: COLORS.cta }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.cta }} />
              <span className="font-mono text-[11.5px] tracking-[0.22em] uppercase font-bold">
                {t('pages:aeoSchema.hero.eyebrow')}
              </span>
            </div>
            <h1
              className="mt-7 font-extrabold leading-[1.00] tracking-[-0.038em] text-[clamp(40px,5.8vw,80px)] max-w-[15ch]"
              style={{ color: COLORS.navy }}
            >
              {t('pages:aeoSchema.hero.titleLine1')}{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(95deg, ${COLORS.cta}, ${COLORS.tan})` }}
              >
                {t('pages:aeoSchema.hero.titleAccent')}
              </span>
              {t('pages:aeoSchema.hero.titleSuffix')}
            </h1>
            <p
              className="mt-7 text-[18px] leading-[1.65] max-w-[58ch]"
              style={{ color: COLORS.body }}
            >
              {t('pages:aeoSchema.hero.lede')}
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-[28px] overflow-hidden border aspect-[5/4] shadow-[0_28px_60px_-32px_rgba(45,55,72,0.32)]"
              style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
            >
              <img
                src={heroImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(15, 23, 42, 0) 40%, rgba(15, 23, 42, 0.55) 100%)',
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div
                  className="rounded-2xl px-4 py-3 backdrop-blur-md font-mono text-[11.5px] tracking-[0.12em] leading-[1.4]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.18)',
                    border: '1px solid rgba(255, 255, 255, 0.30)',
                    color: '#FFFFFF',
                  }}
                >
                  <span className="opacity-70">{t('pages:aeoSchema.hero.codeType')}</span>{' '}
                  <span className="font-bold">{t('pages:aeoSchema.hero.codeTypeValue')}</span>
                  <br />
                  <span className="opacity-70">{t('pages:aeoSchema.hero.codeId')}</span>{' '}
                  <span>{t('pages:aeoSchema.hero.codeIdValue')}</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{
                    background: 'rgba(255, 255, 255, 0.20)',
                    border: '1px solid rgba(255, 255, 255, 0.30)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-white font-bold">
                    {t('pages:aeoSchema.hero.liveBadge')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats — code-card style */}
        <div
          className="mt-12 lg:mt-16 grid sm:grid-cols-3 gap-[1px] rounded-[18px] overflow-hidden border"
          style={{ borderColor: 'rgba(26, 36, 56, 0.10)', background: 'rgba(26, 36, 56, 0.08)' }}
        >
          {stats.map((s, i) => (
            <div key={s.l} className="bg-white p-6 sm:p-8 flex flex-col gap-2">
              <span
                className="font-mono text-[11px] tracking-[0.18em] uppercase font-bold"
                style={{ color: COLORS.cta }}
              >
                0{i + 1}
              </span>
              <span
                className="font-extrabold text-[clamp(28px,3vw,40px)] leading-[1] tracking-[-0.024em] tabular-nums"
                style={{ color: COLORS.navy }}
              >
                {s.v}
              </span>
              <span
                className="text-[12px] uppercase tracking-[0.18em] font-bold"
                style={{ color: COLORS.muted }}
              >
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
