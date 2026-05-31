import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { RELATED_KEYS, RELATED_LINKS } from './data';

const Related = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-related" aria-labelledby="atx-related-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.related.label')}</span>
          <h2 id="atx-related-title" className="adv-h2">
            {t('automation:templates.page.related.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.related.intro')}</p>
        </header>
        <div className="atx-related-grid">
          {RELATED_KEYS.map((key, i) => (
            <Link key={key} to={RELATED_LINKS[key]} className="atx-related-card">
              <span className="atx-related-num">/{String(i + 1).padStart(2, '0')}</span>
              <span className="atx-related-cat">
                {t(`automation:templates.page.related.items.${key}.cat`)}
              </span>
              <h3 className="atx-related-title">
                {t(`automation:templates.page.related.items.${key}.title`)}
              </h3>
              <p className="atx-related-desc">
                {t(`automation:templates.page.related.items.${key}.desc`)}
              </p>
              <span className="atx-related-cta">
                {t('automation:templates.page.related.read')} <ArrowIcon size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Related;
