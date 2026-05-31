import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { SOLUTION_KEYS, SOLUTION_LINKS } from './data';

const Solutions = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="amih-solutions" id="amih-solutions" aria-labelledby="amih-solutions-title">
      <div className="container-shell">
        <header className="amih-section-head amih-section-head--split">
          <div>
            <span className="amih-section-label">{t('automation:moreInfo.solutions.label')}</span>
            <h2 id="amih-solutions-title" className="amih-h2">
              {t('automation:moreInfo.solutions.title')}
            </h2>
          </div>
          <p className="amih-section-sub">{t('automation:moreInfo.solutions.sub')}</p>
        </header>
        <div className="amih-solutions-grid">
          {SOLUTION_KEYS.map((key) => (
            <article key={key} className="amih-sol-card">
              <span className="amih-sol-tag">
                {t(`automation:moreInfo.solutions.items.${key}.tag`)}
              </span>
              <h3 className="amih-sol-title">
                {t(`automation:moreInfo.solutions.items.${key}.title`)}
              </h3>
              <p className="amih-sol-desc">
                {t(`automation:moreInfo.solutions.items.${key}.desc`)}
              </p>
              <Link to={SOLUTION_LINKS[key]} className="amih-sol-link">
                {t('automation:moreInfo.solutions.readWorkflow')}{' '}
                <ArrowIcon size={14} strokeWidth={2.2} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
