import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import IndustryHero from '@/components/industry/IndustryHero';
import Specialties from '@/components/industry/Specialties';
import Playbook from '@/components/industry/Playbook';
import Numbers from '@/components/industry/Numbers';
import IndustryPrinciples from '@/components/industry/IndustryPrinciples';
import IndustrySnapshots from '@/components/industry/IndustrySnapshots';
import IndustryCTA from '@/components/industry/IndustryCTA';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import RelatedServices from '@/components/service/RelatedServices';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import type { QuickStat } from '@/components/industry/IndustryHero';
import type { SpecialtyRow } from '@/components/industry/Specialties';
import type { PlayStep } from '@/components/industry/Playbook';
import type { BigNumber } from '@/components/industry/Numbers';
import type { Principle } from '@/components/industry/IndustryPrinciples';
import type { Snapshot } from '@/components/industry/IndustrySnapshots';
import type { ServiceFAQItem } from '@/components/service/ServiceFAQ';
import type { RelatedServiceLink } from '@/components/service/RelatedServices';
import medspasHero from '../../../assets/nextgen-image/Medspas&wellnessimg.png';
import snapMedspa from '../../../assets/nextgen-image/Consultmedspaimg.png';
import snapAesthetic from '../../../assets/nextgen-image/Aestheticreativeimg.png';
import snapDerm from '../../../assets/nextgen-image/Premiumpositioningimg.png';

const MedSpas = () => {
  const { t } = useTranslation(['pages', 'common']);
  const base = 'pages:industriesPages.medspas';

  const BREADCRUMB_SCHEMA = useMemo(
    () =>
      buildBreadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: 'MedSpas & Aesthetics' },
      ]),
    []
  );

  const QUICK_STATS: QuickStat[] = [
    {
      num: (
        <>
          4.5<em>×</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.roas`),
    },
    {
      num: (
        <>
          +180<em>%</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.leads`),
    },
    {
      num: (
        <>
          −40<em>%</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.cost`),
    },
  ];

  const SPECIALTIES: SpecialtyRow[] = [
    { name: t(`${base}.specialties.medspa.name`), desc: t(`${base}.specialties.medspa.desc`) },
    { name: t(`${base}.specialties.aesthetics.name`), desc: t(`${base}.specialties.aesthetics.desc`) },
    { name: t(`${base}.specialties.injectables.name`), desc: t(`${base}.specialties.injectables.desc`) },
    { name: t(`${base}.specialties.ivTherapy.name`), desc: t(`${base}.specialties.ivTherapy.desc`) },
    { name: t(`${base}.specialties.wellness.name`), desc: t(`${base}.specialties.wellness.desc`) },
    { name: t(`${base}.specialties.boutique.name`), desc: t(`${base}.specialties.boutique.desc`) },
  ];

  const STEPS: PlayStep[] = [
    { name: t(`${base}.steps.audit.name`), body: t(`${base}.steps.audit.body`) },
    { name: t(`${base}.steps.creative.name`), body: t(`${base}.steps.creative.body`) },
    { name: t(`${base}.steps.consult.name`), body: t(`${base}.steps.consult.body`) },
    { name: t(`${base}.steps.retention.name`), body: t(`${base}.steps.retention.body`) },
  ];

  const SNAPSHOTS: Snapshot[] = [
    {
      image: snapMedspa,
      label: t(`${base}.snapshots.items.consult.label`),
      caption: t(`${base}.snapshots.items.consult.caption`),
    },
    {
      image: snapAesthetic,
      label: t(`${base}.snapshots.items.creative.label`),
      caption: t(`${base}.snapshots.items.creative.caption`),
    },
    {
      image: snapDerm,
      label: t(`${base}.snapshots.items.premium.label`),
      caption: t(`${base}.snapshots.items.premium.caption`),
    },
  ];

  const PRINCIPLES: Principle[] = [
    {
      title: t(`${base}.principles.items.ltv.title`),
      body: t(`${base}.principles.items.ltv.body`),
      accent: '#B38B6D',
    },
    {
      title: t(`${base}.principles.items.compliance.title`),
      body: t(`${base}.principles.items.compliance.body`),
      accent: '#576DB5',
    },
    {
      title: t(`${base}.principles.items.retention.title`),
      body: t(`${base}.principles.items.retention.body`),
      accent: '#8FBC8F',
    },
  ];

  const STATS: BigNumber[] = [
    {
      num: (
        <>
          4.5<em>×</em>
        </>
      ),
      label: t(`${base}.stats.roas.label`),
      caption: t(`${base}.stats.roas.caption`),
    },
    {
      num: (
        <>
          +180<em>%</em>
        </>
      ),
      label: t(`${base}.stats.leads.label`),
      caption: t(`${base}.stats.leads.caption`),
    },
    {
      num: (
        <>
          −40<em>%</em>
        </>
      ),
      label: t(`${base}.stats.cost.label`),
      caption: t(`${base}.stats.cost.caption`),
    },
    {
      num: (
        <>
          $3.8M<em>+</em>
        </>
      ),
      label: t(`${base}.stats.revenue.label`),
      caption: t(`${base}.stats.revenue.caption`),
    },
  ];

  const FAQS: ServiceFAQItem[] = [
    { q: t(`${base}.faq.items.instagram.q`), a: t(`${base}.faq.items.instagram.a`) },
    { q: t(`${base}.faq.items.ltv.q`), a: t(`${base}.faq.items.ltv.a`) },
    { q: t(`${base}.faq.items.beforeAfter.q`), a: t(`${base}.faq.items.beforeAfter.a`) },
    { q: t(`${base}.faq.items.retention.q`), a: t(`${base}.faq.items.retention.a`) },
    { q: t(`${base}.faq.items.competitive.q`), a: t(`${base}.faq.items.competitive.a`) },
  ];

  const RELATED: RelatedServiceLink[] = [
    {
      to: '/meta-ads',
      name: t(`${base}.related.items.metaAds.name`),
      blurb: t(`${base}.related.items.metaAds.blurb`),
      tag: t(`${base}.related.items.metaAds.tag`),
    },
    {
      to: '/services/social-media-marketing',
      name: t(`${base}.related.items.social.name`),
      blurb: t(`${base}.related.items.social.blurb`),
      tag: t(`${base}.related.items.social.tag`),
    },
    {
      to: '/case-studies/cosmetic-surgery-lead-growth',
      name: t(`${base}.related.items.caseStudy.name`),
      blurb: t(`${base}.related.items.caseStudy.blurb`),
      tag: t(`${base}.related.items.caseStudy.tag`),
    },
  ];

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'MedSpas & Wellness Brands - Marketing',
    serviceType: 'Healthcare Marketing',
    provider: { '@id': `${SITE.url}#organization` },
    audience: 'MedSpas, aesthetic clinics, IV therapy, wellness brands',
  };

  const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const Illustration = (
    <img src={medspasHero} alt={t(`${base}.hero.imageAlt`)} loading="eager" decoding="async" />
  );

  return (
    <>
      <Seo
        title={t(`${base}.seo.title`)}
        description={t(`${base}.seo.description`)}
        path="/industries/medspas"
        schema={[SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <IndustryHero
        tag={t(`${base}.hero.tag`)}
        title={
          <>
            {t(`${base}.hero.titleLead`)}
            <em>{t(`${base}.hero.titleEm`)}</em>
          </>
        }
        lede={t(`${base}.hero.lede`)}
        illustration={Illustration}
        quickStats={QUICK_STATS}
      />
      <Specialties rows={SPECIALTIES} />
      <IndustrySnapshots
        items={SNAPSHOTS}
        eyebrow={t(`${base}.snapshots.eyebrow`)}
        title={
          <>
            {t(`${base}.snapshots.titleLead`)}
            <em>{t(`${base}.snapshots.titleEm`)}</em>
          </>
        }
      />
      <Playbook steps={STEPS} />
      <Numbers stats={STATS} />
      <IndustryPrinciples
        items={PRINCIPLES}
        sectionNum="04"
        title={
          <>
            {t(`${base}.principles.titleLead`)}
            <em>{t(`${base}.principles.titleEm`)}</em>
          </>
        }
        intro={t(`${base}.principles.intro`)}
      />
      <ServiceFAQ
        items={FAQS}
        serviceName={t(`${base}.faq.serviceName`)}
        title={t(`${base}.faq.title`)}
        sectionNum="05"
      />
      <RelatedServices
        items={RELATED}
        sectionNum="06"
        title={t(`${base}.related.title`)}
        intro={t(`${base}.related.intro`)}
      />
      <IndustryCTA
        tag={t(`${base}.cta.tag`)}
        title={<>{t(`${base}.cta.title`)}</>}
        body={t(`${base}.cta.body`)}
      />
    </>
  );
};

export default MedSpas;
