import { ArrowIcon } from '@/components/icons';
import { SITE } from '@/content/site';
import {
  HOME_CONTACT_MAP_URLS,
  useHomeContactCard,
  useHomeContactHead,
} from '@/content/home/contact';

const ContactSection = () => {
  const head = useHomeContactHead();
  const card = useHomeContactCard();

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container-shell">
        <div className="contact-head">
          <span className="contact-eyebrow">{head.eyebrow}</span>
          <h2 id="contact-title" className="contact-h2">
            {head.title}
          </h2>
          <p className="contact-sub">{head.sub}</p>
        </div>

        <div className="contact-grid">
          {/* LEFT - Map */}
          <div className="contact-map">
            <span className="map-chip">{card.mapChip}</span>
            <iframe
              src={HOME_CONTACT_MAP_URLS.embed}
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${SITE.name} - ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`}
            />
          </div>

          {/* RIGHT - Info card */}
          <div className="contact-info">
            <div className="ci-head">
              <span className="ci-eyebrow">{card.headquartersEyebrow}</span>
              <h3 className="ci-h2">{card.cityRegionHeading}</h3>
            </div>

            <article className="ci-card" aria-labelledby="hq-name">
              <header className="ci-card-head">
                <h4 id="hq-name" className="ci-name">
                  {card.hqName}
                </h4>
                <a
                  href={SITE.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ci-pin"
                  aria-label={card.mapLinkAriaLabel}
                >
                  <ArrowIcon size={14} strokeWidth={1.8} />
                </a>
              </header>

              <div className="ci-rows">
                <a href={`tel:${SITE.phone.tel}`} className="ci-row">
                  <span className="ci-letter" aria-hidden="true">
                    P
                  </span>
                  <span className="ci-text">{SITE.phone.display}</span>
                </a>
                <a href={`mailto:${SITE.email}`} className="ci-row">
                  <span className="ci-letter" aria-hidden="true">
                    E
                  </span>
                  <span className="ci-text">{SITE.email}</span>
                </a>
                <a
                  href={SITE.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ci-row"
                >
                  <span className="ci-letter" aria-hidden="true">
                    A
                  </span>
                  <span className="ci-text">
                    {SITE.address.street}
                    <br />
                    {`${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`}
                    <br />
                    {card.countryName}
                  </span>
                </a>
                <div className="ci-row" style={{ cursor: 'default' }}>
                  <span className="ci-letter" aria-hidden="true">
                    H
                  </span>
                  <span className="ci-text" style={{ textDecoration: 'none', color: '#4A5568' }}>
                    {card.hoursLabel}
                  </span>
                </div>
              </div>
            </article>

            <a
              href={HOME_CONTACT_MAP_URLS.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {card.getDirectionsText}
              <ArrowIcon size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
