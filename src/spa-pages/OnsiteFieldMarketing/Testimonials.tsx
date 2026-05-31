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
  const quotes = t('pages:onsiteFieldMarketing.testimonials.quotes', {
    returnObjects: true,
  }) as Quote[];
  return (
    <section className="sl-section ofm-tx-section" id="testimonials">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:onsiteFieldMarketing.testimonials.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.testimonials.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.testimonials.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.testimonials.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.testimonials.secMeta2')}
          </div>
        </div>

        <div className="ofm-tx-grid">
          {quotes.map((tq) => (
            <article key={tq.name} className="ofm-tx-card">
              <div
                className="ofm-tx-stars"
                aria-label={t('pages:onsiteFieldMarketing.testimonials.starsAria')}
              >
                <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
              </div>
              <p
                className="ofm-tx-quote"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${tq.q}&rdquo;` }}
              />
              <div className="ofm-tx-meta">
                <div className="ofm-tx-avatar">{tq.initials}</div>
                <div className="ofm-tx-handle">
                  <span className="ofm-tx-name">{tq.name}</span>
                  <span className="ofm-tx-role">{tq.role}</span>
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
