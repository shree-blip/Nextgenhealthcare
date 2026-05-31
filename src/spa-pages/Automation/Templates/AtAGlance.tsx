import { useTranslation } from 'react-i18next';
import { STAT_KEYS, STAT_META } from './data';

const AtAGlance = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-glance" aria-labelledby="atx-glance-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.atAGlance.label')}</span>
          <h2 id="atx-glance-title" className="adv-h2">
            {t('automation:templates.page.atAGlance.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.atAGlance.intro')}</p>
        </header>
        <div className="atx-glance-grid">
          {STAT_KEYS.map((key) => {
            const meta = STAT_META[key];
            return (
              <article key={key} className={`atx-stat tone-${meta.tone}`}>
                <span className="atx-stat-id">/{meta.id}</span>
                <span className="atx-stat-label">
                  {t(`automation:templates.page.atAGlance.stats.${key}.label`)}
                </span>
                <span className="atx-stat-value">{meta.value}</span>
                <p className="atx-stat-desc">
                  {t(`automation:templates.page.atAGlance.stats.${key}.desc`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AtAGlance;
