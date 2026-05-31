import { memo } from 'react';
import { CountUp } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import {
  useHomeResultsFeatured,
  useHomeResultsHead,
  useHomeResultsSmallStats,
} from '@/content/home/results';

const StatFeaturedArt = memo(() => (
  <div className="stat-art" aria-hidden="true">
    <svg
      viewBox="0 0 665 503"
      preserveAspectRatio="xMaxYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
                <defs>
                  <radialGradient id="medGlowSage" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8FBC8F" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#8FBC8F" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="medGlowPeri" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#97A8DC" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#97A8DC" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="medCurve" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8FBC8F" stopOpacity="0" />
                    <stop offset="100%" stopColor="#8FBC8F" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="medSkin" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F2C2A8" stopOpacity="0.78" />
                    <stop offset="100%" stopColor="#B38B6D" stopOpacity="0.88" />
                  </linearGradient>
                  <linearGradient id="medSkinSoft" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F2C2A8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#B38B6D" stopOpacity="0.55" />
                  </linearGradient>
                </defs>

                {/* Glow blobs - upper right */}
                <circle cx="560" cy="150" r="200" fill="url(#medGlowSage)" />
                <circle cx="640" cy="60" r="150" fill="url(#medGlowPeri)" />

                {/* Sparse corner dot grid */}
                <g fill="#B38B6D" opacity="0.20">
                  <circle cx="430" cy="34" r="1.4" />
                  <circle cx="468" cy="34" r="1.4" />
                  <circle cx="506" cy="34" r="1.4" />
                  <circle cx="544" cy="34" r="1.4" />
                  <circle cx="582" cy="34" r="1.4" />
                  <circle cx="620" cy="34" r="1.4" />
                  <circle cx="430" cy="466" r="1.4" />
                  <circle cx="468" cy="466" r="1.4" />
                  <circle cx="582" cy="466" r="1.4" />
                  <circle cx="620" cy="466" r="1.4" />
                </g>

                {/* Notification badge */}
                <g className="art-notif" transform="translate(372 72)">
                  <circle
                    r="15"
                    fill="rgba(143,188,143,0.14)"
                    stroke="rgba(143,188,143,0.55)"
                    strokeWidth="1"
                  />
                  <path
                    d="M-5 -3 a5 5 0 0 1 10 0 v3 l2 3 h-14 l2 -3 z"
                    fill="none"
                    stroke="rgba(255,255,255,0.78)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M-2 5 a2 2 0 0 0 4 0"
                    fill="none"
                    stroke="rgba(255,255,255,0.78)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <circle cx="9" cy="-9" r="3.4" fill="#8FBC8F" />
                </g>

                {/* Back post card - rotated, behind */}
                <g className="art-post-back" transform="translate(525 132) rotate(9)">
                  <rect
                    x="0"
                    y="0"
                    width="130"
                    height="170"
                    rx="14"
                    fill="rgba(255,255,255,0.05)"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1"
                  />
                  <circle cx="18" cy="18" r="8" fill="rgba(255,255,255,0.18)" />
                  <rect
                    x="32"
                    y="13"
                    width="50"
                    height="5"
                    rx="2.5"
                    fill="rgba(255,255,255,0.18)"
                  />
                  <rect
                    x="32"
                    y="22"
                    width="30"
                    height="3"
                    rx="1.5"
                    fill="rgba(255,255,255,0.10)"
                  />
                  <circle cx="65" cy="92" r="38" fill="url(#medSkinSoft)" />
                  <rect
                    x="14"
                    y="146"
                    width="50"
                    height="3"
                    rx="1.5"
                    fill="rgba(255,255,255,0.12)"
                  />
                </g>

                {/* Foreground post card */}
                <g className="art-post-front" transform="translate(388 104) rotate(-5)">
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="230"
                    rx="16"
                    fill="rgba(255,255,255,0.10)"
                    stroke="rgba(255,255,255,0.24)"
                    strokeWidth="1.2"
                  />
                  {/* header */}
                  <circle cx="22" cy="22" r="11" fill="url(#medSkin)" />
                  <rect x="40" y="16" width="64" height="6" rx="3" fill="rgba(255,255,255,0.42)" />
                  <rect x="40" y="27" width="44" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
                  <g fill="rgba(255,255,255,0.42)">
                    <circle cx="156" cy="22" r="1.8" />
                    <circle cx="163" cy="22" r="1.8" />
                    <circle cx="170" cy="22" r="1.8" />
                  </g>
                  {/* beauty / skincare visual */}
                  <g transform="translate(90 130)">
                    <circle r="60" fill="url(#medSkin)" />
                    <circle r="60" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1" />
                    <circle cx="-16" cy="-14" r="7" fill="rgba(255,255,255,0.42)" />
                    <ellipse cx="0" cy="18" rx="22" ry="9" fill="rgba(255,255,255,0.18)" />
                    <path
                      d="M-30 -4 q30 -30 60 0"
                      fill="none"
                      stroke="rgba(255,255,255,0.30)"
                      strokeWidth="1"
                    />
                  </g>
                  {/* action icons: heart, chat, dm */}
                  <g transform="translate(14 207)">
                    <path
                      d="M0 6c-2-3 1-7 5-5 1.2.5 2 1.6 2 2.6 0-1 .8-2.1 2-2.6 4-2 7 2 5 5l-7 6z"
                      fill="rgba(255,255,255,0.55)"
                    />
                    <g
                      fill="none"
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 1a5 5 0 0 0-5 5c0 1 .2 1.9.7 2.7l-.7 2.6 2.7-.7c.8.5 1.6.7 2.4.7a5 5 0 1 0 0-10z" />
                      <path d="M36 0 l8 5 l-8 5 l1 -4 z" />
                    </g>
                    <g fill="rgba(255,255,255,0.50)">
                      <rect x="138" y="2" width="20" height="3.5" rx="1.7" />
                    </g>
                  </g>
                </g>

                {/* Avatar mini cluster */}
                <g className="art-avatars" transform="translate(388 366)">
                  <circle
                    cx="0"
                    cy="0"
                    r="11"
                    fill="rgba(143,188,143,0.45)"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />
                  <circle
                    cx="14"
                    cy="0"
                    r="11"
                    fill="rgba(151,168,220,0.55)"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />
                  <circle
                    cx="28"
                    cy="0"
                    r="11"
                    fill="rgba(179,139,109,0.55)"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />
                  <circle
                    cx="42"
                    cy="0"
                    r="11"
                    fill="rgba(255,255,255,0.10)"
                    stroke="#2D3748"
                    strokeWidth="2"
                  />
                </g>

                {/* Chat bubble */}
                <g className="art-bubble" transform="translate(458 348)">
                  <path
                    d="M0 14 a14 14 0 0 1 14 -14 h84 a14 14 0 0 1 14 14 v18 a14 14 0 0 1 -14 14 h-72 l-14 12 v-12 a14 14 0 0 1 -12 -14 z"
                    fill="rgba(143,188,143,0.16)"
                    stroke="rgba(143,188,143,0.42)"
                    strokeWidth="1"
                  />
                  <circle cx="26" cy="23" r="2.4" fill="rgba(255,255,255,0.7)" />
                  <circle cx="35" cy="23" r="2.4" fill="rgba(255,255,255,0.55)" />
                  <circle cx="44" cy="23" r="2.4" fill="rgba(255,255,255,0.40)" />
                </g>

                {/* Lead form card */}
                <g className="art-form" transform="translate(545 355) rotate(4)">
                  <rect
                    x="0"
                    y="0"
                    width="108"
                    height="116"
                    rx="12"
                    fill="rgba(255,255,255,0.07)"
                    stroke="rgba(151,168,220,0.44)"
                    strokeWidth="1"
                  />
                  <rect x="12" y="14" width="56" height="6" rx="3" fill="rgba(255,255,255,0.45)" />
                  <rect
                    x="12"
                    y="24"
                    width="38"
                    height="3.5"
                    rx="1.7"
                    fill="rgba(255,255,255,0.22)"
                  />
                  <rect
                    x="12"
                    y="38"
                    width="84"
                    height="13"
                    rx="3"
                    fill="rgba(255,255,255,0.06)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.8"
                  />
                  <rect
                    x="12"
                    y="56"
                    width="84"
                    height="13"
                    rx="3"
                    fill="rgba(255,255,255,0.06)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.8"
                  />
                  <rect x="12" y="84" width="58" height="16" rx="8" fill="rgba(143,188,143,0.55)" />
                </g>

                {/* Growth curve */}
                <g className="art-curve">
                  <path
                    d="M 270 466 C 350 452, 420 420, 470 380 S 580 240, 632 142"
                    fill="none"
                    stroke="url(#medCurve)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeDasharray="3 5"
                    opacity="0.7"
                  />
                  <circle cx="632" cy="142" r="11" fill="#8FBC8F" opacity="0.22" />
                  <circle cx="632" cy="142" r="5" fill="#8FBC8F" />
                </g>

                {/* Analytics bars */}
                <g className="art-bars" transform="translate(415 458)">
                  <rect x="0" y="14" width="8" height="14" rx="1.5" fill="rgba(255,255,255,0.18)" />
                  <rect x="12" y="8" width="8" height="20" rx="1.5" fill="rgba(255,255,255,0.26)" />
                  <rect x="24" y="2" width="8" height="26" rx="1.5" fill="rgba(143,188,143,0.55)" />
                  <rect
                    x="36"
                    y="-4"
                    width="8"
                    height="32"
                    rx="1.5"
                    fill="rgba(143,188,143,0.78)"
                  />
      </g>
    </svg>
  </div>
));
StatFeaturedArt.displayName = 'StatFeaturedArt';

const Results = () => {
  const head = useHomeResultsHead();
  const featured = useHomeResultsFeatured();
  const smallStats = useHomeResultsSmallStats();

  return (
    <section className="results-section" id="results" aria-labelledby="results-title">
      <div className="container-shell">
        <div className="results-head">
          <span className="results-eyebrow">{head.eyebrow}</span>
          <h2 id="results-title" className="results-h2">
            {head.title}
          </h2>
          <p className="results-sub">{head.sub}</p>
        </div>

        <div className="stats-grid">
          {/* Big featured dark card */}
          <article className="stat-featured" aria-label={featured.ariaLabel}>
            <StatFeaturedArt />
            <span className="stat-tag">{featured.tag}</span>
            <p className="stat-num">
              <CountUp to={featured.value} suffix={featured.suffix} duration={featured.duration} />
            </p>
            <p className="stat-label">{featured.label}</p>
            <span className="stat-arrow" aria-hidden="true">
              <ArrowIcon size={16} strokeWidth={1.8} />
            </span>
          </article>

          {/* Right column - 3 stacked cards */}
          <div className="stats-right">
            {smallStats.map(({ key, tag, value, prefix, suffix, decimals, label, ariaLabel }) => (
              <article key={key} className="stat-card" aria-label={ariaLabel}>
                <span className="stat-tag">{tag}</span>
                <p className="stat-num">
                  <CountUp
                    to={value}
                    prefix={prefix}
                    suffix={suffix}
                    decimals={decimals ?? 0}
                    duration={1.8}
                  />
                </p>
                <p className="stat-label">{label}</p>
                <span className="stat-card-arrow">
                  <ArrowIcon size={14} strokeWidth={1.8} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
