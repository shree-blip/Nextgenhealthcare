/**
 * Site-wide constants: brand identity, contact information, and social URLs.
 *
 * Single source of truth — every component that needs the business email,
 * phone, address, or social profile should import from here. Do not hardcode
 * these values in JSX.
 *
 * `phone.display` uses an en-dash (U+2013) to match the typography shown
 * in the site footer. The `phone.tel` value is the same number stripped
 * to digits for the `tel:` URI scheme.
 *
 * Address fields are stored as plain text. Render sites that need a
 * non-breaking space (e.g. to keep "Circle N" or "TX 75038" together)
 * should apply U+00A0 at the JSX render layer, not in the data.
 */
export const SITE = {
  name: 'TheNextGen Healthcare Marketing',
  legalName: 'TheNextGen Healthcare Marketing',
  description:
    'Full-service healthcare marketing agency. SEO, Google Ads, social media, website design, and HIPAA-compliant automation for clinics.',
  email: 'hello@thenextgenhealth.com',
  phone: {
    display: '+1 (972) 848–1153',
    tel: '+19728481153',
    intl: '+1-972-848-1153',
  },
  url: 'https://thenextgenhealth.com',
  address: {
    street: '3001 Skyway Circle N',
    city: 'Irving',
    region: 'TX',
    postalCode: '75038',
    country: 'US',
    mapsUrl: 'https://www.google.com/maps/place/3001+Skyway+Cir+N,+Irving,+TX+75038',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61590652352276',
    x: 'https://x.com/NextGenHealth20',
    linkedin: 'https://www.linkedin.com/company/thenextgen-health/',
  },
  copyrightYear: 2026,
} as const;
