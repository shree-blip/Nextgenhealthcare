import { useTranslation } from 'react-i18next';
import DetailSectionHead from '@/components/DetailSectionHead';
import type { ValueEntry } from '@/content/about/values.data';

const FAQ = ({ entry }: { entry: ValueEntry }) => {
  const { t } = useTranslation('about');

  return (
    <section className="ow-detail-faq" aria-labelledby="ab-value-faq-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ab-value-faq-title"
          eyebrow={t('valueDetail.faq.eyebrow')}
          title={t('valueDetail.faq.title')}
          intro={t('valueDetail.faq.intro')}
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
