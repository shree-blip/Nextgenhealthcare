import { useTranslation } from 'react-i18next';
import jayPhoto from '../../assets/jay-1.webp';

const Founder = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="ngt-section ngt-founder">
      <div className="container-shell">
        <div className="ngt-mark">
          <span className="ngt-mark-num">{t('team.founder.markNum')}</span>
          <span className="ngt-mark-lbl">{t('team.founder.markLabel')}</span>
          <span className="ngt-mark-line" />
          <span className="ngt-mark-meta">{t('team.founder.markMeta')}</span>
        </div>

        <div className="ngt-fd-grid">
          <figure className="ngt-fd-fig">
            <div className="ngt-fd-photo-wrap">
              <img
                src={jayPhoto}
                alt={t('team.founder.photoAlt')}
                className="ngt-fd-photo"
                width={520}
                height={620}
                decoding="async"
                fetchPriority="high"
              />
              <span className="ngt-fd-stamp">{t('team.founder.stamp')}</span>
            </div>
          </figure>

          <div className="ngt-fd-body">
            <div className="ngt-fd-eyebrow">
              <span className="ngt-fd-eyebrow-rule" aria-hidden="true" />
              {t('team.founder.eyebrow')}
            </div>

            <div className="ngt-fd-plate">
              <h2 className="ngt-fd-name">{t('team.founder.name')}</h2>
              <span className="ngt-fd-name-rule" aria-hidden="true" />
            </div>

            <div className="ngt-fd-creds">
              <span className="ngt-fd-cred">{t('team.founder.creds.cpa')}</span>
              <span className="ngt-fd-cred">{t('team.founder.creds.ctc')}</span>
              <span className="ngt-fd-cred ngt-fd-cred-ghost">{t('team.founder.creds.strategist')}</span>
            </div>

            <p className="ngt-fd-role">{t('team.founder.role')}</p>

            <div className="ngt-fd-bio">
              <p>{t('team.founder.bio1')}</p>
              <p>{t('team.founder.bio2')}</p>
            </div>

            <blockquote className="ngt-fd-quote">
              <span className="ngt-fd-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              {t('team.founder.quote')}
              <span className="ngt-fd-quote-mark ngt-fd-quote-mark-end" aria-hidden="true">
                &rdquo;
              </span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
