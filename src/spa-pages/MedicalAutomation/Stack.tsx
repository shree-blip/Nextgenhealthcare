import { useTranslation } from 'react-i18next';
import { STACK, STACK_ICON } from './data';

const Stack = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-stack-section" id="stack">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.stack.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.stack.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.stack.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.stack.secMeta1')}
            <br />
            {t('pages:medicalAutomation.stack.secMeta2')}
          </div>
        </div>

        <div className="mau-stack-grid">
          {STACK.map((s) => {
            const Icon = STACK_ICON[s.key];
            const tools = t(`pages:medicalAutomation.stack.items.${s.key}.tools`, {
              returnObjects: true,
            }) as string[];
            return (
              <article key={s.key} className="mau-stack-card">
                <div className="mau-stack-top">
                  <div className="mau-stack-icon"><Icon /></div>
                  <span className="mau-stack-tag">
                    {t(`pages:medicalAutomation.stack.items.${s.key}.tag`)}
                  </span>
                </div>
                <ul className="mau-stack-list">
                  {tools.map((tool) => (
                    <li key={tool}>{tool}</li>
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

export default Stack;
