import { useEffect, useState, type ReactNode } from 'react';
import { AdminContext } from '../lib/admin-context';
import type { AdminPreferences, AdminTheme } from '../lib/admin-context';
import type { AdminLanguage } from '../lib/admin-translations';

const ADMIN_PREFS_KEY = 'admin-preferences';

export function AdminPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AdminPreferences>({
    theme: 'auto',
    language: 'en',
    sidebarCollapsed: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_PREFS_KEY);
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse admin preferences:', e);
      }
    }
    setMounted(true);
  }, []);

  // Update theme based on preference
  useEffect(() => {
    if (!mounted) return;

    let theme = preferences.theme;
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }

    setIsDarkMode(theme === 'dark');

    // Update document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme, mounted]);

  const setTheme = (theme: AdminTheme) => {
    const updated = { ...preferences, theme };
    setPreferences(updated);
    localStorage.setItem(ADMIN_PREFS_KEY, JSON.stringify(updated));
  };

  const setLanguage = (language: AdminLanguage) => {
    const updated = { ...preferences, language };
    setPreferences(updated);
    localStorage.setItem(ADMIN_PREFS_KEY, JSON.stringify(updated));
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    const updated = { ...preferences, sidebarCollapsed: collapsed };
    setPreferences(updated);
    localStorage.setItem(ADMIN_PREFS_KEY, JSON.stringify(updated));
  };

  return (
    <AdminContext.Provider
      value={{
        preferences,
        setTheme,
        setLanguage,
        setSidebarCollapsed,
        isDarkMode,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
