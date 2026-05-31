import { ArrowIcon } from '@/components/icons';

export const ArrowLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const ArrowRight = () => <ArrowIcon strokeWidth={2} />;

export const Quote = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M9 7C5.7 7 3 9.7 3 13v8c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3H8c0-2 1-3 3-3h1V7H9zm15 0c-3.3 0-6 2.7-6 6v8c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3v-6c0-1.7-1.3-3-3-3h-4c0-2 1-3 3-3h1V7h-3z" />
  </svg>
);
