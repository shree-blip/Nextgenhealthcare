import { useTranslation } from 'react-i18next';
import specialtyEmergencyErImg from '@/assets/nextgen-image/specialtyemergencyerimg.png';

const FeaturedCaseArt = () => (
  <svg
    viewBox="0 0 1000 700"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    style={{ display: 'block', width: '100%', height: '100%' }}
  >
    <defs>
      <linearGradient id="csfeatGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3F4F66" />
        <stop offset="55%" stopColor="#2D3748" />
        <stop offset="100%" stopColor="#1A2438" />
      </linearGradient>
      <radialGradient id="csfeatHalo" cx="22%" cy="28%" r="46%">
        <stop offset="0%" stopColor="#B38B6D" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#B38B6D" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1000" height="700" fill="url(#csfeatGrad)" />
    <rect width="1000" height="700" fill="url(#csfeatHalo)" />
    <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
      <line x1="0" y1="120" x2="1000" y2="120" />
      <line x1="0" y1="240" x2="1000" y2="240" />
      <line x1="0" y1="360" x2="1000" y2="360" />
      <line x1="0" y1="480" x2="1000" y2="480" />
      <line x1="0" y1="600" x2="1000" y2="600" />
      <line x1="200" y1="0" x2="200" y2="700" />
      <line x1="400" y1="0" x2="400" y2="700" />
      <line x1="600" y1="0" x2="600" y2="700" />
      <line x1="800" y1="0" x2="800" y2="700" />
    </g>
    <text
      x="48"
      y="56"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="13"
      fontWeight="700"
      letterSpacing="4"
      fill="rgba(255,255,255,0.55)"
    >
      FIG. 01 - DALLAS METRO ER NETWORK
    </text>
    <g transform="translate(500, 360)">
      <rect x="-110" y="-30" width="40" height="120" rx="4" fill="#8FBC8F" opacity="0.92" />
      <rect x="-30" y="-90" width="120" height="40" rx="4" fill="#8FBC8F" opacity="0.92" />
      <rect
        x="-110"
        y="-30"
        width="40"
        height="120"
        rx="4"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />
      <rect
        x="-30"
        y="-90"
        width="120"
        height="40"
        rx="4"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />
    </g>
    <g
      transform="translate(500, 360)"
      fill="none"
      stroke="#B38B6D"
      strokeOpacity="0.5"
      strokeWidth="1"
      strokeDasharray="3 6"
    >
      <circle r="160" />
      <circle r="220" />
      <circle r="280" />
    </g>
    <g fill="#B38B6D" opacity="0.65">
      <path d="M100 580 h14 v4 h-14 z M105 575 h4 v14 h-4 z" />
      <path d="M860 110 h14 v4 h-14 z M865 105 h4 v14 h-4 z" />
      <path d="M820 600 h14 v4 h-14 z M825 595 h4 v14 h-4 z" />
    </g>
    <line x1="48" y1="652" x2="952" y2="652" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    <text
      x="48"
      y="676"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="11"
      fontWeight="600"
      letterSpacing="3"
      fill="rgba(255,255,255,0.65)"
    >
      ENGAGEMENT · LOCAL SEO + PAID
    </text>
    <text
      x="952"
      y="676"
      textAnchor="end"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="11"
      fontWeight="600"
      letterSpacing="3"
      fill="rgba(255,255,255,0.65)"
    >
      90-DAY READOUT
    </text>
  </svg>
);

const AuthorAvatar = () => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: 'block', width: '100%', height: '100%' }}
  >
    <rect width="100" height="100" fill="#E6EAF5" />
    <rect width="100" height="100" fill="#576DB5" opacity="0.12" />
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fontFamily="'Plus Jakarta Sans', sans-serif"
      fontSize="34"
      fontWeight="700"
      fill="#2D3748"
      letterSpacing="-0.02em"
    >
      MR
    </text>
  </svg>
);

const FeaturedCase = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="feat-cs">
      <div className="container-shell">
        <div className="feat-row">
          <a className="all-pill" href="#cs-all">
            <span className="all-pill-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
            {t('caseStudies.featured.allCases')}
          </a>
          <h2 className="feat-title">{t('caseStudies.featured.title')}</h2>
        </div>

        <article className="feat-card">
          <div className="feat-meta">
            <div>
              <div className="feat-date">
                {t('caseStudies.featured.date')}<small>{t('caseStudies.featured.month')}</small>
              </div>
              <h3 className="feat-headline">{t('caseStudies.featured.headline')}</h3>
              <p className="feat-lede">{t('caseStudies.featured.lede')}</p>
            </div>
          </div>

          <div className="feat-img">
            <FeaturedCaseArt />
            <img
              src={specialtyEmergencyErImg}
              alt={t('caseStudies.featured.imgAlt')}
              style={{ position: 'absolute', inset: 0 }}
            />
            <div className="feat-img-overlay" />
            <div className="feat-img-tag">
              <span>{t('caseStudies.featured.imgTagLocation')}</span>
              <span>·</span>
              <span>{t('caseStudies.featured.imgTagEngagement')}</span>
              <span>·</span>
              <span>{t('caseStudies.featured.imgTagResult')}</span>
            </div>
          </div>

          <aside className="feat-side">
            <div className="feat-logo">
              TheNextGen
              <small>{t('caseStudies.featured.logoTag')}</small>
            </div>
            <div className="feat-author">
              <div className="feat-author-img">
                <AuthorAvatar />
              </div>
              <div>
                <h4 className="feat-author-name">{t('caseStudies.featured.authorName')}</h4>
                <p className="feat-author-role">{t('caseStudies.featured.authorRole')}</p>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
};

export default FeaturedCase;
