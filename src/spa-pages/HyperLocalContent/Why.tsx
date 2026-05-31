import { useTranslation } from 'react-i18next';
import { PinIcon } from './icons';
import { WHY } from './data';

const Why = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hlc-why">
      <div className="hlc-shell">
        <header className="hlc-sec-head">
          <span className="hlc-eyebrow">
            <PinIcon size={12} />
            {t('pages:hyperLocalContent.why.eyebrow')}
          </span>
          <h2 className="hlc-sec-title">
            {t('pages:hyperLocalContent.why.titleLine1')}{' '}
            <em>{t('pages:hyperLocalContent.why.titleAccent')}</em>{' '}
            {t('pages:hyperLocalContent.why.titleSuffix')}
          </h2>
          <p className="hlc-sec-sub">{t('pages:hyperLocalContent.why.sub')}</p>
        </header>

        <div className="hlc-why-grid">
          {WHY.map((w) => (
            <article key={w.key} className="hlc-why-card">
              <div className="hlc-why-card-head">
                <span className="hlc-why-num">
                  {t(`pages:hyperLocalContent.why.items.${w.key}.num`)}
                </span>
                <span className="hlc-why-hint">
                  {t(`pages:hyperLocalContent.why.items.${w.key}.hint`)}
                </span>
              </div>
              <h3 className="hlc-why-title">
                {t(`pages:hyperLocalContent.why.items.${w.key}.title`)}
              </h3>
              <p className="hlc-why-body">{t(`pages:hyperLocalContent.why.items.${w.key}.body`)}</p>
              <span className="hlc-why-line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;
