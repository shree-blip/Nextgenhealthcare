import { useTranslation } from 'react-i18next';

const Challenges = () => {
  const { t } = useTranslation('pages');
  const list = t('pages:onsiteFieldMarketing.challenges.list', {
    returnObjects: true,
  }) as string[];
  return (
    <section className="sl-section ofm-chal-section" id="challenges">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:onsiteFieldMarketing.challenges.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.challenges.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.challenges.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.challenges.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.challenges.secMeta2')}
          </div>
        </div>

        <div className="ofm-chal-grid">
          {list.map((c, i) => (
            <div key={c} className="ofm-chal-item">
              <span className="ofm-chal-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="ofm-chal-text">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
