import { useTranslation } from 'react-i18next';

const Scorecard = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph1-card-block">
      <div className="ph1-card-text">
        <span className="lbl">{t('pages:phases.phase1.scorecard.label')}</span>
        <h2>{t('pages:phases.phase1.scorecard.title')}</h2>
        <p>{t('pages:phases.phase1.scorecard.lede')}</p>
      </div>

      <div className="ph1-mock" role="img" aria-label={t('pages:phases.phase1.scorecard.mockAlt')}>
        <div className="ph1-mock-bar">
          <i />
          <i />
          <i />
          <span className="name">{t('pages:phases.phase1.scorecard.mockTitle')}</span>
        </div>
        <div className="ph1-mock-grid">
          <div className="ph1-mock-row">
            <div className="k">{t('pages:phases.phase1.scorecard.rows.cwv.k')}</div>
            <div className="v">
              {t('pages:phases.phase1.scorecard.rows.cwv.v')}
              <em className="bad">{t('pages:phases.phase1.scorecard.rows.cwv.verdict')}</em>
            </div>
            <div className="bar">
              <i style={{ width: '42%' }} />
            </div>
          </div>
          <div className="ph1-mock-row">
            <div className="k">{t('pages:phases.phase1.scorecard.rows.localPack.k')}</div>
            <div className="v">
              {t('pages:phases.phase1.scorecard.rows.localPack.v')}
              <em className="warn">{t('pages:phases.phase1.scorecard.rows.localPack.verdict')}</em>
            </div>
            <div className="bar">
              <i style={{ width: '28%' }} />
            </div>
          </div>
          <div className="ph1-mock-row">
            <div className="k">{t('pages:phases.phase1.scorecard.rows.gbp.k')}</div>
            <div className="v">
              {t('pages:phases.phase1.scorecard.rows.gbp.v')}
              <em className="warn">{t('pages:phases.phase1.scorecard.rows.gbp.verdict')}</em>
            </div>
            <div className="bar">
              <i style={{ width: '68%' }} />
            </div>
          </div>
          <div className="ph1-mock-row">
            <div className="k">{t('pages:phases.phase1.scorecard.rows.schema.k')}</div>
            <div className="v">
              {t('pages:phases.phase1.scorecard.rows.schema.v')}
              <em className="bad">{t('pages:phases.phase1.scorecard.rows.schema.verdict')}</em>
            </div>
            <div className="bar">
              <i style={{ width: '12%' }} />
            </div>
          </div>
          <div className="ph1-mock-row">
            <div className="k">{t('pages:phases.phase1.scorecard.rows.cpl.k')}</div>
            <div className="v">
              {t('pages:phases.phase1.scorecard.rows.cpl.v')}
              <em className="bad">{t('pages:phases.phase1.scorecard.rows.cpl.verdict')}</em>
            </div>
            <div className="bar">
              <i style={{ width: '82%' }} />
            </div>
          </div>
          <div className="ph1-mock-row">
            <div className="k">{t('pages:phases.phase1.scorecard.rows.callAnswer.k')}</div>
            <div className="v">
              {t('pages:phases.phase1.scorecard.rows.callAnswer.v')}
              <em className="warn">{t('pages:phases.phase1.scorecard.rows.callAnswer.verdict')}</em>
            </div>
            <div className="bar">
              <i style={{ width: '61%' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scorecard;
