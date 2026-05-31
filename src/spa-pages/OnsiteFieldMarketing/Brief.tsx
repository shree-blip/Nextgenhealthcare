import { useTranslation } from 'react-i18next';

const POINT_KEYS = ['what', 'where', 'how', 'get'] as const;

const Brief = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section ofm-brief-section" id="brief">
      <div className="container-shell">
        <div className="ofm-brief-grid">
          <div>
            <span className="ofm-brief-eyebrow">
              {t('pages:onsiteFieldMarketing.brief.eyebrow')}
            </span>
            <h2 className="ofm-brief-title">
              {t('pages:onsiteFieldMarketing.brief.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.brief.titleAccent')}</em>
            </h2>
            <p className="ofm-brief-lead">{t('pages:onsiteFieldMarketing.brief.lead')}</p>
            <p className="ofm-brief-body">{t('pages:onsiteFieldMarketing.brief.body')}</p>

            <div className="ofm-brief-row">
              {POINT_KEYS.map((k) => (
                <div key={k} className="ofm-brief-pt">
                  <span className="ofm-brief-pt-h">
                    {t(`pages:onsiteFieldMarketing.brief.points.${k}.h`)}
                  </span>
                  <span className="ofm-brief-pt-d">
                    {t(`pages:onsiteFieldMarketing.brief.points.${k}.d`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="ofm-brief-art" aria-hidden="true">
            <div className="ofm-brief-art-card tall">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </span>
              <span className="nm">{t('pages:onsiteFieldMarketing.brief.art.territory.nm')}</span>
              <span className="sub">{t('pages:onsiteFieldMarketing.brief.art.territory.sub')}</span>
            </div>
            <div className="ofm-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="3" /><line x1="9" y1="18" x2="15" y2="18" /></svg>
              </span>
              <span className="nm">{t('pages:onsiteFieldMarketing.brief.art.intake.nm')}</span>
              <span className="sub">{t('pages:onsiteFieldMarketing.brief.art.intake.sub')}</span>
            </div>
            <div className="ofm-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><polyline points="7 14 11 10 14 13 21 6" /></svg>
              </span>
              <span className="nm">{t('pages:onsiteFieldMarketing.brief.art.dashboard.nm')}</span>
              <span className="sub">{t('pages:onsiteFieldMarketing.brief.art.dashboard.sub')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brief;
