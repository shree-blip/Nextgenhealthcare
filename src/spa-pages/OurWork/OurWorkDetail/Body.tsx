import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DetailSectionHead from '@/components/DetailSectionHead';
import { ArrowIcon } from '@/components/icons';
import { type DetailEntry } from '../details.data';
import { kindGroupKey } from './data';

const Body = ({ entry }: { entry: DetailEntry }) => {
  const { t } = useTranslation('pages');
  const groupKey = kindGroupKey(entry.kind);

  const longBody = t(`ourWork.${groupKey}.${entry.slug}.longBody`, {
    returnObjects: true,
    defaultValue: entry.longBody,
  }) as string[];
  const lede = longBody[0] ?? '';
  const restParas = longBody.slice(1);

  return (
    <section className="ow-detail-body" aria-labelledby="ow-detail-body-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ow-detail-body-title"
          eyebrow={t('ourWork.detail.body.eyebrow')}
          title={t('ourWork.detail.body.title')}
          intro={t(`ourWork.detail.body.intro.${entry.kind}`)}
        />

        <div className="ow-body-grid">
          <article className="ow-body-card-left">
            <img src={entry.img} alt="" loading="lazy" decoding="async" />
            <div className="ow-body-card-overlay">
              <h3 className="ow-body-card-overlay-title">{t('ourWork.detail.body.cardTitle')}</h3>
              <p className="ow-body-card-overlay-text">
                {t(`ourWork.${groupKey}.${entry.slug}.blurb`, entry.blurb)}
              </p>
              <Link to={entry.ctaTo} className="ow-body-overlay-btn">
                {t('ourWork.detail.body.discover')}
                <ArrowIcon size={12} />
              </Link>
            </div>
          </article>

          <div className="ow-body-stack-right">
            <div className="ow-body-stack-img">
              <img src={entry.img} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="ow-body-stack-content">
              {restParas.length > 0 ? (
                restParas.map((p, i) => (
                  <p key={i} className="ow-body-stack-text">
                    {p}
                  </p>
                ))
              ) : (
                <p className="ow-body-stack-text">{lede}</p>
              )}
              <Link to={entry.ctaTo} className="ow-body-cta-pill">
                {t(`ourWork.${groupKey}.${entry.slug}.ctaText`, entry.ctaText)}
                <span className="ow-body-cta-ico" aria-hidden="true">
                  <ArrowIcon size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
