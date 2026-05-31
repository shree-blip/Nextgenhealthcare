import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { subscribeNewsletter } from '@/lib/newsletter';
import NewsletterSuccessPopup from '@/components/NewsletterSuccessPopup';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterCard = () => {
  const { t } = useTranslation('contact');
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
    const result = await subscribeNewsletter(email, 'contact');
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
    <aside className="ct-newsletter" aria-labelledby="news-title">
      <span className="ct-form-eyebrow">{t('newsletter.eyebrow')}</span>
      <h3 id="news-title" className="ct-form-title">
        {t('newsletter.title')}
      </h3>
      <p className="ct-form-text">{t('newsletter.text')}</p>

      <form className="ct-news-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          className="ct-news-input"
          placeholder={t('newsletter.placeholder')}
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" className="ct-news-btn" disabled={submitting}>
          {submitting ? '…' : t('newsletter.submit')}
          <ArrowIcon size={14} />
        </button>
      </form>
      {errorText && (
        <p
          role="alert"
          style={{ marginTop: 10, fontSize: 13, color: '#b91c1c' }}
        >
          {errorText}
        </p>
      )}
      <NewsletterSuccessPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        message={popupMessage}
      />
    </aside>
  );
};

export default NewsletterCard;
