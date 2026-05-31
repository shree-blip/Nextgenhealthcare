import '../../styles/websitedesign.css';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Brief from './Brief';
import Capabilities from './Capabilities';
import Stack from './Stack';
import Process from './Process';
import WhyUs from './WhyUs';
import Results from './Results';
import Industries from './Industries';
import Testimonials from './Testimonials';
import FAQ, { WD_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Website Design & Development',
  serviceType: 'Website Design and Development',
  category: [
    'Custom Website Design',
    'WordPress Development',
    'Next.js Development',
    'Webflow Development',
    'UX/UI Design',
    'Accessibility (WCAG 2.2 AA)',
    'Technical SEO',
  ],
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, multi-location networks',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Essential',
      price: '7500',
      priceCurrency: 'USD',
      description: 'Single-location clinic build — fixed scope, 10-week launch',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '14500',
      priceCurrency: 'USD',
      description: 'Multi-service, multi-template build for established practices',
    },
    {
      '@type': 'Offer',
      name: 'Scale',
      price: '28000',
      priceCurrency: 'USD',
      description: 'Multi-location and enterprise custom builds',
    },
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: WD_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/&[a-z]+;/gi, '') },
  })),
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Website Design & Development' },
]);

const WebsiteDesign = () => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo
        title={t('websiteDesign.seo.title')}
        description={t('websiteDesign.seo.description')}
        path="/services/website-design-dev"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <TrustBar />
      <Brief />
      <Capabilities />
      <Stack />
      <Process />
      <WhyUs />
      <Results />
      <Industries />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default WebsiteDesign;
