import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionCard } from '@/lib/motion';
import DetailSectionHead from '@/components/DetailSectionHead';
import { detailHref, type DetailEntry } from '../details.data';
import { KIND_GROUP, kindGroupKey, localizedEntryTitle } from './data';

const Related = ({ entry }: { entry: DetailEntry }) => {
  const { t } = useTranslation('pages');
  const group = KIND_GROUP[entry.kind].filter((d) => d.slug !== entry.slug).slice(0, 3);
  if (group.length === 0) return null;

  const titleKey =
    entry.kind === 'engagement'
      ? 'ourWork.detail.related.titleEngagement'
      : entry.kind === 'industry'
        ? 'ourWork.detail.related.titleIndustry'
        : 'ourWork.detail.related.titleCapability';

  return (
    <section className="ow-detail-related" aria-labelledby="ow-detail-related-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ow-detail-related-title"
          eyebrow={`${t('ourWork.detail.related.eyebrowMore')} ${t(
            `ourWork.detail.kindLabelsPlural.${entry.kind}`
          )}`}
          title={t(titleKey)}
          intro={t(`ourWork.detail.related.intro.${entry.kind}`)}
        />

        <div className="ow-feat-grid ow-detail-related-grid">
          {group.map((r) => {
            const groupKey = kindGroupKey(r.kind);
            const localizedTitle = localizedEntryTitle(r, t);
            return (
              <MotionCard key={r.slug} naked tilt={6} className="ow-feat-card-wrap">
                <Link
                  to={detailHref(r.kind, r.slug)}
                  className="ow-feat-card"
                  aria-label={t('ourWork.detail.related.readMoreAria', { title: localizedTitle })}
                >
                  <div className="ow-feat-art ow-feat-art--photo" aria-hidden="true">
                    <img src={r.img} alt="" loading="lazy" />
                    <div className="ow-feat-art-shade" />
                    <span className="ow-feat-delta">
                      {t(`ourWork.${groupKey}.${r.slug}.metricV`, { defaultValue: r.metric.v })}
                    </span>
                  </div>
                  <div className="ow-feat-body">
                    <span className="ow-feat-sector">
                      {t(`ourWork.detail.kindLabels.${r.kind}`)}
                    </span>
                    <h3 className="ow-feat-name">{localizedTitle}</h3>
                    <p className="ow-feat-headline">
                      {t(`ourWork.${groupKey}.${r.slug}.blurb`, r.blurb)}
                    </p>
                    <div className="ow-feat-foot">
                      <div>
                        <strong>
                          {t(`ourWork.${groupKey}.${r.slug}.metricV`, { defaultValue: r.metric.v })}
                        </strong>
                        <span>{t(`ourWork.${groupKey}.${r.slug}.metricL`, r.metric.l)}</span>
                      </div>
                      <span className="ow-feat-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              </MotionCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Related;
