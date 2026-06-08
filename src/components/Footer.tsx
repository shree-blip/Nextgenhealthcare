import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoSrc from '../assets/nextgen-photoroom.png';
import { SITE } from '../content/site';
import {
  useFooterCompany,
  useFooterLegal,
  useFooterServices,
} from '../content/navigation';
import { ArrowIcon } from './icons';
import { subscribeNewsletter } from '../lib/newsletter';
import NewsletterSuccessPopup from './NewsletterSuccessPopup';

const Footer = () => {
  const { t } = useTranslation(['common', 'navigation']);
  const FOOTER_SERVICES = useFooterServices();
  const FOOTER_COMPANY = useFooterCompany();
  const FOOTER_LEGAL = useFooterLegal();

  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("You're on the list — updates will reach you soon.");

  const handleNewsletterSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    if (!email) return;
    setNewsletterError(null);
    setNewsletterSubmitting(true);
    const result = await subscribeNewsletter(email, 'footer');
    setNewsletterSubmitting(false);
    if (result.ok) {
      setPopupMessage(
        result.status === 'already-subscribed'
          ? "You're already on the list — keep an eye on your inbox."
          : "You're on the list — updates will reach you soon.",
      );
      setPopupOpen(true);
      form.reset();
    } else {
      setNewsletterError(result.message);
    }
  };

  return (
    <footer className="footer-section" id="footer" role="contentinfo">
      <div className="container-shell">
        <div className="ft-grid">
          {/* Brand block */}
          <div className="ft-brand-block flex flex-col gap-[22px] max-w-[360px]">
            <Link
              to="/"
              className="inline-block"
              aria-label={t('navigation:aria.homeLogo', { name: SITE.name })}
            >
              <img
                src={logoSrc}
                alt={SITE.name}
                className="h-[80px] w-auto block select-none"
                draggable={false}
              />
            </Link>
            <p className="text-[14px] leading-[1.65] text-body m-0 max-w-[38ch]">
              {t('common:brand.description')}
            </p>
            <div className="flex gap-2.5 mt-1" aria-label={t('common:footer.socialAriaLabel')}>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('common:social.facebook')}
                className="ft-social-link"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={SITE.social.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('common:social.twitter')}
                className="ft-social-link"
              >
                <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('common:social.linkedin')}
                className="ft-social-link"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="ft-h">{t('common:footer.servicesHeading')}</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
              {FOOTER_SERVICES.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="ft-list-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="ft-h">{t('common:footer.companyHeading')}</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="ft-list-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="flex flex-col gap-[18px]">
            <h4 className="ft-h">{t('common:footer.contactHeading')}</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
              <li>
                <a
                  href={SITE.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-list-link"
                >
                  {SITE.address.street}
                  <br />
                  {`${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="ft-list-link">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.tel}`} className="ft-list-link">
                  {SITE.phone.display}
                </a>
              </li>
            </ul>

            <div className="mt-2 pt-[22px] border-t border-line-faint">
              <p className="text-[14px] font-bold text-heading m-0 mb-1.5 tracking-[-0.01em]">
                {t('common:newsletter.title')}
              </p>
              <p className="text-[12.5px] text-muted m-0 mb-3.5 leading-[1.5]">
                {t('common:newsletter.description')}
              </p>
              <form
                className="ft-form"
                onSubmit={handleNewsletterSubmit}
                aria-label={t('common:newsletter.ariaLabel')}
              >
                <input
                  type="email"
                  name="email"
                  placeholder={t('common:newsletter.placeholder')}
                  autoComplete="email"
                  required
                  disabled={newsletterSubmitting}
                />
                <button type="submit" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? '…' : t('common:newsletter.submit')}
                  <ArrowIcon size={11} />
                </button>
              </form>
              {newsletterError && (
                <p
                  role="alert"
                  style={{ marginTop: 8, fontSize: 12, color: '#b91c1c' }}
                >
                  {newsletterError}
                </p>
              )}
              <NewsletterSuccessPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                message={popupMessage}
              />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="ft-bottom-row">
          <span>
            {t('common:footer.copyright', {
              year: SITE.copyrightYear,
              name: SITE.legalName,
            })}
          </span>
          <div className="flex gap-[22px] flex-wrap">
            {FOOTER_LEGAL.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-muted transition-colors hover:text-heading"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
