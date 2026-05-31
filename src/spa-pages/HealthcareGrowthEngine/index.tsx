import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import TrustStrip from './TrustStrip';
import TheGap from './TheGap';
import Channels from './Channels';
import HowItRuns from './HowItRuns';
import Stack from './Stack';
import Outcomes from './Outcomes';
import Package from './Package';
import Voice from './Voice';
import Faq from './Faq';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SCHEMA } from './data';

/* ============================================================
   HEALTHCARE GROWTH ENGINE — revamped editorial layout.
   Hero · Trust strip · Gap · Channels · Engine loop · Stack ·
   Outcomes · Engagement package · Voice · FAQ · Closing CTA.
   Swiss grid, hairline rules, restrained colour. Every element
   earns its place — visual hierarchy first, copy second.
   ============================================================ */

const HealthcareGrowthEngine = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:healthcareGrowthEngine.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:healthcareGrowthEngine.seo.title')}
        description={t('pages:healthcareGrowthEngine.seo.description')}
        path="/healthcare-growth-engine"
        schema={[SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <TrustStrip />
      <TheGap />
      <Channels />
      <HowItRuns />
      <Stack />
      <Outcomes />
      <Package />
      <Voice />
      <Faq />
      <Closing />
    </>
  );
};

export default HealthcareGrowthEngine;
