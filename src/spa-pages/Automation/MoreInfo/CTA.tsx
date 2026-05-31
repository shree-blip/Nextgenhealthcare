import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { buildWalkthroughMailto } from './data';

const CTA = () => {
  const { t } = useTranslation(['automation']);
  const bullets = t('automation:moreInfo.cta.bullets', { returnObjects: true });
  const items: string[] = Array.isArray(bullets) ? (bullets as string[]) : [];

  return (
    <section className="amih-cta" aria-labelledby="amih-cta-title">
      <div className="container-shell">
        <div className="amih-cta-frame">
          <div className="amih-cta-copy">
            <span className="amih-cta-eyebrow">{t('automation:moreInfo.cta.eyebrow')}</span>
            <h2 id="amih-cta-title" className="amih-cta-h2">
              {t('automation:moreInfo.cta.title')}
            </h2>
            <p className="amih-cta-text">{t('automation:moreInfo.cta.text')}</p>
            <ul className="amih-cta-list">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <form
            className="amih-cta-form"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = buildWalkthroughMailto(e.currentTarget, t);
            }}
            aria-label={t('automation:moreInfo.cta.formAria')}
          >
            <div className="amih-row">
              <label className="amih-field">
                <span>{t('automation:moreInfo.cta.fields.name')}</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className="amih-field">
                <span>{t('automation:moreInfo.cta.fields.email')}</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
            </div>
            <div className="amih-row">
              <label className="amih-field">
                <span>{t('automation:moreInfo.cta.fields.clinic')}</span>
                <input type="text" name="clinic" />
              </label>
              <label className="amih-field">
                <span>{t('automation:moreInfo.cta.fields.task')}</span>
                <input type="text" name="task" />
              </label>
            </div>
            <label className="amih-field">
              <span>{t('automation:moreInfo.cta.fields.message')}</span>
              <textarea name="message" rows={3} />
            </label>
            <button type="submit" className="amih-btn amih-btn-primary">
              {t('automation:moreInfo.cta.submit')} <ArrowIcon size={14} strokeWidth={2.2} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
