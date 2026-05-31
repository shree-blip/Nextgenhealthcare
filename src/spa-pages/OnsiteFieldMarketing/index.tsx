import '../../styles/onsite-field-marketing.css';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Brief from './Brief';
import Channels from './Channels';
import Deliverables from './Deliverables';
import Process from './Process';
import WhyUs from './WhyUs';
import Metrics from './Metrics';
import Challenges from './Challenges';
import Testimonials from './Testimonials';
import FAQ, { OFM_FAQ_ITEMS } from './FAQ';
import CTA from './CTA';
import { buildBreadcrumbList } from '@/lib/schema';
import { SERVICE_SCHEMA } from './data';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: OFM_FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};

const OnsiteFieldMarketing = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:onsiteFieldMarketing.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:onsiteFieldMarketing.seo.title')}
        description={t('pages:onsiteFieldMarketing.seo.description')}
        path="/onsite-field-marketing"
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <TrustBar />
      <Brief />
      <Channels />
      <Deliverables />
      <Process />
      <WhyUs />
      <Metrics />
      <Challenges />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default OnsiteFieldMarketing;
