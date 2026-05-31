import { useTranslation } from 'react-i18next';
import { ROLES } from './data';

const Team = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="gtx-team">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:infrastructure.growthTeam.team.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:infrastructure.growthTeam.team.title')}{' '}
            <em>{t('pages:infrastructure.growthTeam.team.titleEm')}</em>
          </h2>
          <p className="gtx-sec-sub">{t('pages:infrastructure.growthTeam.team.sub')}</p>
        </header>

        <div className="gtx-team-grid">
          {ROLES.map((role) => {
            const base = `pages:infrastructure.growthTeam.team.roles.${role.i18nKey}`;
            const owns = t(`${base}.owns`, { returnObjects: true }) as string[];
            return (
              <article key={role.name} className="gtx-team-card">
                <div className="gtx-team-card-img">
                  <img src={role.photo} alt="" loading="lazy" decoding="async" />
                  <span className="gtx-team-card-hours">{t(`${base}.hours`)}</span>
                </div>
                <div className="gtx-team-card-body">
                  <span className="gtx-team-card-name">{role.name}</span>
                  <h3 className="gtx-team-card-title">{t(`${base}.title`)}</h3>
                  <p className="gtx-team-card-pitch">{t(`${base}.pitch`)}</p>
                  <div className="gtx-team-card-tags">
                    {owns.map((o) => (
                      <span key={o} className="gtx-team-card-tag">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
