import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import patientImg from '@/assets/nextgen-image/Hippacomplianceimg.png';

/* -----------------------------------------------------------
   HIPAA + data-handling promise.
   Anala (and most generic "free audit" pages) skip this -
   for healthcare practices it is the #1 objection. Surfacing
   it improves trust + ranks on "HIPAA audit", "healthcare
   marketing audit HIPAA", "healthcare data review" long-tails.
   ----------------------------------------------------------- */

interface PromiseItem {
  title: string;
  body: string;
}

const ICONS: ReactNode[] = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>,
];

const Hipaa = () => {
  const { t } = useTranslation('pages');
  const promises = t('pages:freeGrowthAudit.hipaa.promises', {
    returnObjects: true,
  }) as PromiseItem[];
  return (
    <section className="fga-hipaa" aria-labelledby="fga-hipaa-title">
      <div className="container-shell">
        <div className="fga-hipaa-grid">
          <div className="fga-hipaa-visual">
            <img src={patientImg} alt={t('pages:freeGrowthAudit.hipaa.imgAlt')} loading="lazy" />
            <div className="fga-hipaa-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <strong>{t('pages:freeGrowthAudit.hipaa.badgeStrong')}</strong>
                <em>{t('pages:freeGrowthAudit.hipaa.badgeEm')}</em>
              </div>
            </div>
          </div>

          <div className="fga-hipaa-body">
            <span className="fga-section-tag">{t('pages:freeGrowthAudit.hipaa.tag')}</span>
            <h2 id="fga-hipaa-title" className="fga-section-h2">
              {t('pages:freeGrowthAudit.hipaa.title')}
            </h2>
            <p className="fga-hipaa-lede">{t('pages:freeGrowthAudit.hipaa.lede')}</p>

            <ul className="fga-hipaa-list">
              {promises.map((p, i) => (
                <li key={p.title}>
                  <span className="fga-hipaa-icon" aria-hidden="true">
                    {ICONS[i]}
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hipaa;
