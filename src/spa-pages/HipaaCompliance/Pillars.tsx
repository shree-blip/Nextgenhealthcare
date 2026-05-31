import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@/components/icons';
import { PILLARS } from './data';

const Pillars = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hcp-pillars">
      <div className="gt-shell">
        <header className="gtx-sec-head">
          <span className="gtx-eyebrow">
            <span className="gtx-eyebrow-dot" aria-hidden="true" />
            {t('pages:hipaaCompliance.pillars.eyebrow')}
          </span>
          <h2 className="gtx-sec-title">
            {t('pages:hipaaCompliance.pillars.titleLine1')}{' '}
            <em>{t('pages:hipaaCompliance.pillars.titleAccent')}</em>
          </h2>
          <p className="gtx-sec-sub">{t('pages:hipaaCompliance.pillars.sub')}</p>
        </header>

        <div className="hcp-pillar-grid">
          {PILLARS.map((p) => {
            const items = t(`pages:hipaaCompliance.pillars.items.${p.key}.items`, {
              returnObjects: true,
            }) as string[];
            return (
              <article key={p.num} className={`hcp-pillar-card tone-${p.tone}`}>
                <div className="hcp-pillar-head">
                  <span className="hcp-pillar-icon" aria-hidden="true">
                    {p.icon}
                  </span>
                  <span className="hcp-pillar-num" aria-hidden="true">
                    /{p.num}
                  </span>
                </div>
                <h3 className="hcp-pillar-tag">
                  {t(`pages:hipaaCompliance.pillars.items.${p.key}.tag`)}
                </h3>
                <p className="hcp-pillar-desc">
                  {t(`pages:hipaaCompliance.pillars.items.${p.key}.description`)}
                </p>
                <ul className="hcp-pillar-list">
                  {items.map((item) => (
                    <li key={item}>
                      <span className="hcp-pillar-check" aria-hidden="true">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
