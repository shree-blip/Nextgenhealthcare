import { useTranslation } from 'react-i18next';
import { MotionCard } from '@/lib/motion';

const Bento = () => {
  const { t } = useTranslation('pages');
  const steps = t('pages:freeGrowthAudit.bento.tiles.b.steps', { returnObjects: true }) as string[];
  const checks = t('pages:freeGrowthAudit.bento.tiles.d.checks', {
    returnObjects: true,
  }) as string[];
  return (
    <section className="fga-bento-section" aria-labelledby="fga-bento-title">
      <div className="container-shell">
        <header className="fga-section-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.bento.tag')}</span>
          <h2 id="fga-bento-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.bento.title')}
          </h2>
        </header>

        <div className="fga-bento">
          <MotionCard naked tilt={5} className="fga-tile fga-tile-a">
            <div className="fga-tile-eyebrow">{t('pages:freeGrowthAudit.bento.tiles.a.eyebrow')}</div>
            <h3 className="fga-tile-h">{t('pages:freeGrowthAudit.bento.tiles.a.h')}</h3>
            <p className="fga-tile-p">{t('pages:freeGrowthAudit.bento.tiles.a.p')}</p>
            <div className="fga-tile-viz">
              <div className="fga-rings">
                <span className="fga-ring r1" />
                <span className="fga-ring r2" />
                <span className="fga-ring r3" />
                <span className="fga-ring-core">64</span>
              </div>
            </div>
          </MotionCard>

          <MotionCard naked tilt={5} className="fga-tile fga-tile-b">
            <div className="fga-tile-eyebrow">{t('pages:freeGrowthAudit.bento.tiles.b.eyebrow')}</div>
            <h3 className="fga-tile-h">{t('pages:freeGrowthAudit.bento.tiles.b.h')}</h3>
            <p className="fga-tile-p">{t('pages:freeGrowthAudit.bento.tiles.b.p')}</p>
            <div className="fga-funnel">
              {steps.map((s, i) => (
                <div key={s} className={`fga-funnel-step f${i}`}>
                  <span className="fga-funnel-bar" />
                  <span className="fga-funnel-lbl">{s}</span>
                </div>
              ))}
            </div>
          </MotionCard>

          <MotionCard naked tilt={4} className="fga-tile fga-tile-c">
            <div className="fga-tile-eyebrow">{t('pages:freeGrowthAudit.bento.tiles.c.eyebrow')}</div>
            <h3 className="fga-tile-h">{t('pages:freeGrowthAudit.bento.tiles.c.h')}</h3>
            <p className="fga-tile-p">{t('pages:freeGrowthAudit.bento.tiles.c.p')}</p>
          </MotionCard>

          <MotionCard naked tilt={4} className="fga-tile fga-tile-d">
            <div className="fga-tile-eyebrow">{t('pages:freeGrowthAudit.bento.tiles.d.eyebrow')}</div>
            <h3 className="fga-tile-h">{t('pages:freeGrowthAudit.bento.tiles.d.h')}</h3>
            <p className="fga-tile-p">{t('pages:freeGrowthAudit.bento.tiles.d.p')}</p>
            <ul className="fga-checks">
              {checks.map((c) => (
                <li key={c}>
                  <span /> {c}
                </li>
              ))}
            </ul>
          </MotionCard>
        </div>
      </div>
    </section>
  );
};

export default Bento;
