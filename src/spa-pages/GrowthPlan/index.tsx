import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Chart from './Chart';
import Phases from './Phases';
import Quarters from './Quarters';
import Commitments from './Commitments';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'The 12-Month Healthcare Growth Plan',
  serviceType: 'Healthcare Marketing Strategy · Growth Roadmap',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
};

const GrowthPlan = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:growthPlan.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:growthPlan.seo.title')}
        description={t('pages:growthPlan.seo.description')}
        path="/growth-plan"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Chart />
      <Phases />
      <Quarters />
      <Commitments />
      <Closing />
    </>
  );
};

export default GrowthPlan;
