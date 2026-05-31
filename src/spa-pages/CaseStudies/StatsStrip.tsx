import { useTranslation } from 'react-i18next';

interface Stat {
  num: string;
  suffix?: string;
  i18nKey: 'clinics' | 'revenue' | 'roi' | 'appointments';
}

const STATS: Stat[] = [
  { num: '47', suffix: '+', i18nKey: 'clinics' },
  { num: '$12M', suffix: '+', i18nKey: 'revenue' },
  { num: '210', suffix: '%', i18nKey: 'roi' },
  { num: '500K', suffix: '+', i18nKey: 'appointments' },
];

const StatsStrip = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="cs-stats" aria-label={t('caseStudies.stats.ariaLabel')}>
      <div className="container-shell">
        <div className="cs-stats-grid">
          {STATS.map((stat) => (
            <div key={stat.i18nKey} className="cs-stat-item">
              <div className="cs-stat-num">
                {stat.num}
                {stat.suffix && <em>{stat.suffix}</em>}
              </div>
              <div className="cs-stat-lbl">{t(`caseStudies.stats.items.${stat.i18nKey}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
