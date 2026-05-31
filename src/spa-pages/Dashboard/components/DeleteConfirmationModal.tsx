import { motion, AnimatePresence } from 'motion/react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  itemName?: string;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationModal({
  isOpen,
  title,
  description,
  itemName,
  isLoading = false,
  confirmLabel = 'Delete Permanently',
  cancelLabel = 'Keep It',
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onCancel}
          />
          <motion.div
            className="fixed inset-0 z-50 flex min-h-svh items-center justify-center p-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)] dark:border-slate-700 dark:bg-slate-900"
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative border-b border-slate-100 px-6 py-5 dark:border-slate-800">
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-3 pr-8">
                  <motion.div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 text-red-600 dark:from-red-900/40 dark:to-rose-900/30 dark:text-red-300"
                    animate={{ scale: isLoading ? [1, 1.05, 1] : 1 }}
                    transition={{ duration: 1.1, repeat: isLoading ? Infinity : 0 }}
                  >
                    <AlertTriangle size={20} />
                  </motion.div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-600/80 dark:text-red-300/80">Confirm Action</p>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  </div>
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
                {itemName && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/60 dark:bg-red-950/25">
                    <p className="truncate text-sm font-medium text-red-700 dark:text-red-300">
                      <span className="mr-1 opacity-70">Target:</span>
                      {itemName}
                    </p>
                  </div>
                )}
                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">This deletion is permanent and cannot be reversed.</p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/40">
                <motion.div className="flex-1" whileHover={!isLoading ? { y: -1 } : {}} whileTap={!isLoading ? { scale: 0.98 } : {}}>
                  <button
                    onClick={onCancel}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {cancelLabel}
                  </button>
                </motion.div>
                <motion.button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition-all hover:from-red-500 hover:to-rose-500 disabled:cursor-not-allowed disabled:opacity-75"
                  whileHover={!isLoading ? { y: -1 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_45%)]" />
                  {isLoading ? (
                    <>
                      <motion.span className="h-4 w-4 rounded-full border-2 border-white/90 border-t-transparent" animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
                      <span className="relative">Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} className="relative" />
                      <span className="relative">{confirmLabel}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
