import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@/components/icons';
import { COVERAGE } from './data';

const Coverage = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hcp-coverage">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:hipaaCompliance.coverage.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:hipaaCompliance.coverage.titleLine1')}{' '}
            <em>{t('pages:hipaaCompliance.coverage.titleAccent')}</em>
          </h2>
          <p className="gtx-sec-sub">{t('pages:hipaaCompliance.coverage.sub')}</p>
        </header>

        <div className="hcp-coverage-list">
          {COVERAGE.map((row, i) => (
            <article key={row.key} className="hcp-coverage-row">
              <div className="hcp-coverage-area">
                <span className="hcp-coverage-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="hcp-coverage-icon" aria-hidden="true">
                  {row.icon}
                </span>
                <h3 className="hcp-coverage-area-name">
                  {t(`pages:hipaaCompliance.coverage.rows.${row.key}.area`)}
                </h3>
              </div>
              <div className="hcp-coverage-cell hcp-coverage-in">
                <span className="hcp-coverage-cell-tag">
                  <CheckIcon /> {t('pages:hipaaCompliance.coverage.inLabel')}
                </span>
                <p>{t(`pages:hipaaCompliance.coverage.rows.${row.key}.inScope`)}</p>
              </div>
              <div className="hcp-coverage-cell hcp-coverage-out">
                <span className="hcp-coverage-cell-tag">
                  <XIcon /> {t('pages:hipaaCompliance.coverage.outLabel')}
                </span>
                <p>{t(`pages:hipaaCompliance.coverage.rows.${row.key}.outScope`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coverage;
