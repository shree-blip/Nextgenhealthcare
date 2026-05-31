import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph3-stats" aria-label={t('pages:phases.phase3.stats.ariaLabel')}>
      <div className="ph3-stat">
        <div className="num">
          30<em>d</em>
        </div>
        <div className="lbl">{t('pages:phases.phase3.stats.launchWindow')}</div>
      </div>
      <div className="ph3-stat">
        <div className="num">04</div>
        <div className="lbl">{t('pages:phases.phase3.stats.liveChannels')}</div>
      </div>
      <div className="ph3-stat">
        <div className="num">
          100<em>%</em>
        </div>
        <div className="lbl">{t('pages:phases.phase3.stats.callsAttributed')}</div>
      </div>
      <div className="ph3-stat">
        <div className="num">01</div>
        <div className="lbl">{t('pages:phases.phase3.stats.sourceOfTruth')}</div>
      </div>
    </section>
  );
};

export default Stats;
