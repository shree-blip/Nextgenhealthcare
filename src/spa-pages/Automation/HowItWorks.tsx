import { useTranslation } from 'react-i18next';

interface Step {
  num: string;
  key: 'step1' | 'step2' | 'step3' | 'step4';
  delayCls: string;
}

const STEPS: Step[] = [
  { num: '01', key: 'step1', delayCls: 'd1' },
  { num: '02', key: 'step2', delayCls: 'd2' },
  { num: '03', key: 'step3', delayCls: 'd3' },
  { num: '04', key: 'step4', delayCls: 'd4' },
];

const HowItWorks = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="how" aria-labelledby="how-title">
      <div className="container-shell">
        <div className="how-head reveal">
          <div className="how-eyebrow">{t('automation:howItWorks.eyebrow')}</div>
          <h2 id="how-title">{t('automation:howItWorks.title')}</h2>
          <p className="how-sub">{t('automation:howItWorks.sub')}</p>
        </div>

        <div className="how-grid">
          {STEPS.map((step) => (
            <div key={step.num} className={`how-step reveal ${step.delayCls}`}>
              <span className="step-num">{step.num}</span>
              <h3>{t(`automation:howItWorks.steps.${step.key}.title`)}</h3>
              <p>{t(`automation:howItWorks.steps.${step.key}.text`)}</p>
            </div>
          ))}
        </div>

        <div className="how-cta reveal d4">
          <a href="#templates" className="au-btn how-btn primary">
            {t('automation:howItWorks.ctaPrimary')}
          </a>
          <a href="#docs" className="au-btn how-btn ghost">
            {t('automation:howItWorks.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
