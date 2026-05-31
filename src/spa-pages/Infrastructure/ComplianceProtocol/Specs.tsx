import { useTranslation } from 'react-i18next';
import { SECTIONS } from './data';

const Specs = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="cpx-specs">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.complianceProtocol.specs.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.complianceProtocol.specs.title')}{' '}
            <em>{t('pages:infrastructure.complianceProtocol.specs.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">{t('pages:infrastructure.complianceProtocol.specs.sub')}</p>
        </header>

        <div className="cpx-spec-grid">
          {SECTIONS.map((s) => {
            const base = `pages:infrastructure.complianceProtocol.specs.sections.${s.i18nKey}`;
            return (
              <article key={s.id} id={s.id} className="cpx-spec-card">
                <header className="cpx-spec-head">
                  <h3 className="cpx-spec-title">{t(`${base}.title`)}</h3>
                </header>
                <p className="cpx-spec-body">{t(`${base}.body`)}</p>
                <dl className="cpx-spec-table">
                  {s.specKeys.map((sk) => (
                    <div key={sk} className="cpx-spec-row">
                      <dt>{t(`${base}.specs.${sk}.k`)}</dt>
                      <dd>{t(`${base}.specs.${sk}.v`)}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specs;
