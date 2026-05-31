import '../../styles/branding.css';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Deliverables from './Deliverables';
import HowBrandWorks from './HowBrandWorks';
import DataShowcase from './DataShowcase';
import BrandAnatomy from './BrandAnatomy';
import Process from './Process';
import CommonMistakes from './CommonMistakes';
import Glossary from './Glossary';
import Comparison from './Comparison';
import LearningHub from './LearningHub';
import SubServices from './SubServices';
import FAQ, { BR_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Brand Identity & Design',
  serviceType: 'Brand Identity Design',
  category: [
    'Visual Identity',
    'Voice & Messaging',
    'Positioning',
    'Brand System',
    'Patient Experience',
    'Brand Guidelines',
  ],
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks, MSO consolidations',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BR_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Brand Identity & Design' },
]);

const Branding = () => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo
        title={t('branding.seo.title')}
        description={t('branding.seo.description')}
        path="/services/brand-identity-design"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <TrustBar />
      <Deliverables />
      <HowBrandWorks />
      <DataShowcase />
      <BrandAnatomy />
      <Process />
      <CommonMistakes />
      <Glossary />
      <Comparison />
      <LearningHub />
      <SubServices />
      <FAQ />
      <CTA />
    </>
  );
};

export default Branding;
