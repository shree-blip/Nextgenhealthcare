import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

/* ────────────────────────────────────────────────────────────────────
   Shared building blocks for the redesigned Growth Plan page. Keeping the
   eyebrow, gradient accent, and the two-CTA cluster in one place keeps the
   eight section components consistent and lean.
   ──────────────────────────────────────────────────────────────────── */

export const GP_BRAND = '#576DB5';

export const GP_GRADIENT = 'linear-gradient(90deg, #B38B6D 0%, #8FBC8F 50%, #576DB5 100%)';

export const GradientText = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={`bg-clip-text text-transparent ${className}`}
    style={{ backgroundImage: GP_GRADIENT }}
  >
    {children}
  </span>
);

/* Pill eyebrow — a small dot + mono uppercase label. */
export const Eyebrow = ({
  children,
  color = GP_BRAND,
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center gap-2.5 rounded-full border border-line-faint bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted ${className}`}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
    {children}
  </span>
);

interface CtaPairProps {
  onBook: () => void;
  /** Visual treatment: 'light' on pale backgrounds, 'onDark' over dark panels. */
  variant?: 'light' | 'onDark';
  className?: string;
}

/* The two primary actions used across the page:
   1. Book a consultation → opens the BookingModal popup.
   2. Contact us → routes to /contact. */
export const CtaPair = ({ onBook, variant = 'light', className = '' }: CtaPairProps) => {
  const { t } = useTranslation('pages');
  const onDark = variant === 'onDark';

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={onBook}
          className="group inline-flex items-center gap-2.5 rounded-[12px] bg-cta px-6 py-3.5 text-[15px] font-bold text-white shadow-cta transition hover:bg-cta-hover hover:-translate-y-px"
        >
          {t('pages:growthPlan.cta.book')}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowIcon size={16} />
          </span>
        </button>
        <Link
          to="/contact"
          className={`group inline-flex items-center gap-2.5 rounded-[12px] border px-6 py-3.5 text-[15px] font-bold transition hover:-translate-y-px ${
            onDark
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-heading/20 bg-white text-heading hover:border-heading/40'
          }`}
        >
          {t('pages:growthPlan.cta.contact')}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowIcon size={15} />
          </span>
        </Link>
      </div>
      <p
        className={`flex items-center gap-2 text-[13px] ${onDark ? 'text-white/65' : 'text-muted'}`}
      >
        <span
          className="inline-block h-1 w-1 rounded-full"
          style={{ background: onDark ? 'rgba(255,255,255,0.5)' : '#8FBC8F' }}
          aria-hidden="true"
        />
        {t('pages:growthPlan.cta.bookHint')}
      </p>
    </div>
  );
};
