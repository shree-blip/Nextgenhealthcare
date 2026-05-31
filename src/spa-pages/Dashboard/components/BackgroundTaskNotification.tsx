import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, XCircle, Loader2, X } from 'lucide-react';

export interface BackgroundTask {
  id: string;
  type: 'blog' | 'news';
  status: 'running' | 'success' | 'error';
  message: string;
  details?: string;
}

interface BackgroundTaskNotificationProps {
  tasks: BackgroundTask[];
  onDismiss: (id: string) => void;
}

export default function BackgroundTaskNotification({ tasks, onDismiss }: BackgroundTaskNotificationProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 max-w-md">
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border shadow-lg backdrop-blur-sm p-4 min-w-[320px] ${
              task.status === 'running'
                ? 'bg-white/95 dark:bg-slate-900/95 border-blue-200 dark:border-blue-800'
                : task.status === 'success'
                ? 'bg-white/95 dark:bg-slate-900/95 border-emerald-200 dark:border-emerald-800'
                : 'bg-white/95 dark:bg-slate-900/95 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 ${
                task.status === 'running'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : task.status === 'success'
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              }`}>
                {task.status === 'running' && (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader2 className="h-4 w-4" />
                  </motion.div>
                )}
                {task.status === 'success' && <CheckCircle2 className="h-4 w-4" />}
                {task.status === 'error' && <XCircle className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{task.message}</p>
                {task.details && <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{task.details}</p>}
              </div>
              {task.status !== 'running' && (
                <button onClick={() => onDismiss(task.id)} className="flex-shrink-0 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                  <X className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
