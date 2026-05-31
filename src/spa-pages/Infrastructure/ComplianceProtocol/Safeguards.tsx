import { useTranslation } from 'react-i18next';
import { SAFEGUARDS } from './data';

const Safeguards = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="cpx-safeguards">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.complianceProtocol.safeguards.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.complianceProtocol.safeguards.title')}{' '}
            <em>{t('pages:infrastructure.complianceProtocol.safeguards.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">
            {t('pages:infrastructure.complianceProtocol.safeguards.sub')}
          </p>
        </header>

        <div className="cpx-safeguard-grid">
          {SAFEGUARDS.map((s, i) => {
            const base = `pages:infrastructure.complianceProtocol.safeguards.items.${s.i18nKey}`;
            const items = t(`${base}.items`, { returnObjects: true }) as string[];
            return (
              <article key={s.i18nKey} className={`cpx-safeguard-card tone-${s.tone}`}>
                <span className="cpx-safeguard-num" aria-hidden="true">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <span className="cpx-safeguard-icon" aria-hidden="true">
                  {s.icon}
                </span>
                <h3 className="cpx-safeguard-title">{t(`${base}.tier`)}</h3>
                <p className="cpx-safeguard-desc">{t(`${base}.description`)}</p>
                <ul className="cpx-safeguard-list">
                  {items.map((item) => (
                    <li key={item}>
                      <span className="cpx-safeguard-bullet" aria-hidden="true" />
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

export default Safeguards;
