import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useValueEntries, valueDetailHref } from '@/content/about/values.data';
import { ArrowIcon } from '@/components/icons';

const Mission = () => {
  const { t } = useTranslation('about');
  const values = useValueEntries();

  return (
    <section className="ab-mission" aria-labelledby="ab-mission-title">
      <div className="container-shell">
        <div className="ab-mission-head">
          <span className="ab-mission-eyebrow">{t('mission.eyebrow')}</span>
          <h2 id="ab-mission-title" className="ab-mission-h2">
            {t('mission.title')}
          </h2>
          <p className="ab-mission-sub">{t('mission.subtitle')}</p>
        </div>

        <div className="ab-values-grid">
          {values.map((v) => (
            <Link
              key={v.slug}
              to={valueDetailHref(v.slug)}
              className="ab-value"
              aria-label={t('mission.readMoreAria', { title: v.title })}
            >
              <span className="ab-value-num">{v.num}</span>
              <span className="ab-value-icon" aria-hidden="true">
                {v.icon}
              </span>
              <h3 className="ab-value-title">{v.title}</h3>
              <p className="ab-value-text">{v.text}</p>
              {v.visual}
              <span className="ab-value-cta">
                {t('mission.readMore')}
                <ArrowIcon size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
