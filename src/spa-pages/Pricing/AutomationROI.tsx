import { useTranslation } from 'react-i18next';
import { useStats } from '@/content/pricing/roi-stats';

const AutomationROI = () => {
  const { t } = useTranslation('pricing');
  const stats = useStats();

  return (
    <section className="pr-roi" aria-labelledby="pr-roi-title">
      <div className="container-shell">
        <div className="pr-roi-grid">
          <div className="pr-roi-text">
            <span className="pr-roi-eyebrow">{t('roi.eyebrow')}</span>
            <h2 id="pr-roi-title" className="pr-roi-h2">
              {t('roi.title')}
            </h2>
            <p>
              {t('roi.p1Before')}
              <strong>{t('roi.p1Bold')}</strong>
              {t('roi.p1After')}
            </p>
            <p>
              {t('roi.p2Before')}
              <strong>{t('roi.p2Bold')}</strong>
              {t('roi.p2After')}
            </p>
          </div>

          <div className="pr-roi-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="pr-stat">
                <span className="pr-stat-icon" aria-hidden="true">
                  {stat.icon}
                </span>
                <div className="pr-stat-num">{stat.num}</div>
                <h3 className="pr-stat-label">{stat.label}</h3>
                <p className="pr-stat-text">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationROI;
