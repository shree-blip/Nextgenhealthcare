import { useTranslation } from 'react-i18next';
import { HOW_STEP_KEYS, HOW_STEP_NUMS } from './data';

const HowItWorks = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-how" aria-labelledby="atx-how-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.howItWorks.label')}</span>
          <h2 id="atx-how-title" className="adv-h2">
            {t('automation:templates.page.howItWorks.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.howItWorks.intro')}</p>
        </header>
        <ol className="atx-steps">
          {HOW_STEP_KEYS.map((key) => (
            <li key={key} className="atx-step">
              <span className="atx-step-num">{HOW_STEP_NUMS[key]}</span>
              <div className="atx-step-body">
                <h3 className="atx-step-title">
                  {t(`automation:templates.page.howItWorks.steps.${key}.title`)}
                </h3>
                <p className="atx-step-desc">
                  {t(`automation:templates.page.howItWorks.steps.${key}.desc`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
