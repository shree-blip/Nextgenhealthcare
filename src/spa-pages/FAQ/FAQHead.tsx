import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowIcon } from '@/components/icons';
import { useMetaRows } from '@/content/faq/meta';
import { useFAQCategories } from '@/content/faq/categories';

const FAQHead = () => {
  const { t } = useTranslation('pages');
  const categories = useFAQCategories();
  const metaRows = useMetaRows();

  const questionCount = categories.reduce((sum, c) => sum + c.items.length, 0);
  const sectionCount = categories.length;

  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb items={[{ label: t('faq.head.breadcrumb') }]} section={t('faq.head.section')} />
        <div className="ph-row">
          <div>
            <div className="ph-eyebrow">
              <span className="ph-issue">
                {t('faq.head.summary', { questionCount, sectionCount })}
              </span>
            </div>
            <h1 className="ph-title">{t('faq.head.title')}</h1>
            <p
              style={{
                margin: '18px 0 0',
                maxWidth: '64ch',
                fontSize: 'clamp(15px, 1.3vw, 17px)',
                lineHeight: 1.65,
                color: '#4A5568',
              }}
            >
              {t('faq.head.lede')}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 24,
              }}
            >
              <a
                href="#fp-list"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 18px',
                  borderRadius: 10,
                  background: '#2D3748',
                  color: '#fff',
                  fontSize: 13.5,
                  fontWeight: 600,
                  letterSpacing: '-0.005em',
                }}
              >
                {t('faq.head.browseCta')} <ArrowIcon size={12} strokeWidth={2.2} />
              </a>
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 18px',
                  borderRadius: 10,
                  border: '1.5px solid rgba(45,55,72,0.18)',
                  color: '#2D3748',
                  fontSize: 13.5,
                  fontWeight: 600,
                }}
              >
                {t('faq.head.askCta')} <ArrowIcon size={12} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
          <div className="ph-meta">
            {metaRows.map((row) => (
              <div key={row.label} className="ph-meta-row">
                <strong>{row.label}</strong>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQHead;
