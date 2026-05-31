import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Journey from './Journey';
import FrictionMap from './FrictionMap';
import Touchpoints from './Touchpoints';
import Metrics from './Metrics';
import Process from './Process';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Patient Experience & Journey Design for Healthcare Practices',
  serviceType: 'Patient Experience · UX · Journey Mapping · Operations',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
};

const PatientExperience = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:patientExperience.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:patientExperience.seo.title')}
        description={t('pages:patientExperience.seo.description')}
        path="/patient-experience"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Journey />
      <FrictionMap />
      <Touchpoints />
      <Metrics />
      <Process />
      <Closing />
    </>
  );
};

export default PatientExperience;
