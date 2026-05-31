import { useTranslation } from 'react-i18next';
import erImg from '@/assets/nextgen-image/Erofwhiterockimg.jpg';
import patientImg from '@/assets/nextgen-image/Patientgrowthimg.png';
import logo from '@/assets/the-nextgen-logo.png';

const ArrowUp = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="20" y1="20" x2="16.5" y2="16.5" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

const ScreenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SOLUTION_KEYS = [
  ['audited', 'rebuilt'],
  ['tightened', 'tuned'],
  ['rewrote', 'trained'],
] as const;

const CaseStudySpotlight = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="cs-spotlight" aria-labelledby="cs-spotlight-title">
      <div className="container-shell">
        <article className="cssp-card">
          <header className="cssp-head">
            <div className="cssp-head-text">
              <span className="cssp-tag">{t('caseStudies.spotlight.tag')}</span>
              <h2 id="cs-spotlight-title" className="cssp-title">
                {t('caseStudies.spotlight.title')}
              </h2>
            </div>
            <div className="cssp-head-logo" aria-hidden="true">
              <img src={logo} alt="" />
            </div>
          </header>

          <div className="cssp-body">
            <div className="cssp-row cssp-row-challenge">
              <div className="cssp-media">
                <img src={erImg} alt={t('caseStudies.spotlight.erImgAlt')} />
              </div>
              <div className="cssp-copy">
                <h3 className="cssp-h">{t('caseStudies.spotlight.challengeHeading')}</h3>
                <p>{t('caseStudies.spotlight.challengeBody')}</p>
              </div>
            </div>

            <div className="cssp-row cssp-row-solution">
              <h3 className="cssp-h">{t('caseStudies.spotlight.solutionHeading')}</h3>
              <div className="cssp-sol-grid">
                {SOLUTION_KEYS.map((group, idx) => (
                  <div key={idx} className="cssp-sol-item">
                    {group.map((key) => (
                      <p key={key}>
                        <strong>{t(`caseStudies.spotlight.solutionItems.${key}Strong`)}</strong>
                        {t(`caseStudies.spotlight.solutionItems.${key}Rest`)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="cssp-row cssp-row-results">
              <div className="cssp-results-copy">
                <h3 className="cssp-h">{t('caseStudies.spotlight.resultsHeading')}</h3>
                <p>{t('caseStudies.spotlight.resultsBody1')}</p>
                <p>{t('caseStudies.spotlight.resultsBody2')}</p>
                <ul className="cssp-stats-row">
                  <li>
                    <ArrowUp />
                    <div>
                      <strong>45%</strong>
                      <span>{t('caseStudies.spotlight.stats.visits')}</span>
                    </div>
                  </li>
                  <li>
                    <SearchIcon />
                    <div>
                      <strong>14%</strong>
                      <span>{t('caseStudies.spotlight.stats.paidSearch')}</span>
                    </div>
                  </li>
                  <li>
                    <MailIcon />
                    <div>
                      <strong>5%</strong>
                      <span>{t('caseStudies.spotlight.stats.email')}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="cssp-results-panel">
                <div className="cssp-results-stat">
                  <span className="cssp-arrow">
                    <ArrowUp />
                  </span>
                  <strong>45%</strong>
                  <em>{t('caseStudies.spotlight.stats.visitsLabel')}</em>
                </div>
                <div className="cssp-results-stat">
                  <strong>620%</strong>
                  <em>
                    <ScreenIcon /> {t('caseStudies.spotlight.stats.roasLabel')}
                  </em>
                </div>
                <div className="cssp-results-photo">
                  <img src={patientImg} alt={t('caseStudies.spotlight.patientImgAlt')} />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CaseStudySpotlight;
