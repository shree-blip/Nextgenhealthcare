import { useTranslation } from 'react-i18next';

const DataBand = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-databand" aria-label={t('automation:templates.page.dataBand.ariaLabel')}>
      <div className="container-shell">
        <ul className="atx-databand-list">
          <li className="atx-databand-item">
            <span className="atx-databand-label">
              {t('automation:templates.page.dataBand.workflows')}
            </span>
            <span className="atx-databand-value">
              {t('automation:templates.page.dataBand.workflowsValue')}
            </span>
          </li>
          <li className="atx-databand-item">
            <span className="atx-databand-label">
              {t('automation:templates.page.dataBand.totalSetup')}
            </span>
            <span className="atx-databand-value">
              {t('automation:templates.page.dataBand.totalSetupValue')}
            </span>
          </li>
          <li className="atx-databand-item">
            <span className="atx-databand-label">
              {t('automation:templates.page.dataBand.combinedSavings')}
            </span>
            <span className="atx-databand-value">
              {t('automation:templates.page.dataBand.combinedSavingsValue')}
            </span>
          </li>
          <li className="atx-databand-item">
            <span className="atx-databand-label">
              {t('automation:templates.page.dataBand.platform')}
            </span>
            <span className="atx-databand-value">
              {t('automation:templates.page.dataBand.platformValue')}
            </span>
          </li>
          <li className="atx-databand-item">
            <span className="atx-databand-label">
              {t('automation:templates.page.dataBand.complianceModes')}
            </span>
            <span className="atx-databand-value">
              {t('automation:templates.page.dataBand.complianceModesValue')}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DataBand;
