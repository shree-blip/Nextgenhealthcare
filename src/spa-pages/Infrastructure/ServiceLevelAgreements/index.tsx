import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Tiers from './Tiers';
import Escalation from './Escalation';
import TrackRecord from './TrackRecord';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SCHEMA } from './data';

/* ============================================================
   SERVICE LEVEL AGREEMENTS - Image-driven swiss redesign.
   Hero with monitoring image + gauge tiles, 4 severity cards,
   3-step escalation, monitoring grid, image CTA card.
   ============================================================ */

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Infrastructure' },
  { name: 'Service Level Agreements' },
]);

const ServiceLevelAgreements = () => {
  const { t } = useTranslation(['pages']);
  return (
    <main className="gt-page gt-page-x sla-page-x">
      <Seo
        title={t('pages:infrastructure.serviceLevelAgreements.seo.title')}
        description={t('pages:infrastructure.serviceLevelAgreements.seo.description')}
        path="/infrastructure/service-level-agreements"
        schema={[SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <Tiers />
      <Escalation />
      <TrackRecord />
      <CTA />
    </main>
  );
};

export default ServiceLevelAgreements;
