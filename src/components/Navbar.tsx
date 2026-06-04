import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoSrc from '../assets/nextgen-photoroom.png';
import { SITE } from '../content/site';
import { useNavPrimary, useNavResources, useFooterServices } from '../content/navigation';
import { ROUTES } from '../lib/routes';
import { ChevronDownIcon } from './icons';
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, type SupportedLanguage } from '../i18n';
import { useAuth } from '../lib/AuthContext';
import { getLenis } from '../lib/motion';

const Navbar = () => {
  const { t, i18n } = useTranslation(['navigation', 'common']);
  const NAV_PRIMARY = useNavPrimary();
  const NAV_RESOURCES = useNavResources();
  const NAV_SERVICES = useFooterServices();

  const { user } = useAuth();
  const accountHref = user
    ? user.role === 'admin'
      ? '/dashboard/admin'
      : '/dashboard/client'
    : '/login';

  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Mobile drawer sub-panels: Services and Resources are collapsible
  // accordions (closed by default so the drawer stays short on small
  // screens). Language lives in the top-bar circle, not the drawer.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // When a nav link points at the page we're already on, react-router fires no
  // navigation, so ScrollToTop never runs. Pin to the top manually in that case
  // so re-tapping the current page behaves like a fresh load.
  const handleNavClick = (to: string) => () => {
    const [path] = to.split('#');
    if (path === location.pathname) {
      // Same-path tap doesn't change the route, so the close-on-route-change
      // effect won't fire — collapse the mobile drawer here too.
      setMobileOpen(false);
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }
  };

  const currentLang: SupportedLanguage = (
    SUPPORTED_LANGUAGES as readonly string[]
  ).includes(i18n.resolvedLanguage ?? '')
    ? (i18n.resolvedLanguage as SupportedLanguage)
    : 'en';

  const changeLanguage = (lng: SupportedLanguage) => {
    if (lng !== currentLang) {
      void i18n.changeLanguage(lng);
    }
    setLangOpen(false);
  };

  // Shared option rows for the language dropdown — reused by the desktop pill
  // panel and the small-screen circle panel.
  const langOptionRows = () =>
    SUPPORTED_LANGUAGES.map((lng) => (
      <button
        key={lng}
        type="button"
        className="nav-dropdown-item w-full text-left"
        role="option"
        aria-selected={lng === currentLang}
        onClick={() => changeLanguage(lng)}
      >
        <span className="nav-dropdown-label">
          {LANGUAGE_LABELS[lng].short} — {LANGUAGE_LABELS[lng].long}
        </span>
      </button>
    ));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!resourcesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setResourcesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [resourcesOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Collapse the drawer's sub-panels whenever the drawer itself closes, so
  // it always reopens in its compact default state.
  useEffect(() => {
    if (!mobileOpen) {
      setMobileServicesOpen(false);
      setMobileResourcesOpen(false);
    }
  }, [mobileOpen]);

  // Lock body scroll while mobile menu is open + close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className={`nav-wrap${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container-shell">
          <nav
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-14 h-20 sm:h-[104px]"
            aria-label={t('navigation:aria.primary')}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center"
              aria-label={t('navigation:aria.homeLogo', { name: SITE.name })}
              onClick={handleNavClick('/')}
            >
              <img
                src={logoSrc}
                alt={SITE.name}
                className="h-14 sm:h-[88px] w-auto block select-none"
                draggable={false}
              />
            </Link>

            {/* Center menu (hidden below 1024px) */}
            <div className="hidden lg:flex items-center justify-center gap-1.5" role="menubar">
              {NAV_PRIMARY.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="nav-link"
                  role="menuitem"
                  onClick={handleNavClick(link.to)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Resources dropdown */}
              <div ref={resourcesRef} className="nav-dropdown">
                <button
                  type="button"
                  className={`nav-link${resourcesOpen ? ' is-open' : ''}`}
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                  onClick={() => setResourcesOpen((o) => !o)}
                >
                  {t('navigation:resources.label')}
                  <ChevronDownIcon strokeWidth={3} />
                </button>

                {resourcesOpen && (
                  <div className="nav-dropdown-panel" role="menu">
                    {NAV_RESOURCES.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="nav-dropdown-item"
                        role="menuitem"
                        onClick={() => {
                          setResourcesOpen(false);
                          handleNavClick(item.to)();
                        }}
                      >
                        <span className="nav-dropdown-label">{item.label}</span>
                        <span className="nav-dropdown-desc">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right cluster: language + account */}
            <div className="flex items-center gap-2 justify-self-end">
              <div ref={langRef} className="nav-dropdown relative">
                <button
                  type="button"
                  className="nav-pill hidden sm:inline-flex"
                  aria-label={t('common:language.changeLanguage')}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((o) => !o)}
                >
                  <svg
                    className="text-line"
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {LANGUAGE_LABELS[currentLang].short}
                  <ChevronDownIcon size={11} className="text-muted" />
                </button>

                {/* Compact circular language button for small screens (where
                    the pill above is hidden) — sits beside the hamburger and
                    opens the same dropdown. */}
                <button
                  type="button"
                  className="nav-icon-btn sm:hidden"
                  aria-label={t('common:language.changeLanguage')}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  onClick={() => setLangOpen((o) => !o)}
                >
                  <svg
                    className="text-line"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </button>

                {langOpen && (
                  <>
                    {/* Desktop / tablet panel (anchored under the pill) */}
                    <div
                      className="nav-dropdown-panel hidden sm:block"
                      role="listbox"
                      style={{
                        right: 0,
                        left: 'auto',
                        minWidth: '160px',
                      }}
                    >
                      {langOptionRows()}
                    </div>
                    {/* Small-screen panel — right-anchored with no centering
                        transform so it stays inside the viewport at 320px. */}
                    <div
                      className="nav-dropdown-panel sm:hidden"
                      role="listbox"
                      style={{
                        right: 0,
                        left: 'auto',
                        transform: 'none',
                        minWidth: '170px',
                      }}
                    >
                      {langOptionRows()}
                    </div>
                  </>
                )}
              </div>

              <Link
                to={accountHref}
                className="nav-icon-btn grid"
                aria-label={t('navigation:aria.accountAriaLabel')}
              >
                <svg
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              {/* Hamburger - shown below lg */}
              <button
                type="button"
                className="nav-icon-btn lg:hidden"
                aria-label={
                  mobileOpen
                    ? t('navigation:aria.closeMenu')
                    : t('navigation:aria.openMenu')
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? (
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 z-40 overflow-y-auto pt-[72px] sm:pt-[96px]"
          style={{
            background: 'linear-gradient(180deg, #F1F2F4 0%, #FAFAF8 100%)',
          }}
          role="dialog"
          aria-modal="true"
          aria-label={t('navigation:aria.mainMenu')}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[72px] sm:top-[96px] h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(179,139,109,0.45), transparent)',
            }}
          />
          <div className="container-shell py-6 flex flex-col gap-7 relative">
            <ul className="flex flex-col list-none m-0 p-0">
              {NAV_PRIMARY.map((link) =>
                link.to === ROUTES.services.index ? (
                  // Services — collapsible dropdown listing its sub-services,
                  // so the full service catalogue is reachable from the drawer.
                  <li key={link.to}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between py-4 text-heading text-[18px] font-bold tracking-[-0.015em] border-b border-line-faint hover:text-cta transition-colors"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="mobile-services-panel"
                      onClick={() => setMobileServicesOpen((o) => !o)}
                    >
                      {link.label}
                      <ChevronDownIcon
                        size={18}
                        strokeWidth={2}
                        className={`transition-transform duration-200${
                          mobileServicesOpen ? ' rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <ul
                        id="mobile-services-panel"
                        className="flex flex-col list-none m-0 p-0 pl-3 border-l-2 border-line-soft ml-1 mt-1"
                      >
                        {/* Direct link to the Services overview page itself —
                            the header above only toggles this panel, so this
                            gives the /services landing page its own entry. */}
                        <li>
                          <Link
                            to={ROUTES.services.index}
                            className="block py-3 border-b border-line-faint text-cta text-[15px] font-bold tracking-[-0.01em] hover:opacity-80 transition-opacity"
                            onClick={handleNavClick(ROUTES.services.index)}
                          >
                            {t('navigation:primary.allServices')}
                          </Link>
                        </li>
                        {NAV_SERVICES.map((s) => (
                          <li key={s.to}>
                            <Link
                              to={s.to}
                              className="block py-3 border-b border-line-faint last:border-b-0 text-heading text-[15px] font-semibold tracking-[-0.01em] hover:text-cta transition-colors"
                              onClick={handleNavClick(s.to)}
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center justify-between py-4 text-heading text-[18px] font-bold tracking-[-0.015em] border-b border-line-faint hover:text-cta transition-colors"
                    onClick={handleNavClick(link.to)}
                  >
                    {link.label}
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                </li>
                )
              )}
            </ul>

            {/* Resources — collapsible dropdown so its sub-items stay tucked
                away until tapped, keeping the drawer short on small screens. */}
            <div className="-mt-7">
              <button
                type="button"
                className="w-full flex items-center justify-between py-4 text-heading text-[18px] font-bold tracking-[-0.015em] border-b border-line-faint hover:text-cta transition-colors"
                aria-expanded={mobileResourcesOpen}
                aria-controls="mobile-resources-panel"
                onClick={() => setMobileResourcesOpen((o) => !o)}
              >
                {t('navigation:resources.label')}
                <ChevronDownIcon
                  size={18}
                  strokeWidth={2}
                  className={`transition-transform duration-200${
                    mobileResourcesOpen ? ' rotate-180' : ''
                  }`}
                />
              </button>
              {mobileResourcesOpen && (
                <ul
                  id="mobile-resources-panel"
                  className="flex flex-col list-none m-0 p-0 pl-3 border-l-2 border-line-soft ml-1 mt-1"
                >
                  {NAV_RESOURCES.map((r) => (
                    <li key={r.to}>
                      <Link
                        to={r.to}
                        className="flex flex-col gap-0.5 py-3 border-b border-line-faint last:border-b-0 hover:bg-bg-soft transition-colors"
                        onClick={handleNavClick(r.to)}
                      >
                        <span className="text-heading text-[15px] font-semibold tracking-[-0.01em]">
                          {r.label}
                        </span>
                        <span className="text-muted text-[12.5px]">{r.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
