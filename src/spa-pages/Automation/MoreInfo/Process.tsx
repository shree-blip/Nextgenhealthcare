import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { STEP_KEYS, STEP_NUMS } from './data';

const Process = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="amih-process" aria-labelledby="amih-process-title">
      <div className="container-shell">
        <header className="amih-section-head amih-section-head--center">
          <span className="amih-section-label">{t('automation:moreInfo.process.label')}</span>
          <h2 id="amih-process-title" className="amih-h2">
            {t('automation:moreInfo.process.title')}
          </h2>
        </header>
        <ol className="amih-process-grid">
          {STEP_KEYS.map((key, i) => (
            <li key={key} className="amih-step">
              <span className="amih-step-num">{STEP_NUMS[key]}</span>
              <h3 className="amih-step-title">
                {t(`automation:moreInfo.process.steps.${key}.title`)}
              </h3>
              <p className="amih-step-desc">
                {t(`automation:moreInfo.process.steps.${key}.desc`)}
              </p>
              {i < STEP_KEYS.length - 1 && (
                <span className="amih-step-arrow" aria-hidden="true">
                  <ArrowIcon size={14} strokeWidth={2.2} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
