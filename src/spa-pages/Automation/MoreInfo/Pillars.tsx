import { useTranslation } from 'react-i18next';
import { PILLAR_KEYS, PILLAR_NUMS } from './data';

const Pillars = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="amih-pillars" aria-labelledby="amih-pillars-title">
      <div className="container-shell">
        <header className="amih-section-head">
          <span className="amih-section-label">{t('automation:moreInfo.pillars.label')}</span>
          <h2 id="amih-pillars-title" className="amih-h2">
            {t('automation:moreInfo.pillars.title')}
          </h2>
        </header>
        <div className="amih-pillars-grid">
          {PILLAR_KEYS.map((key) => (
            <article key={key} className="amih-pillar">
              <span className="amih-pillar-num">{PILLAR_NUMS[key]}</span>
              <h3 className="amih-pillar-title">
                {t(`automation:moreInfo.pillars.items.${key}.title`)}
              </h3>
              <p className="amih-pillar-desc">
                {t(`automation:moreInfo.pillars.items.${key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
