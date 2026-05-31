import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const TeamHero = () => {
  const { t } = useTranslation('pages');

  const stats = useMemo(
    () => [
      {
        num: t('team.hero.stats.practitioners.num'),
        label: t('team.hero.stats.practitioners.label'),
        meta: t('team.hero.stats.practitioners.meta'),
      },
      {
        num: t('team.hero.stats.disciplines.num'),
        label: t('team.hero.stats.disciplines.label'),
        meta: t('team.hero.stats.disciplines.meta'),
      },
      {
        num: t('team.hero.stats.clinics.num'),
        label: t('team.hero.stats.clinics.label'),
        meta: t('team.hero.stats.clinics.meta'),
      },
      {
        num: t('team.hero.stats.hq.num'),
        label: t('team.hero.stats.hq.label'),
        meta: t('team.hero.stats.hq.meta'),
      },
    ],
    [t]
  );

  return (
    <section className="ngt-hero">
      <div className="container-shell">
        <div className="ngt-hero-bar">
          <span className="ngt-hero-bar-k">{t('team.hero.barK')}</span>
          <span className="ngt-hero-bar-line" />
          <span className="ngt-hero-bar-v">{t('team.hero.barV')}</span>
        </div>

        <div className="ngt-hero-grid">
          <h1 className="ngt-hero-h1">
            {t('team.hero.titleStart')} <em>{t('team.hero.titleEm')}</em> {t('team.hero.titleEnd')}
            <span className="ngt-hero-h1-rule" aria-hidden="true" />
          </h1>

          <aside className="ngt-hero-side">
            <p className="ngt-hero-lede">{t('team.hero.lede')}</p>
            <div className="ngt-hero-meta-row">
              <div>
                <span className="ngt-hero-meta-k">{t('team.hero.engagementLabel')}</span>
                <span className="ngt-hero-meta-v">{t('team.hero.engagementValue')}</span>
              </div>
              <div>
                <span className="ngt-hero-meta-k">{t('team.hero.scopeLabel')}</span>
                <span className="ngt-hero-meta-v">{t('team.hero.scopeValue')}</span>
              </div>
            </div>
          </aside>
        </div>

        <div className="ngt-hero-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="ngt-hero-stat">
              <span className="ngt-hero-stat-idx">{String(i + 1).padStart(2, '0')}</span>
              <div className="ngt-hero-stat-num">{s.num}</div>
              <div className="ngt-hero-stat-lbl">{s.label}</div>
              <div className="ngt-hero-stat-meta">{s.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamHero;
