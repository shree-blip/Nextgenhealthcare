import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { subscribeNewsletter } from '@/lib/newsletter';
import NewsletterSuccessPopup from '@/components/NewsletterSuccessPopup';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BlogNewsletter = () => {
  const { t } = useTranslation('blog');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("You're on the list — updates will reach you soon.");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText(null);
    if (!EMAIL_RE.test(email.trim())) {
      setErrorText(t('newsletter.invalidEmail'));
      return;
    }
    setSubmitting(true);
    const result = await subscribeNewsletter(email, 'blog');
    setSubmitting(false);
    if (result.ok) {
      setPopupMessage(
        result.status === 'already-subscribed'
          ? "You're already on the list — keep an eye on your inbox."
          : "You're on the list — updates will reach you soon.",
      );
      setPopupOpen(true);
      setEmail('');
    } else {
      setErrorText(result.message);
    }
  };

  return (
    <section className="bl-news" id="bl-news" aria-labelledby="bl-news-title">
      <div className="container-shell">
        <div className="bl-news-card">
          <div className="bl-news-grid">
            <div>
              <span className="bl-news-eyebrow">{t('newsletter.eyebrow')}</span>
              <h2 id="bl-news-title" className="bl-news-h2">
                {t('newsletter.title')}
              </h2>
              <p className="bl-news-text">{t('newsletter.text')}</p>
            </div>

            <form className="bl-news-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? '…' : t('newsletter.submit')}
                <ArrowIcon size={14} />
              </button>
              {errorText ? (
                <p
                  className="bl-news-disclaimer"
                  style={{ color: '#b91c1c' }}
                  role="alert"
                >
                  {errorText}
                </p>
              ) : (
                <p className="bl-news-disclaimer">{t('newsletter.disclaimer')}</p>
              )}
            </form>
            <NewsletterSuccessPopup
              open={popupOpen}
              onClose={() => setPopupOpen(false)}
              message={popupMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;
