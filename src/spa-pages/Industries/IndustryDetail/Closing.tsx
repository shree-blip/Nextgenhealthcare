import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MotionButton } from '@/lib/motion';
import { ArrowIcon } from '@/components/icons';
import type { IndustryDetailEntry } from '@/content/industries/details.data';

const Closing = ({ entry }: { entry: IndustryDetailEntry }) => {
  const { t } = useTranslation('industries');
  const labelLower = entry.label.toLowerCase();
  return (
    <section className="ow-close" aria-labelledby="ind-detail-close-title">
      <div className="container-shell">
        <div className="ow-close-card ow-detail-close-card">
          <div className="ow-close-body">
            <span className="ow-pill">
              <span className="ow-pill-dot" /> {t('detailPage.closingPill')}
            </span>
            <h2 id="ind-detail-close-title" className="ow-close-h">
              {t('detailPage.closingTitleLead')}
              <br />
              <em>{t('detailPage.closingTitleEm')}</em>
              {t('detailPage.closingTitleTail', { label: labelLower })}
            </h2>
            <p className="ow-close-p">{t('detailPage.closingBody')}</p>
            <div className="ow-close-cta">
              <MotionButton to="/free-growth-audit" className="ow-cta-primary ow-cta-primary--light">
                {t('detailPage.closingCtaPrimary')}
                <ArrowIcon />
              </MotionButton>
              <Link to="/industries" className="ow-cta-link ow-cta-link--light">
                {t('detailPage.closingCtaSecondary')}
              </Link>
            </div>
          </div>
          <div className="ow-detail-close-metric" aria-hidden="true">
            <strong>{entry.metric.v}</strong>
            <span>{entry.metric.l}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Closing;
