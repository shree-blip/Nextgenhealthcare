import { useTranslation } from 'react-i18next';
import { PROCESS } from './data';

const Process = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section ofm-proc-section" id="process">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:onsiteFieldMarketing.process.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.process.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.process.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.process.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.process.secMeta2')}
          </div>
        </div>

        <div className="ofm-proc-rail">
          <div className="ofm-proc-line" aria-hidden="true" />
          <div className="ofm-proc-grid">
            {PROCESS.map((p) => (
              <article key={p.n} className="ofm-proc-card">
                <div className="ofm-proc-dot">{p.n}</div>
                <div className="ofm-proc-time">
                  {t(`pages:onsiteFieldMarketing.process.items.${p.key}.t`)}
                </div>
                <h3 className="ofm-proc-name">
                  {t(`pages:onsiteFieldMarketing.process.items.${p.key}.k`)}
                </h3>
                <p className="ofm-proc-desc">
                  {t(`pages:onsiteFieldMarketing.process.items.${p.key}.d`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
