import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IndustriesHero from './IndustriesHero';
import IndustriesOverview from './IndustriesOverview';
import IndustryDeepDive from './IndustryDeepDive';
import AllIndustries from './AllIndustries';
import IndustriesFAQ from './IndustriesFAQ';
import BookingModal from '@/components/BookingModal';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

// ItemList of every vertical the /industries hub presents. Each item
// points at its dedicated industry-detail or sub-hub URL so search engines
// can crawl the network of vertical-specific pages from one place.
const INDUSTRIES_LIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Healthcare Verticals Served',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Clinics & Multi-Location Networks', url: `${SITE.url}/industries/clinics` },
    { '@type': 'ListItem', position: 2, name: 'MedSpas & Aesthetic Practices', url: `${SITE.url}/industries/medspas` },
    { '@type': 'ListItem', position: 3, name: 'Freestanding ERs & Urgent Care', url: `${SITE.url}/industries/specialty-emergency` },
    { '@type': 'ListItem', position: 4, name: 'Dental Practices', url: `${SITE.url}/industries/detail/dental` },
    { '@type': 'ListItem', position: 5, name: 'Urgent Care', url: `${SITE.url}/industries/detail/urgent-care` },
    { '@type': 'ListItem', position: 6, name: 'MedSpa', url: `${SITE.url}/industries/detail/medspa` },
    { '@type': 'ListItem', position: 7, name: 'Freestanding ER', url: `${SITE.url}/industries/detail/freestanding-er` },
    { '@type': 'ListItem', position: 8, name: 'Mental Health Practices', url: `${SITE.url}/industries/detail/mental-health` },
    { '@type': 'ListItem', position: 9, name: 'Primary Care', url: `${SITE.url}/industries/detail/primary-care` },
    { '@type': 'ListItem', position: 10, name: 'Chiropractic Practices', url: `${SITE.url}/industries/detail/chiropractic` },
    { '@type': 'ListItem', position: 11, name: 'Plastic Surgery', url: `${SITE.url}/industries/detail/plastic-surgery` },
    { '@type': 'ListItem', position: 12, name: 'Ophthalmology', url: `${SITE.url}/industries/detail/ophthalmology` },
    { '@type': 'ListItem', position: 13, name: 'Dermatology', url: `${SITE.url}/industries/detail/dermatology` },
  ],
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Industries' },
]);

const Industries = () => {
  const { t } = useTranslation('industries');
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        path="/industries"
        schema={[INDUSTRIES_LIST_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <IndustriesHero onBook={openBooking} />
      <IndustriesOverview />
      <AllIndustries />
      <IndustryDeepDive />
      <IndustriesFAQ onBook={openBooking} />

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  );
};

export default Industries;
