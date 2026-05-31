import type { TFunction } from 'i18next';
import type { NarrativeBlock } from '@/components/DetailNarrative';
import {
  ENGAGEMENT_DETAILS,
  INDUSTRY_DETAILS,
  CAPABILITY_DETAILS,
  detailHref,
  type DetailEntry,
  type DetailKind,
} from '../details.data';
import { SITE } from '@/content/site';

/** Maps DetailKind → top-level key under `ourWork.*` in pages.json that contains
 *  the per-slug entry translations. */
export const kindGroupKey = (kind: DetailKind): 'engagements' | 'industries' | 'capabilities' =>
  kind === 'engagement' ? 'engagements' : kind === 'industry' ? 'industries' : 'capabilities';

/** Live-translated entry title — falls back to the original English. */
export const localizedEntryTitle = (entry: DetailEntry, t: TFunction): string =>
  t(`ourWork.${kindGroupKey(entry.kind)}.${entry.slug}.title`, entry.title);

export const KIND_GROUP: Record<DetailKind, DetailEntry[]> = {
  engagement: ENGAGEMENT_DETAILS,
  industry: INDUSTRY_DETAILS,
  capability: CAPABILITY_DETAILS,
};

export const buildNarrativeBlocks = (
  entry: DetailEntry,
  t: TFunction
): { about: NarrativeBlock; approach: NarrativeBlock } => {
  const groupKey = kindGroupKey(entry.kind);
  const localizedTitle = localizedEntryTitle(entry, t);

  const aboutBody =
    t(`ourWork.${groupKey}.${entry.slug}.longBody.0`, { defaultValue: '' }) ||
    t(`ourWork.${groupKey}.${entry.slug}.description`, entry.description) ||
    t('ourWork.detail.narrative.fallbackAboutBody');
  const approachBody =
    t(`ourWork.${groupKey}.${entry.slug}.longBody.1`, { defaultValue: '' }) ||
    aboutBody ||
    t('ourWork.detail.narrative.fallbackApproachBody');

  const aboutHeadline = t(`ourWork.detail.narrative.aboutHeadline.${entry.kind}`, {
    title: localizedTitle,
  });
  const approachHeadline = t(`ourWork.detail.narrative.approachHeadline.${entry.kind}`, {
    title: localizedTitle,
  });

  return {
    about: {
      eyebrow: `${t('ourWork.detail.narrative.aboutEyebrowPrefix')} ${t(
        `ourWork.detail.kindLabels.${entry.kind}`
      ).toLowerCase()}`,
      title: aboutHeadline,
      body: aboutBody,
      ctaText: t('ourWork.detail.narrative.learnMore'),
      ctaTo: '/our-work',
      image: entry.img,
      imageAlt: '',
    },
    approach: {
      eyebrow: t('ourWork.detail.narrative.approachEyebrow'),
      title: approachHeadline,
      body: approachBody,
      ctaText: t('ourWork.detail.narrative.aboutPage'),
      ctaTo: '/about',
      image: entry.img,
      imageAlt: '',
    },
  };
};

export const buildSchema = (entry: DetailEntry) => {
  if (entry.kind === 'engagement') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: entry.title,
      description: entry.description,
      about: entry.eyebrow,
      author: { '@id': `${SITE.url}#organization` },
      publisher: { '@id': `${SITE.url}#organization` },
      mainEntityOfPage: `${SITE.url}${detailHref(entry.kind, entry.slug)}`,
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: entry.title,
    serviceType:
      entry.kind === 'industry' ? 'Healthcare marketing services for ' + entry.title : entry.title,
    description: entry.description,
    provider: { '@id': `${SITE.url}#organization` },
    areaServed: 'United States',
  };
};

export const faqSchema = (entry: DetailEntry) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: entry.faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
