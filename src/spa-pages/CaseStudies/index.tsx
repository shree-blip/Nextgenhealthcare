import { useTranslation } from 'react-i18next';
import CaseStudiesHead from './CaseStudiesHead';
import FeaturedCase from './FeaturedCase';
import PartnersMarquee from './PartnersMarquee';
import CaseStudiesCarousel from './CaseStudiesCarousel';
import StatsStrip from './StatsStrip';
import CaseStudySpotlight from './CaseStudySpotlight';
import EngagementProcess from './EngagementProcess';
import CTABanner from './CTABanner';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import { CASE_STUDIES } from './caseStudies.data';

const COLLECTION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Healthcare Marketing Case Studies — TheNextGen',
  url: `${SITE.url}/case-studies`,
  description:
    'Real engagements, real metrics — case studies from clinics, medspas, urgent care, and freestanding ER networks running on the TheNextGen growth operating system.',
  isPartOf: { '@id': `${SITE.url}#website` },
  publisher: { '@id': `${SITE.url}#organization` },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Healthcare marketing case studies',
    numberOfItems: CASE_STUDIES.length,
    itemListElement: CASE_STUDIES.map((study, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/case-studies/${study.id}`,
      name: study.name,
    })),
  },
};

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Case Studies' },
]);

const CaseStudies = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <Seo
        title={t('caseStudies.seo.indexTitle')}
        description={t('caseStudies.seo.indexDescription')}
        path="/case-studies"
        schema={[COLLECTION_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <CaseStudiesHead />
      <FeaturedCase />
      <PartnersMarquee />
      <CaseStudiesCarousel />
      <StatsStrip />
      <CaseStudySpotlight />
      <EngagementProcess />
      <CTABanner />
    </>
  );
};

export default CaseStudies;
