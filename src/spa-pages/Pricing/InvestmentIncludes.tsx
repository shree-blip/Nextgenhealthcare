import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@/components/icons';
import { useIncludeCards } from '@/content/pricing/includes';

const InvestmentIncludes = () => {
  const { t } = useTranslation('pricing');
  const cards = useIncludeCards();

  return (
    <section className="pr-includes" aria-labelledby="pr-inc-title">
      <div className="container-shell">
        <div className="pr-section-head">
          <span className="pr-section-eyebrow">{t('includes.eyebrow')}</span>
          <h2 id="pr-inc-title" className="pr-section-h2">
            {t('includes.title')}
          </h2>
          <p className="pr-section-sub">{t('includes.subtitle')}</p>
        </div>

        <div className="pr-includes-grid">
          {cards.map((card) => (
            <article key={card.tag} className="pr-include-card">
              <span className="pr-include-icon" aria-hidden="true">
                {card.icon}
              </span>
              <span className="pr-include-tag">{card.tag}</span>
              <h3 className="pr-include-title">{card.title}</h3>
              <p className="pr-include-text">{card.text}</p>
              <ul className="pr-include-list">
                {card.bullets.map((bullet, i) => (
                  <li key={i}>
                    <CheckIcon />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentIncludes;
