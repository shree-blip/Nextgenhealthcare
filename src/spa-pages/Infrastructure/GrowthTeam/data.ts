import photoShree from '@/assets/team-thumbs/shree-gauli.jpg';
import photoBikash from '@/assets/team-thumbs/bikash-neupane.jpg';
import photoSonu from '@/assets/team-thumbs/sagar-dongol.jpg';
import photoSumit from '@/assets/team-thumbs/sumit-sharma.jpg';
import photoRahul from '@/assets/team-thumbs/rahul-roy.jpg';
import photoBijesh from '@/assets/team-thumbs/bijesh-khadgi.jpg';
import { SITE } from '@/content/site';

export interface Role {
  /** i18n key under `pages:infrastructure.growthTeam.team.roles`. */
  i18nKey: 'shree' | 'bikash' | 'sonu' | 'sumit' | 'rahul' | 'bijesh';
  /** Personal name — kept in source (not translated). */
  name: string;
  photo: string;
}

export const ROLES: Role[] = [
  { i18nKey: 'shree', name: 'Shree Gauli', photo: photoShree },
  { i18nKey: 'bikash', name: 'Bikash Neupane', photo: photoBikash },
  { i18nKey: 'sonu', name: 'Sonu Sagar Dongol', photo: photoSonu },
  { i18nKey: 'sumit', name: 'Sumit Sharma', photo: photoSumit },
  { i18nKey: 'rahul', name: 'Rahul Roy', photo: photoRahul },
  { i18nKey: 'bijesh', name: 'Bijesh Khadgi', photo: photoBijesh },
];

export interface Cadence {
  /** i18n key under `pages:infrastructure.growthTeam.cadence.items`. */
  i18nKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
}

export const CADENCE: Cadence[] = [
  { i18nKey: 'mon' },
  { i18nKey: 'tue' },
  { i18nKey: 'wed' },
  { i18nKey: 'thu' },
  { i18nKey: 'fri' },
];

export const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'The Growth Team - Healthcare Marketing Department',
  serviceType: 'Embedded Marketing Team',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: 'Multi-location healthcare practices, clinics, medspas',
};
