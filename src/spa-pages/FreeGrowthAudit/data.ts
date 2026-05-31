/* ============================================================
   FREE GROWTH AUDIT — page data + JSON-LD schemas

   SEO strategy notes:
   - Service + Offer schema (with price 0) makes Google show the
     audit as a free offering in rich results.
   - HowTo schema mirrors the on-page 5-day timeline so the page
     is eligible for step-rich SERP carousels.
   - FAQPage schema is built from FAQ_ITEMS, the same source the
     visible FAQ section renders from. One edit updates both.
   - AggregateRating is conservative (4.9, 87 reviews) - matches
     the visible "4.9 on Google" trustline so we are not lying
     to Google about ratings we cannot prove.
   ============================================================ */

import i18n from '@/i18n';

export const TAILWIND_ACCENT = '#B38B6D';

export interface FaqItem {
  q: string;
  a: string;
}

/** Source of truth for FAQPage JSON-LD. Resolved in English. The visible
 *  FAQ component reads from the active language directly. */
export const FAQ_ITEMS: FaqItem[] = i18n.t('pages:freeGrowthAudit.faq.items', {
  returnObjects: true,
  lng: 'en',
}) as FaqItem[];

/* ---------- Service + Offer schema ---------- */
export const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://thenextgenhealth.com/free-growth-audit#service',
  name: 'Free Healthcare Growth Audit',
  alternateName: [
    'Free Healthcare Marketing Audit',
    'Healthcare Practice Growth Audit',
    '90-Day Healthcare Growth Plan',
  ],
  serviceType: 'Healthcare marketing audit and 90-day growth plan',
  category: 'Healthcare Marketing Audit',
  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'Dental practices, med spas, urgent care, primary care, mental health, dermatology, plastic surgery, specialty and emergency clinics',
  },
  provider: {
    '@type': 'ProfessionalService',
    name: 'TheNextGen Healthcare Marketing',
    url: 'https://thenextgenhealth.com',
    areaServed: { '@type': 'Country', name: 'United States' },
  },
  description:
    'A free 5-business-day healthcare marketing audit run by a senior growth strategist. Includes a visibility score against your top local competitors, a funnel-leak map, a paid-media review with wasted-spend math, and a ranked 90-day growth plan delivered as a 12-page PDF.',
  areaServed: { '@type': 'Country', name: 'United States' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
    description: 'Free Healthcare Growth Audit — no credit card, no obligation',
    url: 'https://thenextgenhealth.com/free-growth-audit',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'What is included in the audit',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local visibility scoring' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Funnel leak map' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paid media review' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '90-day growth plan' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87',
    bestRating: '5',
    worstRating: '1',
  },
};

/* ---------- HowTo schema (the 5-day process) ---------- */
export const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to get a Free Healthcare Growth Audit',
  description:
    'A 5-business-day process to receive a strategist-written growth audit and ranked 90-day plan for your healthcare practice — at no cost.',
  totalTime: 'P5D',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Day 0 — You apply',
      text: 'Submit the on-page form: name, work email, practice URL, and practice type. Takes two minutes.',
      url: 'https://thenextgenhealth.com/free-growth-audit#audit-form',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Day 1 — We accept',
      text: 'We confirm by email within one business hour, share the audit folder, and request read-only access to your ad accounts and GBP.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Day 3 — Deep audit',
      text: 'A senior strategist audits your site, Google Business Profile, ad accounts, competitors, content gaps, schema and AI Overview readiness — under the hood.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Day 5 — The working call',
      text: 'A 45-minute working call (recorded) walks you through the 12-page PDF report and the ranked 90-day plan. No sales pitch.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Day 5+ — You decide',
      text: 'Run the plan yourself, hand it to your current agency, or hire us. The PDF is yours either way.',
    },
  ],
};

/* ---------- FAQPage schema (mirrors FAQ_ITEMS) ---------- */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* ---------- WebPage schema (helps Google understand intent) ---------- */
export const WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://thenextgenhealth.com/free-growth-audit#webpage',
  url: 'https://thenextgenhealth.com/free-growth-audit',
  name: 'Free Healthcare Growth Audit — 5-Day Visibility, Funnel & Paid Review',
  description:
    'Free healthcare marketing audit for dental practices, med spas, urgent care and specialty clinics. A senior strategist delivers a 12-page PDF report and ranked 90-day growth plan in five business days. No credit card, no obligation.',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://thenextgenhealth.com/favicon.svg',
  },
  about: { '@type': 'Thing', name: 'Healthcare practice marketing audit' },
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Healthcare practice owners, practice managers, marketing directors',
  },
  inLanguage: 'en-US',
};
