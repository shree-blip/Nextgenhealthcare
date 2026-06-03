import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@/components/icons';

interface FaqItem {
  q: string;
  a: string;
}

const Faq = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:growthPlan.faq.items', { returnObjects: true }) as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-4">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.faq.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1] max-w-[14ch]">
              {t('pages:growthPlan.faq.title')}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line-faint">
              {items.map((qa, i) => {
                const isOpen = open === i;
                return (
                  <div key={qa.q} className="border-b border-line-faint">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="text-heading text-[16px] sm:text-[17px] font-semibold tracking-[-0.012em] leading-[1.35]">
                        {qa.q}
                      </span>
                      <span
                        className={`shrink-0 text-cta transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDownIcon size={20} />
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 pr-10 text-body text-[14.5px] leading-[1.7] max-w-[64ch]">
                          {qa.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
};

export default Faq;
