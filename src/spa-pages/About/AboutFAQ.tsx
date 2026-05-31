import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { useAboutFAQs } from '@/content/about/faqs';

const FAQChevron = () => (
  <span className="faq-chev" aria-hidden="true">
    <span className="plus-h" />
    <span className="plus-v" />
  </span>
);

const AboutFAQ = () => {
  const { t } = useTranslation('about');
  const faqs = useAboutFAQs();
  const defaultIndex = faqs.findIndex((f) => f.defaultOpen);
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultIndex >= 0 ? defaultIndex : null
  );

  return (
    <section className="faq-section" id="faq" aria-labelledby="ab-faq-title">
      <div className="container-shell">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="faq-eyebrow">{t('faqs.eyebrow')}</span>
            <h2 id="ab-faq-title" className="faq-h2">
              {t('faqs.titleStart')} <br />
              {t('faqs.titleMid')} <span className="accent-text">{t('faqs.titleAccent')}</span>
              {t('faqs.titleEnd')}
            </h2>
            <p className="faq-intro">{t('faqs.intro')}</p>

            <div className="still-card">
              <h3>{t('faqs.still.title')}</h3>
              <p>{t('faqs.still.p1')}</p>
              <p>{t('faqs.still.p2')}</p>
              <Link to="/contact" className="btn-primary">
                {t('faqs.still.cta')}
                <ArrowIcon size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="faq-right">
            {faqs.map(({ q, a }, i) => (
              <details
                key={q}
                className="faq-item"
                open={openIndex === i}
                onToggle={(e) => {
                  const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                  if (isOpen && openIndex !== i) setOpenIndex(i);
                  else if (!isOpen && openIndex === i) setOpenIndex(null);
                }}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenIndex(openIndex === i ? null : i);
                  }}
                >
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

export default AboutFAQ;
