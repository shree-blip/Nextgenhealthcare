import { useTranslation, Trans } from 'react-i18next';

interface MetricItem {
  v: string;
  unit?: string;
  k: string;
  d: string;
}

const Metrics = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:onsiteFieldMarketing.metrics.items', {
    returnObjects: true,
  }) as MetricItem[];
  return (
    <section className="sl-section ofm-met-section" id="results">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:onsiteFieldMarketing.metrics.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.metrics.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.metrics.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.metrics.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.metrics.secMeta2')}
          </div>
        </div>

        <div className="ofm-met-grid">
          {items.map((m) => (
            <article key={m.k} className="ofm-met-card">
              <div className="ofm-met-num">
                {m.v}
                {m.unit && <em>{m.unit}</em>}
              </div>
              <div className="ofm-met-lbl">{m.k}</div>
              <p className="ofm-met-sub">{m.d}</p>
            </article>
          ))}
        </div>

        <p className="ofm-met-note">
          <Trans
            i18nKey="pages:onsiteFieldMarketing.metrics.note"
            components={{ strong: <strong /> }}
          />
        </p>
      </div>
    </section>
  );
};

export default Metrics;
