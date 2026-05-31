import { useTranslation, Trans } from 'react-i18next';
import { DELIVERABLES } from './data';

const Deliverables = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section ofm-dlv-section" id="deliverables">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">
              {t('pages:onsiteFieldMarketing.deliverables.secNum')}
            </div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.deliverables.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.deliverables.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.deliverables.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.deliverables.secMeta2')}
          </div>
        </div>

        <p className="ofm-dlv-intro">
          <Trans
            i18nKey="pages:onsiteFieldMarketing.deliverables.intro"
            components={{ strong: <strong /> }}
          />
        </p>

        <div className="ofm-dlv-grid">
          {DELIVERABLES.map((d, i) => {
            const list = t(`pages:onsiteFieldMarketing.deliverables.items.${d.key}.list`, {
              returnObjects: true,
            }) as string[];
            return (
              <article key={d.key} className="ofm-dlv-card" data-pos={i}>
                <span className="ofm-dlv-tag">
                  {t(`pages:onsiteFieldMarketing.deliverables.items.${d.key}.tag`)}
                </span>
                <ul className="ofm-dlv-list">
                  {list.map((item) => (
                    <li key={item}>
                      <span className="ofm-dlv-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
