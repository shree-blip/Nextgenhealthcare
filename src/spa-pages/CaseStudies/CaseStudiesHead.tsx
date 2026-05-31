import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';

const META_KEYS = ['verticals', 'avgResult', 'updated'] as const;

const CaseStudiesHead = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('caseStudies.head.crumb')} />
        <div className="ph-row">
          <div>
            <div className="ph-eyebrow">
              <span className="ph-issue">{t('caseStudies.head.issue')}</span>
            </div>
            <h1 className="ph-title">{t('caseStudies.head.title')}</h1>
          </div>
          <div className="ph-meta">
            {META_KEYS.map((key) => (
              <div key={key} className="ph-meta-row">
                <strong>{t(`caseStudies.head.meta.${key}.label`)}</strong>
                <span>{t(`caseStudies.head.meta.${key}.value`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesHead;
