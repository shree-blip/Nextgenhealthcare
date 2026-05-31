import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface Solution {
  key: string;
  icon: ReactElement;
}

const SOLUTIONS: Solution[] = [
  {
    key: 'aiChatbot',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="6" width="16" height="13" rx="3" />
        <circle cx="9" cy="12" r="1.2" fill="currentColor" />
        <circle cx="15" cy="12" r="1.2" fill="currentColor" />
        <path d="M9 16h6" />
        <path d="M12 3v3" />
        <circle cx="12" cy="3" r=".8" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'patientIntake',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
        <path d="M9 10h6M9 14h6M9 18h4" />
      </svg>
    ),
  },
  {
    key: 'reviewCollection',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 3 14.5 9 21 9.5 16 14 17.5 21 12 17.5 6.5 21 8 14 3 9.5 9.5 9" />
      </svg>
    ),
  },
  {
    key: 'appointmentReminders',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="13" r="8" />
        <polyline points="12 9 12 13 15 15" />
        <path d="M5 3l-2 2M19 3l2 2" />
      </svg>
    ),
  },
  {
    key: 'insuranceVerification',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    key: 'patientRecall',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="21 4 21 10 15 10" />
        <polyline points="3 20 3 14 9 14" />
        <path d="M3.5 9a9 9 0 0 1 14.85-3.36L21 8M3 16l2.65 2.36A9 9 0 0 0 20.5 15" />
      </svg>
    ),
  },
  {
    key: 'socialPosting',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    key: 'reportingDashboards',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="20" x2="4" y2="11" />
        <line x1="10" y1="20" x2="10" y2="4" />
        <line x1="16" y1="20" x2="16" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

const SolutionsLibrary = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="solutions" aria-labelledby="sol-title">
      <div className="container-shell">
        <div className="sol-head reveal">
          <div className="sol-head-left">
            <div className="section-eyebrow">{t('automation:solutionsLibrary.eyebrow')}</div>
            <h2 className="section-title" id="sol-title">
              {t('automation:solutionsLibrary.title')}
            </h2>
          </div>
          <p className="sol-sub">{t('automation:solutionsLibrary.subtitle')}</p>
        </div>

        <div className="sol-grid reveal d2">
          {SOLUTIONS.map((sol) => (
            <article key={sol.key} className="sol-card">
              <div className="sol-card-top">
                <span className="sol-icon" aria-hidden="true">
                  {sol.icon}
                </span>
              </div>
              <h3 className="sol-title">
                {t(`automation:solutionsLibrary.items.${sol.key}.title`)}
              </h3>
              <p className="sol-desc">{t(`automation:solutionsLibrary.items.${sol.key}.desc`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsLibrary;
