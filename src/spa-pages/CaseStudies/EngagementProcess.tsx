import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface Step {
  key: 'discover' | 'define' | 'ideate' | 'execute' | 'measure';
  icon: ReactElement;
}

const STEPS: Step[] = [
  {
    key: 'discover',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="9" r="4" />
        <path d="M16 13a6 6 0 0 1 6 6v2H2v-2a6 6 0 0 1 6-6" />
        <path d="M12 9v0" />
      </svg>
    ),
  },
  {
    key: 'define',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    key: 'ideate',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c1.2.8 1 1.6 1 2.3v1h6v-1c0-.7-.2-1.5 1-2.3A7 7 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    key: 'execute',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.7 6.3a4.5 4.5 0 0 0-6.4 0L6 8.6l9.4 9.4 2.3-2.3a4.5 4.5 0 0 0 0-6.4z" />
        <path d="M6 8.6l-3 3a2 2 0 0 0 0 2.8l4.6 4.6a2 2 0 0 0 2.8 0l3-3" />
      </svg>
    ),
  },
  {
    key: 'measure',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const EngagementProcess = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="cs-process">
      <div className="container-shell">
        <div className="pr-head">
          <div className="cs-eyebrow">{t('caseStudies.process.eyebrow')}</div>
          <h2>{t('caseStudies.process.title')}</h2>
          <p>{t('caseStudies.process.sub')}</p>
        </div>

        <div className="pr-grid">
          {STEPS.map((step) => {
            const bullets = t(`caseStudies.process.steps.${step.key}.bullets`, {
              returnObjects: true,
            }) as string[];
            return (
              <div key={step.key} className="pr-step">
                <div className="pr-circle">{step.icon}</div>
                <h3>{t(`caseStudies.process.steps.${step.key}.title`)}</h3>
                <ul>
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngagementProcess;
