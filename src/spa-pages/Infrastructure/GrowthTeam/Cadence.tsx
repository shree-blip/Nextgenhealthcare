import { useTranslation } from 'react-i18next';
import { CADENCE } from './data';

const Cadence = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="gtx-cadence">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.growthTeam.cadence.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.growthTeam.cadence.title')}{' '}
            <em>{t('pages:infrastructure.growthTeam.cadence.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">{t('pages:infrastructure.growthTeam.cadence.sub')}</p>
        </header>

        <ol className="gtx-cad-strip">
          {CADENCE.map((c, i) => {
            const base = `pages:infrastructure.growthTeam.cadence.items.${c.i18nKey}`;
            return (
              <li
                key={c.i18nKey}
                className="gtx-cad-cell"
                style={{ '--cell-index': i } as React.CSSProperties}
              >
                <span className="gtx-cad-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="gtx-cad-day">{t(`${base}.day`)}</span>
                <h3 className="gtx-cad-event">{t(`${base}.event`)}</h3>
                <p className="gtx-cad-note">{t(`${base}.note`)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Cadence;
