import { Parallax } from '@/lib/motion';
import {
  useHomeIndustryCopy,
  useHomeIndustryPillars,
  useHomeIndustrySpecialties,
  useHomeIndustryStats,
  useHomeIndustryTags,
} from '@/content/home/industries';

const Industries = () => {
  const copy = useHomeIndustryCopy();
  const specialties = useHomeIndustrySpecialties();
  const tags = useHomeIndustryTags();
  const pillars = useHomeIndustryPillars();
  const stats = useHomeIndustryStats();

  return (
    <section className="industries-section" id="industries" aria-labelledby="ind-title">
      <div className="container-shell">
        <span className="ind-eyebrow">{copy.eyebrow}</span>

        <div className="ind-grid">
          {/* LEFT - visual with floating glass tags. Subtle Parallax wraps the
              whole visual column so the figure drifts as the section enters
              view; floating .ind-tag items keep their own roam animations. */}
          <Parallax as="div" speed={0.05} className="ind-visual" aria-hidden="true">
            <svg className="ind-bg" viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="indHubGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7388C9" />
                  <stop offset="100%" stopColor="#576DB5" />
                </linearGradient>
              </defs>
              {/* concentric dashed orbits */}
              <circle
                cx="300"
                cy="350"
                r="260"
                fill="none"
                stroke="#B38B6D"
                strokeOpacity=".18"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
              <circle
                cx="300"
                cy="350"
                r="190"
                fill="none"
                stroke="#B38B6D"
                strokeOpacity=".25"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
              <circle
                cx="300"
                cy="350"
                r="120"
                fill="none"
                stroke="#B38B6D"
                strokeOpacity=".35"
                strokeWidth="1"
                strokeDasharray="3 6"
              />
              {/* hub-to-edge spokes pointing toward each specialty */}
              <g
                stroke="#B38B6D"
                strokeWidth="1"
                strokeDasharray="4 5"
                opacity=".42"
                strokeLinecap="round"
              >
                <line x1="260.1" y1="295.7" x2="146.5" y2="146.3" />
                <line x1="346.4" y1="300.3" x2="473.9" y2="163.5" />
                <line x1="232.8" y1="339.4" x2="48.1" y2="310.1" />
                <line x1="367.9" y1="353.6" x2="554.6" y2="363.3" />
                <line x1="260.0" y1="405.0" x2="150.1" y2="556.3" />
                <line x1="336.0" y1="407.7" x2="435.1" y2="566.2" />
              </g>
              {/* subtle dot grid */}
              <g fill="#B38B6D" opacity=".25">
                <circle cx="120" cy="140" r="1.6" />
                <circle cx="180" cy="140" r="1.6" />
                <circle cx="420" cy="140" r="1.6" />
                <circle cx="480" cy="140" r="1.6" />
                <circle cx="120" cy="560" r="1.6" />
                <circle cx="180" cy="560" r="1.6" />
                <circle cx="420" cy="560" r="1.6" />
                <circle cx="480" cy="560" r="1.6" />
              </g>
              {/* soft aura behind hub */}
              <circle cx="300" cy="350" r="108" fill="#7388C9" opacity=".09" />
              <circle cx="300" cy="350" r="80" fill="#8FBC8F" opacity=".07" />
              {/* radial pulse rings emanating from hub */}
              <g fill="none" stroke="#576DB5" strokeWidth="1.4">
                <circle cx="300" cy="350" r="68">
                  <animate
                    attributeName="r"
                    values="68;240;240"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values=".5;0;0"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="300" cy="350" r="68">
                  <animate
                    attributeName="r"
                    values="68;240;240"
                    dur="5s"
                    begin="1.67s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values=".5;0;0"
                    dur="5s"
                    begin="1.67s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="300" cy="350" r="68">
                  <animate
                    attributeName="r"
                    values="68;240;240"
                    dur="5s"
                    begin="3.34s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values=".5;0;0"
                    dur="5s"
                    begin="3.34s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
              {/* data nodes at spoke/inner-orbit intersections */}
              <g>
                <circle
                  cx="227.8"
                  cy="254.2"
                  r="4"
                  fill="#fff"
                  stroke="#576DB5"
                  strokeWidth="1.4"
                />
                <circle
                  cx="381.8"
                  cy="262.2"
                  r="4"
                  fill="#fff"
                  stroke="#576DB5"
                  strokeWidth="1.4"
                />
                <circle
                  cx="181.5"
                  cy="331.2"
                  r="4"
                  fill="#fff"
                  stroke="#576DB5"
                  strokeWidth="1.4"
                />
                <circle
                  cx="419.8"
                  cy="356.3"
                  r="4"
                  fill="#fff"
                  stroke="#576DB5"
                  strokeWidth="1.4"
                />
                <circle
                  cx="229.5"
                  cy="447.1"
                  r="4"
                  fill="#fff"
                  stroke="#576DB5"
                  strokeWidth="1.4"
                />
                <circle
                  cx="363.6"
                  cy="451.8"
                  r="4"
                  fill="#fff"
                  stroke="#576DB5"
                  strokeWidth="1.4"
                />
                <circle cx="227.8" cy="254.2" r="1.6" fill="#576DB5" />
                <circle cx="381.8" cy="262.2" r="1.6" fill="#576DB5" />
                <circle cx="181.5" cy="331.2" r="1.6" fill="#576DB5" />
                <circle cx="419.8" cy="356.3" r="1.6" fill="#576DB5" />
                <circle cx="229.5" cy="447.1" r="1.6" fill="#576DB5" />
                <circle cx="363.6" cy="451.8" r="1.6" fill="#576DB5" />
              </g>
              {/* center hub */}
              <g>
                <circle cx="300" cy="350" r="56" fill="#fff" stroke="#B38B6D" strokeWidth="1.4" />
                <circle cx="300" cy="350" r="44" fill="url(#indHubGrad)" />
                <rect x="294" y="332" width="12" height="36" rx="2" fill="#fff" />
                <rect x="282" y="344" width="36" height="12" rx="2" fill="#fff" />
                <circle
                  cx="300"
                  cy="350"
                  r="68"
                  fill="none"
                  stroke="#576DB5"
                  strokeOpacity=".25"
                  strokeWidth="1"
                />
              </g>
              {/* sage halo */}
              <circle
                cx="300"
                cy="350"
                r="86"
                fill="none"
                stroke="#8FBC8F"
                strokeOpacity=".35"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              {/* plus marks */}
              <g fill="#B38B6D" opacity=".55">
                <path d="M70 340 h8 v3 h-8 z M73 337 h2 v9 h-2 z" />
                <path d="M520 340 h10 v3 h-10 z M524 336 h2 v11 h-2 z" />
                <path d="M295 100 h10 v3 h-10 z M299 96 h2 v11 h-2 z" />
                <path d="M295 600 h10 v3 h-10 z M299 596 h2 v11 h-2 z" />
              </g>
              {/* baseline ground */}
              <line
                x1="80"
                y1="640"
                x2="520"
                y2="640"
                stroke="#B38B6D"
                strokeOpacity=".30"
                strokeWidth="1"
              />
              <circle cx="80" cy="640" r="2.5" fill="#B38B6D" />
              <circle cx="520" cy="640" r="2.5" fill="#B38B6D" />
              <text
                x="36"
                y="36"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontSize="9"
                fill="#718096"
                letterSpacing="2"
              >
                FIG. 02
              </text>
            </svg>

            {tags.map(({ slot, name, icon }) => (
              <span key={slot} className={`ind-tag ${slot}`}>
                <span className="tag-ico">{icon}</span>
                {name}
              </span>
            ))}
          </Parallax>

          {/* RIGHT - dark panel */}
          <div className="ind-panel">
            <h2 id="ind-title" className="ind-h2">
              {copy.title}
            </h2>
            <p className="ind-lead">{copy.lead}</p>

            <div className="ind-stats">
              {stats.map((s) => (
                <div key={s.key} className="ind-stat">
                  <span className="ind-stat-label">{s.label}</span>
                  <span className="ind-stat-num">{s.num}</span>
                </div>
              ))}
            </div>

            <div className="ind-body">
              <ul className="ind-specs" role="list">
                {specialties.map((s) => (
                  <li key={s.key} className={`ind-spec tone-${s.tone}`}>
                    <span className="ind-spec-ico" aria-hidden="true">
                      {s.icon}
                    </span>
                    <span className="ind-spec-name">{s.name}</span>
                    <span className="ind-spec-meta">{s.meta}</span>
                  </li>
                ))}
              </ul>

              <div className="ind-pillars" aria-label={copy.pillarsLabel}>
                <span className="ind-pillars-label">{copy.pillarsLabel}</span>
                <span className="ind-pillars-rule" aria-hidden="true" />
                <div className="ind-pillars-chips">
                  {pillars.map((p) => (
                    <span key={p} className="ind-pillar">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ind-strap">
                <span className="ind-strap-dot" aria-hidden="true" />
                <span className="ind-strap-text">
                  <strong>{copy.strapBefore}</strong>
                  {copy.strapAfter}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
