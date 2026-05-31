import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionButton } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import { type DetailEntry } from '../details.data';
import { kindGroupKey } from './data';

const Closing = ({ entry }: { entry: DetailEntry }) => {
  const { t } = useTranslation('pages');
  const groupKey = kindGroupKey(entry.kind);
  return (
    <section className="ow-close" aria-labelledby="ow-detail-close-title">
      <div className="container-shell">
        <div className="ow-close-card ow-detail-close-card">
          <div className="ow-close-body">
            <span className="ow-pill">
              <span className="ow-pill-dot" /> {t('ourWork.detail.closing.pill')}
            </span>
            <h2 id="ow-detail-close-title" className="ow-close-h">
              {t('ourWork.detail.closing.titleLine1')}
              <br />
              {t('ourWork.detail.closing.titleLine2Start')}
              <em>{t('ourWork.detail.closing.titleLine2Em')}</em>
              {t('ourWork.detail.closing.titleLine2End')}
            </h2>
            <p className="ow-close-p">{t('ourWork.detail.closing.p')}</p>
            <div className="ow-close-cta">
              <MotionButton to="/free-growth-audit" className="ow-cta-primary ow-cta-primary--light">
                {t('ourWork.detail.closing.ctaPrimary')}
                <ArrowIcon />
              </MotionButton>
              <Link to="/our-work" className="ow-cta-link ow-cta-link--light">
                {t('ourWork.detail.closing.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="ow-detail-close-metric" aria-hidden="true">
            <img
              src={entry.img}
              alt=""
              loading="lazy"
              decoding="async"
              className="ow-detail-close-metric-img"
            />
            <div className="ow-detail-close-metric-overlay" />
            <div className="ow-detail-close-metric-text">
              <strong>
                {t(`ourWork.${groupKey}.${entry.slug}.metricV`, { defaultValue: entry.metric.v })}
              </strong>
              <span>{t(`ourWork.${groupKey}.${entry.slug}.metricL`, entry.metric.l)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
