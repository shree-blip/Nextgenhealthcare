import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Shifts from './Shifts';
import Coverage from './Coverage';
import ReadinessCriteria from './ReadinessCriteria';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

/* ============================================================
   AEO SCHEMA — Answer-engine optimisation page.
   Lavender/cta-blue tone, code-structure metaphor.
   Quote-style shift cards, schema-group code panels, ship-readiness
   criteria, gradient closing.
   ============================================================ */

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AEO & Schema Markup for Healthcare Practices',
  serviceType: 'Answer Engine Optimization · Schema Markup · AI Overview Eligibility',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, multi-location networks',
  },
};

const AeoSchema = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:aeoSchema.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:aeoSchema.seo.title')}
        description={t('pages:aeoSchema.seo.description')}
        path="/aeo-schema"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Shifts />
      <Coverage />
      <ReadinessCriteria />
      <Closing />
    </>
  );
};

export default AeoSchema;
