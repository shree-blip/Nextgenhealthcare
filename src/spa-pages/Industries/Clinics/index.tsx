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
import clinicsHero from '../../../assets/nextgen-image/Clinicbannerimg.png';
import snapBooking from '../../../assets/nextgen-image/Perlocationlandingimg.png';
import snapRecall from '../../../assets/nextgen-image/Recallinimg.png';
import snapDental from '../../../assets/nextgen-image/specialtydepthimg.png';

const Clinics = () => {
  const { t } = useTranslation(['pages', 'common']);
  const base = 'pages:industriesPages.clinics';

  const BREADCRUMB_SCHEMA = useMemo(
    () =>
      buildBreadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: 'Clinics' },
      ]),
    []
  );

  const QUICK_STATS: QuickStat[] = [
    {
      num: (
        <>
          +85<em>%</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.inquiries`),
    },
    {
      num: (
        <>
          4<em>×</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.listings`),
    },
    {
      num: (
        <>
          92<em>%</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.retention`),
    },
  ];

  const SPECIALTIES: SpecialtyRow[] = [
    { name: t(`${base}.specialties.familyPractice.name`), desc: t(`${base}.specialties.familyPractice.desc`) },
    { name: t(`${base}.specialties.cardiology.name`), desc: t(`${base}.specialties.cardiology.desc`) },
    { name: t(`${base}.specialties.dental.name`), desc: t(`${base}.specialties.dental.desc`) },
    { name: t(`${base}.specialties.pediatrics.name`), desc: t(`${base}.specialties.pediatrics.desc`) },
    { name: t(`${base}.specialties.dermatology.name`), desc: t(`${base}.specialties.dermatology.desc`) },
    { name: t(`${base}.specialties.multiSpecialty.name`), desc: t(`${base}.specialties.multiSpecialty.desc`) },
  ];

  const STEPS: PlayStep[] = [
    { name: t(`${base}.steps.audit.name`), body: t(`${base}.steps.audit.body`) },
    { name: t(`${base}.steps.foundation.name`), body: t(`${base}.steps.foundation.body`) },
    { name: t(`${base}.steps.acquisition.name`), body: t(`${base}.steps.acquisition.body`) },
    { name: t(`${base}.steps.retention.name`), body: t(`${base}.steps.retention.body`) },
  ];

  const SNAPSHOTS: Snapshot[] = [
    {
      image: snapBooking,
      label: t(`${base}.snapshots.items.booking.label`),
      caption: t(`${base}.snapshots.items.booking.caption`),
    },
    {
      image: snapRecall,
      label: t(`${base}.snapshots.items.recall.label`),
      caption: t(`${base}.snapshots.items.recall.caption`),
    },
    {
      image: snapDental,
      label: t(`${base}.snapshots.items.depth.label`),
      caption: t(`${base}.snapshots.items.depth.caption`),
    },
  ];

  const PRINCIPLES: Principle[] = [
    {
      title: t(`${base}.principles.items.attribution.title`),
      body: t(`${base}.principles.items.attribution.body`),
      accent: '#576DB5',
    },
    {
      title: t(`${base}.principles.items.dashboards.title`),
      body: t(`${base}.principles.items.dashboards.body`),
      accent: '#8FBC8F',
    },
    {
      title: t(`${base}.principles.items.directories.title`),
      body: t(`${base}.principles.items.directories.body`),
      accent: '#B38B6D',
    },
  ];

  const STATS: BigNumber[] = [
    {
      num: (
        <>
          +85<em>%</em>
        </>
      ),
      label: t(`${base}.stats.inquiries.label`),
      caption: t(`${base}.stats.inquiries.caption`),
    },
    {
      num: (
        <>
          $1.2M<em>+</em>
        </>
      ),
      label: t(`${base}.stats.revenue.label`),
      caption: t(`${base}.stats.revenue.caption`),
    },
    {
      num: (
        <>
          4<em>×</em>
        </>
      ),
      label: t(`${base}.stats.listings.label`),
      caption: t(`${base}.stats.listings.caption`),
    },
    {
      num: (
        <>
          92<em>%</em>
        </>
      ),
      label: t(`${base}.stats.recall.label`),
      caption: t(`${base}.stats.recall.caption`),
    },
  ];

  const FAQS: ServiceFAQItem[] = [
    { q: t(`${base}.faq.items.locations.q`), a: t(`${base}.faq.items.locations.a`) },
    { q: t(`${base}.faq.items.providers.q`), a: t(`${base}.faq.items.providers.a`) },
    { q: t(`${base}.faq.items.referrals.q`), a: t(`${base}.faq.items.referrals.a`) },
    { q: t(`${base}.faq.items.hipaa.q`), a: t(`${base}.faq.items.hipaa.a`) },
    { q: t(`${base}.faq.items.scale.q`), a: t(`${base}.faq.items.scale.a`) },
  ];

  const RELATED: RelatedServiceLink[] = [
    {
      to: '/services/seo',
      name: t(`${base}.related.items.seo.name`),
      blurb: t(`${base}.related.items.seo.blurb`),
      tag: t(`${base}.related.items.seo.tag`),
    },
    {
      to: '/services/google-business-profile',
      name: t(`${base}.related.items.gbp.name`),
      blurb: t(`${base}.related.items.gbp.blurb`),
      tag: t(`${base}.related.items.gbp.tag`),
    },
    {
      to: '/case-studies/primary-care-seo-roi',
      name: t(`${base}.related.items.caseStudy.name`),
      blurb: t(`${base}.related.items.caseStudy.blurb`),
      tag: t(`${base}.related.items.caseStudy.tag`),
    },
  ];

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Clinics & Multi-Specialty Practices - Marketing',
    serviceType: 'Healthcare Marketing',
    provider: { '@id': `${SITE.url}#organization` },
    audience: 'Family practices, multi-specialty groups, clinical networks',
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
    <img src={clinicsHero} alt={t(`${base}.hero.imageAlt`)} loading="eager" decoding="async" />
  );

  return (
    <>
      <Seo
        title={t(`${base}.seo.title`)}
        description={t(`${base}.seo.description`)}
        path="/industries/clinics"
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

export default Clinics;
