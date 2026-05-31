import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const CTABanner = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-cta" aria-labelledby="atx-cta-title">
      <div className="container-shell">
        <div className="atx-cta-frame">
          <div className="atx-cta-copy">
            <span className="atx-cta-eyebrow">
              <span className="atx-eyebrow-dot" />
              {t('automation:templates.page.ctaBanner.eyebrow')}
            </span>
            <h2 id="atx-cta-title" className="atx-cta-h2">
              {t('automation:templates.page.ctaBanner.title')}
            </h2>
            <p className="atx-cta-text">{t('automation:templates.page.ctaBanner.text')}</p>
          </div>
          <div className="atx-cta-actions">
            <Link to="/free-growth-audit" className="atx-btn atx-btn-primary">
              {t('automation:templates.page.ctaBanner.ctaPrimary')} <ArrowIcon size={14} />
            </Link>
            <Link to="/automation" className="atx-btn atx-btn-ghost">
              {t('automation:templates.page.ctaBanner.ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
