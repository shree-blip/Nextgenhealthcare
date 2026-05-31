import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import jayPhoto from '../../assets/jay-1.webp';
import { ArrowIcon } from '@/components/icons';
import { useFounderCreds } from '@/content/about/team';

const Team = () => {
  const { t } = useTranslation('about');
  const creds = useFounderCreds();

  return (
    <section className="ab-team" aria-labelledby="ab-team-title">
      <div className="container-shell">
        <div className="ab-team-head">
          <span className="ab-team-eyebrow">{t('team.eyebrow')}</span>
          <h2 id="ab-team-title" className="ab-team-h2">
            {t('team.title')}
          </h2>
          <p className="ab-team-sub">{t('team.subtitle')}</p>
        </div>

        <article className="ab-founder">
          <div className="ab-founder-portrait">
            <img src={jayPhoto} alt={t('team.founder.name')} width={128} height={192} loading="lazy" decoding="async" />
          </div>

          <div className="ab-founder-body">
            <span className="ab-founder-tag">{t('team.founder.tag')}</span>
            <h3 className="ab-founder-name">{t('team.founder.name')}</h3>
            <p className="ab-founder-role">{t('team.founder.role')}</p>
            <blockquote className="ab-founder-quote">{t('team.founder.quote')}</blockquote>
            <p className="ab-founder-bio">{t('team.founder.bio')}</p>
            <div className="ab-founder-footer">
              <div className="ab-founder-creds">
                {creds.map((c) => (
                  <span key={c} className="ab-founder-cred">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="ab-team-cta-wrap">
          <Link to="/team" className="ab-team-cta">
            {t('team.cta')}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;
