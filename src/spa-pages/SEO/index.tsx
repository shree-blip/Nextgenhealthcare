import '../../styles/seo.css';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Capabilities from './Capabilities';
import DataShowcase from './DataShowcase';
import HowGoogleRanks from './HowGoogleRanks';
import Glossary from './Glossary';
import Process from './Process';
import Comparison from './Comparison';
import LearningHub from './LearningHub';
import SubServices from './SubServices';
import FAQ, { SEO_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare SEO Services',
  serviceType: 'Search Engine Optimization',
  category: ['Technical SEO', 'On-Page SEO', 'Off-Page SEO', 'Local SEO', 'AEO', 'Content SEO'],
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '2500', priceCurrency: 'USD', description: 'Foundational SEO program' },
    { '@type': 'Offer', name: 'Growth', price: '4500', priceCurrency: 'USD', description: 'Full-suite SEO + content engine' },
    { '@type': 'Offer', name: 'Scale', price: '7500', priceCurrency: 'USD', description: 'Multi-location SEO at portfolio scale' },
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SEO_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'SEO' },
]);

const SEO = () => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo
        title={t('seoService.seo.title')}
        description={t('seoService.seo.description')}
        path="/services/seo"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <TrustBar />
      <Capabilities />
      <DataShowcase />
      <HowGoogleRanks />
      <Glossary />
      <Process />
      <Comparison />
      <LearningHub />
      <SubServices />
      <FAQ />
      <CTA />
    </>
  );
};

export default SEO;
