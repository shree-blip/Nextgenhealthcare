import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@/components/icons';
import { Eyebrow } from './parts';

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
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow color="#B38B6D">{t('pages:growthPlan.faq.eyebrow')}</Eyebrow>
            <h2 className="mt-5 max-w-[14ch] text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
              {t('pages:growthPlan.faq.title')}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col gap-3">
              {items.map((qa, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={qa.q}
                    className={`overflow-hidden rounded-[16px] border bg-white transition-colors ${
                      isOpen ? 'border-cta/30' : 'border-line-faint'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    >
                      <span className="text-[16px] font-semibold leading-[1.35] tracking-[-0.012em] text-heading sm:text-[17px]">
                        {qa.q}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-cta text-white' : 'bg-bg-soft text-cta'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDownIcon size={18} />
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[64ch] px-6 pb-6 pr-10 text-[14.5px] leading-[1.7] text-body">
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
