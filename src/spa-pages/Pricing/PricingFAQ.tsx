import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { usePricingFAQs } from '@/content/pricing/faqs';

const FAQChevron = () => (
  <span className="faq-chev" aria-hidden="true">
    <span className="plus-h" />
    <span className="plus-v" />
  </span>
);

const PricingFAQ = () => {
  const { t } = useTranslation('pricing');
  const faqs = usePricingFAQs();

  return (
    <section className="faq-section pr-faq" id="pricing-faq" aria-labelledby="pr-faq-title">
      <div className="container-shell">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="faq-eyebrow">{t('faqs.eyebrow')}</span>
            <h2 id="pr-faq-title" className="faq-h2">
              {t('faqs.titleStart')} <br />
              <span className="accent-text">{t('faqs.titleAccent')}</span>
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
            {faqs.map(({ q, a, defaultOpen }) => (
              <details
                key={q}
                className="faq-item"
                name="pricing-faq"
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
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: extractText(a),
              },
            })),
          }),
        }}
      />
    </section>
  );
};

function extractText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

export default PricingFAQ;
