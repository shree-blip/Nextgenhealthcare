import { useAdminPreferences } from '../lib/admin-context';
import { t as translateKey } from '../lib/admin-translations';

export function useAdminTranslation() {
  const { preferences } = useAdminPreferences();
  const t = (key: string) => translateKey(key, preferences.language);
  return { t };
}