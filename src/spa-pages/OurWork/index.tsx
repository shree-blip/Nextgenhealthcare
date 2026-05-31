import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Stats from './Stats';
import Capabilities from './Capabilities';
import Industries from './Industries';
import Featured from './Featured';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { COLLECTION_SCHEMA } from './data';

const _noopNode: ReactNode = null;

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Our Work' },
]);

const OurWork = () => {
  const { t } = useTranslation('pages');
  return (
    <main className="ow-page">
      <Seo
        title={t('ourWork.seo.indexTitle')}
        description={t('ourWork.seo.indexDescription')}
        path="/our-work"
        schema={[COLLECTION_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <Stats />
      <Capabilities />
      <Industries />
      <Featured />
      <Closing />

      <span hidden>{_noopNode}</span>
    </main>
  );
};

export default OurWork;
