import { useTranslation } from 'react-i18next';

const POINT_KEYS = ['what', 'where', 'how', 'keep'] as const;

const Brief = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-brief-section" id="brief">
      <div className="container-shell">
        <div className="mau-brief-grid">
          <div>
            <span className="mau-brief-eyebrow">{t('pages:medicalAutomation.brief.eyebrow')}</span>
            <h2 className="mau-brief-title">
              {t('pages:medicalAutomation.brief.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.brief.titleAccent')}</em>
            </h2>
            <p className="mau-brief-lead">{t('pages:medicalAutomation.brief.lead')}</p>
            <p className="mau-brief-body">{t('pages:medicalAutomation.brief.body')}</p>

            <div className="mau-brief-row">
              {POINT_KEYS.map((k) => (
                <div key={k} className="mau-brief-pt">
                  <span className="mau-brief-pt-h">
                    {t(`pages:medicalAutomation.brief.points.${k}.h`)}
                  </span>
                  <span className="mau-brief-pt-d">
                    {t(`pages:medicalAutomation.brief.points.${k}.d`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mau-brief-art" aria-hidden="true">
            <div className="mau-brief-art-card tall">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 14H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.3 7.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1c0 .7.4 1.3 1 1.5a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8c.2.6.8 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg>
              </span>
              <span className="nm">{t('pages:medicalAutomation.brief.art.engine.nm')}</span>
              <span className="sub">{t('pages:medicalAutomation.brief.art.engine.sub')}</span>
            </div>
            <div className="mau-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
              </span>
              <span className="nm">{t('pages:medicalAutomation.brief.art.connect.nm')}</span>
              <span className="sub">{t('pages:medicalAutomation.brief.art.connect.sub')}</span>
            </div>
            <div className="mau-brief-art-card">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6Z" /></svg>
              </span>
              <span className="nm">{t('pages:medicalAutomation.brief.art.ai.nm')}</span>
              <span className="sub">{t('pages:medicalAutomation.brief.art.ai.sub')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brief;
