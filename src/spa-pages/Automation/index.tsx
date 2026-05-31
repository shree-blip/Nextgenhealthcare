import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AutomationHero from './AutomationHero';
import WhatIsAutomation from './WhatIsAutomation';
import SolutionsLibrary from './SolutionsLibrary';
import ImpactBanner from './ImpactBanner';
import TemplatesSlider from './TemplatesSlider';
import UseCases from './UseCases';
import HowItWorks from './HowItWorks';
import BookingModal from '@/components/BookingModal';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Automation Workflows',
  serviceType: 'Healthcare Workflow Automation · HIPAA-Aware',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Automation' },
]);

const Automation = () => {
  const { t } = useTranslation(['automation']);
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <Seo
        title={t('automation:seo.title')}
        description={t('automation:seo.description')}
        path="/automation"
        schema={[SERVICE_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <AutomationHero onBook={openBooking} />
      <WhatIsAutomation />
      <UseCases />
      <SolutionsLibrary />
      <HowItWorks />
      <ImpactBanner />
      <TemplatesSlider />

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  );
};

export default Automation;
