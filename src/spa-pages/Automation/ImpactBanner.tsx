import { useTranslation } from 'react-i18next';

interface Stat {
  key: 'hoursSaved' | 'noShowDrop' | 'roi';
}

const STATS: Stat[] = [
  { key: 'hoursSaved' },
  { key: 'noShowDrop' },
  { key: 'roi' },
];

const Dots = () => (
  <span className="ic-dots">
    <span />
    <span />
    <span />
  </span>
);

const ImpactBanner = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="impact" aria-labelledby="impact-title">
      <div className="container-shell">
        <div className="impact-banner reveal">
          <div className="impact-visual">
            <div className="impact-3d">
              <div className="impact-card ic-back">
                <div className="ic-head">
                  <Dots />
                </div>
              </div>
              <div className="impact-card ic-mid">
                <div className="ic-head">
                  <Dots />
                  <span className="ic-tag">{t('automation:impact.live')}</span>
                </div>
                <div className="ic-flow">
                  <div className="ic-step">
                    <span className="ic-num">1</span>
                    {t('automation:impact.steps.step1')}
                    <span className="ic-pulse" />
                  </div>
                  <div className="ic-step">
                    <span className="ic-num">2</span>
                    {t('automation:impact.steps.step2')}
                    <span className="ic-pulse" />
                  </div>
                  <div className="ic-step">
                    <span className="ic-num">3</span>
                    {t('automation:impact.steps.step3')}
                  </div>
                  <div className="ic-step">
                    <span className="ic-num">4</span>
                    {t('automation:impact.steps.step4')}
                  </div>
                </div>
              </div>
              <div className="impact-card ic-front">
                <div className="ic-head">
                  <Dots />
                  <span className="ic-tag">{t('automation:impact.reminder')}</span>
                </div>
                <div className="ic-flow">
                  <div className="ic-step">
                    <span className="ic-num">✓</span>
                    {t('automation:impact.steps.confirmed')}
                  </div>
                  <div className="ic-step">
                    <span className="ic-num">✓</span>
                    {t('automation:impact.steps.slack')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="impact-content">
            <div className="impact-eyebrow">{t('automation:impact.eyebrow')}</div>
            <h2 className="impact-title" id="impact-title">
              {t('automation:impact.title')}
            </h2>
            <p className="impact-lede">{t('automation:impact.lede')}</p>

            <div className="impact-stats">
              {STATS.map((stat) => (
                <div key={stat.key} className="impact-stat">
                  <div className="label">{t(`automation:impact.stats.${stat.key}.label`)}</div>
                  <div className="value">{t(`automation:impact.stats.${stat.key}.value`)}</div>
                  <div className="desc">{t(`automation:impact.stats.${stat.key}.desc`)}</div>
                </div>
              ))}
            </div>

            <div className="impact-foot">
              <span className="impact-badge">{t('automation:impact.badge')}</span>
              <span className="impact-note">{t('automation:impact.note')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactBanner;
