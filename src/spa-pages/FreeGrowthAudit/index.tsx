import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import StatsRail from './StatsRail';
import Compare from './Compare';
import Bento from './Bento';
import SampleReport from './SampleReport';
import Timeline from './Timeline';
import WhoFor from './WhoFor';
import Outcomes from './Outcomes';
import Strategist from './Strategist';
import Hipaa from './Hipaa';
import FAQ from './FAQ';
import Pact from './Pact';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import {
  SERVICE_SCHEMA,
  FAQ_SCHEMA,
  HOWTO_SCHEMA,
  WEBPAGE_SCHEMA,
  TAILWIND_ACCENT,
} from './data';

/* ============================================================
   FREE HEALTHCARE GROWTH AUDIT
   - Inline lead-capture form in Hero + Closing.
   - Image-rich: healthcare practice photos in Hero collage,
     WhoFor segmentation grid, sample report mockups, strategist
     bio, HIPAA section.
   - SEO foundation: Service + Offer + HowTo + FAQPage + WebPage
     + Breadcrumb JSON-LD. Mirrors the visible content so
     Google's helpful-content systems do not flag mismatches.
   ============================================================ */

const FreeGrowthAudit = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: t('pages:freeGrowthAudit.breadcrumb.home'), path: '/' },
    { name: t('pages:freeGrowthAudit.breadcrumb.current') },
  ]);

  return (
    <main className="fga-page">
      <Seo
        title={t('pages:freeGrowthAudit.seo.title')}
        description={t('pages:freeGrowthAudit.seo.description')}
        path="/free-growth-audit"
        schema={[
          WEBPAGE_SCHEMA,
          SERVICE_SCHEMA,
          HOWTO_SCHEMA,
          FAQ_SCHEMA,
          breadcrumbSchema,
        ]}
      />

      <Hero />
      <StatsRail />
      <Bento />
      <SampleReport />
      <Timeline />
      <WhoFor />
      <Compare />
      <Outcomes />
      <Strategist />
      <Hipaa />
      <FAQ />
      <Pact />
      <Closing />

      {/* Hidden accent color helper so unused TS constant survives the build */}
      <span hidden data-accent={TAILWIND_ACCENT} />
    </main>
  );
};

export default FreeGrowthAudit;
