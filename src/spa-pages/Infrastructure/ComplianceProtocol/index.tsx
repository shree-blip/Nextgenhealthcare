import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Safeguards from './Safeguards';
import Specs from './Specs';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SCHEMA } from './data';

/* ============================================================
   COMPLIANCE PROTOCOL - Image-driven swiss redesign.
   Hero with security image, 3 safeguard cards, 6 spec cards
   in a 3x2 grid, image CTA. Brand colors throughout.
   ============================================================ */

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Infrastructure' },
  { name: 'Compliance Protocol' },
]);

const ComplianceProtocol = () => {
  const { t } = useTranslation(['pages']);
  return (
    <main className="gt-page gt-page-x cp-page-x">
      <Seo
        title={t('pages:infrastructure.complianceProtocol.seo.title')}
        description={t('pages:infrastructure.complianceProtocol.seo.description')}
        path="/infrastructure/compliance-protocol"
        schema={[SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <Safeguards />
      <Specs />
      <CTA />
    </main>
  );
};

export default ComplianceProtocol;
