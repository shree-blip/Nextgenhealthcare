import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import type { BlogPostData } from '@/content/blog/posts';
import { PLACEHOLDER_IMAGE as imgDefault } from '@/lib/placeholderImage';
import { COLORS, FEATURE_IMAGES, toneForPost, initialsOf } from './data';

/* ─── Tone-coloured category pill ─── */
const CategoryPill = ({ post }: { post: BlogPostData }) => {
  const { t } = useTranslation('blog');
  const tone = toneForPost(post);
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full font-mono font-bold tracking-[0.18em] uppercase px-3 py-1.5 text-[11px]"
      style={{ background: tone.soft, color: tone.hex }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.hex }} aria-hidden="true" />
      {t(`posts.${post.slug}.catLabel`, post.catLabel)}
    </span>
  );
};

/* ─── Section: Hero ─── */
const Hero = ({ post }: { post: BlogPostData }) => {
  const { t } = useTranslation('blog');
  const tone = toneForPost(post);
  const brief = post.takeaways[0];
  const supporting = post.takeaways[1];
  const cover = FEATURE_IMAGES[post.cat] ?? imgDefault;

  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb
          items={[
            { label: 'Blog', to: '/blog' },
            { label: t(`posts.${post.slug}.catLabel`, post.catLabel) },
          ]}
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-7">
            <CategoryPill post={post} />
            <h1
              className="mt-6 font-extrabold leading-[1.02] tracking-[-0.034em] text-[clamp(34px,5vw,68px)]"
              style={{ color: COLORS.navy }}
            >
              {t(`posts.${post.slug}.title`, post.title)}
            </h1>
            <p
              className="mt-7 text-[18px] leading-[1.65] max-w-[60ch]"
              style={{ color: COLORS.body }}
            >
              {t(`posts.${post.slug}.excerpt`, post.excerpt)}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]"
              style={{ color: COLORS.muted }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-grid place-items-center w-9 h-9 rounded-full font-mono text-[12px] font-bold"
                  style={{ background: tone.soft, color: tone.hex }}
                  aria-hidden="true"
                >
                  {initialsOf(post.author)}
                </span>
                <span>
                  {t('post.by')} <strong style={{ color: COLORS.navy }}>{post.author}</strong>
                </span>
              </div>
              <span className="opacity-30">·</span>
              <span>{post.date}</span>
              <span className="opacity-30">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Right-side: story-brief card with tone accent */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-[24px] p-8 overflow-hidden border"
              style={{
                background: COLORS.mint,
                borderColor: 'rgba(26, 36, 56, 0.10)',
              }}
            >
              <span
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: tone.hex }}
                aria-hidden="true"
              />
              <div
                className="font-mono text-[11px] tracking-[0.22em] uppercase font-bold"
                style={{ color: tone.hex }}
              >
                {t('post.storyBrief')}
              </div>
              <h2
                className="mt-3 text-[20px] font-extrabold tracking-[-0.018em] leading-[1.18]"
                style={{ color: COLORS.navy }}
              >
                {brief.label}: {brief.value}
              </h2>
              {brief.desc && (
                <p className="mt-4 text-[14px] leading-[1.6]" style={{ color: COLORS.body }}>
                  {brief.desc}
                </p>
              )}
              {supporting && (
                <p className="mt-3 text-[13.5px] leading-[1.6]" style={{ color: COLORS.muted }}>
                  {supporting.desc}
                </p>
              )}
              <div
                className="mt-6 pt-5 border-t flex items-center gap-2 text-[10.5px] uppercase tracking-[0.20em] font-bold"
                style={{ borderColor: 'rgba(26, 36, 56, 0.10)', color: tone.hex }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone.hex }} />
                {post.takeaways.length} {t('post.keyTakeawaysSuffix')}
              </div>
            </div>
          </div>
        </div>

        {/* Full-bleed cover image */}
        <div
          className="mt-12 lg:mt-16 relative rounded-[28px] overflow-hidden border aspect-[21/9] shadow-[0_28px_60px_-32px_rgba(45,55,72,0.32)]"
          style={{ borderColor: 'rgba(26, 36, 56, 0.10)' }}
        >
          <img
            src={cover}
            alt=""
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(26, 36, 56, 0) 60%, rgba(26, 36, 56, 0.35) 100%)',
            }}
          />
          <div
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          >
            <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-white font-bold">
              {t('post.editorial')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
