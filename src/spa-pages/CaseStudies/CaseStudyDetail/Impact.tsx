import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { CaseStudy } from '../caseStudies.data';
import { ArrowLeft, ArrowRight, Quote } from './icons';

interface ImpactProps {
  study: CaseStudy;
  prev: CaseStudy;
  next: CaseStudy;
}

const Impact = ({ study, prev, next }: ImpactProps) => {
  const { t } = useTranslation('pages');
  return (
    <section className="csd-impact" aria-labelledby="csd-impact-title">
      <div className="container-shell">
        <header className="csd-impact-head">
          <span className="csd-section-rail csd-section-rail--light">
            {t('caseStudies.detail.impact.rail')}
          </span>
          <h2 id="csd-impact-title" className="csd-impact-title">
            {t('caseStudies.detail.impact.title')}
          </h2>
        </header>

        <div className="csd-impact-grid">
          <ul className="csd-kpis">
            {study.kpis.map((k, i) => (
              <li key={k.label} className="csd-kpi">
                <span className="csd-kpi-value">{k.value}</span>
                <span className="csd-kpi-label">
                  {t(`caseStudies.studies.${study.id}.kpis.${i}.label`, k.label)}
                </span>
                <span className="csd-kpi-change">
                  {t(`caseStudies.studies.${study.id}.kpis.${i}.change`, k.change)}
                </span>
              </li>
            ))}
          </ul>

          <figure className="csd-quote-card">
            <span className="csd-quote-mark" aria-hidden="true">
              <Quote />
            </span>
            <blockquote>
              <p>{t(`caseStudies.studies.${study.id}.quote.text`, study.quote.text)}</p>
            </blockquote>
            <figcaption>
              <strong>{t(`caseStudies.studies.${study.id}.quote.author`, study.quote.author)}</strong>
              <span>{t(`caseStudies.studies.${study.id}.quote.role`, study.quote.role)}</span>
            </figcaption>
            <span className="csd-quote-edge" aria-hidden="true" />
          </figure>
        </div>

        <nav className="csd-endnav" aria-label={t('caseStudies.detail.impact.moreLabel')}>
          <Link to={`/case-studies/${prev.id}`} className="csd-endnav-card csd-endnav-card--prev">
            <span className="csd-endnav-dir">
              <ArrowLeft /> {t('caseStudies.detail.impact.morePrev')}
            </span>
            <span className="csd-endnav-name">
              {t(`caseStudies.studies.${prev.id}.name`, prev.name)}
            </span>
            <span className="csd-endnav-metric">
              <em>{prev.metricNum}</em>{' '}
              {t(`caseStudies.studies.${prev.id}.metricLbl`, prev.metricLbl)}
            </span>
          </Link>
          <Link to="/free-growth-audit" className="csd-endnav-cta">
            <span className="csd-endnav-cta-eyebrow">
              {t('caseStudies.detail.impact.ctaEyebrow')}
            </span>
            <span className="csd-endnav-cta-line">{t('caseStudies.detail.impact.ctaLine')}</span>
            <span className="csd-endnav-cta-btn">
              {t('caseStudies.detail.impact.ctaBtn')} <ArrowRight />
            </span>
          </Link>
          <Link to={`/case-studies/${next.id}`} className="csd-endnav-card csd-endnav-card--next">
            <span className="csd-endnav-dir">
              {t('caseStudies.detail.impact.moreNext')} <ArrowRight />
            </span>
            <span className="csd-endnav-name">
              {t(`caseStudies.studies.${next.id}.name`, next.name)}
            </span>
            <span className="csd-endnav-metric">
              <em>{next.metricNum}</em>{' '}
              {t(`caseStudies.studies.${next.id}.metricLbl`, next.metricLbl)}
            </span>
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default Impact;
