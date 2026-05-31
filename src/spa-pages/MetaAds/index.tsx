import '../../styles/metaads.css';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Brief from './Brief';
import Platforms from './Platforms';
import Creative from './Creative';
import Process from './Process';
import WhyUs from './WhyUs';
import Results from './Results';
import Testimonials from './Testimonials';
import FAQ, { MA_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Meta Ads Management',
  serviceType: 'Social Media Advertising',
  category: [
    'Facebook Ads',
    'Instagram Ads',
    'Messenger Ads',
    'WhatsApp Ads',
    'Conversions API',
    'Lead Generation',
  ],
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Audit',
      price: '0',
      priceCurrency: 'USD',
      description: 'Two-week fixed-fee Meta Ads account audit — readout included',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      price: '3500',
      priceCurrency: 'USD',
      description: 'Full-funnel Meta Ads programme — single-location clinics',
    },
    {
      '@type': 'Offer',
      name: 'Scale',
      price: '6500',
      priceCurrency: 'USD',
      description: 'Multi-location, multi-service Meta Ads at portfolio scale',
    },
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: MA_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    // FAQ answers carry inline HTML entities (rendered via
    // dangerouslySetInnerHTML in the FAQ section). Strip them for the
    // schema payload — Google does not expect markup in Answer.text.
    acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/&[a-z]+;/gi, '') },
  })),
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Meta Ads' },
]);

const MetaAds = () => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo
        title={t('metaAds.seo.title')}
        description={t('metaAds.seo.description')}
        path="/meta-ads"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <TrustBar />
      <Brief />
      <Platforms />
      <Creative />
      <Process />
      <WhyUs />
      <Results />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default MetaAds;
