import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import heroImg from '../../assets/nextgen-image/Hyperlocalcontent.png';
import { ArrowIcon } from '@/components/icons';
import { PinIcon, CompassIcon } from './icons';

interface MarkerEntry {
  value: string;
  label: string;
}

const Hero = () => {
  const { t } = useTranslation('pages');
  const markers = t('pages:hyperLocalContent.hero.markers', {
    returnObjects: true,
  }) as MarkerEntry[];
  return (
    <section className="hlc-hero">
      <div className="hlc-shell">
        <nav className="hlc-crumb" aria-label={t('pages:hyperLocalContent.breadcrumb.current')}>
          <Link to="/">{t('pages:hyperLocalContent.breadcrumb.home')}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services">{t('pages:hyperLocalContent.breadcrumb.services')}</Link>
          <span aria-hidden="true">/</span>
          <span className="cur">{t('pages:hyperLocalContent.breadcrumb.current')}</span>
        </nav>

        {/* Coordinate strip */}
        <div className="hlc-coord-strip" aria-hidden="true">
          <CompassIcon size={14} />
          <span className="hlc-coord">{t('pages:hyperLocalContent.hero.coord1')}</span>
          <span className="hlc-coord-divider" />
          <span className="hlc-coord">{t('pages:hyperLocalContent.hero.coordRegion')}</span>
          <span className="hlc-coord-divider" />
          <span className="hlc-coord">{t('pages:hyperLocalContent.hero.coordYear')}</span>
        </div>

        <div className="hlc-hero-grid">
          <div className="hlc-hero-content">
            <span className="hlc-eyebrow">
              <PinIcon size={14} />
              {t('pages:hyperLocalContent.hero.eyebrow')}
            </span>
            <h1 className="hlc-hero-title">
              {t('pages:hyperLocalContent.hero.titleLine1')}{' '}
              <em>{t('pages:hyperLocalContent.hero.titleAccent')}</em>{' '}
              {t('pages:hyperLocalContent.hero.titleSuffix')}
            </h1>
            <p className="hlc-hero-lede">{t('pages:hyperLocalContent.hero.lede')}</p>
            <div className="hlc-hero-ctas">
              <Link to="/contact" className="hlc-btn-primary">
                {t('pages:hyperLocalContent.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <Link to="/services/seo" className="hlc-btn-link">
                {t('pages:hyperLocalContent.hero.ctaSecondary')}
              </Link>
            </div>
          </div>

          <div className="hlc-hero-visual">
            <img src={heroImg} alt="" loading="eager" decoding="async" />
            <div className="hlc-hero-visual-pin" aria-hidden="true">
              <PinIcon size={16} />
              <div>
                <strong>{t('pages:hyperLocalContent.hero.pinStat')}</strong>
                <span>{t('pages:hyperLocalContent.hero.pinLabel')}</span>
              </div>
            </div>
            <span className="hlc-hero-crosshair tl" aria-hidden="true" />
            <span className="hlc-hero-crosshair tr" aria-hidden="true" />
            <span className="hlc-hero-crosshair bl" aria-hidden="true" />
            <span className="hlc-hero-crosshair br" aria-hidden="true" />
          </div>
        </div>

        {/* Marker strip */}
        <ul className="hlc-markers">
          {markers.map((m, i) => (
            <li key={m.label} className="hlc-marker">
              <span className="hlc-marker-pin" aria-hidden="true">
                <PinIcon size={14} />
              </span>
              <div className="hlc-marker-body">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
              <span className="hlc-marker-num" aria-hidden="true">
                /{String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
