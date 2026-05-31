import { useTranslation } from 'react-i18next';

const TrustBar = () => {
  const { t } = useTranslation('pages');
  const badges = t('pages:onsiteFieldMarketing.trustBar.badges', {
    returnObjects: true,
  }) as string[];
  return (
    <section className="ofm-trust" aria-label={t('pages:onsiteFieldMarketing.trustBar.lbl')}>
      <div className="container-shell">
        <div className="ofm-trust-head">
          <span className="ofm-trust-lbl">{t('pages:onsiteFieldMarketing.trustBar.lbl')}</span>
          <span className="ofm-trust-sep" aria-hidden="true" />
          <span>{t('pages:onsiteFieldMarketing.trustBar.audited')}</span>
        </div>
        <div className="ofm-trust-track">
          {badges.map((b) => (
            <span key={b} className="ofm-trust-pill">
              <span className="ofm-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
