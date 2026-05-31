import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Team from './Team';
import Cadence from './Cadence';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SCHEMA } from './data';

/* ============================================================
   GROWTH TEAM - Image-driven swiss layout.
   Hero with portrait, photo-led role grid, visual cadence,
   image CTA card.
   ============================================================ */

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Infrastructure' },
  { name: 'Growth Team' },
]);

const GrowthTeam = () => {
  const { t } = useTranslation(['pages']);
  return (
    <main className="gt-page gt-page-x">
      <Seo
        title={t('pages:infrastructure.growthTeam.seo.title')}
        description={t('pages:infrastructure.growthTeam.seo.description')}
        path="/infrastructure/growth-team"
        schema={[SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <Team />
      <Cadence />
      <CTA />
    </main>
  );
};

export default GrowthTeam;
