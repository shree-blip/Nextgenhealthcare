import { useTranslation } from 'react-i18next';
import { RECORDS } from './data';

const TrackRecord = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="slax-record">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.serviceLevelAgreements.trackRecord.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.serviceLevelAgreements.trackRecord.title')}{' '}
            <em>{t('pages:infrastructure.serviceLevelAgreements.trackRecord.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">
            {t('pages:infrastructure.serviceLevelAgreements.trackRecord.sub')}
          </p>
        </header>

        <div className="slax-record-grid">
          {RECORDS.map((r, i) => {
            const base = `pages:infrastructure.serviceLevelAgreements.trackRecord.items.${r.i18nKey}`;
            return (
              <article
                key={r.i18nKey}
                className={`slax-record-card ${i === 0 ? 'is-feature' : ''}`}
              >
                <span className="slax-record-eyebrow">{t(`${base}.eyebrow`)}</span>
                <div className="slax-record-num">{t(`${base}.value`)}</div>
                <div className={`slax-record-delta is-${r.delta}`}>
                  {r.delta === 'up' && <span aria-hidden="true">↑ </span>}
                  {r.delta === 'down' && <span aria-hidden="true">↓ </span>}
                  {t(`${base}.target`)}
                </div>
                <p className="slax-record-note">{t(`${base}.note`)}</p>
              </article>
            );
          })}
        </div>

        <p className="slax-record-footnote">
          {t('pages:infrastructure.serviceLevelAgreements.trackRecord.footnote')}
        </p>
      </div>
    </section>
  );
};

export default TrackRecord;
