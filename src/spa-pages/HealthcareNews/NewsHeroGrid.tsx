import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsThumb from './NewsThumb';
import { newsBySlug } from './news.data';

const imgFor = (path: string) => {
  const slug = path.replace('/healthcare-news/', '');
  return newsBySlug(slug)?.img;
};

interface SideArticle {
  to: string;
  key: 'fda' | 'tele' | 'voice' | 'cms';
}

const SIDE_ARTICLES: SideArticle[] = [
  { to: '/healthcare-news/fda-glucose-monitor-type2', key: 'fda' },
  { to: '/healthcare-news/telemedicine-q1-record', key: 'tele' },
  { to: '/healthcare-news/voice-ai-front-desks', key: 'voice' },
  { to: '/healthcare-news/cms-cardiac-monitoring', key: 'cms' },
];

const NewsHeroGrid = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hn-hero">
      <div className="container-shell">
        <div className="hg-grid">
          <Link className="hg-main" to="/healthcare-news/ai-imaging-diagnostic-errors">
            <div className="hg-main-img">
              <NewsThumb
                category="Research"
                seed="hn-main-research"
                aspect="landscape"
                caption={t('healthcareNews.heroGrid.mainCaption')}
                image={imgFor('/healthcare-news/ai-imaging-diagnostic-errors')}
              />
            </div>
            <span className="hg-cat">{t('healthcareNews.heroGrid.mainCat')}</span>
            <h2 className="hg-main-title">{t('healthcareNews.heroGrid.mainTitle')}</h2>
            <p className="hg-main-desc">{t('healthcareNews.heroGrid.mainDesc')}</p>
            <div className="hg-byline">
              <span>
                {t('healthcareNews.heroGrid.byPrefix')}{' '}
                <strong>{t('healthcareNews.heroGrid.mainAuthor')}</strong>
              </span>
              <span className="dot" />
              <span>{t('healthcareNews.heroGrid.mainMeta1')}</span>
              <span className="dot" />
              <span>{t('healthcareNews.heroGrid.mainMeta2')}</span>
            </div>
          </Link>

          <div className="hg-side">
            {SIDE_ARTICLES.map((article) => (
              <Link key={article.to} className="hg-side-item" to={article.to}>
                <div className="hg-side-img">
                  <NewsThumb
                    category={t(`healthcareNews.heroGrid.side.${article.key}.cat`)}
                    seed={`hg-side-${article.to}`}
                    aspect="square"
                    image={imgFor(article.to)}
                  />
                </div>
                <div>
                  <span className="hg-side-cat">
                    {t(`healthcareNews.heroGrid.side.${article.key}.cat`)}
                  </span>
                  <h3 className="hg-side-title">
                    {t(`healthcareNews.heroGrid.side.${article.key}.title`)}
                  </h3>
                  <div className="hg-side-meta">
                    {t(`healthcareNews.heroGrid.side.${article.key}.meta`)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHeroGrid;
