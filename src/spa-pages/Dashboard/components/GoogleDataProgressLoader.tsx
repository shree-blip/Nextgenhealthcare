import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Loader2 } from 'lucide-react';

interface GoogleDataProgressLoaderProps {
  isLoading: boolean;
  isDark?: boolean;
}

/**
 * Animated 0–100% progress loader shown while Google data is being fetched.
 * Simulates progress with an eased curve that accelerates then slows near completion.
 */
export default function GoogleDataProgressLoader({ isLoading, isDark = false }: GoogleDataProgressLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Quick fill to 100% then reset after a brief delay
      setProgress(100);
      const resetTimer = setTimeout(() => setProgress(0), 600);
      return () => clearTimeout(resetTimer);
    }

    // Start from 0
    setProgress(0);

    // Simulate progress: fast at first, then slows down approaching 90%
    let current = 0;
    const interval = setInterval(() => {
      current += Math.max(0.5, (90 - current) * 0.08);
      if (current >= 90) current = 90; // Never exceeds 90 until actually done
      setProgress(Math.round(current));
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  const barColor = isDark
    ? 'from-emerald-400 via-teal-400 to-cyan-400'
    : 'from-emerald-500 via-teal-500 to-cyan-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl p-5 border backdrop-blur-sm shadow-sm ${
        isDark
          ? 'bg-slate-800/80 border-slate-700/60'
          : 'bg-white/80 border-slate-200/60'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm shadow-emerald-500/20">
          {isLoading ? (
            <Loader2 className="h-4.5 w-4.5 text-white animate-spin" />
          ) : (
            <Globe className="h-4.5 w-4.5 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isLoading
              ? 'We are fetching real-time data from Google. Please wait.'
              : 'Data loaded successfully!'}
          </p>
          <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isLoading ? 'Connecting to Google Analytics & Search Console APIs...' : 'All data is up to date.'}
          </p>
        </div>
        <span className={`text-sm font-black tabular-nums ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
