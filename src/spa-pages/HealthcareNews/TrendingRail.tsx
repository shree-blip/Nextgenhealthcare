import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewsThumb from './NewsThumb';
import { newsBySlug } from './news.data';

const imgFor = (path: string) => {
  const slug = path.replace('/healthcare-news/', '');
  return newsBySlug(slug)?.img;
};

interface TrendCard {
  to: string;
  key: 'imaging' | 'tele' | 'voice' | 'reviews' | 'hipaa' | 'sms' | 'n8n' | 'medspa';
}

const CARDS: TrendCard[] = [
  { to: '/healthcare-news/ai-imaging-diagnostic-errors', key: 'imaging' },
  { to: '/healthcare-news/telemedicine-q1-record', key: 'tele' },
  { to: '/healthcare-news/voice-ai-front-desks', key: 'voice' },
  { to: '/healthcare-news/patient-reviews-search-weight', key: 'reviews' },
  { to: '/healthcare-news/hipaa-pitfalls-2026', key: 'hipaa' },
  { to: '/healthcare-news/ehr-sms-no-show-reduction', key: 'sms' },
  { to: '/healthcare-news/texas-clinic-n8n-workflows', key: 'n8n' },
  { to: '/healthcare-news/medspa-roas-2026', key: 'medspa' },
];

const TrendingRail = () => {
  const { t } = useTranslation('pages');

  const renderCard = (card: TrendCard, ariaHidden: boolean) => (
    <Link
      className="trend-card"
      to={card.to}
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
    >
      <div className="trend-img">
        <NewsThumb
          category={t(`healthcareNews.trending.cards.${card.key}.cat`)}
          seed={`trend-${card.to}`}
          aspect="landscape"
          image={imgFor(card.to)}
        />
      </div>
      <span className="trend-cat">{t(`healthcareNews.trending.cards.${card.key}.cat`)}</span>
      <h3 className="trend-title">{t(`healthcareNews.trending.cards.${card.key}.title`)}</h3>
      <div className="trend-meta">{t(`healthcareNews.trending.cards.${card.key}.meta`)}</div>
    </Link>
  );

  return (
    <section className="trending" aria-labelledby="trending-title">
      <div className="container-shell">
        <div className="trending-head">
          <div className="trending-eyebrow">{t('healthcareNews.trending.eyebrow')}</div>
          <h2 className="trending-title" id="trending-title">
            {t('healthcareNews.trending.titleLine1')}
            <br />
            {t('healthcareNews.trending.titleLine2')}
          </h2>
          <p className="trending-sub">{t('healthcareNews.trending.sub')}</p>
        </div>
      </div>

      <svg
        className="trending-rope"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B38B6D" stopOpacity="0" />
            <stop offset="15%" stopColor="#B38B6D" stopOpacity=".55" />
            <stop offset="50%" stopColor="#B38B6D" stopOpacity=".9" />
            <stop offset="85%" stopColor="#B38B6D" stopOpacity=".55" />
            <stop offset="100%" stopColor="#B38B6D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="600" cy="14" r="5" fill="#B38B6D" />
        <circle
          cx="600"
          cy="14"
          r="9"
          fill="none"
          stroke="#B38B6D"
          strokeOpacity=".4"
          strokeWidth="1"
        />
        <path
          d="M 600,18 C 600,40 500,50 380,60 S 140,90 40,108"
          fill="none"
          stroke="url(#ropeGrad)"
          strokeWidth="1.5"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
        <path
          d="M 600,18 C 600,40 700,50 820,60 S 1060,90 1160,108"
          fill="none"
          stroke="url(#ropeGrad)"
          strokeWidth="1.5"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
        <circle cx="40" cy="108" r="3" fill="#B38B6D" />
        <circle cx="1160" cy="108" r="3" fill="#B38B6D" />
      </svg>

      <div className="trending-rail">
        <div className="trending-track">
          {CARDS.map((card) => (
            <Fragment key={`a-${card.to}`}>{renderCard(card, false)}</Fragment>
          ))}
          {CARDS.map((card) => (
            <Fragment key={`b-${card.to}`}>{renderCard(card, true)}</Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingRail;
