// Minimal stub of the SyncProgressPopup. The original is driven by the GMB sync
// flow (Google Business Profile sync) which is stubbed in the backend. Until
// the sync routes are ported, this component just renders nothing — exporting
// the same shape so the admin dashboard imports keep working.

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export interface SyncProgressState {
  visible: boolean;
  minimized: boolean;
  status: SyncStatus;
  progress: number;
  label: string;
  message: string;
  startedAt: number | null;
}

export const INITIAL_SYNC_STATE: SyncProgressState = {
  visible: false,
  minimized: false,
  status: 'idle',
  progress: 0,
  label: '',
  message: '',
  startedAt: null,
};

interface SyncProgressPopupProps {
  state: SyncProgressState;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onDismiss: () => void;
}

export default function SyncProgressPopup(_props: SyncProgressPopupProps) {
  return null;
}
