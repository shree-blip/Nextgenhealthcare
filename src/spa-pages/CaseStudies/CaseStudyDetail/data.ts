import type { CaseStudy } from '../caseStudies.data';
import { SITE } from '@/content/site';

export const buildSchema = (study: CaseStudy) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: `${study.name} - ${study.metricNum} ${study.metricLbl}`,
  description: study.brief,
  url: `${SITE.url}/case-studies/${study.id}`,
  about: {
    '@type': 'Organization',
    name: study.name,
    address: study.location,
  },
  author: { '@id': `${SITE.url}#organization` },
  publisher: { '@id': `${SITE.url}#organization` },
  mainEntityOfPage: `${SITE.url}/case-studies/${study.id}`,
});

export const buildBreadcrumbSchema = (study: CaseStudy) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Case studies',
      item: `${SITE.url}/case-studies`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: study.name,
      item: `${SITE.url}/case-studies/${study.id}`,
    },
  ],
});
