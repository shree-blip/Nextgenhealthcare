import { useTranslation } from 'react-i18next';
import { WORKFLOWS, WORKFLOW_ICON } from './data';

const Workflows = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-wf-section" id="workflows">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.workflows.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.workflows.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.workflows.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.workflows.secMeta1')}
            <br />
            {t('pages:medicalAutomation.workflows.secMeta2')}
          </div>
        </div>

        <div className="mau-wf-grid">
          {WORKFLOWS.map((w) => {
            const Icon = WORKFLOW_ICON[w.key];
            return (
              <article key={w.key} className="mau-wf-card">
                <div className="mau-wf-top">
                  <div className="mau-wf-icon"><Icon /></div>
                  <span className="mau-wf-num">{w.n}</span>
                </div>
                <h3 className="mau-wf-name">
                  {t(`pages:medicalAutomation.workflows.items.${w.key}.name`)}
                </h3>
                <span className="mau-wf-trigger">
                  {t('pages:medicalAutomation.workflows.triggerPrefix')}{' '}
                  {t(`pages:medicalAutomation.workflows.items.${w.key}.trigger`)}
                </span>
                <p
                  className="mau-wf-desc"
                  dangerouslySetInnerHTML={{
                    __html: t(`pages:medicalAutomation.workflows.items.${w.key}.desc`),
                  }}
                />
                <div className="mau-wf-foot">
                  <span className="mau-wf-out">
                    {t('pages:medicalAutomation.workflows.outcomePrefix')}{' '}
                    {t(`pages:medicalAutomation.workflows.items.${w.key}.outcome`)}
                  </span>
                  <span className="mau-wf-meta">
                    {t(`pages:medicalAutomation.workflows.items.${w.key}.meta`)}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workflows;
