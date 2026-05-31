import '../../styles/medical-automation.css';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Brief from './Brief';
import Workflows from './Workflows';
import Coverage from './Coverage';
import Stack from './Stack';
import Process from './Process';
import WhyUs from './WhyUs';
import Metrics from './Metrics';
import Testimonials from './Testimonials';
import FAQ, { MAU_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import { buildBreadcrumbList } from '@/lib/schema';
import { SERVICE_SCHEMA } from './data';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: MAU_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/&[a-z]+;/gi, '') },
  })),
};

const MedicalAutomation = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:medicalAutomation.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:medicalAutomation.seo.title')}
        description={t('pages:medicalAutomation.seo.description')}
        path="/medical-automation"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <TrustBar />
      <Brief />
      <Workflows />
      <Coverage />
      <Stack />
      <Process />
      <WhyUs />
      <Metrics />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default MedicalAutomation;
