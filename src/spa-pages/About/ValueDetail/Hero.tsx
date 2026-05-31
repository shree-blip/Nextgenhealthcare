import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatedBackground } from '@/lib/motion';
import { ArrowIcon, CheckIcon, XIcon } from '@/components/icons';
import type { ValueEntry } from '@/content/about/values.data';

interface HeroProps {
  entry: ValueEntry;
  index: number;
}

const Hero = ({ entry, index }: HeroProps) => {
  const { t } = useTranslation('about');

  return (
    <section className="ab-value-hero" aria-labelledby="ab-value-detail-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <nav className="ow-crumbs ow-detail-crumbs" aria-label="Breadcrumb">
          <Link to="/">{t('valueDetail.breadcrumbHome')}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/about">{t('valueDetail.breadcrumbAbout')}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{entry.title}</span>
        </nav>

        <div className="ab-value-hero-card">
          <div className="ab-value-hero-head">
            <span
              className={`ab-mission-modal-icon ab-mission-modal-icon-${index + 1}`}
              aria-hidden="true"
            >
              {entry.icon}
            </span>
            <div className="ab-value-hero-meta">
              <span className="ab-value-hero-num">{entry.num}</span>
              <h1 id="ab-value-detail-title" className="ab-value-hero-title">
                {entry.title}
              </h1>
              <p className="ab-value-hero-lead">{entry.lead}</p>
            </div>
          </div>

          <p className="ab-value-hero-body">{entry.body}</p>

          <div className="ab-value-hero-cols">
            <div className="ab-mission-modal-col ab-mission-modal-col-dont">
              <span className="ab-mission-modal-subtag">
                <XIcon /> {entry.dontTitle}
              </span>
              <ul>
                {entry.dontList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="ab-mission-modal-col ab-mission-modal-col-do">
              <span className="ab-mission-modal-subtag">
                <CheckIcon /> {entry.doTitle}
              </span>
              <ul>
                {entry.doList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ab-value-hero-foot">
            <div className="ab-value-hero-proof">
              <strong>{entry.proof.v}</strong>
              <span>{entry.proof.l}</span>
            </div>
            <Link to="/contact" className="ab-value-hero-cta">
              {t('valueDetail.heroCta')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
