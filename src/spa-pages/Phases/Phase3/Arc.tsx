import { useTranslation } from 'react-i18next';

const Arc = () => {
  const { t } = useTranslation(['pages']);
  const milestones = t('pages:phases.phase3.arc.milestones', { returnObjects: true }) as Record<
    string,
    { day: string; label: string; title: string; strong: string; text: string }
  >;
  return (
    <section className="ph3-arc" aria-labelledby="ph3-arc-title">
      <header className="ph3-arc-head">
        <span className="ph3-arc-eyebrow">{t('pages:phases.phase3.arc.eyebrow')}</span>
        <h2 id="ph3-arc-title">{t('pages:phases.phase3.arc.title')}</h2>
        <p>{t('pages:phases.phase3.arc.lede')}</p>
      </header>

      <figure className="ph3-arc-frame">
        <svg
          viewBox="0 0 1200 460"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={t('pages:phases.phase3.arc.svgAriaLabel')}
        >
          <defs>
            <linearGradient id="ph3ArcLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#576DB5" />
              <stop offset="55%" stopColor="#8FBC8F" />
              <stop offset="100%" stopColor="#B38B6D" />
            </linearGradient>
            <linearGradient id="ph3ArcFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#576DB5" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#576DB5" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* horizontal grid lines */}
          <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
            <line x1="60" y1="80" x2="1140" y2="80" />
            <line x1="60" y1="160" x2="1140" y2="160" />
            <line x1="60" y1="240" x2="1140" y2="240" />
            <line x1="60" y1="320" x2="1140" y2="320" />
          </g>

          {/* axis */}
          <line
            x1="60"
            y1="360"
            x2="1140"
            y2="360"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
          />

          {/* area under curve */}
          <path
            d="M 80 340 C 280 332, 380 300, 480 250 S 760 130, 900 90 S 1080 60, 1140 50 L 1140 360 L 80 360 Z"
            fill="url(#ph3ArcFill)"
          />

          {/* curve itself */}
          <path
            d="M 80 340 C 280 332, 380 300, 480 250 S 760 130, 900 90 S 1080 60, 1140 50"
            fill="none"
            stroke="url(#ph3ArcLine)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* faint vertical markers */}
          <g stroke="rgba(255,255,255,0.08)" strokeDasharray="3 5" strokeWidth="1">
            <line x1="80" y1="60" x2="80" y2="360" />
            <line x1="480" y1="60" x2="480" y2="360" />
            <line x1="780" y1="60" x2="780" y2="360" />
            <line x1="1140" y1="60" x2="1140" y2="360" />
          </g>

          {/* milestone dots - sit on the curve */}
          <g>
            <circle cx="80" cy="340" r="9" fill="#FFFFFF" />
            <circle cx="80" cy="340" r="5" fill="#576DB5" />
            <circle cx="480" cy="250" r="9" fill="#FFFFFF" />
            <circle cx="480" cy="250" r="5" fill="#8FBC8F" />
            <circle cx="780" cy="160" r="9" fill="#FFFFFF" />
            <circle cx="780" cy="160" r="5" fill="#B38B6D" />
            <circle cx="1140" cy="50" r="11" fill="#FFFFFF" />
            <circle cx="1140" cy="50" r="6" fill="#B38B6D" />
            <circle
              cx="1140"
              cy="50"
              r="16"
              fill="none"
              stroke="#B38B6D"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
          </g>

          {/* milestone labels above the curve */}
          <g fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fill="#FFFFFF">
            <text x="80" y="318" fontSize="11" letterSpacing="3" fill="#B38B6D">
              {milestones.day01.label}
            </text>
            <text x="80" y="298" fontSize="14">
              {milestones.day01.title}
            </text>
            <text x="480" y="228" fontSize="11" letterSpacing="3" fill="#B38B6D">
              {milestones.day14.label}
            </text>
            <text x="480" y="208" fontSize="14">
              {milestones.day14.title}
            </text>
            <text x="780" y="138" fontSize="11" letterSpacing="3" fill="#B38B6D">
              {milestones.day21.label}
            </text>
            <text x="780" y="118" fontSize="14">
              {milestones.day21.title}
            </text>
            <text x="1140" y="28" fontSize="11" letterSpacing="3" fill="#B38B6D" textAnchor="end">
              {milestones.day30.label}
            </text>
            <text x="1140" y="8" fontSize="14" textAnchor="end">
              {milestones.day30.title}
            </text>
          </g>

          {/* axis labels */}
          <g
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="2.6"
            fill="rgba(255,255,255,0.55)"
          >
            <text x="60" y="392">
              {milestones.day01.label}
            </text>
            <text x="480" y="392" textAnchor="middle">
              {milestones.day14.label}
            </text>
            <text x="780" y="392" textAnchor="middle">
              {milestones.day21.label}
            </text>
            <text x="1140" y="392" textAnchor="end">
              {milestones.day30.label}
            </text>
          </g>

          {/* y-axis caption */}
          <text
            x="60"
            y="56"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="3"
            fill="rgba(255,255,255,0.45)"
          >
            {t('pages:phases.phase3.arc.axisCaption')}
          </text>

          {/* fig caption */}
          <text
            x="1140"
            y="56"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="3"
            fill="rgba(255,255,255,0.45)"
            textAnchor="end"
          >
            {t('pages:phases.phase3.arc.figCaption')}
          </text>
        </svg>
        <figcaption>{t('pages:phases.phase3.arc.figure')}</figcaption>
      </figure>

      <ol className="ph3-arc-legend">
        <li style={{ ['--ph3-marker' as string]: '#576DB5' }}>
          <span className="d">{milestones.day01.day}</span>
          <strong>{milestones.day01.strong}</strong>
          <p>{milestones.day01.text}</p>
        </li>
        <li style={{ ['--ph3-marker' as string]: '#8FBC8F' }}>
          <span className="d">{milestones.day14.day}</span>
          <strong>{milestones.day14.strong}</strong>
          <p>{milestones.day14.text}</p>
        </li>
        <li style={{ ['--ph3-marker' as string]: '#B38B6D' }}>
          <span className="d">{milestones.day21.day}</span>
          <strong>{milestones.day21.strong}</strong>
          <p>{milestones.day21.text}</p>
        </li>
        <li style={{ ['--ph3-marker' as string]: '#B38B6D' }}>
          <span className="d">{milestones.day30.day}</span>
          <strong>{milestones.day30.strong}</strong>
          <p>{milestones.day30.text}</p>
        </li>
      </ol>
    </section>
  );
};

export default Arc;
