import { useTranslation, Trans } from 'react-i18next';
import { COVERAGE, COVERAGE_ICON } from './data';

const Coverage = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-cov-section" id="coverage">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.coverage.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.coverage.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.coverage.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.coverage.secMeta1')}
            <br />
            {t('pages:medicalAutomation.coverage.secMeta2')}
          </div>
        </div>

        <p className="mau-cov-intro">
          <Trans
            i18nKey="pages:medicalAutomation.coverage.intro"
            components={{ strong: <strong /> }}
          />
        </p>

        <div className="mau-cov-grid">
          {COVERAGE.map((c) => {
            const Icon = COVERAGE_ICON[c.key];
            const pct = Math.min(100, (c.high / 14) * 100);
            return (
              <article key={c.key} className="mau-cov-card">
                <div className="mau-cov-top">
                  <div className="mau-cov-icon"><Icon /></div>
                  <span className="mau-cov-hrs">
                    {c.low}-{c.high}<em>{t('pages:medicalAutomation.coverage.hrsSuffix')}</em>
                  </span>
                </div>
                <h3 className="mau-cov-name">
                  {t(`pages:medicalAutomation.coverage.items.${c.key}.area`)}
                </h3>
                <p className="mau-cov-one">
                  {t(`pages:medicalAutomation.coverage.items.${c.key}.one`)}
                </p>
                <div className="mau-cov-bar">
                  <span className="mau-cov-bar-lbl">
                    {t('pages:medicalAutomation.coverage.barLabel')}
                  </span>
                  <div className="mau-cov-bar-track">
                    <div className="mau-cov-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Coverage;
