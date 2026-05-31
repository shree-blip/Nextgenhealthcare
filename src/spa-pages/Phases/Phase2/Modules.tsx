import { useTranslation } from 'react-i18next';

const Modules = () => {
  const { t } = useTranslation(['pages']);
  const items = t('pages:phases.phase2.modules.items', { returnObjects: true }) as Record<
    string,
    { num: string; title: string; text: string }
  >;
  const footStrategy = t('pages:phases.phase2.modules.footStrategy');
  const footBuild = t('pages:phases.phase2.modules.footBuild');
  return (
    <>
      <div className="ph2-section-bar">
        <span className="lbl">{t('pages:phases.phase2.modules.label')}</span>
        <span className="title">{t('pages:phases.phase2.modules.title')}</span>
        <span
          className="meta"
          dangerouslySetInnerHTML={{ __html: t('pages:phases.phase2.modules.meta') }}
        />
      </div>

      <div className="ph2-modules">
        <article className="ph2-mod">
          <span className="ph2-mod-num">{items.keywordMap.num}</span>
          <h3 className="ph2-mod-title">{items.keywordMap.title}</h3>
          <p className="ph2-mod-text">{items.keywordMap.text}</p>
          <div className="ph2-mod-foot">{footStrategy}</div>
        </article>
        <article className="ph2-mod accent">
          <span className="ph2-mod-num">{items.chatbot.num}</span>
          <h3 className="ph2-mod-title">{items.chatbot.title}</h3>
          <p className="ph2-mod-text">{items.chatbot.text}</p>
          <div className="ph2-mod-foot">{footBuild}</div>
        </article>
        <article className="ph2-mod">
          <span className="ph2-mod-num">{items.positioning.num}</span>
          <h3 className="ph2-mod-title">{items.positioning.title}</h3>
          <p className="ph2-mod-text">{items.positioning.text}</p>
          <div className="ph2-mod-foot">{footStrategy}</div>
        </article>
        <article className="ph2-mod sage">
          <span className="ph2-mod-num">{items.callTracking.num}</span>
          <h3 className="ph2-mod-title">{items.callTracking.title}</h3>
          <p className="ph2-mod-text">{items.callTracking.text}</p>
          <div className="ph2-mod-foot">{footBuild}</div>
        </article>

        <article className="ph2-mod">
          <span className="ph2-mod-num">{items.journey.num}</span>
          <h3 className="ph2-mod-title">{items.journey.title}</h3>
          <p className="ph2-mod-text">{items.journey.text}</p>
          <div className="ph2-mod-foot">{footStrategy}</div>
        </article>
        <article className="ph2-mod">
          <span className="ph2-mod-num">{items.intake.num}</span>
          <h3 className="ph2-mod-title">{items.intake.title}</h3>
          <p className="ph2-mod-text">{items.intake.text}</p>
          <div className="ph2-mod-foot">{footBuild}</div>
        </article>
        <article className="ph2-mod sage">
          <span className="ph2-mod-num">{items.editorial.num}</span>
          <h3 className="ph2-mod-title">{items.editorial.title}</h3>
          <p className="ph2-mod-text">{items.editorial.text}</p>
          <div className="ph2-mod-foot">{footStrategy}</div>
        </article>
        <article className="ph2-mod accent">
          <span className="ph2-mod-num">{items.analytics.num}</span>
          <h3 className="ph2-mod-title">{items.analytics.title}</h3>
          <p className="ph2-mod-text">{items.analytics.text}</p>
          <div className="ph2-mod-foot">{footBuild}</div>
        </article>
      </div>
    </>
  );
};

export default Modules;
