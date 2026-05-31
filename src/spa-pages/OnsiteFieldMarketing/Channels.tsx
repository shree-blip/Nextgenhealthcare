import { useTranslation } from 'react-i18next';
import { FIELD_CHANNELS } from './data';

const Channels = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section ofm-ch-section" id="channels">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:onsiteFieldMarketing.channelsSection.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.channelsSection.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.channelsSection.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.channelsSection.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.channelsSection.secMeta2')}
          </div>
        </div>

        <div className="ofm-ch-grid">
          {FIELD_CHANNELS.map((c, i) => {
            const tags = t(`pages:onsiteFieldMarketing.channelsSection.items.${c.key}.tags`, {
              returnObjects: true,
            }) as string[];
            return (
              <article key={c.n} className="ofm-ch-card" data-pos={i}>
                <div className="ofm-ch-num">{c.n}</div>
                <div>
                  <h3 className="ofm-ch-name">
                    {t(`pages:onsiteFieldMarketing.channelsSection.items.${c.key}.name`)}
                  </h3>
                  <span className="ofm-ch-summary">
                    {t(`pages:onsiteFieldMarketing.channelsSection.items.${c.key}.summary`)}
                  </span>
                  <p className="ofm-ch-desc">
                    {t(`pages:onsiteFieldMarketing.channelsSection.items.${c.key}.desc`)}
                  </p>
                  <ul className="ofm-ch-list">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Channels;
