import { useTranslation } from 'react-i18next';
import jayPhoto from '@/assets/jay-1.webp';

/* -----------------------------------------------------------
   Author / E-E-A-T section. Anala's page has none of this.
   Google's helpful-content + E-E-A-T signals reward visible
   author bios with credentials, especially in YMYL-adjacent
   healthcare niches.
   ----------------------------------------------------------- */

interface Stat {
  num: string;
  label: string;
}

const Strategist = () => {
  const { t } = useTranslation('pages');
  const creds = t('pages:freeGrowthAudit.strategist.creds', { returnObjects: true }) as string[];
  const stats = t('pages:freeGrowthAudit.strategist.stats', { returnObjects: true }) as Stat[];
  return (
    <section className="fga-strategist" aria-labelledby="fga-strat-title">
      <div className="container-shell">
        <div className="fga-strat-grid">
          <figure className="fga-strat-fig">
            <img
              src={jayPhoto}
              alt={t('pages:freeGrowthAudit.strategist.imgAlt')}
              className="fga-strat-photo"
              width={520}
              height={620}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="fga-strat-stamp">
              <span>{t('pages:freeGrowthAudit.strategist.stampName')}</span>
              <span>{t('pages:freeGrowthAudit.strategist.stampRole')}</span>
            </figcaption>
          </figure>

          <div className="fga-strat-body">
            <span className="fga-section-tag">{t('pages:freeGrowthAudit.strategist.tag')}</span>
            <h2 id="fga-strat-title" className="fga-section-h2">
              {t('pages:freeGrowthAudit.strategist.title')}
            </h2>
            <p className="fga-strat-lede">{t('pages:freeGrowthAudit.strategist.lede')}</p>

            <ul className="fga-strat-quotes">
              <li>
                <span aria-hidden="true">&ldquo;</span>
                {t('pages:freeGrowthAudit.strategist.quote')}
              </li>
            </ul>

            <div className="fga-strat-creds">
              {creds.map((c) => (
                <span key={c} className="fga-strat-cred">
                  {c}
                </span>
              ))}
            </div>

            <dl className="fga-strat-stats">
              {stats.map((s) => (
                <div key={s.label} className="fga-strat-stat">
                  <dt>{s.num}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strategist;
