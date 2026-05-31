import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowIcon } from '@/components/icons';
import { COLORS, TONE_COLORS } from './data';

/* ─── Not found ─── */
const NotFoundBlock = () => {
  const { t } = useTranslation('blog');
  return (
    <main className="ph-page-head">
      <div className="container-shell py-24">
        <Breadcrumb
          items={[
            { label: 'Blog', to: '/blog' },
            { label: t('post.notFound.crumb') },
          ]}
        />
        <div className="mt-10 max-w-[60ch]">
          <span
            className="inline-flex items-center gap-2 rounded-full font-mono font-bold tracking-[0.18em] uppercase px-3 py-1.5 text-[11px]"
            style={{ background: TONE_COLORS.ink.soft, color: TONE_COLORS.ink.hex }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: TONE_COLORS.ink.hex }}
            />
            {t('post.notFound.pillText')}
          </span>
          <h1
            className="mt-6 font-extrabold leading-[1.02] tracking-[-0.034em] text-[clamp(34px,5vw,68px)]"
            style={{ color: COLORS.navy }}
          >
            {t('post.notFound.title')}
          </h1>
          <p className="mt-7 text-[18px] leading-[1.65]" style={{ color: COLORS.body }}>
            {t('post.notFound.lede')}
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-[12px] uppercase tracking-[0.18em] font-bold text-white"
            style={{ background: COLORS.navy }}
          >
            {t('post.notFound.backToAll')} <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundBlock;
