import { useTranslation } from 'react-i18next';
import { ESCALATION } from './data';

const Escalation = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="slax-escalation">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.serviceLevelAgreements.escalation.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.serviceLevelAgreements.escalation.title')}{' '}
            <em>{t('pages:infrastructure.serviceLevelAgreements.escalation.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">
            {t('pages:infrastructure.serviceLevelAgreements.escalation.sub')}
          </p>
        </header>

        <ol className="slax-flow">
          {ESCALATION.map((step, i) => {
            const base = `pages:infrastructure.serviceLevelAgreements.escalation.steps.${step.i18nKey}`;
            return (
              <li key={step.i18nKey} className="slax-flow-step">
                <div className="slax-flow-marker">
                  <span className="slax-flow-num">{t(`${base}.num`)}</span>
                  {i < ESCALATION.length - 1 && (
                    <span className="slax-flow-connector" aria-hidden="true" />
                  )}
                </div>
                <div className="slax-flow-body">
                  <span className="slax-flow-label">{t(`${base}.label`)}</span>
                  <h3 className="slax-flow-title">{t(`${base}.title`)}</h3>
                  <p className="slax-flow-text">{t(`${base}.body`)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Escalation;
