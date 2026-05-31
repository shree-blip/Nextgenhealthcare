import { useTranslation } from 'react-i18next';
import { PinIcon } from './icons';
import { ANATOMY } from './data';

const Anatomy = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="hlc-anatomy">
      <div className="hlc-shell">
        <header className="hlc-sec-head">
          <span className="hlc-eyebrow">
            <PinIcon size={12} />
            {t('pages:hyperLocalContent.anatomy.eyebrow')}
          </span>
          <h2 className="hlc-sec-title">
            {t('pages:hyperLocalContent.anatomy.titleLine1')}{' '}
            <em>{t('pages:hyperLocalContent.anatomy.titleAccent')}</em>
          </h2>
          <p className="hlc-sec-sub">{t('pages:hyperLocalContent.anatomy.sub')}</p>
        </header>

        <ol className="hlc-anatomy-grid">
          {ANATOMY.map((a, i) => (
            <li key={a.key} className="hlc-anatomy-step">
              <div className="hlc-anatomy-step-head">
                <span className="hlc-anatomy-num">
                  {t(`pages:hyperLocalContent.anatomy.items.${a.key}.num`)}
                </span>
                {i < ANATOMY.length - 1 && <span className="hlc-anatomy-line" aria-hidden="true" />}
              </div>
              <span className="hlc-anatomy-marker">
                {t(`pages:hyperLocalContent.anatomy.items.${a.key}.marker`)}
              </span>
              <h3 className="hlc-anatomy-title">
                {t(`pages:hyperLocalContent.anatomy.items.${a.key}.k`)}
              </h3>
              <p className="hlc-anatomy-body">
                {t(`pages:hyperLocalContent.anatomy.items.${a.key}.d`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Anatomy;
