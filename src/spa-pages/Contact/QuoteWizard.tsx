import { Fragment, useMemo, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon, ClockIcon } from '@/components/icons';
import { submitContactLead } from '@/lib/contact-lead';

interface Choice {
  value: string;
  label: string;
  meta: string;
  icon: ReactElement;
}

interface FormData {
  facility: string | null;
  scale: string | null;
  budget: string | null;
  goals: string[];
  name: string;
  email: string;
}

const ICON_BOLT = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const ICON_CLOCK = <ClockIcon size={20} />;
const ICON_HEART = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const ICON_GRID = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const ICON_PIN = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ICON_DOLLAR = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const ICON_PHONE = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const ICON_LOCK = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ICON_MAP = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);
const ICON_STAR = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);
const ICON_CALENDAR = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ICON_CHART = (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);
const ICON_CHECK = (
  <svg
    width={11}
    height={11}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ICON_ARROW_RIGHT = <ArrowIcon size={14} />;
const ICON_ARROW_LEFT = (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const TOTAL_STEPS = 5;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ChoiceButton = ({
  choice,
  selected,
  onClick,
}: {
  choice: Choice;
  selected: boolean;
  onClick: () => void;
}) => (
  <button type="button" className={`ct-choice${selected ? ' is-selected' : ''}`} onClick={onClick}>
    <span className="ct-choice-ico" aria-hidden="true">
      {choice.icon}
    </span>
    <span className="ct-choice-body">
      <span className="ct-choice-label">{choice.label}</span>
      <span className="ct-choice-meta">{choice.meta}</span>
    </span>
    <span className="ct-choice-check" aria-hidden="true">
      {ICON_CHECK}
    </span>
  </button>
);

const QuoteWizard = () => {
  const { t } = useTranslation('contact');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    facility: null,
    scale: null,
    budget: null,
    goals: [],
    name: '',
    email: '',
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const stepLabels = useMemo(
    () => [
      t('quote.stepLabels.facility'),
      t('quote.stepLabels.scale'),
      t('quote.stepLabels.budget'),
      t('quote.stepLabels.goals'),
      t('quote.stepLabels.contact'),
    ],
    [t]
  );

  const facilityChoices: Choice[] = useMemo(
    () => [
      {
        value: 'Freestanding ER',
        label: t('quote.steps.facility.choices.fser.label'),
        meta: t('quote.steps.facility.choices.fser.meta'),
        icon: ICON_BOLT,
      },
      {
        value: 'Urgent Care',
        label: t('quote.steps.facility.choices.urgent.label'),
        meta: t('quote.steps.facility.choices.urgent.meta'),
        icon: ICON_CLOCK,
      },
      {
        value: 'Wellness Clinic',
        label: t('quote.steps.facility.choices.wellness.label'),
        meta: t('quote.steps.facility.choices.wellness.meta'),
        icon: ICON_HEART,
      },
      {
        value: 'Multi-Specialty',
        label: t('quote.steps.facility.choices.multi.label'),
        meta: t('quote.steps.facility.choices.multi.meta'),
        icon: ICON_GRID,
      },
    ],
    [t]
  );

  const scaleChoices: Choice[] = useMemo(
    () => [
      {
        value: '1 Location',
        label: t('quote.steps.scale.choices.single.label'),
        meta: t('quote.steps.scale.choices.single.meta'),
        icon: ICON_PIN,
      },
      {
        value: '2 - 5 Locations',
        label: t('quote.steps.scale.choices.small.label'),
        meta: t('quote.steps.scale.choices.small.meta'),
        icon: ICON_PIN,
      },
      {
        value: '6 - 10 Locations',
        label: t('quote.steps.scale.choices.mid.label'),
        meta: t('quote.steps.scale.choices.mid.meta'),
        icon: ICON_PIN,
      },
      {
        value: '10+ Locations',
        label: t('quote.steps.scale.choices.enterprise.label'),
        meta: t('quote.steps.scale.choices.enterprise.meta'),
        icon: ICON_PIN,
      },
    ],
    [t]
  );

  const budgetChoices: Choice[] = useMemo(
    () => [
      {
        value: 'Under $5,000',
        label: t('quote.steps.budget.choices.under5k.label'),
        meta: t('quote.steps.budget.choices.under5k.meta'),
        icon: ICON_DOLLAR,
      },
      {
        value: '$5,000 - $15,000',
        label: t('quote.steps.budget.choices.growth.label'),
        meta: t('quote.steps.budget.choices.growth.meta'),
        icon: ICON_DOLLAR,
      },
      {
        value: '$15,000 - $50,000',
        label: t('quote.steps.budget.choices.scale.label'),
        meta: t('quote.steps.budget.choices.scale.meta'),
        icon: ICON_DOLLAR,
      },
      {
        value: '$50,000+',
        label: t('quote.steps.budget.choices.enterprise.label'),
        meta: t('quote.steps.budget.choices.enterprise.meta'),
        icon: ICON_DOLLAR,
      },
    ],
    [t]
  );

  const goalChoices: Choice[] = useMemo(
    () => [
      {
        value: 'Increase Call Volume',
        label: t('quote.steps.goals.choices.callVolume.label'),
        meta: t('quote.steps.goals.choices.callVolume.meta'),
        icon: ICON_PHONE,
      },
      {
        value: 'Reduce Front-Desk Load',
        label: t('quote.steps.goals.choices.frontDesk.label'),
        meta: t('quote.steps.goals.choices.frontDesk.meta'),
        icon: ICON_LOCK,
      },
      {
        value: 'Improve Map Rankings',
        label: t('quote.steps.goals.choices.maps.label'),
        meta: t('quote.steps.goals.choices.maps.meta'),
        icon: ICON_MAP,
      },
      {
        value: 'Automate Reviews',
        label: t('quote.steps.goals.choices.reviews.label'),
        meta: t('quote.steps.goals.choices.reviews.meta'),
        icon: ICON_STAR,
      },
      {
        value: 'Implement AI Scheduling',
        label: t('quote.steps.goals.choices.scheduling.label'),
        meta: t('quote.steps.goals.choices.scheduling.meta'),
        icon: ICON_CALENDAR,
      },
      {
        value: 'Lower Cost Per Acquisition',
        label: t('quote.steps.goals.choices.cpa.label'),
        meta: t('quote.steps.goals.choices.cpa.meta'),
        icon: ICON_CHART,
      },
    ],
    [t]
  );

  const setSingle = (key: 'facility' | 'scale' | 'budget') => (value: string) => {
    setData((d) => ({ ...d, [key]: value }));
  };
  const toggleGoal = (value: string) => {
    setData((d) => ({
      ...d,
      goals: d.goals.includes(value) ? d.goals.filter((g) => g !== value) : [...d.goals, value],
    }));
  };

  const isValid =
    (step === 1 && data.facility !== null) ||
    (step === 2 && data.scale !== null) ||
    (step === 3 && data.budget !== null) ||
    (step === 4 && data.goals.length > 0) ||
    (step === 5 && data.name.trim().length > 1 && EMAIL_RE.test(data.email.trim()));

  const handleNext = async () => {
    if (!isValid || submitting) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      if (sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      // Final step: submit collected wizard data to backend → ContactLead row.
      // The synthesized `message` packs every step's selection so the admin
      // Lead Pipeline view shows the full quote context at a glance.
      setErrorText(null);
      setSubmitting(true);
      const summary = [
        data.facility && `Facility: ${data.facility}`,
        data.scale && `Scale: ${data.scale}`,
        data.budget && `Budget: ${data.budget}`,
        data.goals.length && `Goals: ${data.goals.join(', ')}`,
      ]
        .filter(Boolean)
        .join('\n');
      const result = await submitContactLead({
        name: data.name.trim(),
        email: data.email.trim(),
        businessType: data.facility ?? undefined,
        budget: data.budget ?? undefined,
        message: summary || undefined,
        source: 'quote-wizard',
      });
      setSubmitting(false);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setErrorText(result.message);
      }
    }
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const counter = String(step).padStart(2, '0');
  const nextLabel = step === TOTAL_STEPS ? t('quote.actions.submit') : t('quote.actions.continue');

  return (
    <section ref={sectionRef} className="ct-quote" aria-labelledby="quote-title">
      <div className="container-shell">
        <div className="ct-quote-card reveal d3">
          <div className="ct-progress" aria-label={t('quote.progressAria')}>
            {stepLabels.map((label, i) => {
              const stepNum = i + 1;
              const cls = [
                'ct-progress-step',
                stepNum === step && 'is-active',
                stepNum < step && 'is-done',
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <Fragment key={label}>
                  <div className={cls}>
                    <span className="num">{stepNum}</span>
                    <span>{label}</span>
                  </div>
                  {stepNum < TOTAL_STEPS && <span className="ct-progress-bar" />}
                </Fragment>
              );
            })}
          </div>

          {/* STEP 1: Facility */}
          <div className={`ct-step${step === 1 ? ' is-active' : ''}`}>
            <span className="ct-step-tag">{t('quote.steps.facility.tag')}</span>
            <h2 id="quote-title" className="ct-step-title">
              {t('quote.steps.facility.title')}
            </h2>
            <p className="ct-step-sub">{t('quote.steps.facility.sub')}</p>
            <div className="ct-choices cols-4" role="radiogroup">
              {facilityChoices.map((c) => (
                <ChoiceButton
                  key={c.value}
                  choice={c}
                  selected={data.facility === c.value}
                  onClick={() => setSingle('facility')(c.value)}
                />
              ))}
            </div>
          </div>

          {/* STEP 2: Scale */}
          <div className={`ct-step${step === 2 ? ' is-active' : ''}`}>
            <span className="ct-step-tag">{t('quote.steps.scale.tag')}</span>
            <h2 className="ct-step-title">{t('quote.steps.scale.title')}</h2>
            <p className="ct-step-sub">{t('quote.steps.scale.sub')}</p>
            <div className="ct-choices cols-4" role="radiogroup">
              {scaleChoices.map((c) => (
                <ChoiceButton
                  key={c.value}
                  choice={c}
                  selected={data.scale === c.value}
                  onClick={() => setSingle('scale')(c.value)}
                />
              ))}
            </div>
          </div>

          {/* STEP 3: Budget */}
          <div className={`ct-step${step === 3 ? ' is-active' : ''}`}>
            <span className="ct-step-tag">{t('quote.steps.budget.tag')}</span>
            <h2 className="ct-step-title">{t('quote.steps.budget.title')}</h2>
            <p className="ct-step-sub">{t('quote.steps.budget.sub')}</p>
            <div className="ct-choices cols-4" role="radiogroup">
              {budgetChoices.map((c) => (
                <ChoiceButton
                  key={c.value}
                  choice={c}
                  selected={data.budget === c.value}
                  onClick={() => setSingle('budget')(c.value)}
                />
              ))}
            </div>
          </div>

          {/* STEP 4: Goals */}
          <div className={`ct-step${step === 4 ? ' is-active' : ''}`}>
            <span className="ct-step-tag">{t('quote.steps.goals.tag')}</span>
            <h2 className="ct-step-title">{t('quote.steps.goals.title')}</h2>
            <p className="ct-step-sub">{t('quote.steps.goals.sub')}</p>
            <div className="ct-choices cols-3" role="group">
              {goalChoices.map((c) => (
                <ChoiceButton
                  key={c.value}
                  choice={c}
                  selected={data.goals.includes(c.value)}
                  onClick={() => toggleGoal(c.value)}
                />
              ))}
            </div>
          </div>

          {/* STEP 5: Contact */}
          <div className={`ct-step${step === 5 ? ' is-active' : ''}`}>
            <span className="ct-step-tag">{t('quote.steps.contact.tag')}</span>
            <h2 className="ct-step-title">{t('quote.steps.contact.title')}</h2>
            <p className="ct-step-sub">{t('quote.steps.contact.sub')}</p>
            <div className="ct-fields">
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-name">
                  {t('quote.steps.contact.nameLabel')} <span className="req">{t('quote.steps.contact.required')}</span>
                </label>
                <input
                  className="ct-input"
                  id="ct-name"
                  type="text"
                  placeholder={t('quote.steps.contact.namePlaceholder')}
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                />
              </div>
              <div className="ct-field">
                <label className="ct-label" htmlFor="ct-email">
                  {t('quote.steps.contact.emailLabel')} <span className="req">{t('quote.steps.contact.required')}</span>
                </label>
                <input
                  className="ct-input"
                  id="ct-email"
                  type="email"
                  placeholder={t('quote.steps.contact.emailPlaceholder')}
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Success state */}
          <div className={`ct-success${submitted ? ' is-shown' : ''}`}>
            <div className="ct-success-ico" aria-hidden="true">
              <svg
                width={40}
                height={40}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>{t('quote.success.title')}</h3>
            <p>{t('quote.success.body')}</p>
          </div>

          {/* Action footer */}
          {!submitted && (
            <div className="ct-actions">
              <span className="ct-step-counter">
                <strong>{counter}</strong> {t('quote.actions.stepsSuffix')}
              </span>
              <div className="ct-actions-buttons">
                <button
                  type="button"
                  className="ct-back"
                  disabled={step === 1}
                  onClick={handleBack}
                >
                  {ICON_ARROW_LEFT}
                  {t('quote.actions.back')}
                </button>
                <button type="button" className="ct-next" disabled={!isValid || submitting} onClick={handleNext}>
                  <span>{submitting && step === TOTAL_STEPS ? 'Sending…' : nextLabel}</span>
                  <span className="ico" aria-hidden="true">
                    {ICON_ARROW_RIGHT}
                  </span>
                </button>
              </div>
              {errorText && (
                <p
                  role="alert"
                  style={{ marginTop: 12, fontSize: 13, color: '#b91c1c', textAlign: 'center', flexBasis: '100%' }}
                >
                  {errorText}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteWizard;
