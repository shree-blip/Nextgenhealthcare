import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Pillars from './Pillars';
import About from './About';
import Solutions from './Solutions';
import Process from './Process';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Automation Playbook',
  serviceType: 'Healthcare Workflow Automation Strategy · HIPAA-Aware',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practice owners, clinic operators, multi-location networks',
  },
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Automation', path: '/automation' },
  { name: 'Playbook' },
]);

const MoreInfo = () => {
  const { t } = useTranslation(['automation']);
  return (
    <main className="amih" id="amih-top">
      <Seo
        title={t('automation:moreInfo.seo.title')}
        description={t('automation:moreInfo.seo.description')}
        path="/automation/more-info"
        schema={[SERVICE_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <Pillars />
      <About />
      <Solutions />
      <Process />
      <CTA />
    </main>
  );
};

export default MoreInfo;
