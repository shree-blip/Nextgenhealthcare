import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatedBackground } from '@/lib/motion';
import { ArrowIcon, CheckIcon } from '@/components/icons';
import { INDUSTRY_ICONS, type DetailEntry } from '../details.data';
import { kindGroupKey, localizedEntryTitle } from './data';

interface DetailHeroProps {
  entry: DetailEntry;
  numLabel: string;
}

const Hero = ({ entry, numLabel }: DetailHeroProps) => {
  const { t } = useTranslation('pages');
  const groupKey = kindGroupKey(entry.kind);
  const localizedTitle = localizedEntryTitle(entry, t);

  const services = t(`ourWork.${groupKey}.${entry.slug}.services`, {
    returnObjects: true,
    defaultValue: entry.services,
  }) as string[];

  return (
    <section className="ow-detail-hero" aria-labelledby="ow-detail-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <nav className="ow-crumbs ow-detail-crumbs" aria-label="Breadcrumb">
          <Link to="/">{t('ourWork.crumbs.home')}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/our-work">{t('ourWork.crumbs.ourWork')}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{localizedTitle}</span>
        </nav>

        <div className="ow-ind-modal-card ow-detail-card">
          <div className="ow-ind-modal-art" aria-hidden="true">
            <img src={entry.img} alt="" />
            <div className="ow-ind-modal-art-shade" />
            <span className="ow-ind-modal-num">{numLabel}</span>
            {entry.kind === 'industry' && INDUSTRY_ICONS[entry.slug] && (
              <span className="ow-ind-modal-art-icon">{INDUSTRY_ICONS[entry.slug]}</span>
            )}
          </div>

          <div className="ow-ind-modal-body">
            <span className="ow-ind-modal-tag">
              {t(`ourWork.${groupKey}.${entry.slug}.eyebrow`, entry.eyebrow)}
            </span>
            <h1 id="ow-detail-title" className="ow-ind-modal-title">
              {localizedTitle}
            </h1>
            <p className="ow-ind-modal-blurb">
              {t(`ourWork.${groupKey}.${entry.slug}.blurb`, entry.blurb)}
            </p>
            <p className="ow-ind-modal-desc">
              {t(`ourWork.${groupKey}.${entry.slug}.description`, entry.description)}
            </p>

            <div className="ow-ind-modal-services">
              <span className="ow-ind-modal-subtag">
                {t(`ourWork.${groupKey}.${entry.slug}.serviceLabel`, entry.serviceLabel)}
              </span>
              <ul>
                {services.map((s) => (
                  <li key={s}>
                    <CheckIcon size={14} strokeWidth={2.6} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ow-ind-modal-foot">
              <div className="ow-ind-modal-metric">
                <strong>
                  {t(`ourWork.${groupKey}.${entry.slug}.metricV`, { defaultValue: entry.metric.v })}
                </strong>
                <span>{t(`ourWork.${groupKey}.${entry.slug}.metricL`, entry.metric.l)}</span>
              </div>
              <Link to={entry.ctaTo} className="ow-ind-modal-cta">
                {t(`ourWork.${groupKey}.${entry.slug}.ctaText`, entry.ctaText)}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
