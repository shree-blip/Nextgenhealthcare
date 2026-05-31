import { useTranslation } from 'react-i18next';
import NewsHead from './NewsHead';
import NewsHeroGrid from './NewsHeroGrid';
import NewsThreeColumn from './NewsThreeColumn';
import TrendingRail from './TrendingRail';
import NewsletterStrip from './NewsletterStrip';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const NEWS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Healthcare News & Insights - TheNextGen Weekly Brief',
  description:
    'Weekly editorial brief covering healthcare research, compliance, telehealth, AI operations, and patient-acquisition marketing.',
  url: `${SITE.url}/healthcare-news`,
  isPartOf: { '@id': `${SITE.url}#website` },
  publisher: { '@id': `${SITE.url}#organization` },
  inLanguage: 'en-US',
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Healthcare News' },
]);

const HealthcareNews = () => {
  const { t } = useTranslation('pages');
  return (
    <>
      <Seo
        title={t('healthcareNews.seo.indexTitle')}
        description={t('healthcareNews.seo.indexDescription')}
        path="/healthcare-news"
        schema={[NEWS_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <NewsHead />
      <NewsHeroGrid />
      <NewsThreeColumn />
      <TrendingRail />
      <NewsletterStrip />
    </>
  );
};

export default HealthcareNews;
