import { useTranslation } from 'react-i18next';
import { STEPS } from './data';

const Loop = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hcp-loop">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:hipaaCompliance.loop.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:hipaaCompliance.loop.titleLine1')}{' '}
            <em>{t('pages:hipaaCompliance.loop.titleAccent')}</em>
          </h2>
          <p className="gtx-sec-sub">{t('pages:hipaaCompliance.loop.sub')}</p>
        </header>

        <ol className="hcp-loop-grid">
          {STEPS.map((step, i) => (
            <li key={step.num} className="hcp-loop-step">
              <div className="hcp-loop-marker">
                <span className="hcp-loop-num">{step.num}</span>
                {i < STEPS.length - 1 && <span className="hcp-loop-connector" aria-hidden="true" />}
              </div>
              <div className="hcp-loop-body">
                <span className="hcp-loop-label">
                  {t(`pages:hipaaCompliance.loop.steps.${step.key}.label`)}
                </span>
                <h3 className="hcp-loop-title">
                  {t(`pages:hipaaCompliance.loop.steps.${step.key}.title`)}
                </h3>
                <p className="hcp-loop-text">
                  {t(`pages:hipaaCompliance.loop.steps.${step.key}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Loop;
