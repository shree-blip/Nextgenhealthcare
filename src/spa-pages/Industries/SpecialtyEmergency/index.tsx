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
import snapUrgent from '../../../assets/nextgen-image/Waittimepagesimg.png';
import snapFreestanding from '../../../assets/nextgen-image/Freestandingerimg.png';
import snapSpecialty from '../../../assets/nextgen-image/Specialdeepdiveimg.png';
import emergencyHero from '../../../assets/nextgen-image/specialtyemergencyerimg.png';

const SpecialtyEmergency = () => {
  const { t } = useTranslation(['pages', 'common']);
  const base = 'pages:industriesPages.specialtyEmergency';

  const BREADCRUMB_SCHEMA = useMemo(
    () =>
      buildBreadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/industries' },
        { name: 'Specialty & Emergency' },
      ]),
    []
  );

  const QUICK_STATS: QuickStat[] = [
    {
      num: (
        <>
          +120<em>%</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.visits`),
    },
    {
      num: (
        <>
          4.2<em>×</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.leads`),
    },
    {
      num: (
        <>
          99.8<em>%</em>
        </>
      ),
      label: t(`${base}.hero.quickStats.compliance`),
    },
  ];

  const SPECIALTIES: SpecialtyRow[] = [
    { name: t(`${base}.specialties.freestandingEr.name`), desc: t(`${base}.specialties.freestandingEr.desc`) },
    { name: t(`${base}.specialties.urgentCare.name`), desc: t(`${base}.specialties.urgentCare.desc`) },
    { name: t(`${base}.specialties.orthopedics.name`), desc: t(`${base}.specialties.orthopedics.desc`) },
    { name: t(`${base}.specialties.oncology.name`), desc: t(`${base}.specialties.oncology.desc`) },
    { name: t(`${base}.specialties.cardiology.name`), desc: t(`${base}.specialties.cardiology.desc`) },
    { name: t(`${base}.specialties.radiology.name`), desc: t(`${base}.specialties.radiology.desc`) },
  ];

  const STEPS: PlayStep[] = [
    { name: t(`${base}.steps.audit.name`), body: t(`${base}.steps.audit.body`) },
    { name: t(`${base}.steps.compliance.name`), body: t(`${base}.steps.compliance.body`) },
    { name: t(`${base}.steps.visibility.name`), body: t(`${base}.steps.visibility.body`) },
    { name: t(`${base}.steps.optimization.name`), body: t(`${base}.steps.optimization.body`) },
  ];

  const SNAPSHOTS: Snapshot[] = [
    {
      image: snapUrgent,
      label: t(`${base}.snapshots.items.waitTime.label`),
      caption: t(`${base}.snapshots.items.waitTime.caption`),
    },
    {
      image: snapFreestanding,
      label: t(`${base}.snapshots.items.launches.label`),
      caption: t(`${base}.snapshots.items.launches.caption`),
    },
    {
      image: snapSpecialty,
      label: t(`${base}.snapshots.items.depth.label`),
      caption: t(`${base}.snapshots.items.depth.caption`),
    },
  ];

  const PRINCIPLES: Principle[] = [
    {
      title: t(`${base}.principles.items.compliance.title`),
      body: t(`${base}.principles.items.compliance.body`),
      accent: '#576DB5',
    },
    {
      title: t(`${base}.principles.items.acuity.title`),
      body: t(`${base}.principles.items.acuity.body`),
      accent: '#B38B6D',
    },
    {
      title: t(`${base}.principles.items.waitTime.title`),
      body: t(`${base}.principles.items.waitTime.body`),
      accent: '#8FBC8F',
    },
  ];

  const STATS: BigNumber[] = [
    {
      num: (
        <>
          +120<em>%</em>
        </>
      ),
      label: t(`${base}.stats.visits.label`),
      caption: t(`${base}.stats.visits.caption`),
    },
    {
      num: (
        <>
          4.2<em>×</em>
        </>
      ),
      label: t(`${base}.stats.leads.label`),
      caption: t(`${base}.stats.leads.caption`),
    },
    {
      num: (
        <>
          −35<em>%</em>
        </>
      ),
      label: t(`${base}.stats.cpa.label`),
      caption: t(`${base}.stats.cpa.caption`),
    },
    {
      num: (
        <>
          99.8<em>%</em>
        </>
      ),
      label: t(`${base}.stats.compliance.label`),
      caption: t(`${base}.stats.compliance.caption`),
    },
  ];

  const FAQS: ServiceFAQItem[] = [
    { q: t(`${base}.faq.items.hospital.q`), a: t(`${base}.faq.items.hospital.a`) },
    { q: t(`${base}.faq.items.hipaa.q`), a: t(`${base}.faq.items.hipaa.a`) },
    { q: t(`${base}.faq.items.waitTime.q`), a: t(`${base}.faq.items.waitTime.a`) },
    { q: t(`${base}.faq.items.launch.q`), a: t(`${base}.faq.items.launch.a`) },
    { q: t(`${base}.faq.items.schema.q`), a: t(`${base}.faq.items.schema.a`) },
  ];

  const RELATED: RelatedServiceLink[] = [
    {
      to: '/hipaa-compliance',
      name: t(`${base}.related.items.hipaa.name`),
      blurb: t(`${base}.related.items.hipaa.blurb`),
      tag: t(`${base}.related.items.hipaa.tag`),
    },
    {
      to: '/aeo-schema',
      name: t(`${base}.related.items.aeo.name`),
      blurb: t(`${base}.related.items.aeo.blurb`),
      tag: t(`${base}.related.items.aeo.tag`),
    },
    {
      to: '/case-studies/er-network-patient-growth',
      name: t(`${base}.related.items.caseStudy.name`),
      blurb: t(`${base}.related.items.caseStudy.blurb`),
      tag: t(`${base}.related.items.caseStudy.tag`),
    },
  ];

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Specialty & Emergency Care - Marketing',
    serviceType: 'Healthcare Marketing',
    provider: { '@id': `${SITE.url}#organization` },
    audience: 'ERs, urgent care, specialty practices, high-acuity providers',
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
    <img src={emergencyHero} alt={t(`${base}.hero.imageAlt`)} loading="eager" decoding="async" />
  );

  return (
    <>
      <Seo
        title={t(`${base}.seo.title`)}
        description={t(`${base}.seo.description`)}
        path="/industries/specialty-emergency"
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

export default SpecialtyEmergency;
