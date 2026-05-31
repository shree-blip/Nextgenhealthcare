import { SITE } from '@/content/site';

export interface Tier {
  /** i18n key under `pages:infrastructure.serviceLevelAgreements.tiers.items`. */
  i18nKey: 'sev0' | 'sev1' | 'sev2' | 'sev3';
  tone: 'critical' | 'high' | 'standard' | 'low';
}

export const TIERS: Tier[] = [
  { i18nKey: 'sev0', tone: 'critical' },
  { i18nKey: 'sev1', tone: 'high' },
  { i18nKey: 'sev2', tone: 'standard' },
  { i18nKey: 'sev3', tone: 'low' },
];

export interface RecordEntry {
  /** i18n key under `pages:infrastructure.serviceLevelAgreements.trackRecord.items`. */
  i18nKey: 'uptime' | 'ack' | 'resolve' | 'compliance';
  delta: 'up' | 'down' | 'flat';
}

export const RECORDS: RecordEntry[] = [
  { i18nKey: 'uptime', delta: 'up' },
  { i18nKey: 'ack', delta: 'down' },
  { i18nKey: 'resolve', delta: 'down' },
  { i18nKey: 'compliance', delta: 'flat' },
];

export interface FlowStep {
  /** i18n key under `pages:infrastructure.serviceLevelAgreements.escalation.steps`. */
  i18nKey: 'signal' | 'triage' | 'own' | 'close';
}

export const ESCALATION: FlowStep[] = [
  { i18nKey: 'signal' },
  { i18nKey: 'triage' },
  { i18nKey: 'own' },
  { i18nKey: 'close' },
];

export const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Service Level Agreements - Healthcare Marketing',
  serviceType: 'Documented SLA & Response Time Commitment',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: 'Multi-location healthcare practices, networks',
};
