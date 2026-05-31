import { useTranslation, Trans } from 'react-i18next';
import { METRICS } from './data';

const Metrics = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-met-section" id="results">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.metrics.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.metrics.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.metrics.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.metrics.secMeta1')}
            <br />
            {t('pages:medicalAutomation.metrics.secMeta2')}
          </div>
        </div>

        <div className="mau-met-grid">
          {METRICS.map((m) => {
            const formatted = m.decimals ? m.value.toFixed(m.decimals) : String(m.value);
            return (
              <article key={m.key} className="mau-met-card">
                <div className="mau-met-num">
                  {m.prefix ?? ''}
                  {formatted}
                  {m.suffix && <em>{m.suffix}</em>}
                </div>
                <div className="mau-met-lbl">
                  {t(`pages:medicalAutomation.metrics.items.${m.key}.k`)}
                </div>
                <p className="mau-met-sub">
                  {t(`pages:medicalAutomation.metrics.items.${m.key}.d`)}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mau-met-note">
          <Trans
            i18nKey="pages:medicalAutomation.metrics.note"
            components={{ strong: <strong /> }}
          />
        </p>
      </div>
    </section>
  );
};

export default Metrics;
