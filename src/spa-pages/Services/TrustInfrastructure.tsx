import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BookingModal from '@/components/BookingModal';
import { ArrowIcon } from '@/components/icons';
import { useTrustCards } from '@/content/services/trust';

const TrustInfrastructure = () => {
  const { t } = useTranslation('services');
  const trustCards = useTrustCards();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="trust-section" id="trust" aria-labelledby="trust-title">
      <div className="container-shell">
        <div className="trust-grid">
          {/* LEFT - sticky header */}
          <div className="trust-head">
            <span className="trust-eyebrow">{t('trust.infraEyebrow')}</span>
            <h2 id="trust-title" className="trust-h2">
              {t('trust.infraTitle')}
            </h2>
            <p className="trust-sub">{t('trust.infraSub')}</p>
            <button
              type="button"
              className="trust-cta"
              onClick={() => setBookingOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={bookingOpen}
              aria-controls="bookingModal"
            >
              {t('trust.ctaLabel')}
              <span className="ico" aria-hidden="true">
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </button>
          </div>

          {/* RIGHT - 2 cards */}
          <div className="trust-cards">
            {trustCards.map(({ featured, ariaId, icon, tag, title, text, bullets, to }) => (
              <Link
                key={ariaId}
                to={to}
                className={`trust-card${featured ? ' is-featured' : ''}`}
                aria-labelledby={ariaId}
              >
                <div className="trust-card-head">
                  <span className="trust-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="trust-arrow" aria-hidden="true">
                    <ArrowIcon size={14} strokeWidth={2.2} />
                  </span>
                </div>
                <span className="trust-tag">{tag}</span>
                <h3 id={ariaId} className="trust-title">
                  {title}
                </h3>
                <p className="trust-text">{text}</p>
                <ul className="trust-list">
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
};

export default TrustInfrastructure;
