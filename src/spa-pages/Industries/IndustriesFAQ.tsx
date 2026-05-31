import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { useIndustriesFaqs } from '@/content/industries/faqs';

interface FAQProps {
  onBook: () => void;
}

const FAQChevron = () => (
  <span className="faq-chev" aria-hidden="true">
    <span className="plus-h" />
    <span className="plus-v" />
  </span>
);

const IndustriesFAQ = ({ onBook }: FAQProps) => {
  const { t } = useTranslation('industries');
  const faqs = useIndustriesFaqs();

  return (
    <section className="faq-section" id="industries-faq" aria-labelledby="ind-faq-title">
      <div className="container-shell">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="faq-eyebrow">{t('faqs.eyebrow')}</span>
            <h2 id="ind-faq-title" className="faq-h2">
              {t('faqs.titleLead')}
              <br />
              <span className="accent-text">{t('faqs.titleAccent')}</span>
              {t('faqs.titleTrail')}
            </h2>
            <p className="faq-intro">{t('faqs.intro')}</p>

            <div className="still-card">
              <h3>{t('faqs.still.title')}</h3>
              <p>{t('faqs.still.body1')}</p>
              <p>{t('faqs.still.body2')}</p>
              <button
                type="button"
                className="btn-primary"
                onClick={onBook}
                aria-haspopup="dialog"
                aria-controls="bookingModal"
              >
                {t('faqs.still.cta')}
                <ArrowIcon size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="faq-right">
            {faqs.map(({ q, a, defaultOpen }) => (
              <details
                key={q}
                className="faq-item"
                name="industries-faq"
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
    </section>
  );
};

export default IndustriesFAQ;
