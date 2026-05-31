import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { useServicesFaqs, useServicesFaqsPlain } from '@/content/services/faqs';

interface FAQProps {
  onBook: () => void;
}

const FAQChevron = () => (
  <span className="faq-chev" aria-hidden="true">
    <span className="plus-h" />
    <span className="plus-v" />
  </span>
);

const ServicesFAQ = ({ onBook }: FAQProps) => {
  const { t } = useTranslation('services');
  const faqs = useServicesFaqs();
  const faqsPlain = useServicesFaqsPlain();

  return (
    <section className="faq-section" id="services-faq" aria-labelledby="svc-faq-title">
      <div className="container-shell">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="faq-eyebrow">{t('faqs.indexEyebrow')}</span>
            <h2 id="svc-faq-title" className="faq-h2">
              {t('faqs.indexTitleLine1')} <br />
              <span className="accent-text">{t('faqs.indexTitleAccent')}</span>.
            </h2>
            <p className="faq-intro">{t('faqs.indexIntro')}</p>

            <div className="still-card">
              <h3>{t('faqs.stillCardTitle')}</h3>
              <p>{t('faqs.stillCardP1')}</p>
              <p>{t('faqs.stillCardP2')}</p>
              <button
                type="button"
                className="btn-primary"
                onClick={onBook}
                aria-haspopup="dialog"
                aria-controls="bookingModal"
              >
                {t('faqs.stillCardCta')}
                <ArrowIcon size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="faq-right">
            {faqs.map(({ q, a, defaultOpen }) => (
              <details
                key={q}
                className="faq-item"
                name="services-faq"
                {...(defaultOpen ? { open: true } : {})}
              >
                <summary>
                  <span className="faq-q">{q}</span>
                  <FAQChevron />
                </summary>
                <p className="faq-a">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqsPlain.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: a,
              },
            })),
          }),
        }}
      />
    </section>
  );
};

export default ServicesFAQ;
