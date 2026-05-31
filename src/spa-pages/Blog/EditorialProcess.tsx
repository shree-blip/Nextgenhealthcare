import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface Step {
  cls: string;
  num: string;
  i18nKey: 'research' | 'draft' | 'review' | 'publish';
  icon: ReactElement;
  expand?: boolean;
}

const STEPS: Step[] = [
  {
    cls: 's1',
    num: '1',
    i18nKey: 'research',
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    cls: 's2',
    num: '2',
    i18nKey: 'draft',
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
      </svg>
    ),
  },
  {
    cls: 's3',
    num: '3',
    i18nKey: 'review',
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    cls: 's4',
    num: '4',
    i18nKey: 'publish',
    icon: (
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 2L11 13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    expand: true,
  },
];

const EditorialProcess = () => {
  const { t } = useTranslation('blog');

  return (
    <section className="bl-process" aria-labelledby="bl-process-title">
      <div className="container-shell">
        <div className="bl-process-head">
          <span className="bl-process-eyebrow">{t('editorialProcess.eyebrow')}</span>
          <h2 id="bl-process-title" className="bl-process-h2">
            {t('editorialProcess.title')}
          </h2>
          <p className="bl-process-sub">{t('editorialProcess.sub')}</p>

          <div className="bl-process-range">
            <span className="bl-process-range-pill">{t('editorialProcess.rangeStart')}</span>
            <span className="bl-process-range-pill is-end">{t('editorialProcess.rangeEnd')}</span>
          </div>
        </div>

        <div className="bl-steps">
          {STEPS.map((step) => (
            <article key={step.cls} className={`bl-step ${step.cls}`}>
              <div className="bl-step-badge">
                <span className="bl-step-badge-text">
                  {t(`editorialProcess.steps.${step.i18nKey}.duration`)}
                </span>
              </div>
              <div className="bl-step-card">
                {step.expand && (
                  <button
                    className="bl-step-expand"
                    type="button"
                    aria-label={t('editorialProcess.expandLabel')}
                  >
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </button>
                )}
                <div className="bl-step-head">
                  <span className="bl-step-ico" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3 className="bl-step-title">
                    <span className="bl-step-num">{step.num}</span>{' '}
                    {t(`editorialProcess.steps.${step.i18nKey}.title`)}
                  </h3>
                </div>
                <p className="bl-step-text">{t(`editorialProcess.steps.${step.i18nKey}.text`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialProcess;
