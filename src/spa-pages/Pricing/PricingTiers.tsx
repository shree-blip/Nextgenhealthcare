import { useTranslation } from 'react-i18next';
import { ArrowIcon, CheckIcon, XIcon } from '@/components/icons';
import { useTiers } from '@/content/pricing/tiers';

const PricingTiers = () => {
  const { t } = useTranslation('pricing');
  const tiers = useTiers();

  return (
    <section className="pr-tiers" aria-labelledby="pr-tiers-title">
      <div className="container-shell">
        <div className="pr-section-head">
          <span className="pr-section-eyebrow">{t('tiers.eyebrow')}</span>
          <h2 id="pr-tiers-title" className="pr-section-h2">
            {t('tiers.title')}
          </h2>
          <p className="pr-section-sub">{t('tiers.subtitle')}</p>
        </div>

        <div className="pr-tiers-grid">
          {tiers.map((tier) => (
            <article key={tier.name} className={`pr-tier${tier.featured ? ' is-featured' : ''}`}>
              {tier.badge && <span className="pr-tier-badge">{tier.badge}</span>}
              <span className="pr-tier-name">{tier.name}</span>
              <div className="pr-tier-price">
                <span className="pr-tier-amount">{tier.amount}</span>
                {tier.period && <span className="pr-tier-period">{tier.period}</span>}
              </div>
              <p className="pr-tier-tagline">{tier.tagline}</p>

              <div className="pr-tier-bestfor">
                <span className="pr-tier-bestfor-label">{t('tiers.bestForLabel')}</span>
                <span className="pr-tier-bestfor-text">{tier.bestFor}</span>
              </div>

              <a
                href={tier.ctaHref}
                className="pr-tier-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tier.ctaLabel}
                <ArrowIcon size={13} />
              </a>

              <span className="pr-tier-section-label">{tier.includesLabel}</span>
              <ul className="pr-tier-list">
                {tier.includes.map((item) => (
                  <li key={item}>
                    <span className="check">
                      <CheckIcon size={10} strokeWidth={3.2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {tier.notIncluded && tier.notIncluded.length > 0 && (
                <>
                  <div className="pr-tier-divider" />
                  <span className="pr-tier-section-label">{tier.notLabel}</span>
                  <ul className="pr-tier-list is-not">
                    {tier.notIncluded.map((item) => (
                      <li key={item}>
                        <span className="x">
                          <XIcon size={9} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tier.notes && tier.notes.length > 0 && (
                <>
                  <div className="pr-tier-divider" />
                  <span className="pr-tier-section-label">{tier.notesLabel}</span>
                  <ul className="pr-tier-list">
                    {tier.notes.map((item) => (
                      <li key={item}>
                        <span className="check">
                          <CheckIcon size={10} strokeWidth={3.2} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
