import type { Metadata, Viewport } from 'next';
import '../src/index.css';

const SITE_TITLE =
  'TheNextGen Healthcare Marketing — HIPAA-aware marketing for clinics, medspas & urgent care';
const SITE_DESCRIPTION =
  'Full-service healthcare marketing agency. SEO, Google Ads, social media, website design, and HIPAA-aware automation for clinics, medspas, urgent care & ERs.';
const SITE_URL = 'https://thenextgenhealth.com/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: 'index,follow',
  alternates: { canonical: '/' },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'TheNextGen Healthcare Marketing',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary', title: SITE_TITLE, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: '#576DB5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
