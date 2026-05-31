import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { AnimatedBackground } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import templateBannerImg from '../../../assets/nextgen-image/Automationtemplateimg.png';

const Hero = ({ filter, visibleCount }: { filter: string; visibleCount: number }) => {
  const { t } = useTranslation(['automation']);
  const chipText =
    filter === 'All'
      ? t('automation:templates.page.hero.chipWorkflows')
      : t('automation:templates.page.hero.chipCategory', { cat: filter.toLowerCase() });
  return (
    <section className="atx-hero" aria-labelledby="atx-hero-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <div className="atx-hero-meta">
          <Breadcrumb
            items={[
              { label: t('automation:breadcrumb.automation'), to: '/automation' },
              { label: t('automation:breadcrumb.templates') },
            ]}
          />
          <div className="atx-hero-chips" aria-hidden="true">
            <span className="atx-hero-chip">
              <span className="atx-hero-chip-dot" />
              {t('automation:templates.page.hero.chipLibrary')}
            </span>
            <span className="atx-hero-chip atx-mono">
              /{String(visibleCount).padStart(2, '0')} {chipText}
            </span>
          </div>
        </div>

        <div className="atx-hero-grid">
          <aside className="atx-hero-rail" aria-hidden="true">
            <span className="atx-rail-label">{t('automation:templates.page.hero.railFiled')}</span>
            <span className="atx-rail-value">
              {t('automation:templates.page.hero.railFiledValue')}
            </span>
            <span className="atx-rail-line" />
            <span className="atx-rail-label">
              {t('automation:templates.page.hero.railPlatform')}
            </span>
            <span className="atx-rail-value">
              {t('automation:templates.page.hero.railPlatformValue')}
            </span>
            <span className="atx-rail-line" />
            <span className="atx-rail-label">
              {t('automation:templates.page.hero.railEdition')}
            </span>
            <span className="atx-rail-value atx-mono">
              {t('automation:templates.page.hero.railEditionValue')}
            </span>
          </aside>

          <header className="atx-hero-copy">
            <span className="atx-eyebrow">
              <span className="atx-eyebrow-dot" />
              {t('automation:templates.page.hero.eyebrow')}
            </span>
            <h1 id="atx-hero-title" className="atx-h1">
              {t('automation:templates.page.hero.titleNumber')}
              <span className="atx-h1-accent">.</span>
              {t('automation:templates.page.hero.titleRest')}
              <br />
              <span className="atx-h1-quiet">
                {t('automation:templates.page.hero.titleQuiet')}
              </span>
            </h1>
            <p className="atx-lede">{t('automation:templates.page.hero.lede')}</p>
            <div className="atx-hero-cta">
              <Link to="/free-growth-audit" className="atx-btn atx-btn-primary">
                {t('automation:templates.page.hero.ctaPrimary')} <ArrowIcon size={14} />
              </Link>
              <a href="#atx-list" className="atx-btn atx-btn-ghost">
                {t('automation:templates.page.hero.ctaSecondary')}
              </a>
            </div>
          </header>

          <figure className="atx-hero-art" aria-hidden="true">
            <div className="atx-hero-art-frame">
              <img src={templateBannerImg} alt="" loading="eager" decoding="async" />
            </div>
            <figcaption className="atx-hero-art-cap">
              {t('automation:templates.page.hero.figCaption')}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
