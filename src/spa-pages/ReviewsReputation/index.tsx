import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Flow from './Flow';
import Channels from './Channels';
import Outcomes from './Outcomes';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

/* ============================================================
   REVIEWS & REPUTATION — editorial redesign
   Tone-coded loop progression (sage → tan → cta → navy),
   premium card hierarchy, decorative gradient panel for the
   header rows, and color-tinted channel cards.
   ============================================================ */

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare Reviews & Reputation Management',
  serviceType: 'Reputation Management',
  category: ['Review collection', 'Review response', 'Sentiment tracking', 'Local Pack ranking'],
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks, multi-location MSOs',
  },
};

const ReviewsReputation = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:reviewsReputation.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:reviewsReputation.seo.title')}
        description={t('pages:reviewsReputation.seo.description')}
        path="/reviews-reputation"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Flow />
      <Channels />
      <Outcomes />
      <Closing />
    </>
  );
};

export default ReviewsReputation;
