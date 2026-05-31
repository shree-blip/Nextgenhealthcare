import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface RecoveryLink {
  to: string;
  label: string;
  hint: string;
}

interface LinkSpec {
  to: string;
  i18nKey: string;
}

const DESTINATION_SPECS: readonly LinkSpec[] = [
  { to: '/', i18nKey: 'home' },
  { to: '/services', i18nKey: 'services' },
  { to: '/case-studies', i18nKey: 'caseStudies' },
  { to: '/free-growth-audit', i18nKey: 'freeAudit' },
];

const SERVICE_SPECS: readonly LinkSpec[] = [
  { to: '/services/seo', i18nKey: 'seo' },
  { to: '/services/google-ads', i18nKey: 'googleAds' },
  { to: '/services/website-design-dev', i18nKey: 'website' },
  { to: '/medical-automation', i18nKey: 'automation' },
];

const READ_SPECS: readonly LinkSpec[] = [
  { to: '/blog', i18nKey: 'blog' },
  { to: '/healthcare-news', i18nKey: 'news' },
  { to: '/faq', i18nKey: 'faq' },
  { to: '/contact', i18nKey: 'contact' },
];

const buildLinks = (
  specs: readonly LinkSpec[],
  t: (key: string) => string
): RecoveryLink[] =>
  specs.map((spec) => ({
    to: spec.to,
    label: t(`notFound.recovery.links.${spec.i18nKey}.label`),
    hint: t(`notFound.recovery.links.${spec.i18nKey}.hint`),
  }));

/** React hook for the "Popular destinations" column. */
export function usePopularDestinations(): readonly RecoveryLink[] {
  const { t } = useTranslation('pages');
  return useMemo(() => buildLinks(DESTINATION_SPECS, t), [t]);
}

/** React hook for the "Most-visited services" column. */
export function usePopularServices(): readonly RecoveryLink[] {
  const { t } = useTranslation('pages');
  return useMemo(() => buildLinks(SERVICE_SPECS, t), [t]);
}

/** React hook for the "Read · Watch · Ask" column. */
export function usePopularReads(): readonly RecoveryLink[] {
  const { t } = useTranslation('pages');
  return useMemo(() => buildLinks(READ_SPECS, t), [t]);
}
