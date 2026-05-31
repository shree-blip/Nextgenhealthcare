import '../../styles/googleads.css';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import TrustBar from './TrustBar';
import CampaignTypes from './CampaignTypes';
import HowAdsWork from './HowAdsWork';
import DataShowcase from './DataShowcase';
import AdAnatomy from './AdAnatomy';
import Process from './Process';
import CommonMistakes from './CommonMistakes';
import Glossary from './Glossary';
import Comparison from './Comparison';
import LearningHub from './LearningHub';
import SubServices from './SubServices';
import FAQ, { GA_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Google Ads Management',
  serviceType: 'Pay-Per-Click Advertising',
  category: ['Search Ads', 'Performance Max', 'Display', 'YouTube Ads', 'Shopping', 'Local Services Ads'],
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '2500', priceCurrency: 'USD', description: 'Single-location, single-campaign-type accounts' },
    { '@type': 'Offer', name: 'Growth', price: '4500', priceCurrency: 'USD', description: 'Multi-campaign, Search + PMax + Remarketing' },
    { '@type': 'Offer', name: 'Scale', price: '7500', priceCurrency: 'USD', description: 'Multi-location networks, full-channel paid' },
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GA_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Google Ads' },
]);

const GoogleAds = () => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo
        title={t('googleAds.seo.title')}
        description={t('googleAds.seo.description')}
        path="/services/google-ads"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero />
      <TrustBar />
      <CampaignTypes />
      <HowAdsWork />
      <DataShowcase />
      <AdAnatomy />
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

export default GoogleAds;
