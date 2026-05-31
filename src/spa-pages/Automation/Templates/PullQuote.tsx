import { useTranslation } from 'react-i18next';

const PullQuote = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-quote" aria-label={t('automation:templates.page.pullQuote.ariaLabel')}>
      <div className="container-shell">
        <blockquote className="atx-quote-frame">
          <span className="atx-quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <p className="atx-quote-text">{t('automation:templates.page.pullQuote.text')}</p>
          <footer className="atx-quote-foot">
            <span className="atx-quote-avatar" aria-hidden="true">
              {t('automation:templates.page.pullQuote.avatar')}
            </span>
            <cite className="atx-quote-cite">
              {t('automation:templates.page.pullQuote.cite')}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

export default PullQuote;
