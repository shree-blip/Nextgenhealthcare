import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@/components/icons';

const Promise = () => {
  const { t } = useTranslation(['automation']);
  const list = t('automation:templates.page.promise.items', { returnObjects: true });
  const items: string[] = Array.isArray(list) ? (list as string[]) : [];

  return (
    <section className="atx-promise" aria-labelledby="atx-promise-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.promise.label')}</span>
          <h2 id="atx-promise-title" className="adv-h2">
            {t('automation:templates.page.promise.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.promise.intro')}</p>
        </header>
        <ul className="atx-promise-list">
          {items.map((p, i) => (
            <li key={i} className="atx-promise-item">
              <span className="atx-promise-box">
                <CheckIcon size={14} strokeWidth={2.6} />
              </span>
              <span className="atx-promise-num">/{String(i + 1).padStart(2, '0')}</span>
              <span className="atx-promise-text">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Promise;
