import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionCard } from '@/lib/motion';
import DetailSectionHead from '@/components/DetailSectionHead';
import {
  useIndustryDetailEntries,
  industryDetailHref,
  type IndustryDetailEntry,
} from '@/content/industries/details.data';

const Related = ({ entry }: { entry: IndustryDetailEntry }) => {
  const { t } = useTranslation('industries');
  const entries = useIndustryDetailEntries();
  const others = entries.filter((d) => d.slug !== entry.slug).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section className="ow-detail-related" aria-labelledby="ind-detail-related-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ind-detail-related-title"
          eyebrow={t('detailPage.relatedEyebrow')}
          title={t('detailPage.relatedTitle')}
          intro={t('detailPage.relatedIntro')}
        />

        <div className="ow-feat-grid ow-detail-related-grid">
          {others.map((r) => (
            <MotionCard key={r.slug} naked tilt={6} className="ow-feat-card-wrap">
              <Link
                to={industryDetailHref(r.slug)}
                className="ow-feat-card"
                aria-label={t('detailPage.relatedCardAria', { label: r.label })}
              >
                <div className="ow-feat-art ow-feat-art--photo" aria-hidden="true">
                  <img src={r.image} alt="" width={1448} height={1086} loading="lazy" decoding="async" />
                  <div className="ow-feat-art-shade" />
                  <span className="ow-feat-delta">{r.metric.v}</span>
                </div>
                <div className="ow-feat-body">
                  <span className="ow-feat-sector">{t('detailPage.relatedSector')}</span>
                  <h3 className="ow-feat-name">{r.label}</h3>
                  <p className="ow-feat-headline">{r.meta}</p>
                  <div className="ow-feat-foot">
                    <div>
                      <strong>{r.metric.v}</strong>
                      <span>{r.metric.l}</span>
                    </div>
                    <span className="ow-feat-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Related;
