import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionCard } from '@/lib/motion';
import DetailSectionHead from '@/components/DetailSectionHead';
import { ArrowIcon } from '@/components/icons';
import { useValueEntries, valueDetailHref, type ValueEntry } from '@/content/about/values.data';

const Related = ({ entry }: { entry: ValueEntry }) => {
  const { t } = useTranslation('about');
  const values = useValueEntries();
  const others = values.filter((v) => v.slug !== entry.slug);

  if (others.length === 0) return null;

  return (
    <section className="ow-detail-related" aria-labelledby="ab-value-related-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ab-value-related-title"
          eyebrow={t('valueDetail.related.eyebrow')}
          title={t('valueDetail.related.title')}
          intro={t('valueDetail.related.intro')}
        />

        <div className="ab-value-related-grid">
          {others.map((r) => (
            <MotionCard key={r.slug} naked tilt={6} className="ow-feat-card-wrap">
              <Link
                to={valueDetailHref(r.slug)}
                className="ab-value-related-card"
                aria-label={t('valueDetail.related.readMoreAria', { title: r.title })}
              >
                <span className="ab-value-related-num">{r.num}</span>
                <span className="ab-value-related-icon" aria-hidden="true">
                  {r.icon}
                </span>
                <h3 className="ab-value-related-title">{r.title}</h3>
                <p className="ab-value-related-blurb">{r.blurb}</p>
                <span className="ab-value-related-cta">
                  {t('valueDetail.related.readMore')}
                  <ArrowIcon size={14} />
                </span>
              </Link>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Related;
