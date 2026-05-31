import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import Section from '@/components/editorial/Section';
import EditorialCTA from '@/components/editorial/EditorialCTA';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'TheNextGen Editorial & Content Studio for Healthcare',
  serviceType: 'Editorial Content · Clinician-Reviewed Healthcare Writing',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Healthcare practices, clinics, hospital networks',
  },
};

const HEAD_META_KEYS = ['format', 'cadence', 'review', 'compliance'] as const;

const PILLAR_KEYS = ['condition', 'decision', 'feature'] as const;

interface SampleItem {
  kind: string;
  title: string;
  read: string;
  vertical: string;
  pull: string;
}

interface ProcessItem {
  k: string;
  d: string;
}

const Hero = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="ph-page-head">
      <div className="container-shell">
        <Breadcrumb current={t('pages:healthcareContent.breadcrumb.current')} />
        <div className="mt-6 grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-line font-mono text-[12px] tracking-[0.22em] uppercase">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-accent-soft" />
              {t('pages:healthcareContent.hero.eyebrow')}
            </div>
            <h1 className="mt-6 text-heading font-extrabold leading-[0.98] tracking-[-0.038em] text-[clamp(44px,6.4vw,86px)]">
              {t('pages:healthcareContent.hero.titleLine1')}
              <br />
              {t('pages:healthcareContent.hero.titleLine2')}{' '}
              <span className="text-line italic">
                {t('pages:healthcareContent.hero.titleAccent')}
              </span>
              .
            </h1>
            <p className="mt-7 text-body text-[17px] leading-[1.65] max-w-[58ch]">
              {t('pages:healthcareContent.hero.lede')}
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="border-t-2 border-heading">
              {HEAD_META_KEYS.map((key) => (
                <div
                  key={key}
                  className="grid grid-cols-2 py-3 border-b border-line-faint text-[14px]"
                >
                  <span className="text-muted font-medium">
                    {t(`pages:healthcareContent.hero.headMeta.${key}.label`)}
                  </span>
                  <span className="text-heading font-semibold text-right">
                    {t(`pages:healthcareContent.hero.headMeta.${key}.value`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pillars = () => {
  const { t } = useTranslation('pages');
  return (
    <Section
      no={t('pages:healthcareContent.pillars.no')}
      title={t('pages:healthcareContent.pillars.title')}
      kicker={t('pages:healthcareContent.pillars.kicker')}
    >
      <div className="grid sm:grid-cols-3 gap-[1px] bg-line-faint border border-line-faint">
        {PILLAR_KEYS.map((key) => {
          const items = t(`pages:healthcareContent.pillars.items.${key}.items`, {
            returnObjects: true,
          }) as string[];
          return (
            <div key={key} className="bg-bg p-7 sm:p-8 flex flex-col gap-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[12px] text-line tracking-[0.18em]">
                  {t(`pages:healthcareContent.pillars.items.${key}.n`)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted font-semibold">
                  {t('pages:healthcareContent.pillars.pillarLabel')}
                </span>
              </div>
              <h3 className="text-heading text-[26px] font-extrabold leading-[1.05] tracking-[-0.02em]">
                {t(`pages:healthcareContent.pillars.items.${key}.h`)}
              </h3>
              <p className="text-body text-[14px] leading-[1.6]">
                {t(`pages:healthcareContent.pillars.items.${key}.d`)}
              </p>
              <ul className="mt-auto pt-5 border-t border-line-faint flex flex-wrap gap-x-3 gap-y-1.5">
                {items.map((i) => (
                  <li key={i} className="text-[12px] text-muted">
                    - {i}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

const Samples = () => {
  const { t } = useTranslation('pages');
  const samples = t('pages:healthcareContent.samples.items', {
    returnObjects: true,
  }) as SampleItem[];
  const readSuffix = t('pages:healthcareContent.samples.readSuffix');
  return (
    <Section
      no={t('pages:healthcareContent.samples.no')}
      title={t('pages:healthcareContent.samples.title')}
      kicker={t('pages:healthcareContent.samples.kicker')}
    >
      <div className="space-y-[1px] bg-line-faint border border-line-faint">
        {samples.map((s, i) => (
          <article
            key={s.title}
            className="bg-bg p-7 sm:p-8 grid lg:grid-cols-12 gap-x-8 gap-y-4 items-baseline hover:bg-white transition cursor-pointer"
          >
            <div className="lg:col-span-1 font-mono text-[12px] text-muted tracking-[0.16em]">
              {String(i + 1).padStart(2, '0')}.
            </div>
            <div className="lg:col-span-2 flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-line font-bold">
                {s.kind}
              </span>
              <span className="text-[12px] text-muted">{s.vertical}</span>
            </div>
            <div className="lg:col-span-7">
              <h3 className="text-heading text-[clamp(20px,1.6vw,26px)] font-bold tracking-[-0.015em] leading-[1.25]">
                {s.title}
              </h3>
              <p className="mt-3 text-body text-[14px] leading-[1.55] italic">
                &ldquo;{s.pull}&rdquo;
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right text-muted text-[12px] tabular-nums">
              {s.read} {readSuffix}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

const Process = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:healthcareContent.process.items', {
    returnObjects: true,
  }) as ProcessItem[];
  return (
    <Section
      no={t('pages:healthcareContent.process.no')}
      title={t('pages:healthcareContent.process.title')}
      kicker={t('pages:healthcareContent.process.kicker')}
    >
      <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
        {items.map((p, i) => (
          <li key={p.k} className="relative pl-10">
            <span className="absolute left-0 top-1 font-mono text-line text-[13px] tracking-[0.16em]">
              0{i + 1}
            </span>
            <h4 className="text-heading text-[22px] font-bold tracking-[-0.015em]">{p.k}.</h4>
            <p className="mt-3 text-body text-[15px] leading-[1.6]">{p.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
};

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <Section
      no={t('pages:healthcareContent.closing.no')}
      title={t('pages:healthcareContent.closing.title')}
      kicker={t('pages:healthcareContent.closing.kicker')}
    >
      <EditorialCTA
        eyebrow={t('pages:healthcareContent.closing.ctaEyebrow')}
        title={t('pages:healthcareContent.closing.ctaTitle')}
        description={t('pages:healthcareContent.closing.ctaDescription')}
        primaryHref="/contact"
        primaryLabel={t('pages:healthcareContent.closing.ctaPrimary')}
        secondaryHref="/case-studies"
        secondaryLabel={t('pages:healthcareContent.closing.ctaSecondary')}
      />
    </Section>
  );
};

const HealthcareContent = () => {
  const { t } = useTranslation('pages');
  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:healthcareContent.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:healthcareContent.seo.title')}
        description={t('pages:healthcareContent.seo.description')}
        path="/healthcare-content"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      <Hero />
      <Pillars />
      <Samples />
      <Process />
      <Closing />
    </>
  );
};

export default HealthcareContent;
