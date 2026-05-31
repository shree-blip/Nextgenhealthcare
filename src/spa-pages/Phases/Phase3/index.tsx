import '../../../styles/phase3.css';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Body from './Body';
import Arc from './Arc';
import Stats from './Stats';
import Timeline from './Timeline';
import Channels from './Channels';
import Handoff from './Handoff';
import End from './End';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

/**
 * Phase 3 - Swiss layout #3: Editorial spread with display headline
 * Oversized type, ruled timeline, drop-cap intro, big stats.
 */

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Phase 3 — Launch & Accelerate',
  serviceType: 'Healthcare Marketing Launch · Live Operations',
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
  { name: 'Phase 3 — Launch & Accelerate' },
]);

const Phase3 = () => {
  const { t } = useTranslation(['pages']);
  return (
    <main className="ph3-root">
      <Seo
        title={t('pages:phases.phase3.seo.title')}
        description={t('pages:phases.phase3.seo.description')}
        path="/methodology/phase-3"
        schema={[SERVICE_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <div className="ph3-wrap">
        <Hero />
        <Body />
        <Arc />
        <Stats />
        <Timeline />
        <Channels />
        <Handoff />
        <End />
      </div>
    </main>
  );
};

export default Phase3;
