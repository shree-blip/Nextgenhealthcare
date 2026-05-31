import { useTranslation } from 'react-i18next';
import { PROCESS, PROCESS_ICON } from './data';

const Process = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-proc-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.process.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.process.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.process.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.process.secMeta1')}
            <br />
            {t('pages:medicalAutomation.process.secMeta2')}
          </div>
        </div>

        <div className="mau-proc-rail">
          <div className="mau-proc-line" aria-hidden="true" />
          <div className="mau-proc-grid">
            {PROCESS.map((p) => {
              const Icon = PROCESS_ICON[p.key];
              return (
                <article key={p.n} className="mau-proc-card">
                  <div className="mau-proc-dot"><Icon /></div>
                  <div className="mau-proc-time">
                    {t(`pages:medicalAutomation.process.items.${p.key}.week`)}
                  </div>
                  <h3 className="mau-proc-name">
                    {t(`pages:medicalAutomation.process.items.${p.key}.k`)}
                  </h3>
                  <p className="mau-proc-desc">
                    {t(`pages:medicalAutomation.process.items.${p.key}.d`)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
