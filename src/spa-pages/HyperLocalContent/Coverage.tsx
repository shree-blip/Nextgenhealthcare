import { useTranslation } from 'react-i18next';
import { PinIcon, CompassIcon } from './icons';
import { METROS } from './data';

const Coverage = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hlc-coverage">
      <div className="hlc-shell">
        <header className="hlc-sec-head">
          <span className="hlc-eyebrow">
            <CompassIcon size={12} />
            {t('pages:hyperLocalContent.coverage.eyebrow')}
          </span>
          <h2 className="hlc-sec-title">
            {t('pages:hyperLocalContent.coverage.titleLine1')}{' '}
            <em>{t('pages:hyperLocalContent.coverage.titleAccent')}</em>
          </h2>
          <p className="hlc-sec-sub">{t('pages:hyperLocalContent.coverage.sub')}</p>
        </header>

        <div className="hlc-metro-grid">
          {METROS.map((m, i) => (
            <article key={m.code} className={`hlc-metro-card${i === 0 ? ' is-feature' : ''}`}>
              <div className="hlc-metro-img">
                <img src={m.img} alt="" loading="lazy" decoding="async" />
                <span className="hlc-metro-pages-badge" aria-hidden="true">
                  <PinIcon size={12} />
                  {m.pages} {t('pages:hyperLocalContent.coverage.pagesLabel')}
                </span>
              </div>
              <div className="hlc-metro-body">
                <h3 className="hlc-metro-name">
                  {t(`pages:hyperLocalContent.coverage.metros.${m.key}.name`)}
                </h3>
                <span className="hlc-metro-coord">{m.coord}</span>
                <p className="hlc-metro-signal">
                  {t(`pages:hyperLocalContent.coverage.metros.${m.key}.signal`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coverage;
