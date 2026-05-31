import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import FailureModes from './FailureModes';
import Directories from './Directories';
import Process from './Process';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

/* ============================================================
   CITATION BUILDING — Local-SEO authority page.
   Sage tone, "one signature across every directory" metaphor.
   Tiered authority groups (Anchor → Vertical → General),
   numbered failure modes, three-step working programme.
   ============================================================ */

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Citation Building & NAP Consistency',
  serviceType: 'Local SEO · Authority Signals · Citation Management',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, multi-location MSOs',
  },
};

const CitationBuilding = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:citationBuilding.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:citationBuilding.seo.title')}
        description={t('pages:citationBuilding.seo.description')}
        path="/citation-building"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <FailureModes />
      <Directories />
      <Process />
      <Closing />
    </>
  );
};

export default CitationBuilding;
