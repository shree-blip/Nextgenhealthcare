import { motion } from 'motion/react';
import { Check, type LucideIcon } from 'lucide-react';
import { useSitePreferences } from './SitePreferencesProvider';
import { useMemo, memo } from 'react';

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta?: string;
  ctaHref?: string;
  popular?: boolean;
  icon?: LucideIcon;
  onCtaClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'basic' | 'professional' | 'premium';
  delay?: number;
}

const SPOTLIGHT_CONTENT = {
  basic: { title: 'Best for', text: 'Clinics getting started with dependable growth.' },
  professional: { title: 'Best for', text: 'Clinics ready to scale acquisition fast.' },
  premium: { title: 'Best for', text: 'Multi-location teams needing advanced automation.' },
} as const;

const ANIMATION_CONFIG = {
  entrance: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } },
  spotlight: { initial: { opacity: 0.7, y: 0 }, animate: { opacity: [0.75, 1, 0.75], y: [0, -1, 0] }, transition: { duration: 2.8, repeat: Infinity } },
  shimmer: { initial: { x: '-120%' }, animate: { x: '140%' }, transition: { duration: 2.4, repeat: Infinity } },
};

function PricingCardContent({
  name,
  price,
  period = '/month',
  description,
  features,
  cta = 'Get started',
  ctaHref,
  popular = false,
  icon: Icon,
  onCtaClick,
  isActive = false,
  disabled = false,
  loading = false,
  variant = 'basic',
  delay = 0,
}: PricingCardProps) {
  const { theme, t } = useSitePreferences();
  const isDark = theme === 'dark';

  const spotlight = useMemo(
    () => ({
      title: t(SPOTLIGHT_CONTENT[variant].title),
      text: t(SPOTLIGHT_CONTENT[variant].text),
    }),
    [variant, t],
  );

  const styles = useMemo(() => {
    const getCardStyles = () => {
      switch (variant) {
        case 'basic':
          return {
            background: isDark ? 'bg-slate-900/90' : 'bg-white',
            border: isDark ? 'border-slate-700' : 'border-slate-200',
            textPrimary: isDark ? 'text-slate-100' : 'text-slate-900',
            textSecondary: isDark ? 'text-slate-300' : 'text-slate-600',
            textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
            checkColor: 'text-emerald-500',
            buttonBg: isDark ? 'bg-slate-800' : 'bg-white',
            buttonText: isDark ? 'text-slate-100' : 'text-slate-900',
            buttonBorder: isDark ? 'border-slate-600' : 'border-slate-300',
            buttonHover: isDark
              ? 'hover:bg-slate-700 hover:border-slate-500'
              : 'hover:bg-slate-50 hover:border-slate-400',
            spotlightWrap: isDark
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-emerald-50 border border-emerald-100',
            spotlightTitle: isDark ? 'text-emerald-300' : 'text-emerald-700',
            spotlightText: isDark ? 'text-emerald-100/90' : 'text-emerald-900/80',
          };
        case 'professional':
          return {
            background: isDark
              ? 'bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-950'
              : 'bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-700',
            border: isDark ? 'border-amber-700' : 'border-amber-500',
            textPrimary: 'text-white',
            textSecondary: isDark ? 'text-amber-50' : 'text-amber-100',
            textMuted: isDark ? 'text-amber-100' : 'text-amber-50',
            checkColor: isDark ? 'text-amber-300' : 'text-yellow-200',
            buttonBg: 'bg-white',
            buttonText: 'text-amber-950 font-bold',
            buttonBorder: 'border-white',
            buttonHover: 'hover:bg-amber-50 hover:shadow-lg',
            spotlightWrap: isDark
              ? 'bg-amber-100/10 border border-amber-200/20'
              : 'bg-white/15 border border-white/20',
            spotlightTitle: 'text-amber-100',
            spotlightText: 'text-amber-50',
          };
        case 'premium':
          return {
            background: isDark
              ? 'bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950'
              : 'bg-gradient-to-br from-violet-50 via-purple-50 to-violet-100',
            border: isDark ? 'border-purple-700' : 'border-purple-200',
            textPrimary: isDark ? 'text-violet-100' : 'text-slate-900',
            textSecondary: isDark ? 'text-violet-200/90' : 'text-slate-700',
            textMuted: isDark ? 'text-violet-300/80' : 'text-slate-600',
            checkColor: isDark ? 'text-violet-300' : 'text-purple-500',
            buttonBg: isDark ? 'bg-violet-100' : 'bg-white',
            buttonText: isDark ? 'text-violet-950' : 'text-slate-900',
            buttonBorder: isDark ? 'border-violet-200' : 'border-purple-300',
            buttonHover: isDark
              ? 'hover:bg-white hover:border-white'
              : 'hover:bg-purple-50 hover:border-purple-400',
            spotlightWrap: isDark
              ? 'bg-violet-300/10 border border-violet-300/20'
              : 'bg-violet-100/70 border border-violet-200',
            spotlightTitle: isDark ? 'text-violet-200' : 'text-violet-700',
            spotlightText: isDark ? 'text-violet-100/90' : 'text-violet-900/80',
          };
        default:
          return {
            background: isDark ? 'bg-slate-900/90' : 'bg-white',
            border: isDark ? 'border-slate-700' : 'border-slate-200',
            textPrimary: isDark ? 'text-slate-100' : 'text-slate-900',
            textSecondary: isDark ? 'text-slate-300' : 'text-slate-600',
            textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
            checkColor: 'text-emerald-500',
            buttonBg: isDark ? 'bg-slate-800' : 'bg-white',
            buttonText: isDark ? 'text-slate-100' : 'text-slate-900',
            buttonBorder: isDark ? 'border-slate-600' : 'border-slate-300',
            buttonHover: isDark
              ? 'hover:bg-slate-700 hover:border-slate-500'
              : 'hover:bg-slate-50 hover:border-slate-400',
            spotlightWrap: isDark
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-emerald-50 border border-emerald-100',
            spotlightTitle: isDark ? 'text-emerald-300' : 'text-emerald-700',
            spotlightText: isDark ? 'text-emerald-100/90' : 'text-emerald-900/80',
          };
      }
    };

    return getCardStyles();
  }, [isDark, variant]);

  const cardContent = (
    <motion.div
      {...ANIMATION_CONFIG.entrance}
      transition={{ delay }}
      whileHover={{ y: disabled ? 0 : -4 }}
      className={`
        relative rounded-3xl p-8 border-2 transition-all duration-300
        ${styles.background} ${styles.border}
        ${isActive ? 'ring-4 ring-emerald-500 ring-offset-2' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer shadow-lg hover:shadow-2xl'}
      `}
      style={{ willChange: 'transform' }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            {t('Popular')}
          </div>
        </div>
      )}

      {isActive && (
        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
          <Check className="h-3 w-3" /> {t('Current')}
        </div>
      )}

      {Icon && (
        <div className={`mb-4 ${styles.textPrimary} opacity-80`}>
          <Icon className="h-10 w-10" />
        </div>
      )}

      <h3 className={`text-2xl font-bold mb-3 ${styles.textPrimary}`}>{t(name)}</h3>

      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-black tracking-tight ${styles.textPrimary}`}>{price}</span>
          {period && price !== 'Free' && price !== 'Custom' && (
            <span className={`text-base font-medium ${styles.textMuted}`}>{period}</span>
          )}
        </div>
      </div>

      {description && (
        <p className={`mb-6 text-sm leading-relaxed ${styles.textSecondary}`}>{t(description)}</p>
      )}

      <motion.div
        {...ANIMATION_CONFIG.spotlight}
        className={`mb-6 rounded-2xl p-4 relative overflow-hidden will-change-opacity ${styles.spotlightWrap}`}
      >
        <motion.div
          {...ANIMATION_CONFIG.shimmer}
          className="pointer-events-none absolute inset-y-0 w-20 bg-white/15 blur-md"
          style={{ willChange: 'transform' }}
        />
        <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${styles.spotlightTitle}`}>
          {spotlight.title}
        </div>
        <div className={`text-sm font-medium leading-relaxed ${styles.spotlightText}`}>
          {spotlight.text}
        </div>
      </motion.div>

      {cta && (
        <div className="mb-6">
          {ctaHref ? (
            <a
              href={ctaHref}
              className={`
                block w-full text-center py-3.5 rounded-xl font-semibold text-base
                transition-all duration-200 border-2
                ${styles.buttonBg} ${styles.buttonText} ${styles.buttonBorder}
                ${disabled ? 'cursor-not-allowed' : styles.buttonHover + ' hover:scale-[1.02] active:scale-[0.98]'}
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t('Loading...')}
                </span>
              ) : isActive ? (
                t('Current Plan')
              ) : (
                t(cta)
              )}
            </a>
          ) : (
            <button
              onClick={onCtaClick}
              disabled={disabled || loading || isActive}
              className={`
                w-full py-3.5 rounded-xl font-semibold text-base
                transition-all duration-200 border-2
                ${
                  isActive
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 cursor-not-allowed opacity-75'
                    : `${styles.buttonBg} ${styles.buttonText} ${styles.buttonBorder} ${
                        disabled ? 'cursor-not-allowed opacity-50' : styles.buttonHover + ' hover:scale-[1.02] active:scale-[0.98]'
                      }`
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t('Loading...')}
                </span>
              ) : isActive ? (
                t('Current Plan')
              ) : (
                t(cta)
              )}
            </button>
          )}
        </div>
      )}

      <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${styles.textMuted}`}>
        {t('Package includes:')}
      </div>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${styles.checkColor}`} />
            <span className={`text-sm leading-relaxed ${styles.textSecondary}`}>{t(feature)}</span>
          </li>
        ))}
      </ul>

      {variant === 'basic' && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${styles.textMuted}`}>
            {t('Not included:')}
          </div>
          <ul className="space-y-2">
            <li className={`flex items-start gap-3 ${styles.textMuted} text-sm`}>
              <span className="text-red-400">✕</span>
              <span>{t('No Analytics')}</span>
            </li>
            <li className={`flex items-start gap-3 ${styles.textMuted} text-sm`}>
              <span className="text-red-400">✕</span>
              <span>{t('No networking events')}</span>
            </li>
            <li className={`flex items-start gap-3 ${styles.textMuted} text-sm`}>
              <span className="text-red-400">✕</span>
              <span>{t('No dedicated support')}</span>
            </li>
          </ul>
        </div>
      )}

      {variant === 'professional' && (
        <div className="mt-6 pt-6 border-t border-amber-700/30">
          <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${styles.textMuted}`}>
            {t('Not included:')}
          </div>
          <ul className="space-y-2">
            <li className={`flex items-start gap-3 ${styles.textMuted} text-sm`}>
              <span className="text-amber-300">✕</span>
              <span>{t('No networking events')}</span>
            </li>
          </ul>
        </div>
      )}
    </motion.div>
  );

  return cardContent;
}

export default memo(PricingCardContent);
