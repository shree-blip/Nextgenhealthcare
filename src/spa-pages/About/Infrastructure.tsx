import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon, CheckIcon } from '@/components/icons';
import { useInfraCards } from '@/content/about/infrastructure';

const Infrastructure = () => {
  const { t } = useTranslation('about');
  const cards = useInfraCards();

  return (
    <section id="infrastructure" className="ab-infra" aria-labelledby="ab-infra-title">
      <div className="container-shell">
        <div className="ab-infra-head">
          <span className="ab-infra-eyebrow">{t('infrastructure.eyebrow')}</span>
          <h2 id="ab-infra-title" className="ab-infra-h2">
            {t('infrastructure.title')}
          </h2>
          <p className="ab-infra-sub">{t('infrastructure.subtitle')}</p>
        </div>

        <div className="ab-infra-grid">
          {cards.map((card) => (
            <Link
              key={card.tag}
              to={card.to}
              className={`ab-infra-card${card.featured ? ' is-featured' : ''}`}
              aria-label={t('infrastructure.ariaLabel', { tag: card.tag })}
            >
              <span className="ab-infra-icon" aria-hidden="true">
                {card.icon}
              </span>
              <span className="ab-infra-tag">{card.tag}</span>
              <h3 className="ab-infra-title">{card.title}</h3>
              <p className="ab-infra-text">{card.text}</p>
              <ul className="ab-infra-list">
                {card.bullets.map((b) => (
                  <li key={b}>
                    <span className="check" aria-hidden="true">
                      <CheckIcon size={10} strokeWidth={3.2} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <span className="ab-infra-cta" aria-hidden="true">
                {t('infrastructure.learnMore')}
                <ArrowIcon size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
