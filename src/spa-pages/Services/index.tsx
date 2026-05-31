import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ServicesHero from './ServicesHero';
import WhoWeServe from './WhoWeServe';
import ServicesList from './ServicesList';
import Process from './Process';
import TrustInfrastructure from './TrustInfrastructure';
import Pillars from './Pillars';
import { useCustomSoftwarePanes, useAutomationPanes } from '@/content/services/pillars';
import FeaturePair from './FeaturePair';
import ServicesFAQ from './ServicesFAQ';
import CTABanner from './CTABanner';
import BookingModal from '@/components/BookingModal';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

// Service umbrella schema for the /services hub — lists each spoke as a
// nested Offer item. FAQPage schema is emitted by <ServicesFAQ /> itself
// (derived from the same data array it renders), so we don't duplicate
// it here.
const SERVICES_HUB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Marketing Services',
  serviceType: 'Healthcare Marketing',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'Country', name: 'United States' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healthcare Marketing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare SEO', url: `${SITE.url}/services/seo` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Business Profile Management', url: `${SITE.url}/services/google-business-profile` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads for Healthcare', url: `${SITE.url}/services/google-ads` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Analytics & Reporting', url: `${SITE.url}/services/analytics-reporting` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Email & Lifecycle Campaigns', url: `${SITE.url}/services/email-drip-campaigns` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Brand Identity & Design', url: `${SITE.url}/services/brand-identity-design` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Website Design & Development', url: `${SITE.url}/services/website-design-dev` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Social Media Marketing', url: `${SITE.url}/services/social-media-marketing` } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Healthcare Content & Copywriting', url: `${SITE.url}/services/content-copywriting` } },
    ],
  },
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Services' },
]);

const Services = () => {
  const { t } = useTranslation('services');
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  const customSoftwarePanes = useCustomSoftwarePanes();
  const automationPanes = useAutomationPanes();

  return (
    <>
      <Seo
        title={t('indexSeo.title')}
        description={t('indexSeo.description')}
        path="/services"
        schema={[SERVICES_HUB_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <ServicesHero />
      <WhoWeServe />
      <ServicesList />
      <Process />
      <TrustInfrastructure />
      <Pillars
        id="custom-software"
        ariaTitleId="pillar-1-title"
        eyebrow={t('pillars.customSoftware.eyebrow')}
        title={t('pillars.customSoftware.title')}
        sub={t('pillars.customSoftware.sub')}
        panes={customSoftwarePanes}
      />
      <Pillars
        id="automation-ai"
        ariaTitleId="pillar-2-title"
        eyebrow={t('pillars.automation.eyebrow')}
        title={t('pillars.automation.title')}
        sub={t('pillars.automation.sub')}
        panes={automationPanes}
      />
      <FeaturePair />
      <ServicesFAQ onBook={openBooking} />
      <CTABanner onBook={openBooking} />

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  );
};

export default Services;
