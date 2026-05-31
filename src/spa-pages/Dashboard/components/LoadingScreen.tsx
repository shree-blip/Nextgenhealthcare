import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import logoSrc from '../../../assets/the-nextgen-logo.png';

interface LoadingScreenProps {
  durationMs?: number;
  onComplete?: () => void;
  active?: boolean;
}

export default function LoadingScreen({ durationMs = 400, onComplete, active }: LoadingScreenProps) {
  const isControlled = typeof active === 'boolean';
  const [isLoading, setIsLoading] = useState(isControlled ? Boolean(active) : true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const onCompleteRef = useRef<(() => void) | undefined>(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (isControlled) return;

    document.body.style.overflow = 'hidden';
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const linearProgress = elapsed / durationMs;
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
      const pct = Math.min(Math.round(easedProgress * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsLoading(false);
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
        onCompleteRef.current?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
    };
  }, [durationMs, isControlled]);

  useEffect(() => {
    if (!isControlled) return;

    cancelAnimationFrame(rafRef.current);

    if (active) {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
      startRef.current = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startRef.current;
        const pct = Math.min(95, Math.round(100 - Math.exp(-elapsed / 1200) * 100));
        setProgress(pct);
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    } else {
      setProgress(100);
      const timeout = window.setTimeout(() => {
        setIsLoading(false);
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
        onCompleteRef.current?.();
      }, 180);

      return () => {
        window.clearTimeout(timeout);
      };
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (!active) {
        document.body.style.overflow = '';
      }
    };
  }, [active, isControlled]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.img
              src={logoSrc}
              alt="The NextGen Healthcare"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ height: 120, width: 'auto' }}
            />

            <div className="w-64 sm:w-80 flex flex-col items-center gap-3">
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #10b981, #3b82f6)',
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                />
              </div>
              <span className="text-slate-600 text-sm font-mono tracking-wider">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
