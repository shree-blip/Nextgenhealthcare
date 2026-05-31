import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from './Hero';
import DataBand from './DataBand';
import TLDR from './TLDR';
import AtAGlance from './AtAGlance';
import FilterBar from './FilterBar';
import Library from './Library';
import ImageBreak from './ImageBreak';
import HowItWorks from './HowItWorks';
import Compliance from './Compliance';
import WhoFor from './WhoFor';
import PullQuote from './PullQuote';
import Promise from './Promise';
import CTABanner from './CTABanner';
import Related from './Related';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { useTemplates, TEMPLATES_SCHEMA, type Category } from './data';

/* ============================================================
   AUTOMATION · TEMPLATES — Swiss editorial library page.
   Alternating section bgs: #FAFAF8 ↔ #F8F9FA.
   Brand palette only: ink, gold, sage, periwinkle.
   ============================================================ */

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Automation', path: '/automation' },
  { name: 'Templates' },
]);

const Templates = () => {
  const { t } = useTranslation(['automation']);
  const templates = useTemplates();
  const [filter, setFilter] = useState<'All' | Category>('All');
  const visible = useMemo(
    () => (filter === 'All' ? templates : templates.filter((tpl) => tpl.cat === filter)),
    [filter, templates]
  );

  return (
    <main className="atx" id="atx-top">
      <Seo
        title={t('automation:templates.page.seoTitle')}
        description={t('automation:templates.page.seoDescription')}
        path="/automation/templates"
        schema={[TEMPLATES_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <Hero filter={filter} visibleCount={visible.length} />
      <DataBand />
      <TLDR />
      <AtAGlance />
      <FilterBar filter={filter} setFilter={setFilter} />
      <Library visible={visible} />
      <ImageBreak />
      <HowItWorks />
      <Compliance />
      <WhoFor />
      <PullQuote />
      <Promise />
      <CTABanner />
      <Related />
    </main>
  );
};

export default Templates;
