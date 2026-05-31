import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Why from './Why';
import Coverage from './Coverage';
import Anatomy from './Anatomy';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SCHEMA } from './data';

/* ============================================================
   HYPER-LOCAL CONTENT — Cartographic / Field Atlas design.
   Map-pin iconography, coordinate-style typography, photographic
   metro tiles, scoped to .hlc-page with .hlc-* class system.
   ============================================================ */

const HyperLocalContent = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: t('pages:hyperLocalContent.breadcrumb.home'), path: '/' },
    { name: t('pages:hyperLocalContent.breadcrumb.current') },
  ]);

  return (
    <main className="hlc-page">
      <Seo
        title={t('pages:hyperLocalContent.seo.title')}
        description={t('pages:hyperLocalContent.seo.description')}
        path="/hyper-local-content"
        schema={[SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Why />
      <Coverage />
      <Anatomy />
      <CTA />
    </main>
  );
};

export default HyperLocalContent;
