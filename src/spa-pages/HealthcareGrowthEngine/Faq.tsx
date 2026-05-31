import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@/components/icons';
import { Section } from './helpers';
import { FAQS } from './data';

/* ---------- FAQ ---------- */
const Faq = () => {
  const { t } = useTranslation('pages');
  const [openIdx, setOpenIdx] = useState<number>(() => FAQS.findIndex((f) => f.defaultOpen));

  return (
    <Section
      no={t('pages:healthcareGrowthEngine.faqSection.no')}
      title={t('pages:healthcareGrowthEngine.faqSection.title')}
      kicker={t('pages:healthcareGrowthEngine.faqSection.kicker')}
      tone="alt"
    >
      <ul className="border-t border-line-faint">
        {FAQS.map((f, i) => {
          const open = openIdx === i;
          return (
            <li key={f.key} className="border-b border-line-faint">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? -1 : i)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-6 py-5 text-left group"
              >
                <span className="flex items-baseline gap-4 flex-1">
                  <span className="font-mono text-[12px] text-line tracking-[0.18em] font-semibold shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-heading text-[16px] sm:text-[18px] font-bold tracking-[-0.015em] leading-[1.35]">
                    {t(`pages:healthcareGrowthEngine.faqSection.items.${f.key}.q`)}
                  </span>
                </span>
                <span
                  className={`shrink-0 w-9 h-9 rounded-full border border-line-faint grid place-items-center text-line transition-all duration-300 ${
                    open
                      ? 'bg-heading text-white border-heading rotate-180'
                      : 'group-hover:border-line'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDownIcon size={14} strokeWidth={2.4} />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pl-9 text-body text-[15px] leading-[1.7] max-w-[64ch]">
                    {t(`pages:healthcareGrowthEngine.faqSection.items.${f.key}.a`)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default Faq;
