import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'tng-cookie-consent';
const COOKIE_MAX_AGE_DAYS = 180;

type Choice = 'accepted' | 'declined';

const persistChoice = (choice: Choice) => {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage unavailable (private mode) — cookie below still persists it */
  }
  document.cookie = `${STORAGE_KEY}=${choice}; path=/; max-age=${
    COOKIE_MAX_AGE_DAYS * 24 * 60 * 60
  }; SameSite=Lax`;
};

const hasStoredChoice = () => {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return true;
  } catch {
    /* fall through to cookie check */
  }
  return document.cookie.split('; ').some((c) => c.startsWith(`${STORAGE_KEY}=`));
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasStoredChoice()) return;
    // Small delay so the banner doesn't compete with the hero animation on load.
    const id = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const choose = (choice: Choice) => {
    persistChoice(choice);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cookie-banner"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="fixed z-[8900] bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6"
          style={{
            width: 'min(calc(100vw - 32px), 420px)',
            borderRadius: 18,
            padding: '20px 20px 18px',
            background: 'linear-gradient(165deg, #ffffff 0%, #f4f6fc 100%)',
            border: '1px solid rgba(87, 109, 181, 0.18)',
            boxShadow:
              '0 24px 56px -18px rgba(45, 55, 72, 0.35), 0 8px 20px -8px rgba(87, 109, 181, 0.25)',
          }}
        >
          <button
            type="button"
            onClick={() => choose('declined')}
            aria-label="Dismiss cookie banner"
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 30,
              height: 30,
              borderRadius: 999,
              border: 'none',
              background: 'rgba(45, 55, 72, 0.06)',
              color: '#4A5568',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={14} />
          </button>

          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: 44,
                height: 44,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #576DB5, #46599C)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 22px -8px rgba(87, 109, 181, 0.6)',
              }}
            >
              <Cookie size={22} color="white" strokeWidth={2.2} />
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 15.5,
                  fontWeight: 800,
                  color: '#2D3748',
                  letterSpacing: '-0.01em',
                }}
              >
                We value your privacy
              </h2>
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: '#4A5568',
                }}
              >
                We use cookies to improve your browsing experience and analyze
                site traffic. See our{' '}
                <Link
                  to="/privacy"
                  style={{
                    color: '#576DB5',
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textUnderlineOffset: 2,
                  }}
                >
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 16,
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              onClick={() => choose('declined')}
              style={{
                padding: '9px 18px',
                borderRadius: 10,
                border: '1px solid rgba(45, 55, 72, 0.16)',
                background: 'transparent',
                color: '#4A5568',
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => choose('accepted')}
              style={{
                padding: '9px 22px',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #576DB5, #46599C)',
                color: '#fff',
                fontSize: 13.5,
                fontWeight: 700,
                boxShadow: '0 10px 22px -8px rgba(87, 109, 181, 0.6)',
              }}
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
