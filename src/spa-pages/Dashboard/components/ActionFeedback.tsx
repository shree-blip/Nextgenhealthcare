import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

interface ActionFeedbackProps {
  loading: boolean;
  loadingText?: string;
  successMessage: string;
  showSuccess: boolean;
  onDismissSuccess: () => void;
}

export default function ActionFeedback({
  loading,
  loadingText = 'Saving changes...',
  successMessage,
  showSuccess,
  onDismissSuccess,
}: ActionFeedbackProps) {
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-[min(92vw,420px)] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900" initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 10 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-4">
                <motion.div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-600 dark:from-emerald-900/40 dark:to-cyan-900/30 dark:text-emerald-300" animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}>
                  <Loader2 className="h-6 w-6" />
                </motion.div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-300">Processing</p>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">{loadingText}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Please wait while we update the database.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showSuccess && (
          <motion.div className="fixed inset-0 z-[75] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
            <motion.div className="w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-[0_18px_45px_rgba(16,185,129,0.22)] dark:border-emerald-900/40 dark:bg-slate-900" initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.97 }} transition={{ duration: 0.2 }}>
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/35 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Success</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{successMessage}</p>
                    <button onClick={onDismissSuccess} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-emerald-600/20 transition-opacity hover:opacity-95">
                      <Sparkles className="h-3.5 w-3.5" />
                      Nice
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
