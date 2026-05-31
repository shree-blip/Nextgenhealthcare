import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  useFeaturePairsRow1,
  useFeaturePairsRow2,
  type PairCard,
} from '@/content/services/feature-pairs';

const PairArrow = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const FeaturePair = () => {
  const { t } = useTranslation('services');
  const row1 = useFeaturePairsRow1();
  const row2 = useFeaturePairsRow2();
  const learnMore = t('featurePairs.learnMore');

  const renderCard = ({ ariaId, bg, tag, title, desc, to }: PairCard) => (
    <Link key={ariaId} to={to} className="pair-card" aria-labelledby={ariaId}>
      <div className="pair-bg">{bg}</div>
      <div className="pair-overlay" />
      <span className="reg-w tl" />
      <span className="reg-w tr" />
      <div className="pair-content">
        <span className="pair-tag">{tag}</span>
        <div className="pair-bottom">
          <h3 id={ariaId} className="pair-title">
            {title}
          </h3>
          <p className="pair-desc">{desc}</p>
          <span className="pair-cta">
            {learnMore}
            <PairArrow />
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="pair-section" id="local-aeo" aria-labelledby="pair-title">
      <div className="container-shell">
        <div className="pair-head">
          <span className="pair-eyebrow">{t('featurePairs.indexEyebrow')}</span>
          <h2 id="pair-title" className="pair-h2">
            {t('featurePairs.indexTitle')}
          </h2>
          <p className="pair-sub">{t('featurePairs.indexSub')}</p>
        </div>

        <div className="pair-grid" style={{ marginBottom: 'clamp(20px, 2.5vw, 32px)' }}>
          {row1.map(renderCard)}
        </div>
        <div className="pair-grid">{row2.map(renderCard)}</div>
      </div>
    </section>
  );
};

export default FeaturePair;
