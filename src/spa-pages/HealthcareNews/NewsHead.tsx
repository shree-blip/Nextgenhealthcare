import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';

const META_KEYS = ['edition', 'editor', 'readingTime'] as const;

const NewsHead = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb
          items={[
            { label: t('healthcareNews.head.crumbResources'), to: '/blog' },
            { label: t('healthcareNews.head.crumbCurrent') },
          ]}
        />
        <div className="ph-row">
          <div>
            <div className="ph-eyebrow">
              <span className="ph-issue">{t('healthcareNews.head.issue')}</span>
            </div>
            <h1 className="ph-title">{t('healthcareNews.head.title')}</h1>
          </div>
          <div className="ph-meta">
            {META_KEYS.map((key) => (
              <div key={key} className="ph-meta-row">
                <strong>{t(`healthcareNews.head.meta.${key}.label`)}</strong>
                <span>{t(`healthcareNews.head.meta.${key}.value`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHead;
