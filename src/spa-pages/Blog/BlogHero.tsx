import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { AnimatedBackground } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import imgHipaa from '../../assets/nextgen-image/Hippablogimg.png';
import imgGbp from '../../assets/nextgen-image/7googlebuisnessblogimg.png';
import imgCpa from '../../assets/nextgen-image/Urgentcpablogimg.png';
import imgFeatured from '../../assets/nextgen-image/bannerblogimg.png';
import imgAi from '../../assets/nextgen-image/Gptbotimg.png';
import imgMedspa from '../../assets/nextgen-image/Medspas&wellnessimg.png';
import imgReviews from '../../assets/nextgen-image/Reviewcollectionimg.png';
import imgUrgent from '../../assets/nextgen-image/Urgentcareimg.png';
import imgDash from '../../assets/nextgen-image/Visibiltyscoreimg.png';

interface SideCardConfig {
  href: string;
  cls: string;
  key: 'hipaa' | 'maps' | 'ads';
  illustration: ReactElement;
}

const LEFT_SIDE: SideCardConfig[] = [
  {
    href: '/blog/hipaa-tracking',
    cls: 's1',
    key: 'hipaa',
    illustration: <img src={imgHipaa} alt="" loading="lazy" decoding="async" />,
  },
  {
    href: '/blog/maps-rank',
    cls: 's2',
    key: 'maps',
    illustration: <img src={imgGbp} alt="" loading="lazy" decoding="async" />,
  },
];

const RIGHT_SIDE: SideCardConfig[] = [
  {
    href: '/blog/ads-cost',
    cls: 's3',
    key: 'ads',
    illustration: <img src={imgCpa} alt="" loading="lazy" decoding="async" />,
  },
];

interface LatestConfig {
  href: string;
  key: 'aiChatbot' | 'medspa' | 'reviews' | 'urgentCare' | 'analytics';
  thumb: ReactElement;
}

const LATEST: LatestConfig[] = [
  { href: '/blog/ai-chatbot', key: 'aiChatbot', thumb: <img src={imgAi} alt="" loading="lazy" decoding="async" /> },
  { href: '/blog/medspa', key: 'medspa', thumb: <img src={imgMedspa} alt="" loading="lazy" decoding="async" /> },
  { href: '/blog/reviews', key: 'reviews', thumb: <img src={imgReviews} alt="" loading="lazy" decoding="async" /> },
  { href: '/blog/urgent-care', key: 'urgentCare', thumb: <img src={imgUrgent} alt="" loading="lazy" decoding="async" /> },
  { href: '/blog/analytics', key: 'analytics', thumb: <img src={imgDash} alt="" loading="lazy" decoding="async" /> },
];

interface TrendingTopic {
  i18nKey: 'localSeo' | 'hipaaTracking' | 'cpaBenchmarks' | 'aiIntake' | 'medspaLtv' | 'reviews';
  to: string;
}

const TRENDING_TOPICS: TrendingTopic[] = [
  { i18nKey: 'localSeo', to: '/blog/maps-rank' },
  { i18nKey: 'hipaaTracking', to: '/blog/hipaa-tracking' },
  { i18nKey: 'cpaBenchmarks', to: '/blog/ads-cost' },
  { i18nKey: 'aiIntake', to: '/blog/ai-chatbot' },
  { i18nKey: 'medspaLtv', to: '/blog/medspa' },
  { i18nKey: 'reviews', to: '/blog/reviews' },
];

const BlogHero = () => {
  const { t } = useTranslation('blog');

  const renderSideCard = (card: SideCardConfig) => (
    <Link key={card.href} to={card.href} className={`bl-side-card ${card.cls}`}>
      <div className="bl-side-cover">{card.illustration}</div>
      <div className="bl-side-body">
        <span className="bl-side-cat">{t(`side.${card.key}.cat`)}</span>
        <h3 className="bl-side-title">{t(`side.${card.key}.title`)}</h3>
        <span className="bl-side-meta">{t(`side.${card.key}.meta`)}</span>
      </div>
    </Link>
  );

  return (
    <section className="bl-hero" aria-labelledby="bl-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <span className="bl-hero-reg tr" aria-hidden="true" />
      <span className="bl-hero-reg bl" aria-hidden="true" />

      <div className="container-shell">
        <Breadcrumb current="Blog" />

        <div className="bl-mast reveal d2">
          <span className="bl-mast-eyebrow">
            <span className="swatch" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            {t('hero.mastEyebrow')}
          </span>
          <h1 id="bl-title" className="bl-mast-h1">
            {t('hero.mastTitle1')} <span className="ital">{t('hero.mastTitleItalic')}</span> {t('hero.mastTitle2')}{' '}
            <span className="accent">{t('hero.mastTitleAccent')}</span>.
          </h1>
          <p className="bl-mast-lede">
            <strong>{t('hero.mastLedeStrong')}</strong> {t('hero.mastLede')}
          </p>
        </div>

        <div className="bl-hero-topics reveal d3">
          <span className="bl-hero-topics-label">{t('hero.trendingLabel')}</span>
          {TRENDING_TOPICS.map((topic) => (
            <Link key={topic.i18nKey} to={topic.to} className="bl-hero-topic">
              {t(`trending.${topic.i18nKey}`)}
            </Link>
          ))}
        </div>

        <div className="bl-edit-grid reveal d3">
          <div className="bl-side">{LEFT_SIDE.map(renderSideCard)}</div>

          <Link to="/blog/ads-cost" className="bl-feat">
            <div className="bl-feat-cover">
              <span className="bl-feat-badge">{t('hero.featuredBadge')}</span>
              <img src={imgFeatured} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="bl-feat-body">
              <span className="bl-feat-cat">{t('hero.featuredCat')}</span>
              <h2 className="bl-feat-title">{t('hero.featuredTitle')}</h2>
              <p className="bl-feat-excerpt">{t('hero.featuredExcerpt')}</p>
              <div className="bl-feat-meta">
                <span>{t('hero.featuredMeta1')}</span>
                <span className="dot" />
                <span className="author">{t('hero.featuredAuthor')}</span>
                <span className="dot" />
                <span>{t('hero.featuredMeta2')}</span>
              </div>
            </div>
          </Link>

          <div className="bl-side">
            <aside className="bl-latest" aria-label="Latest articles">
              <div className="bl-latest-head">
                <h3 className="bl-latest-title">{t('hero.latestTitle')}</h3>
                <a href="#bl-grid" className="bl-latest-link">
                  {t('hero.seeAll')}
                  <ArrowIcon size={11} />
                </a>
              </div>

              <div className="bl-latest-list">
                {LATEST.map((item) => (
                  <Link key={item.href} to={item.href} className="bl-latest-item">
                    <div className="bl-latest-body">
                      <h4 className="bl-latest-h">{t(`latest.${item.key}.title`)}</h4>
                      <span className="bl-latest-meta">{t(`latest.${item.key}.meta`)}</span>
                    </div>
                    <span className="bl-latest-thumb">{item.thumb}</span>
                  </Link>
                ))}
              </div>
            </aside>

            {RIGHT_SIDE.map(renderSideCard)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
