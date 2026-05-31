import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Moon, Sun, Monitor, Globe } from 'lucide-react';
import { useAdminPreferences } from '../lib/admin-context';
import { t } from '../lib/admin-translations';
import type { AdminLanguage } from '../lib/admin-translations';

export default function AdminSettings() {
  const { preferences, setTheme, setLanguage } = useAdminPreferences();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'light', label: t('Light', preferences.language), icon: Sun },
    { id: 'dark', label: t('Dark', preferences.language), icon: Moon },
    { id: 'auto', label: t('Auto', preferences.language), icon: Monitor },
  ];

  const languages: { id: AdminLanguage; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
    { id: 'fr', label: 'Français' },
    { id: 'de', label: 'Deutsch' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        title="Settings"
      >
        <Settings className="h-5 w-5 text-slate-700 dark:text-slate-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 z-[60] bg-black/20"
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="fixed sm:absolute top-16 sm:top-12 right-4 sm:right-0 z-[70] w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6"
            >
              {/* Theme Section */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  {t('Theme', preferences.language)}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => {
                        setTheme(id as 'light' | 'dark' | 'auto');
                      }}
                      className={`flex items-center justify-center gap-1 p-3 rounded-lg transition-all ${
                        preferences.theme === id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-bold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Section */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  {t('Language', preferences.language)}
                </label>
                <div className="space-y-2">
                  {languages.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => {
                        setLanguage(id);
                      }}
                      className={`w-full flex items-center gap-2 p-3 rounded-lg transition-all ${
                        preferences.language === id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
