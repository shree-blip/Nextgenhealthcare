import { useTranslation } from 'react-i18next';
import FAQHead from './FAQHead';
import FAQList from './FAQList';
import WhyUs from './WhyUs';
import Seo from '@/components/Seo';
import { buildBreadcrumbList, reactNodeToText } from '@/lib/schema';
import { CATEGORIES } from '@/content/faq/categories';

// FAQPage schema derived from the same CATEGORIES data the page renders.
// Previously this was hardcoded to 3 sample questions while the page
// displayed all ~17 — Google ignores schema that doesn't match visible
// content, so the derived shape ensures every question is snippet-eligible.
// The schema is built off the static English fallback so it can be emitted
// at module load (outside React); the visible questions render via the
// `useFAQCategories` hook for live translation.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: reactNodeToText(item.a).trim(),
      },
    }))
  ),
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'FAQ' },
]);

const FAQ = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <Seo
        title={t('faq.seo.title')}
        description={t('faq.seo.description')}
        path="/faq"
        schema={[FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <FAQHead />
      <FAQList />
      <WhyUs />
    </>
  );
};

export default FAQ;
