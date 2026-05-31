import { useTranslation } from 'react-i18next';
import BlogBanner from './BlogBanner';
import BlogFeed from './BlogFeed';
import BlogNewsletter from './BlogNewsletter';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'TheNextGen Healthcare Marketing Blog',
  description:
    'Field-tested healthcare marketing insights, HIPAA compliance updates, patient acquisition tactics, and case studies.',
  url: `${SITE.url}/blog`,
  publisher: { '@id': `${SITE.url}#organization` },
  isPartOf: { '@id': `${SITE.url}#website` },
  inLanguage: 'en-US',
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Blog' },
]);

const Blog = () => {
  const { t } = useTranslation('blog');

  return (
    <>
      <Seo
        title={t('seo.indexTitle')}
        description={t('seo.indexDescription')}
        path="/blog"
        schema={[BLOG_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <BlogBanner />
      <BlogFeed />
      <BlogNewsletter />
    </>
  );
};

export default Blog;
