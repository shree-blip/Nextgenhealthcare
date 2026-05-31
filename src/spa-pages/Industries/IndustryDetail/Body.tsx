import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DetailSectionHead from '@/components/DetailSectionHead';
import { ArrowIcon } from '@/components/icons';
import type { IndustryDetailEntry } from '@/content/industries/details.data';

const Body = ({ entry }: { entry: IndustryDetailEntry }) => {
  const { t } = useTranslation('industries');
  const lede = entry.longBody[0] ?? '';
  const restParas = entry.longBody.slice(1);
  const labelLower = entry.label.toLowerCase();
  return (
    <section className="ow-detail-body" aria-labelledby="ind-detail-body-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ind-detail-body-title"
          eyebrow={t('detailPage.bodyEyebrow')}
          title={t('detailPage.bodyTitle', { label: labelLower })}
          intro={t('detailPage.bodyIntro', { label: labelLower })}
        />

        {/* Bottom: image card left, image + text + CTA right */}
        <div className="ow-body-grid">
          <article className="ow-body-card-left">
            <img src={entry.image} alt="" width={1448} height={1086} loading="lazy" decoding="async" />
            <div className="ow-body-card-overlay">
              <h3 className="ow-body-card-overlay-title">{t('detailPage.bodyOverlayTitle')}</h3>
              <p className="ow-body-card-overlay-text">{entry.meta}</p>
              <Link to={entry.ctaTo} className="ow-body-overlay-btn">
                {t('detailPage.bodyOverlayCta')}
                <ArrowIcon size={12} />
              </Link>
            </div>
          </article>

          <div className="ow-body-stack-right">
            <div className="ow-body-stack-img">
              <img src={entry.image} alt="" width={1448} height={1086} loading="lazy" decoding="async" />
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
                {t('detailPage.talkTo', { label: entry.label })}
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
