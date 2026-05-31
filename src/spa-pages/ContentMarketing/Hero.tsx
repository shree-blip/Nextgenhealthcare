import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('contentMarketing.hero.bullets', { returnObjects: true }) as string[];
  const toc = t('contentMarketing.hero.articleToc', { returnObjects: true }) as string[];

  return (
    <section className="cm-hero">
      <div className="container-shell">
        <div className="cm-hero-grid">
          <div>
            <div className="cm-hero-crumb">
              <Link to="/services">{t('contentMarketing.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('contentMarketing.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="cm-hero-eyebrow">
              <span className="dot" /> {t('contentMarketing.hero.eyebrow')}
            </span>
            <h1 className="cm-hero-title">
              {t('contentMarketing.hero.titleLine')}{' '}
              <em>{t('contentMarketing.hero.titleAccent')}</em>
            </h1>
            <p className="cm-hero-lede">{t('contentMarketing.hero.lede')}</p>

            <div className="cm-hero-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('contentMarketing.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#content-types" className="sl-btn-ghost">
                {t('contentMarketing.hero.ctaSecondary')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <ul className="cm-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="cm-hero-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="cm-hero-mock" aria-hidden="true">
            <div className="cm-hero-article">
              <div className="cm-hero-article-meta">
                <span className="cm-hero-article-cat">{t('contentMarketing.hero.articleCategory')}</span>
                <span className="cm-hero-article-time">{t('contentMarketing.hero.articleReadTime')}</span>
              </div>
              <h2 className="cm-hero-article-h">{t('contentMarketing.hero.articleHeadline')}</h2>
              <div className="cm-hero-article-byline">
                <span className="cm-hero-article-avatar" />
                <div>
                  <span className="cm-hero-article-author">{t('contentMarketing.hero.articleAuthor')}</span>
                  <span className="cm-hero-article-sub">{t('contentMarketing.hero.articleReviewed')}</span>
                </div>
                <span className="cm-hero-article-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                  {t('contentMarketing.hero.articleBadge')}
                </span>
              </div>
              <div className="cm-hero-article-body">
                <p>{t('contentMarketing.hero.articleIntro')}</p>
                <ul className="cm-hero-article-toc">
                  {toc.map((item, i) => (
                    <li key={item}><span className="num">{String(i + 1).padStart(2, '0')}</span> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="cm-hero-article-foot">
                <div className="cm-hero-article-cluster">
                  <span className="lbl">{t('contentMarketing.hero.topicCluster')}</span>
                  <div className="links">
                    <span>Echocardiogram</span>
                    <span>Cardiac CT</span>
                    <span>EKG vs Holter</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cm-hero-rank">
              <div className="cm-hero-rank-head">
                <span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></span>
                <span className="kw">{t('contentMarketing.hero.rankKeyword')}</span>
              </div>
              <div className="cm-hero-rank-row">
                <span className="lbl">{t('contentMarketing.hero.rankSerp')}</span>
                <span className="val">#2 <em>↑5</em></span>
              </div>
              <div className="cm-hero-rank-row">
                <span className="lbl">{t('contentMarketing.hero.rankAi')}</span>
                <span className="val cited">{t('contentMarketing.hero.rankAiValue')}</span>
              </div>
              <div className="cm-hero-rank-row">
                <span className="lbl">{t('contentMarketing.hero.rankClicks')}</span>
                <span className="val">1,847 <em>↑62%</em></span>
              </div>
            </div>

            <div className="cm-hero-tag t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              {t('contentMarketing.hero.tag1')}
            </div>
            <div className="cm-hero-tag t2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" /></svg>
              {t('contentMarketing.hero.tag2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
