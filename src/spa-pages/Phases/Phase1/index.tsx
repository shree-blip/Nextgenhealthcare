import '../../../styles/phase1.css';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Scorecard from './Scorecard';
import Dimensions from './Dimensions';
import Funnel from './Funnel';
import Timeline from './Timeline';
import Deliverables from './Deliverables';
import Foot from './Foot';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

/**
 * Phase 1 - Swiss layout: Numerical anchor + visual audit modules.
 * Body focuses on SEO-perspective audit dimensions with inline SVG
 * illustrations so each section is self-explanatory.
 */

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Phase 1 — Discovery & Technical Audit',
  serviceType: 'Healthcare Marketing Audit · Discovery Phase',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Methodology' },
  { name: 'Phase 1 — Discovery & Audit' },
]);

const Phase1 = () => {
  const { t } = useTranslation(['pages']);
  return (
    <main className="ph1-root">
      <Seo
        title={t('pages:phases.phase1.seo.title')}
        description={t('pages:phases.phase1.seo.description')}
        path="/methodology/phase-1"
        schema={[SERVICE_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <div className="ph1-wrap">
        <Hero />
        <Scorecard />
        <Dimensions />
        <Funnel />
        <Timeline />
        <Deliverables />
        <Foot />
      </div>
    </main>
  );
};

export default Phase1;
