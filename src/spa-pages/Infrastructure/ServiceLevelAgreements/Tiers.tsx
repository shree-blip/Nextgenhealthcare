import { useTranslation } from 'react-i18next';
import { TIERS } from './data';

const Tiers = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="slax-tiers">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.serviceLevelAgreements.tiers.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.serviceLevelAgreements.tiers.title')}{' '}
            <em>{t('pages:infrastructure.serviceLevelAgreements.tiers.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">
            {t('pages:infrastructure.serviceLevelAgreements.tiers.sub')}
          </p>
        </header>

        <div className="slax-tier-grid">
          {TIERS.map((tier) => {
            const base = `pages:infrastructure.serviceLevelAgreements.tiers.items.${tier.i18nKey}`;
            return (
              <article key={tier.i18nKey} className={`slax-tier-card tone-${tier.tone}`}>
                <div className="slax-tier-head">
                  <span className="slax-tier-level">{t(`${base}.level`)}</span>
                  <span className="slax-tier-label">{t(`${base}.label`)}</span>
                </div>
                <p className="slax-tier-desc">{t(`${base}.desc`)}</p>
                <dl className="slax-tier-meta">
                  <div className="slax-tier-row">
                    <dt>{t('pages:infrastructure.serviceLevelAgreements.tiers.ackLabel')}</dt>
                    <dd className="slax-tier-num">{t(`${base}.ack`)}</dd>
                  </div>
                  <div className="slax-tier-row">
                    <dt>{t('pages:infrastructure.serviceLevelAgreements.tiers.resolveLabel')}</dt>
                    <dd className="slax-tier-num">{t(`${base}.resolve`)}</dd>
                  </div>
                  <div className="slax-tier-row">
                    <dt>{t('pages:infrastructure.serviceLevelAgreements.tiers.channelLabel')}</dt>
                    <dd>{t(`${base}.channel`)}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tiers;
