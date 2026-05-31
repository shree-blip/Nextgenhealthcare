import type { TFunction } from 'i18next';
import { SITE } from '@/content/site';

export const buildWalkthroughMailto = (form: HTMLFormElement, t: TFunction) => {
  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const clinic = String(data.get('clinic') ?? '').trim();
  const task = String(data.get('task') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();

  const subjectPrefix = t('automation:moreInfo.cta.subjectPrefix');
  const subject = `${subjectPrefix}${clinic ? ` - ${clinic}` : ''}`;
  const labels = {
    name: t('automation:moreInfo.cta.bodyLabels.name'),
    email: t('automation:moreInfo.cta.bodyLabels.email'),
    clinic: t('automation:moreInfo.cta.bodyLabels.clinic'),
    task: t('automation:moreInfo.cta.bodyLabels.task'),
    message: t('automation:moreInfo.cta.bodyLabels.message'),
  };
  const body = [
    name ? `${labels.name}: ${name}` : null,
    email ? `${labels.email}: ${email}` : null,
    clinic ? `${labels.clinic}: ${clinic}` : null,
    task ? `${labels.task}: ${task}` : null,
    '',
    message ? `${labels.message}:\n${message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/** Static keys for iterating sections in MoreInfo components. */
export const PILLAR_KEYS = ['p1', 'p2', 'p3'] as const;
export const PILLAR_NUMS: Record<(typeof PILLAR_KEYS)[number], string> = {
  p1: '01',
  p2: '02',
  p3: '03',
};

export const SOLUTION_KEYS = ['s1', 's2', 's3'] as const;
export const SOLUTION_LINKS: Record<(typeof SOLUTION_KEYS)[number], string> = {
  s1: '/medical-automation',
  s2: '/automation/templates',
  s3: '/reviews-reputation',
};

export const STEP_KEYS = ['step1', 'step2', 'step3', 'step4'] as const;
export const STEP_NUMS: Record<(typeof STEP_KEYS)[number], string> = {
  step1: '01',
  step2: '02',
  step3: '03',
  step4: '04',
};
