import { useTranslation } from 'react-i18next';
import { WHO_FOR_KEYS } from './data';

const WhoFor = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-who" aria-labelledby="atx-who-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.whoFor.label')}</span>
          <h2 id="atx-who-title" className="adv-h2">
            {t('automation:templates.page.whoFor.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.whoFor.intro')}</p>
        </header>
        <div className="atx-who-grid">
          {WHO_FOR_KEYS.map((key, i) => (
            <article key={key} className="atx-who-card">
              <span className="atx-who-num">/{String(i + 1).padStart(2, '0')}</span>
              <h3 className="atx-who-title">
                {t(`automation:templates.page.whoFor.items.${key}.label`)}
              </h3>
              <p className="atx-who-desc">
                {t(`automation:templates.page.whoFor.items.${key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoFor;
