import type { ReactNode } from 'react';
import { SITE } from '@/content/site';

/**
 * Site-wide JSON-LD schema helpers.
 *
 * These produce the "foundation" structured data that every page benefits from:
 * `Organization`, `WebSite`, and `ProfessionalService`. They are emitted globally
 * via the default `<Seo />` rendered in `App.tsx`. Per-page schema
 * (Service, FAQPage, Article, NewsArticle, BreadcrumbList, etc.) is composed
 * by each page using these helpers + `buildBreadcrumbList()`.
 *
 * The functions return plain objects, not React nodes. Pass them to
 * `<Seo schema={...} />` (or an array of them) to emit.
 */

/**
 * Logo URL for JSON-LD. Uses `/favicon.svg` (the only logo-like asset in
 * `public/` today; the brand PNG is Vite-bundled at `src/assets/` and ships
 * with a content-hashed URL that is not stable for structured-data use).
 *
 * To upgrade: copy `src/assets/the-nextgen-logo.png` → `public/the-nextgen-logo.png`
 * and change this constant. PNG is preferred over SVG for Google Knowledge
 * Graph eligibility, but SVG is valid and renders correctly until the PNG ships.
 */
const ABSOLUTE_LOGO_URL = `${SITE.url}/favicon.svg`;

/**
 * Top-level Organization schema. Identifies the business across the site.
 * Should appear on every page.
 */
export const buildOrganizationSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}#organization`,
  name: SITE.legalName,
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: ABSOLUTE_LOGO_URL,
    contentUrl: ABSOLUTE_LOGO_URL,
  },
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone.intl,
  // `founder` and `foundingDate` are intentionally omitted until the
  // visible source content is internally consistent. The visible founder
  // on About/Team.tsx + Team/Founder.tsx is "Jay Dahal"; the previous
  // page-level Organization schema had "Sarah Chen" (a testimonial /
  // blog-author name, not the founder). Founding year also conflicts:
  // Team/Founder.tsx says "Est. 2018", About/Team.tsx + GoogleAds say 2019.
  // When the user confirms both, re-add with the verified values.
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: SITE.phone.intl,
      email: SITE.email,
      areaServed: 'US',
      availableLanguage: ['en'],
    },
  ],
  sameAs: [SITE.social.facebook, SITE.social.x, SITE.social.linkedin],
});

/**
 * WebSite schema with SearchAction. Enables Google sitelinks search box
 * on branded SERPs. Should appear once site-wide.
 */
export const buildWebsiteSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { '@id': `${SITE.url}#organization` },
  inLanguage: 'en-US',
});

/**
 * ProfessionalService schema (sub-type of LocalBusiness, appropriate for a
 * marketing agency with a physical office). Includes geo coordinates and
 * opening hours so the local-business signal still fires in Knowledge Graph.
 *
 * IMPORTANT: do NOT use `MedicalBusiness` here. That subtype is reserved
 * for medical-care providers (clinics, hospitals, dental practices) and
 * would misrepresent TheNextGen, which is a healthcare *marketing* agency,
 * not a healthcare provider. ProfessionalService is the accurate type for
 * a B2B services firm.
 */
export const buildProfessionalServiceSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}#professionalservice`,
  name: SITE.legalName,
  url: SITE.url,
  logo: ABSOLUTE_LOGO_URL,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone.intl,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.8735093,
    longitude: -96.9832298,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: [
    { '@type': 'State', name: 'Texas' },
    { '@type': 'Country', name: 'United States' },
  ],
  sameAs: [SITE.social.facebook, SITE.social.x, SITE.social.linkedin],
});

export interface BreadcrumbItem {
  /** Visible name (e.g. "Services"). */
  name: string;
  /** Root-relative path (e.g. "/services") or absolute URL. */
  path?: string;
}

/**
 * BreadcrumbList schema builder. Pass an array of items in document order
 * (Home → Section → Page). The last item should typically omit `path` since
 * it represents the current page.
 *
 * Example:
 *   buildBreadcrumbList([
 *     { name: 'Home', path: '/' },
 *     { name: 'Services', path: '/services' },
 *     { name: 'Healthcare SEO' },
 *   ])
 */
export const buildBreadcrumbList = (items: readonly BreadcrumbItem[]): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => {
    const entry: Record<string, unknown> = {
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
    };
    if (item.path) {
      const absolute = item.path.startsWith('http')
        ? item.path
        : `${SITE.url}${item.path.startsWith('/') ? item.path : `/${item.path}`}`;
      entry.item = absolute;
    }
    return entry;
  }),
});

/**
 * Convenience: the canonical site-wide foundation triple.
 * Use as `<Seo schema={SITE_WIDE_SCHEMAS} />` at the App level.
 */
export const SITE_WIDE_SCHEMAS: ReadonlyArray<Record<string, unknown>> = [
  buildOrganizationSchema(),
  buildWebsiteSchema(),
  buildProfessionalServiceSchema(),
];

/**
 * Recursively extract plain text from any React node tree. Used to populate
 * Schema.org `Answer.text` fields when the rendered answer is JSX
 * (paragraphs, lists, `<strong>`, etc.) rather than a plain string.
 *
 * Whitespace handling is loose — adjacent text runs get joined directly,
 * which is acceptable for FAQ snippet eligibility (Google trims and
 * collapses whitespace). For perfect typographic fidelity, author a
 * dedicated plain-text answer field on the data shape.
 */
export const reactNodeToText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join(' ');
  if (typeof node === 'object' && 'props' in node) {
    const props = (node as { props: { children?: ReactNode } }).props;
    return reactNodeToText(props.children);
  }
  return '';
};
