import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

interface QA {
  q: string;
  a: string;
}

/** Source-of-truth FAQ items used for JSON-LD. Resolved in English for the schema. */
export const MAU_FAQ_ITEMS: QA[] = i18n.t(
  'pages:medicalAutomation.faqSection.items',
  { returnObjects: true, lng: 'en' }
) as QA[];

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s ease' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FAQ = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:medicalAutomation.faqSection.items', {
    returnObjects: true,
  }) as QA[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sl-section mau-faq-section" id="faq">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.faqSection.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.faqSection.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.faqSection.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.faqSection.secMeta1')}
            <br />
            {t('pages:medicalAutomation.faqSection.secMeta2')}
          </div>
        </div>

        <ul className="mau-faq-list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className={`mau-faq-item${isOpen ? ' is-open' : ''}`}>
                <button
                  type="button"
                  className="mau-faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <ChevronIcon open={isOpen} />
                </button>
                {isOpen && <div className="mau-faq-a">{it.a}</div>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
