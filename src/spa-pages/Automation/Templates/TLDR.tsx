import { useTranslation } from 'react-i18next';

const TLDR = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-tldr" aria-label={t('automation:templates.page.tldr.ariaLabel')}>
      <div className="container-shell">
        <div className="atx-tldr-frame">
          <span className="atx-tldr-label">{t('automation:templates.page.tldr.label')}</span>
          <p className="atx-tldr-text">{t('automation:templates.page.tldr.text')}</p>
        </div>
      </div>
    </section>
  );
};

export default TLDR;
