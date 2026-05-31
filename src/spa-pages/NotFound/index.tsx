import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import RecoveryGrid from './RecoveryGrid';
import Seo from '@/components/Seo';

const NotFound = () => {
  const { t } = useTranslation('pages');

  return (
    <main className="nf-page" style={{ paddingBottom: 'clamp(72px, 9vw, 120px)' }}>
      {/* 404 pages must NOT be indexed — the noindex flag tells search
          engines to drop the URL even though the page responds 200
          (an SPA can't return real 404 status codes from the client). */}
      <Seo title={t('notFound.seoTitle')} noindex />

      <Hero />
      <RecoveryGrid />
    </main>
  );
};

export default NotFound;
