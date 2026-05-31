import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Pillar {
  num: string;
  label: string;
  title: string;
  body: string;
}

const PILLAR_KEYS = [
  { num: '01', i18nKey: 'talent' as const },
  { num: '02', i18nKey: 'scope' as const },
  { num: '03', i18nKey: 'cadence' as const },
  { num: '04', i18nKey: 'staffing' as const },
  { num: '05', i18nKey: 'strategy' as const },
  { num: '06', i18nKey: 'measurement' as const },
];

const Pillars = () => {
  const { t } = useTranslation('pages');

  const pillars: Pillar[] = useMemo(
    () =>
      PILLAR_KEYS.map((spec) => ({
        num: spec.num,
        label: t(`team.pillars.items.${spec.i18nKey}.label`),
        title: t(`team.pillars.items.${spec.i18nKey}.title`),
        body: t(`team.pillars.items.${spec.i18nKey}.body`),
      })),
    [t]
  );

  return (
    <section className="ngt-section ngt-pillars">
      <div className="container-shell">
        <div className="ngt-mark">
          <span className="ngt-mark-num">{t('team.pillars.markNum')}</span>
          <span className="ngt-mark-lbl">{t('team.pillars.markLabel')}</span>
          <span className="ngt-mark-line" />
          <span className="ngt-mark-meta">{t('team.pillars.markMeta')}</span>
        </div>

        <header className="ngt-pl-head">
          <h2 className="ngt-pl-h2">
            {t('team.pillars.titleStart')} <em>{t('team.pillars.titleEm')}</em>
          </h2>
          <div className="ngt-pl-head-meta">
            <div>
              <span className="ngt-pl-k">{t('team.pillars.indexLabel')}</span>
              <span className="ngt-pl-v">{t('team.pillars.indexValue')}</span>
            </div>
            <div>
              <span className="ngt-pl-k">{t('team.pillars.domainLabel')}</span>
              <span className="ngt-pl-v">{t('team.pillars.domainValue')}</span>
            </div>
            <div>
              <span className="ngt-pl-k">{t('team.pillars.versionLabel')}</span>
              <span className="ngt-pl-v">{t('team.pillars.versionValue')}</span>
            </div>
          </div>
        </header>

        <ul className="ngt-pl-grid">
          {pillars.map((p) => (
            <li key={p.num} className="ngt-pl-cell">
              <div className="ngt-pl-cell-head">
                <span className="ngt-pl-cell-num">{p.num}</span>
                <span className="ngt-pl-cell-label">{p.label}</span>
              </div>
              <h3 className="ngt-pl-cell-title">{p.title}</h3>
              <p className="ngt-pl-cell-body">{p.body}</p>
              <span className="ngt-pl-cell-bar" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Pillars;
