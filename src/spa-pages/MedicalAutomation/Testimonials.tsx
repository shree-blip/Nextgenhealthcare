import { useTranslation } from 'react-i18next';

interface Quote {
  q: string;
  name: string;
  role: string;
  initials: string;
}

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const Testimonials = () => {
  const { t } = useTranslation('pages');
  const quotes = t('pages:medicalAutomation.testimonials.quotes', {
    returnObjects: true,
  }) as Quote[];
  return (
    <section className="sl-section mau-tx-section" id="testimonials">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.testimonials.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.testimonials.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.testimonials.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.testimonials.secMeta1')}
            <br />
            {t('pages:medicalAutomation.testimonials.secMeta2')}
          </div>
        </div>

        <div className="mau-tx-grid">
          {quotes.map((tq) => (
            <article key={tq.name} className="mau-tx-card">
              <div
                className="mau-tx-stars"
                aria-label={t('pages:medicalAutomation.testimonials.starsAria')}
              >
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p
                className="mau-tx-quote"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${tq.q}&rdquo;` }}
              />
              <div className="mau-tx-meta">
                <div className="mau-tx-avatar">{tq.initials}</div>
                <div className="mau-tx-handle">
                  <span className="mau-tx-name">{tq.name}</span>
                  <span className="mau-tx-role">{tq.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
