import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import patientVerificationImg from '@/assets/nextgen-image/Patientverificationimg.png';
import smsEmailImg from '@/assets/nextgen-image/Smsemailimg.png';
import reviewCollectionImg from '@/assets/nextgen-image/Reviewcollectionimg.png';
import realtimeEligibilityImg from '@/assets/nextgen-image/Realtimeeligibilityimg.png';
import gptBotImg from '@/assets/nextgen-image/Gptbotimg.png';
import dailyAiSocialImg from '@/assets/nextgen-image/Dailyaisocialimg.png';

/* ============================================================
   AUTOMATION · TEMPLATES — data + category illustrations.
   ============================================================ */

export type Tone = 'peri' | 'sage' | 'copper' | 'charcoal';
export type Category = 'Intake' | 'Reminders' | 'Reviews' | 'Insurance' | 'AI' | 'Social';
export type Compliance = 'HIPAA-aware' | 'PHI-free' | 'BAA required';

export interface Template {
  num: string;
  cat: Category;
  i18nKey: string;
  title: string;
  blurb: string;
  nodes: string;
  pull: string;
  tone: Tone;
  effort: string;
  saves: string;
  compliance: Compliance;
  img: string;
  imgAlt: string;
  detailPath: string;
}

/** Static (non-translatable) template metadata. */
interface TemplateMeta {
  num: string;
  cat: Category;
  i18nKey: string;
  nodes: string;
  tone: Tone;
  compliance: Compliance;
  img: string;
  detailPath: string;
}

const TEMPLATE_META: TemplateMeta[] = [
  {
    num: '01',
    cat: 'Intake',
    i18nKey: 'patientIntake',
    nodes: '7 nodes · N8N',
    tone: 'peri',
    compliance: 'BAA required',
    img: patientVerificationImg,
    detailPath: '/automation/templates/patient-intake',
  },
  {
    num: '02',
    cat: 'Reminders',
    i18nKey: 'reminderCadence',
    nodes: '8 nodes · N8N',
    tone: 'sage',
    compliance: 'HIPAA-aware',
    img: smsEmailImg,
    detailPath: '/automation/templates/reminder-cadence',
  },
  {
    num: '03',
    cat: 'Reviews',
    i18nKey: 'reviewCollection',
    nodes: '8 nodes · N8N',
    tone: 'copper',
    compliance: 'PHI-free',
    img: reviewCollectionImg,
    detailPath: '/automation/templates/review-collection',
  },
  {
    num: '04',
    cat: 'Insurance',
    i18nKey: 'eligibilityBot',
    nodes: '9 nodes · N8N',
    tone: 'charcoal',
    compliance: 'BAA required',
    img: realtimeEligibilityImg,
    detailPath: '/automation/templates/eligibility-bot',
  },
  {
    num: '05',
    cat: 'AI',
    i18nKey: 'gptChatbot',
    nodes: '10 nodes · N8N',
    tone: 'peri',
    compliance: 'PHI-free',
    img: gptBotImg,
    detailPath: '/automation/templates/gpt-chatbot',
  },
  {
    num: '06',
    cat: 'Social',
    i18nKey: 'socialAutoPoster',
    nodes: '9 nodes · N8N',
    tone: 'copper',
    compliance: 'PHI-free',
    img: dailyAiSocialImg,
    detailPath: '/automation/templates/social-auto-poster',
  },
];

/** React hook returning the fully-translated template list. */
export const useTemplates = (): Template[] => {
  const { t } = useTranslation(['automation']);
  return useMemo(
    () =>
      TEMPLATE_META.map((m) => ({
        num: m.num,
        cat: m.cat,
        i18nKey: m.i18nKey,
        title: t(`automation:templates.page.templateBlurbs.${m.i18nKey}.title`),
        blurb: t(`automation:templates.page.templateBlurbs.${m.i18nKey}.blurb`),
        pull: t(`automation:templates.page.templateBlurbs.${m.i18nKey}.pull`),
        effort: t(`automation:templates.page.templateBlurbs.${m.i18nKey}.effort`),
        saves: t(`automation:templates.page.templateBlurbs.${m.i18nKey}.saves`),
        imgAlt: t(`automation:templates.page.templateBlurbs.${m.i18nKey}.imgAlt`),
        nodes: m.nodes,
        tone: m.tone,
        compliance: m.compliance,
        img: m.img,
        detailPath: m.detailPath,
      })),
    [t]
  );
};

export const FILTERS: Array<'All' | Category> = [
  'All',
  'Intake',
  'Reminders',
  'Reviews',
  'Insurance',
  'AI',
  'Social',
];

const ORIGIN =
  typeof window !== 'undefined' ? window.location.origin : 'https://thenextgenhealth.com';

/** Static schema (English) — used for JSON-LD outside the React tree. */
export const TEMPLATES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Healthcare automation template library',
  description:
    'Six healthcare-grade workflow automations covering patient intake, reminders, reviews, insurance verification, lead capture, and social posting.',
  numberOfItems: TEMPLATE_META.length,
  itemListElement: TEMPLATE_META.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: m.i18nKey,
    description: `${m.cat} workflow - ${m.nodes}. ${m.compliance}.`,
    url: `${ORIGIN}/automation/templates#tpl-${m.num}`,
  })),
};

/** Static counts by compliance — used by the Compliance section. */
export const COMPLIANCE_COUNTS: Record<Compliance, number> = TEMPLATE_META.reduce(
  (acc, m) => {
    acc[m.compliance] += 1;
    return acc;
  },
  { 'HIPAA-aware': 0, 'PHI-free': 0, 'BAA required': 0 } as Record<Compliance, number>
);

/* ---------- Per-category illustration (Swiss minimal SVG, brand colors) ---------- */
export const CategoryArt = ({ cat }: { cat: Category }): ReactNode => {
  const common = {
    viewBox: '0 0 240 160',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  };
  switch (cat) {
    case 'Intake':
      return (
        <svg {...common}>
          <rect width="240" height="160" fill="#F8F9FA" />
          <circle cx="48" cy="32" r="36" fill="rgba(87,109,181,0.10)" />
          <rect
            x="68"
            y="34"
            width="104"
            height="100"
            rx="10"
            fill="#FFFFFF"
            stroke="#1A2438"
            strokeWidth="1.5"
          />
          <line x1="80" y1="54" x2="160" y2="54" stroke="#1A2438" strokeWidth="1.2" />
          <line x1="80" y1="68" x2="148" y2="68" stroke="#1A2438" strokeWidth="1.2" opacity="0.6" />
          <line x1="80" y1="82" x2="156" y2="82" stroke="#1A2438" strokeWidth="1.2" opacity="0.4" />
          <rect x="80" y="100" width="60" height="14" rx="3" fill="#B38B6D" />
          <circle cx="190" cy="124" r="14" fill="#8FBC8F" />
          <path
            d="M184 124 L189 129 L196 119"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'Reminders':
      return (
        <svg {...common}>
          <rect width="240" height="160" fill="#F8F9FA" />
          <circle cx="200" cy="40" r="34" fill="rgba(143,188,143,0.16)" />
          <path
            d="M120 32 C 100 32 88 48 88 70 V 90 L 80 100 H 160 L 152 90 V 70 C 152 48 140 32 120 32 Z"
            fill="#FFFFFF"
            stroke="#1A2438"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="120" cy="108" r="10" fill="#1A2438" />
          <line
            x1="120"
            y1="20"
            x2="120"
            y2="28"
            stroke="#1A2438"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="30" y="120" width="40" height="20" rx="10" fill="#8FBC8F" />
          <text
            x="50"
            y="134"
            textAnchor="middle"
            fontFamily="ui-monospace"
            fontSize="10"
            fontWeight="800"
            fill="#FFFFFF"
          >
            SMS
          </text>
          <rect x="170" y="120" width="44" height="20" rx="10" fill="#B38B6D" />
          <text
            x="192"
            y="134"
            textAnchor="middle"
            fontFamily="ui-monospace"
            fontSize="10"
            fontWeight="800"
            fill="#FFFFFF"
          >
            MAIL
          </text>
        </svg>
      );
    case 'Reviews':
      return (
        <svg {...common}>
          <rect width="240" height="160" fill="#F8F9FA" />
          <circle cx="40" cy="120" r="32" fill="rgba(179,139,109,0.18)" />
          <circle cx="200" cy="40" r="36" fill="rgba(87,109,181,0.12)" />
          <g transform="translate(120 80)">
            <polygon
              points="0,-44 14,-14 46,-10 22,12 30,44 0,28 -30,44 -22,12 -46,-10 -14,-14"
              fill="#B38B6D"
            />
            <polygon
              points="0,-22 7,-7 23,-5 11,6 15,22 0,14 -15,22 -11,6 -23,-5 -7,-7"
              fill="#1A2438"
              opacity="0.9"
            />
          </g>
          <rect x="64" y="120" width="112" height="6" rx="3" fill="rgba(26,36,56,0.18)" />
        </svg>
      );
    case 'Insurance':
      return (
        <svg {...common}>
          <rect width="240" height="160" fill="#F8F9FA" />
          <circle cx="200" cy="120" r="36" fill="rgba(143,188,143,0.16)" />
          <path
            d="M120 24 L 76 40 V 88 C 76 116 96 140 120 148 C 144 140 164 116 164 88 V 40 Z"
            fill="#FFFFFF"
            stroke="#1A2438"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M100 92 L 114 106 L 142 78"
            stroke="#8FBC8F"
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="36" r="6" fill="#B38B6D" />
          <line
            x1="180"
            y1="50"
            x2="216"
            y2="50"
            stroke="#1A2438"
            strokeWidth="1.2"
            opacity="0.45"
          />
          <line
            x1="180"
            y1="62"
            x2="208"
            y2="62"
            stroke="#1A2438"
            strokeWidth="1.2"
            opacity="0.30"
          />
        </svg>
      );
    case 'AI':
      return (
        <svg {...common}>
          <rect width="240" height="160" fill="#F8F9FA" />
          <circle cx="40" cy="40" r="32" fill="rgba(87,109,181,0.14)" />
          <circle cx="200" cy="120" r="34" fill="rgba(212,175,55,0.18)" />
          <rect
            x="68"
            y="44"
            width="104"
            height="76"
            rx="14"
            fill="#FFFFFF"
            stroke="#1A2438"
            strokeWidth="1.8"
          />
          <circle cx="96" cy="80" r="6" fill="#1A2438" />
          <circle cx="120" cy="80" r="6" fill="#576DB5" />
          <circle cx="144" cy="80" r="6" fill="#8FBC8F" />
          <path
            d="M96 102 L 92 116 L 110 102 Z"
            fill="#FFFFFF"
            stroke="#1A2438"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line
            x1="120"
            y1="32"
            x2="120"
            y2="22"
            stroke="#1A2438"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="120" cy="18" r="5" fill="#B38B6D" />
        </svg>
      );
    case 'Social':
      return (
        <svg {...common}>
          <rect width="240" height="160" fill="#F8F9FA" />
          <circle cx="60" cy="120" r="30" fill="rgba(87,109,181,0.14)" />
          <circle cx="180" cy="40" r="34" fill="rgba(143,188,143,0.16)" />
          <circle cx="60" cy="44" r="14" fill="#FFFFFF" stroke="#1A2438" strokeWidth="2" />
          <circle cx="180" cy="116" r="14" fill="#FFFFFF" stroke="#1A2438" strokeWidth="2" />
          <circle cx="120" cy="80" r="20" fill="#FFFFFF" stroke="#1A2438" strokeWidth="2" />
          <line
            x1="72"
            y1="54"
            x2="106"
            y2="72"
            stroke="#B38B6D"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
          <line
            x1="134"
            y1="88"
            x2="166"
            y2="108"
            stroke="#B38B6D"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
          <line
            x1="106"
            y1="88"
            x2="74"
            y2="106"
            stroke="#8FBC8F"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
        </svg>
      );
  }
};

/** Static, non-translatable keys for stat / step iteration. */
export const STAT_KEYS = ['s1', 's2', 's3'] as const;
export const STAT_META: Record<
  (typeof STAT_KEYS)[number],
  { id: string; value: string; tone: 'gold' | 'sage' | 'ink' }
> = {
  s1: { id: '01', value: '06', tone: 'gold' },
  s2: { id: '02', value: '< 14 d', tone: 'sage' },
  s3: { id: '03', value: '30+ hrs/wk', tone: 'ink' },
};

export const HOW_STEP_KEYS = ['s1', 's2', 's3', 's4'] as const;
export const HOW_STEP_NUMS: Record<(typeof HOW_STEP_KEYS)[number], string> = {
  s1: '01',
  s2: '02',
  s3: '03',
  s4: '04',
};

export const WHO_FOR_KEYS = ['w1', 'w2', 'w3'] as const;

export const RELATED_KEYS = ['r1', 'r2', 'r3'] as const;
export const RELATED_LINKS: Record<(typeof RELATED_KEYS)[number], string> = {
  r1: '/automation',
  r2: '/automation/more-info',
  r3: '/free-growth-audit',
};
