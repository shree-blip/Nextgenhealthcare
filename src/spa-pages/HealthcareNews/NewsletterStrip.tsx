import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterStrip = () => {
  const { t } = useTranslation('pages');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      alert(t('healthcareNews.newsletter.invalidEmail'));
      return;
    }
    alert(t('healthcareNews.newsletter.success'));
    setEmail('');
  };

  return (
    <section className="news-strip">
      <div className="container-shell">
        <div className="ns-grid">
          <div>
            <div className="ns-eyebrow">{t('healthcareNews.newsletter.eyebrow')}</div>
            <h2 className="ns-title">{t('healthcareNews.newsletter.title')}</h2>
            <p className="ns-desc">{t('healthcareNews.newsletter.desc')}</p>
          </div>
          <form className="ns-form" onSubmit={handleSubmit} noValidate>
            <div className="ns-input-wrap">
              <input
                className="ns-input"
                type="email"
                placeholder={t('healthcareNews.newsletter.placeholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="ns-submit" type="submit">
                {t('healthcareNews.newsletter.submit')}
                <ArrowIcon />
              </button>
            </div>
            <p className="ns-fine">{t('healthcareNews.newsletter.fine')}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterStrip;
