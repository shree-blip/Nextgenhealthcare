import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import type { CaseStudy } from '../caseStudies.data';
import { ArrowLeft } from './icons';

interface HeroProps {
  study: CaseStudy;
  ordinal: string;
  total: number;
}

const Hero = ({ study, ordinal, total }: HeroProps) => {
  const { t } = useTranslation('pages');
  const localizedName = t(`caseStudies.studies.${study.id}.name`, study.name);
  return (
    <section className="csd-hero" aria-labelledby="csd-hero-title">
      <div className="csd-hero-bg" aria-hidden="true">
        <span className="csd-hero-bg-a" />
        <span className="csd-hero-bg-b" />
        <span className="csd-hero-bg-grid" />
      </div>

      <div className="container-shell csd-hero-shell">
        <Breadcrumb
          items={[
            { label: t('caseStudies.detail.breadcrumb'), to: '/case-studies' },
            { label: localizedName },
          ]}
        />
        <div className="csd-topnav">
          <Link to="/case-studies#cs-all" className="csd-back">
            <ArrowLeft /> {t('caseStudies.detail.backCaseLibrary')}
          </Link>
          <div className="csd-ordinal">
            <span>{t('caseStudies.detail.engagement')}</span>
            <strong>
              {ordinal} <em>/ {String(total).padStart(2, '0')}</em>
            </strong>
          </div>
        </div>

        <div className="csd-hero-grid">
          <header className="csd-hero-copy">
            <span className="csd-sector-pill">
              <span className="csd-sector-emoji" aria-hidden="true">
                {study.emoji}
              </span>
              {t(`caseStudies.studies.${study.id}.sector`, study.sector)}
            </span>

            <h1 id="csd-hero-title" className="csd-hero-title">
              {localizedName}
            </h1>

            <p className="csd-hero-brief">
              {t(`caseStudies.studies.${study.id}.brief`, study.brief)}
            </p>

            <dl className="csd-meta-grid">
              <div className="csd-meta">
                <dt>{t('caseStudies.detail.metaLabels.location')}</dt>
                <dd>{t(`caseStudies.studies.${study.id}.location`, study.location)}</dd>
              </div>
              <div className="csd-meta">
                <dt>{t('caseStudies.detail.metaLabels.specialty')}</dt>
                <dd>{t(`caseStudies.studies.${study.id}.specialty`, study.specialty)}</dd>
              </div>
              <div className="csd-meta">
                <dt>{t('caseStudies.detail.metaLabels.team')}</dt>
                <dd>{t(`caseStudies.studies.${study.id}.teamSize`, study.teamSize)}</dd>
              </div>
              <div className="csd-meta">
                <dt>{t('caseStudies.detail.metaLabels.engagement')}</dt>
                <dd>{t(`caseStudies.studies.${study.id}.engagement`, study.engagement)}</dd>
              </div>
              <div className="csd-meta">
                <dt>{t('caseStudies.detail.metaLabels.started')}</dt>
                <dd>{t(`caseStudies.studies.${study.id}.started`, study.started)}</dd>
              </div>
            </dl>
          </header>

          <aside className="csd-scorecard" aria-label="Headline metric">
            <div className="csd-scorecard-top">
              <span className="csd-scorecard-tag">{t('caseStudies.detail.scorecard.tag')}</span>
              <span className="csd-scorecard-dot" aria-hidden="true" />
            </div>

            <div className="csd-scorecard-hero">
              <span className="csd-scorecard-num">{study.metricNum}</span>
              <span className="csd-scorecard-lbl">
                {t(`caseStudies.studies.${study.id}.metricLbl`, study.metricLbl)}
              </span>
            </div>

            <ul className="csd-scorecard-mini">
              {study.secondary.map((s, i) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{t(`caseStudies.studies.${study.id}.secondary.${i}`, s.label)}</span>
                </li>
              ))}
            </ul>

            <div className="csd-scorecard-foot">
              <span>{t('caseStudies.detail.scorecard.verifiedFoot')}</span>
              <span className="csd-scorecard-foot-line" aria-hidden="true" />
              <span>{t(`caseStudies.studies.${study.id}.started`, study.started)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
