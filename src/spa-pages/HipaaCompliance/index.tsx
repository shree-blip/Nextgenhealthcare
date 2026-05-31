import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import Story from './Story';
import Pillars from './Pillars';
import Coverage from './Coverage';
import Loop from './Loop';
import CTA from './CTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SCHEMA } from './data';

/* ============================================================
   HIPAA COMPLIANCE - Image-driven swiss redesign.
   Hero with security image, 3 safeguard pillars, in-scope/out-of-scope
   coverage cards, 4-step compliance loop, image CTA card.
   ============================================================ */

const HipaaCompliance = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: t('pages:hipaaCompliance.breadcrumb.home'), path: '/' },
    { name: t('pages:hipaaCompliance.breadcrumb.current') },
  ]);

  return (
    <main className="gt-page gt-page-x hcp-page">
      <Seo
        title={t('pages:hipaaCompliance.seo.title')}
        description={t('pages:hipaaCompliance.seo.description')}
        path="/hipaa-compliance"
        schema={[SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Story />
      <Pillars />
      <Coverage />
      <Loop />
      <CTA />
    </main>
  );
};

export default HipaaCompliance;
