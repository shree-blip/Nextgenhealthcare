import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import { ROUTES } from '@/lib/routes';

interface SitemapLink {
  to: string;
  label: string;
}

interface SitemapGroup {
  title: string;
  links: SitemapLink[];
}

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Sitemap' },
]);

const Sitemap = () => {
  const { t } = useTranslation(['legal']);

  const SITEMAP_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${t('legal:sitemap.title')} · ${SITE.name}`,
    url: `${SITE.url}/sitemap`,
    description: t('legal:sitemap.schemaDescription'),
    isPartOf: { '@id': `${SITE.url}#website` },
    about: { '@id': `${SITE.url}#organization` },
  };

  const GROUPS: SitemapGroup[] = [
    {
      title: t('legal:sitemap.sections.primary'),
      links: [
        { to: ROUTES.home, label: t('legal:sitemap.links.home') },
        { to: ROUTES.about.index, label: t('legal:sitemap.links.about') },
        { to: ROUTES.team, label: t('legal:sitemap.links.team') },
        { to: ROUTES.ourWork.index, label: t('legal:sitemap.links.ourWork') },
        { to: ROUTES.pricing, label: t('legal:sitemap.links.pricing') },
        { to: ROUTES.contact, label: t('legal:sitemap.links.contact') },
        { to: ROUTES.freeGrowthAudit, label: t('legal:sitemap.links.freeGrowthAudit') },
        { to: ROUTES.faq, label: t('legal:sitemap.links.faq') },
      ],
    },
    {
      title: t('legal:sitemap.sections.services'),
      links: [
        { to: ROUTES.services.index, label: t('legal:sitemap.links.servicesIndex') },
        { to: ROUTES.services.seo, label: t('legal:sitemap.links.seo') },
        { to: ROUTES.services.googleAds, label: t('legal:sitemap.links.googleAds') },
        {
          to: ROUTES.services.googleBusinessProfile,
          label: t('legal:sitemap.links.googleBusinessProfile'),
        },
        { to: ROUTES.services.socialMediaMarketing, label: t('legal:sitemap.links.socialMedia') },
        { to: ROUTES.services.websiteDesignDev, label: t('legal:sitemap.links.websiteDesign') },
        { to: ROUTES.services.emailDripCampaigns, label: t('legal:sitemap.links.emailCampaigns') },
        {
          to: ROUTES.services.contentCopywriting,
          label: t('legal:sitemap.links.contentCopywriting'),
        },
        { to: ROUTES.services.brandIdentityDesign, label: t('legal:sitemap.links.branding') },
        { to: ROUTES.services.analyticsReporting, label: t('legal:sitemap.links.analytics') },
      ],
    },
    {
      title: t('legal:sitemap.sections.specialtyServices'),
      links: [
        { to: ROUTES.healthcareContent, label: t('legal:sitemap.links.healthcareContent') },
        { to: ROUTES.metaAds, label: t('legal:sitemap.links.metaAds') },
        { to: ROUTES.hipaaCompliance, label: t('legal:sitemap.links.hipaaCompliance') },
        { to: ROUTES.reviewsReputation, label: t('legal:sitemap.links.reviewsReputation') },
        { to: ROUTES.patientExperience, label: t('legal:sitemap.links.patientExperience') },
        { to: ROUTES.citationBuilding, label: t('legal:sitemap.links.citationBuilding') },
        { to: ROUTES.hyperLocalContent, label: t('legal:sitemap.links.hyperLocalContent') },
        { to: ROUTES.aeoSchema, label: t('legal:sitemap.links.aeoSchema') },
        {
          to: ROUTES.onsiteFieldMarketing,
          label: t('legal:sitemap.links.onsiteFieldMarketing'),
        },
        { to: ROUTES.medicalAutomation, label: t('legal:sitemap.links.medicalAutomation') },
      ],
    },
    {
      title: t('legal:sitemap.sections.industries'),
      links: [
        { to: ROUTES.industries.index, label: t('legal:sitemap.links.industriesIndex') },
        { to: ROUTES.industries.clinics, label: t('legal:sitemap.links.clinics') },
        { to: ROUTES.industries.medspas, label: t('legal:sitemap.links.medspas') },
        {
          to: ROUTES.industries.specialtyEmergency,
          label: t('legal:sitemap.links.specialtyEmergency'),
        },
      ],
    },
    {
      title: t('legal:sitemap.sections.methodology'),
      links: [
        { to: ROUTES.growthPlan, label: t('legal:sitemap.links.growthPlan') },
        { to: ROUTES.methodology.phase1, label: t('legal:sitemap.links.phase1') },
        { to: ROUTES.methodology.phase2, label: t('legal:sitemap.links.phase2') },
        { to: ROUTES.methodology.phase3, label: t('legal:sitemap.links.phase3') },
      ],
    },
    {
      title: t('legal:sitemap.sections.automation'),
      links: [
        { to: ROUTES.automation.index, label: t('legal:sitemap.links.automationOverview') },
        { to: ROUTES.automation.moreInfo, label: t('legal:sitemap.links.automationMoreInfo') },
        { to: ROUTES.automation.templates, label: t('legal:sitemap.links.automationTemplates') },
      ],
    },
    {
      title: t('legal:sitemap.sections.infrastructure'),
      links: [
        {
          to: ROUTES.infrastructure.growthTeam,
          label: t('legal:sitemap.links.growthTeam'),
        },
        {
          to: ROUTES.infrastructure.complianceProtocol,
          label: t('legal:sitemap.links.complianceProtocol'),
        },
        {
          to: ROUTES.infrastructure.serviceLevelAgreements,
          label: t('legal:sitemap.links.serviceLevelAgreements'),
        },
      ],
    },
    {
      title: t('legal:sitemap.sections.resources'),
      links: [
        { to: ROUTES.blog.index, label: t('legal:sitemap.links.blog') },
        { to: ROUTES.caseStudies.index, label: t('legal:sitemap.links.caseStudies') },
        { to: ROUTES.healthcareNews.index, label: t('legal:sitemap.links.healthcareNews') },
      ],
    },
    {
      title: t('legal:sitemap.sections.legal'),
      links: [
        { to: ROUTES.privacy, label: t('legal:sitemap.links.privacy') },
        { to: ROUTES.terms, label: t('legal:sitemap.links.terms') },
        { to: ROUTES.accessibility, label: t('legal:sitemap.links.accessibility') },
        { to: ROUTES.sitemap, label: t('legal:sitemap.links.sitemap') },
      ],
    },
  ];

  return (
    <main style={{ paddingBottom: 'clamp(72px, 9vw, 120px)' }}>
      <Seo
        title={t('legal:sitemap.seo.title')}
        description={t('legal:sitemap.seo.description')}
        path="/sitemap"
        schema={[SITEMAP_SCHEMA, BREADCRUMB_SCHEMA]}
      />

      <section
        aria-labelledby="sm-title"
        style={{ padding: 'clamp(56px, 7vw, 96px) 0 clamp(32px, 4vw, 48px)' }}
      >
        <div className="container-shell">
          <Breadcrumb
            items={[{ label: t('legal:sitemap.eyebrow') }]}
            section={t('legal:sitemap.eyebrow')}
          />
          <div style={{ maxWidth: 720 }}>
            <span className="results-eyebrow">{t('legal:sitemap.eyebrow')}</span>
            <h1
              id="sm-title"
              style={{
                fontSize: 'clamp(34px, 4.6vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#2D3748',
                fontWeight: 700,
                margin: '6px 0 14px',
              }}
            >
              {t('legal:sitemap.heading')}
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: '#4A5568',
                margin: 0,
                maxWidth: '64ch',
              }}
            >
              {t('legal:sitemap.lede')}
            </p>
          </div>
        </div>
      </section>

      <section aria-label={t('legal:sitemap.ariaGroups')}>
        <div className="container-shell">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(16px, 1.8vw, 24px)',
            }}
          >
            {GROUPS.map((group) => (
              <section
                key={group.title}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(45,55,72,0.08)',
                  borderRadius: 18,
                  padding: 'clamp(20px, 2.2vw, 28px)',
                }}
              >
                <h2
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#B38B6D',
                    margin: '0 0 16px',
                  }}
                >
                  {group.title}
                </h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 4 }}>
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        style={{
                          display: 'block',
                          padding: '8px 10px',
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 500,
                          color: '#2D3748',
                          transition: 'background .15s ease, color .15s ease',
                        }}
                        className="sitemap-link"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sitemap;
