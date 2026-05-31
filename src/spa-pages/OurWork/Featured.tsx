import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionCard } from '@/lib/motion';
import { ENGAGEMENT_DETAILS, detailHref } from './details.data';

const Featured = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ow-feat" aria-labelledby="ow-feat-title">
      <div className="container-shell">
        <header className="ow-section-head">
          <span className="ow-section-tag">{t('ourWork.featuredSection.eyebrow')}</span>
          <h2 id="ow-feat-title" className="ow-section-h2">
            {t('ourWork.featuredSection.title')}
          </h2>
        </header>

        <div className="ow-feat-grid">
          {ENGAGEMENT_DETAILS.map((e, i) => {
            const localizedTitle = t(`ourWork.engagements.${e.slug}.title`, e.title);
            return (
              <MotionCard key={e.slug} naked tilt={7} className="ow-feat-card-wrap">
                <Link
                  to={detailHref(e.kind, e.slug)}
                  className="ow-feat-card"
                  aria-label={t('ourWork.featuredSection.readMoreAria', { title: localizedTitle })}
                >
                  <div className="ow-feat-art ow-feat-art--photo" aria-hidden="true">
                    <img src={e.img} alt="" loading="lazy" />
                    <div className="ow-feat-art-shade" />
                    <span className="ow-feat-delta">
                      {t(`ourWork.featuredSection.deltas.${i}`)}
                      <small>%</small>
                    </span>
                  </div>
                  <div className="ow-feat-body">
                    <span className="ow-feat-sector">{t(`ourWork.featuredSection.sectors.${i}`)}</span>
                    <h3 className="ow-feat-name">{localizedTitle}</h3>
                    <p className="ow-feat-headline">{t(`ourWork.featuredSection.headlines.${i}`)}</p>
                    <div className="ow-feat-foot">
                      <div>
                        <strong>{e.metric.v}</strong>
                        <span>{t(`ourWork.engagements.${e.slug}.metricL`, e.metric.l)}</span>
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

export default Featured;
