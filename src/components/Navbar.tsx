import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoSrc from '../assets/nextgen-photoroom.png';
import { SITE } from '../content/site';
import { useNavPrimary, useNavResources } from '../content/navigation';
import { ChevronDownIcon } from './icons';
import { SUPPORTED_LANGUAGES, LANGUAGE_LABELS, type SupportedLanguage } from '../i18n';
import { useAuth } from '../lib/AuthContext';

const Navbar = () => {
  const { t, i18n } = useTranslation(['navigation', 'common']);
  const NAV_PRIMARY = useNavPrimary();
  const NAV_RESOURCES = useNavResources();

  const { user } = useAuth();
  const accountHref = user
    ? user.role === 'admin'
      ? '/dashboard/admin'
      : '/dashboard/client'
    : '/login';

  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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
                <Link key={link.to} to={link.to} className="nav-link" role="menuitem">
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
                        onClick={() => setResourcesOpen(false)}
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

                {langOpen && (
                  <div
                    className="nav-dropdown-panel hidden sm:block"
                    role="listbox"
                    style={{
                      right: 0,
                      left: 'auto',
                      minWidth: '160px',
                    }}
                  >
                    {SUPPORTED_LANGUAGES.map((lng) => (
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
                    ))}
                  </div>
                )}
              </div>

              <Link
                to={accountHref}
                className="nav-icon-btn hidden sm:grid"
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
              {NAV_PRIMARY.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center justify-between py-4 text-heading text-[18px] font-bold tracking-[-0.015em] border-b border-line-faint hover:text-cta transition-colors"
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
              ))}
            </ul>

            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-muted mb-2">
                {t('navigation:resources.label')}
              </div>
              <ul className="flex flex-col list-none m-0 p-0">
                {NAV_RESOURCES.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="flex flex-col gap-0.5 py-3 border-b border-line-faint hover:bg-bg-soft transition-colors"
                    >
                      <span className="text-heading text-[15px] font-semibold tracking-[-0.01em]">
                        {r.label}
                      </span>
                      <span className="text-muted text-[12.5px]">{r.desc}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile language switcher */}
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] font-bold text-muted mb-2">
                {t('common:language.selectLanguage')}
              </div>
              <div className="flex gap-2">
                {SUPPORTED_LANGUAGES.map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => changeLanguage(lng)}
                    className={`nav-pill${lng === currentLang ? ' is-active' : ''}`}
                    aria-pressed={lng === currentLang}
                  >
                    {LANGUAGE_LABELS[lng].short} — {LANGUAGE_LABELS[lng].long}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
