import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import heroImg from '../../assets/nextgen-image/Hippabannerimg.png';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="gtx-hero">
      <div className="gt-shell">
        <nav className="gtx-crumb" aria-label={t('pages:hipaaCompliance.breadcrumb.current')}>
          <Link to="/">{t('pages:hipaaCompliance.breadcrumb.home')}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services">{t('pages:hipaaCompliance.breadcrumb.services')}</Link>
          <span aria-hidden="true">/</span>
          <span className="cur">{t('pages:hipaaCompliance.breadcrumb.current')}</span>
        </nav>

        <div className="gtx-hero-grid">
          <div className="gtx-hero-content">
            <span className="gtx-eyebrow">
              <span className="gtx-eyebrow-dot" aria-hidden="true" />
              {t('pages:hipaaCompliance.hero.eyebrow')}
            </span>
            <h1 className="gtx-hero-title">
              {t('pages:hipaaCompliance.hero.titleLine1')}
              <em> {t('pages:hipaaCompliance.hero.titleAccent')}</em>
            </h1>
            <p className="gtx-hero-lede">{t('pages:hipaaCompliance.hero.lede')}</p>
            <div className="gtx-hero-ctas">
              <Link to="/contact" className="gtx-btn-primary">
                {t('pages:hipaaCompliance.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services" className="gtx-btn-link">
                {t('pages:hipaaCompliance.hero.ctaSecondary')}
              </Link>
            </div>
          </div>
          <div className="gtx-hero-visual">
            <img src={heroImg} alt="" loading="eager" decoding="async" />
            <div className="gtx-hero-visual-tag" aria-hidden="true">
              <span className="gtx-hero-visual-tag-num">
                {t('pages:hipaaCompliance.hero.imageTagValue')}
              </span>
              <span className="gtx-hero-visual-tag-lbl">
                {t('pages:hipaaCompliance.hero.imageTagLabel')}
              </span>
            </div>
          </div>
        </div>

        <ul className="hcp-credentials">
          <li className="hcp-cred tone-sage">
            <div className="hcp-cred-head">
              <span className="hcp-cred-icon" aria-hidden="true">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
                  <path d="M9 12 L 11 14 L 15 10" />
                </svg>
              </span>
              <span className="hcp-cred-num">/01</span>
            </div>
            <div className="hcp-cred-body">
              <span className="hcp-cred-label">
                {t('pages:hipaaCompliance.hero.credentials.framework.label')}
              </span>
              <strong className="hcp-cred-value">
                {t('pages:hipaaCompliance.hero.credentials.framework.value')}
              </strong>
            </div>
            <span className="hcp-cred-seal" aria-hidden="true">
              {t('pages:hipaaCompliance.hero.credentials.framework.seal')}
            </span>
          </li>

          <li className="hcp-cred tone-periwinkle">
            <div className="hcp-cred-head">
              <span className="hcp-cred-icon" aria-hidden="true">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v5h5" />
                </svg>
              </span>
              <span className="hcp-cred-num">/02</span>
            </div>
            <div className="hcp-cred-body">
              <span className="hcp-cred-label">
                {t('pages:hipaaCompliance.hero.credentials.reviewCadence.label')}
              </span>
              <strong className="hcp-cred-value">
                {t('pages:hipaaCompliance.hero.credentials.reviewCadence.value')}
              </strong>
            </div>
            <span className="hcp-cred-seal" aria-hidden="true">
              {t('pages:hipaaCompliance.hero.credentials.reviewCadence.seal')}
            </span>
          </li>

          <li className="hcp-cred tone-tan">
            <div className="hcp-cred-head">
              <span className="hcp-cred-icon" aria-hidden="true">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13l2 2 4-4" />
                </svg>
              </span>
              <span className="hcp-cred-num">/03</span>
            </div>
            <div className="hcp-cred-body">
              <span className="hcp-cred-label">
                {t('pages:hipaaCompliance.hero.credentials.hosting.label')}
              </span>
              <strong className="hcp-cred-value">
                {t('pages:hipaaCompliance.hero.credentials.hosting.value')}
              </strong>
            </div>
            <span className="hcp-cred-seal" aria-hidden="true">
              {t('pages:hipaaCompliance.hero.credentials.hosting.seal')}
            </span>
          </li>

          <li className="hcp-cred tone-ink">
            <div className="hcp-cred-head">
              <span className="hcp-cred-icon" aria-hidden="true">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
              </span>
              <span className="hcp-cred-num">/04</span>
            </div>
            <div className="hcp-cred-body">
              <span className="hcp-cred-label">
                {t('pages:hipaaCompliance.hero.credentials.lastAudit.label')}
              </span>
              <strong className="hcp-cred-value">
                {t('pages:hipaaCompliance.hero.credentials.lastAudit.value')}
              </strong>
            </div>
            <span className="hcp-cred-seal" aria-hidden="true">
              {t('pages:hipaaCompliance.hero.credentials.lastAudit.seal')}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
