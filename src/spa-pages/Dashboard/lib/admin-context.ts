import { createContext, useContext } from 'react';
import type { AdminLanguage } from './admin-translations';

export type AdminTheme = 'light' | 'dark' | 'auto';

export interface AdminPreferences {
  theme: AdminTheme;
  language: AdminLanguage;
  sidebarCollapsed: boolean;
}

export interface AdminContextType {
  preferences: AdminPreferences;
  setTheme: (theme: AdminTheme) => void;
  setLanguage: (language: AdminLanguage) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isDarkMode: boolean;
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function useAdminPreferences() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminPreferences must be used within AdminPreferencesProvider');
  }
  return context;
}
