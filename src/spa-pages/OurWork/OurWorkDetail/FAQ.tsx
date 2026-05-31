import { useTranslation } from 'react-i18next';
import DetailSectionHead from '@/components/DetailSectionHead';
import { type DetailEntry } from '../details.data';
import { kindGroupKey } from './data';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ = ({ entry }: { entry: DetailEntry }) => {
  const { t } = useTranslation('pages');
  const groupKey = kindGroupKey(entry.kind);
  const faqs = t(`ourWork.${groupKey}.${entry.slug}.faqs`, {
    returnObjects: true,
    defaultValue: entry.faqs,
  }) as FaqItem[];

  return (
    <section className="ow-detail-faq" aria-labelledby="ow-detail-faq-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ow-detail-faq-title"
          eyebrow={t('ourWork.detail.faq.eyebrow')}
          title={t('ourWork.detail.faq.title')}
          intro={t(`ourWork.detail.faq.intro.${entry.kind}`)}
        />
        <ol className="ow-detail-faq-list">
          {faqs.map((f, i) => (
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
