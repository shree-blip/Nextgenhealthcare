import { useTranslation } from 'react-i18next';
import visibilityImg from '@/assets/nextgen-image/Visibiltyscoreimg.png';
import funnelImg from '@/assets/nextgen-image/Funnelleakmapimg.png';
import planImg from '@/assets/nextgen-image/90daysplanimg.png';

interface ReportPage {
  num: string;
  title: string;
  caption: string;
  alt: string;
  bullets: string[];
}

const IMAGES = [visibilityImg, funnelImg, planImg];

const SampleReport = () => {
  const { t } = useTranslation('pages');
  const pages = t('pages:freeGrowthAudit.sampleReport.pages', {
    returnObjects: true,
  }) as ReportPage[];
  return (
    <section className="fga-sample" aria-labelledby="fga-sample-title">
      <div className="container-shell">
        <header className="fga-section-head fga-sample-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.sampleReport.tag')}</span>
          <h2 id="fga-sample-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.sampleReport.title')}
          </h2>
          <p className="fga-section-lede">{t('pages:freeGrowthAudit.sampleReport.lede')}</p>
        </header>

        <div className="fga-sample-grid">
          {pages.map((p, i) => (
            <article key={p.num} className="fga-sample-card">
              <div className="fga-sample-frame">
                <div className="fga-sample-frame-bar" aria-hidden="true">
                  <span /> <span /> <span />
                  <em>focus_audit_{p.num}.pdf</em>
                </div>
                <img src={IMAGES[i] ?? IMAGES[0]} alt={p.alt} loading="lazy" />
              </div>
              <div className="fga-sample-body">
                <p className="fga-sample-caption">{p.caption}</p>
                <h3 className="fga-sample-h">{p.title}</h3>
                <ul className="fga-sample-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>
                      <span aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6}>
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="fga-sample-foot">{t('pages:freeGrowthAudit.sampleReport.foot')}</p>
      </div>
    </section>
  );
};

export default SampleReport;
