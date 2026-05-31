import { useTranslation } from 'react-i18next';
import DetailSectionHead from '@/components/DetailSectionHead';
import type { IndustryDetailEntry } from '@/content/industries/details.data';

const FAQ = ({ entry }: { entry: IndustryDetailEntry }) => {
  const { t } = useTranslation('industries');
  const labelLower = entry.label.toLowerCase();
  return (
    <section className="ow-detail-faq" aria-labelledby="ind-detail-faq-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ind-detail-faq-title"
          eyebrow={t('detailPage.faqEyebrow')}
          title={t('detailPage.faqTitle', { label: labelLower })}
          intro={t('detailPage.faqIntro', { label: labelLower })}
        />
        <ol className="ow-detail-faq-list">
          {entry.faqs.map((f, i) => (
            <li key={f.q}>
              <span className="ow-detail-faq-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default FAQ;
