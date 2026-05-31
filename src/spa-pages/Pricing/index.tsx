import { useTranslation } from 'react-i18next';
import PricingHero from './PricingHero';
import PricingTiers from './PricingTiers';
import ComparisonTable from './ComparisonTable';
import InvestmentIncludes from './InvestmentIncludes';
import AutomationROI from './AutomationROI';
import PricingFAQ from './PricingFAQ';
import FinalCTA from './FinalCTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

// Service + Offers schema for the three retainer tiers. The Scale Elite
// tier uses `priceCurrency` without a fixed `price` to signal a custom
// quote rather than an unknown number.
const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Marketing Retainer',
  provider: { '@id': `${SITE.url}#organization` },
  serviceType: 'Healthcare Marketing',
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter Care',
      price: '5000',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '5000',
        priceCurrency: 'USD',
        billingDuration: 'P1M',
      },
    },
    {
      '@type': 'Offer',
      name: 'Growth Pro',
      price: '10000',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '10000',
        priceCurrency: 'USD',
        billingDuration: 'P1M',
      },
    },
    {
      '@type': 'Offer',
      name: 'Scale Elite',
      description: 'Custom-scoped retainer for multi-location healthcare networks.',
      priceCurrency: 'USD',
    },
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Pricing' },
]);

const Pricing = () => {
  const { t } = useTranslation('pricing');

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        path="/pricing"
        schema={[SERVICE_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <PricingHero />
      <PricingTiers />
      <ComparisonTable />
      <InvestmentIncludes />
      <AutomationROI />
      <PricingFAQ />
      <FinalCTA />
    </>
  );
};

export default Pricing;
