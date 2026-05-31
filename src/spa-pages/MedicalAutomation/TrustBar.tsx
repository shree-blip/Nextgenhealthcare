import { useTranslation } from 'react-i18next';

const TrustBar = () => {
  const { t } = useTranslation('pages');
  const badges = t('pages:medicalAutomation.trustBar.badges', { returnObjects: true }) as string[];
  return (
    <section className="mau-trust" aria-label={t('pages:medicalAutomation.trustBar.lbl')}>
      <div className="container-shell">
        <div className="mau-trust-head">
          <span className="mau-trust-lbl">{t('pages:medicalAutomation.trustBar.lbl')}</span>
          <span className="mau-trust-sep" aria-hidden="true" />
          <span>{t('pages:medicalAutomation.trustBar.reviewed')}</span>
        </div>
        <div className="mau-trust-track">
          {badges.map((b) => (
            <span key={b} className="mau-trust-pill">
              <span className="mau-trust-dot" aria-hidden="true" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
