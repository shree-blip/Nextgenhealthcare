const RAW_SERVICE_CATEGORY_OPTIONS = [
  'SEO & Local Search',
  'Google Business Profile',
  'Google Ads / Paid Search',
  'Social Media',
  'Blog / Content',
  'Email Campaigns',
  'Strategy & Planning',
  'Brand Identity / Graphic Design',
  'Brochure / Print Design',
  'Medical Automation',
  'Custom Software / Dashboard / Integrations',
] as const;

export const SERVICE_CATEGORY_OPTIONS = [...RAW_SERVICE_CATEGORY_OPTIONS];
export type ServiceCategory = (typeof RAW_SERVICE_CATEGORY_OPTIONS)[number];
