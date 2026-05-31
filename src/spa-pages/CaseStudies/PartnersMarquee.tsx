import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const PARTNERS = [
  'Dallas Metro ER',
  'Houston Urgent',
  'Austin Aesthetic',
  'San Antonio Family',
  'Lakeside Therapy',
  'Irving Dental Group',
  'Plano MedSpa',
];

const PartnersMarquee = () => {
  const { t } = useTranslation('pages');
  // Duplicate the partner list so the CSS marquee animation loops seamlessly.
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section className="cs-marquee">
      <div className="container-shell">
        <div className="cs-marquee-head">
          <div className="cs-eyebrow">{t('caseStudies.marquee.eyebrow')}</div>
          <h2>
            {t('caseStudies.marquee.titleStart')}
            <em>{t('caseStudies.marquee.titleItalic')}</em>
          </h2>
        </div>
      </div>
      <div className="cs-marquee-strip" aria-hidden="true">
        <div className="cs-marquee-track">
          {loop.map((name, i) => (
            <Fragment key={`${name}-${i}`}>
              <span className="cs-mq-item">{name}</span>
              <span className="cs-mq-dot" />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
