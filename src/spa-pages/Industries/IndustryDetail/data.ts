import type { TFunction } from 'i18next';
import type { NarrativeBlock } from '@/components/DetailNarrative';
import type { IndustryDetailEntry } from '@/content/industries/details.data';
import { SITE } from '@/content/site';

export const buildIndustryNarrative = (
  entry: IndustryDetailEntry,
  t: TFunction
): { about: NarrativeBlock; approach: NarrativeBlock } => {
  const labelLower = entry.label.toLowerCase();
  return {
    about: {
      eyebrow: t('detailPage.narrative.aboutEyebrow', { label: entry.label }),
      title: t('detailPage.narrative.aboutTitle', { label: entry.label }),
      body:
        entry.longBody[0] ||
        entry.description ||
        t('detailPage.narrative.aboutFallbackBody', { label: labelLower }),
      ctaText: t('detailPage.narrative.aboutCta'),
      ctaTo: '/industries',
      image: entry.image,
      imageAlt: '',
    },
    approach: {
      eyebrow: t('detailPage.narrative.approachEyebrow'),
      title: t('detailPage.narrative.approachTitle', { label: labelLower }),
      body:
        entry.longBody[1] ||
        entry.longBody[0] ||
        t('detailPage.narrative.approachFallbackBody'),
      ctaText: t('detailPage.narrative.approachCta'),
      ctaTo: '/about',
      image: entry.image,
      imageAlt: '',
    },
  };
};

export const serviceSchema = (entry: IndustryDetailEntry) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: `Healthcare marketing for ${entry.label}`,
  serviceType: `${entry.label} - ${entry.meta}`,
  description: entry.description,
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: 'United States',
});

export const faqSchema = (entry: IndustryDetailEntry) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: entry.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
