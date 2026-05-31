import type { ReactElement } from 'react';

/**
 * Branded SVG editorial thumbnail used across Healthcare News.
 * Replaces picsum.photos placeholders with consistent on-brand visuals,
 * keyed off the article's category. Each category maps to a palette
 * and a minimal abstract motif so the news rail reads as one editorial
 * system instead of a stock-image collage.
 */

type Tone = 'sage' | 'periwinkle' | 'copper' | 'charcoal' | 'cream';

interface TonePalette {
  ink: string;
  bg: string;
  accent: string;
  fade: string;
}

const PALETTES: Record<Tone, TonePalette> = {
  sage: { ink: '#2D5A3D', bg: '#E8F0E5', accent: '#8FBC8F', fade: '#C9DDC5' },
  periwinkle: { ink: '#46599C', bg: '#E6EAF5', accent: '#576DB5', fade: '#BAC3DE' },
  copper: { ink: '#8C5A3D', bg: '#F4ECE3', accent: '#B38B6D', fade: '#E0CCBA' },
  charcoal: { ink: '#1A2438', bg: '#E6E8EC', accent: '#2D3748', fade: '#B7BBC2' },
  cream: { ink: '#7A6A5A', bg: '#F8F2EA', accent: '#B38B6D', fade: '#E9DAC4' },
};

const TONE_BY_CATEGORY: Record<string, Tone> = {
  Research: 'periwinkle',
  Regulation: 'charcoal',
  Insurance: 'charcoal',
  Policy: 'charcoal',
  Compliance: 'charcoal',
  Telehealth: 'sage',
  Operations: 'sage',
  'AI & Operations': 'sage',
  Automation: 'sage',
  Marketing: 'copper',
  'Paid Ads': 'copper',
  Email: 'copper',
  Reputation: 'copper',
  Pharmacy: 'cream',
  'Tech Stack': 'periwinkle',
  'Long Read · Practice Operations': 'sage',
  'Case Study': 'copper',
};

type Motif = 'orbit' | 'pulse' | 'columns' | 'rule' | 'square' | 'split' | 'arrow';

const motifFor = (category: string, seed: number): Motif => {
  // Deterministic mapping so the same article always renders the same motif.
  const c = category.toLowerCase();
  if (c.includes('research') || c.includes('ai')) return 'pulse';
  if (c.includes('tele')) return 'orbit';
  if (c.includes('operation') || c.includes('automation')) return 'columns';
  if (c.includes('marketing') || c.includes('paid') || c.includes('email')) return 'arrow';
  if (c.includes('policy') || c.includes('regulation') || c.includes('insurance')) return 'split';
  if (c.includes('reputation')) return 'rule';
  if (c.includes('case')) return 'square';
  const motifs: Motif[] = ['orbit', 'pulse', 'columns', 'rule', 'square', 'split', 'arrow'];
  return motifs[seed % motifs.length];
};

const renderMotif = (motif: Motif, palette: TonePalette): ReactElement => {
  const { ink, accent, fade } = palette;
  switch (motif) {
    case 'orbit':
      return (
        <g>
          <circle cx="100" cy="50" r="22" fill="none" stroke={accent} strokeWidth="1.2" />
          <circle
            cx="100"
            cy="50"
            r="32"
            fill="none"
            stroke={fade}
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          <circle cx="100" cy="50" r="6" fill={ink} />
          <circle cx="128" cy="50" r="3" fill={accent} />
          <line x1="40" y1="78" x2="160" y2="78" stroke={fade} strokeWidth="0.8" />
        </g>
      );
    case 'pulse':
      return (
        <g>
          <polyline
            points="30,55 55,55 65,38 80,72 95,30 110,55 135,55 145,42 170,55"
            fill="none"
            stroke={ink}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="95" cy="30" r="3" fill={accent} />
          <line x1="30" y1="78" x2="170" y2="78" stroke={fade} strokeWidth="0.8" />
        </g>
      );
    case 'columns':
      return (
        <g>
          <rect x="50" y="44" width="10" height="34" fill={fade} />
          <rect x="68" y="32" width="10" height="46" fill={accent} />
          <rect x="86" y="20" width="10" height="58" fill={ink} />
          <rect x="104" y="38" width="10" height="40" fill={accent} />
          <rect x="122" y="50" width="10" height="28" fill={fade} />
          <rect x="140" y="28" width="10" height="50" fill={ink} />
          <line x1="40" y1="78" x2="160" y2="78" stroke={ink} strokeWidth="1" />
        </g>
      );
    case 'rule':
      return (
        <g>
          <line x1="35" y1="36" x2="165" y2="36" stroke={ink} strokeWidth="1.5" />
          <line x1="35" y1="50" x2="125" y2="50" stroke={accent} strokeWidth="1.5" />
          <line x1="35" y1="64" x2="155" y2="64" stroke={fade} strokeWidth="1.5" />
          <circle cx="165" cy="36" r="3" fill={ink} />
          <circle cx="125" cy="50" r="3" fill={accent} />
          <line x1="35" y1="78" x2="165" y2="78" stroke={fade} strokeWidth="0.8" />
        </g>
      );
    case 'square':
      return (
        <g>
          <rect x="60" y="22" width="38" height="38" fill="none" stroke={ink} strokeWidth="1.4" />
          <rect x="92" y="40" width="38" height="38" fill={accent} opacity="0.85" />
          <line x1="42" y1="78" x2="160" y2="78" stroke={fade} strokeWidth="0.8" />
        </g>
      );
    case 'split':
      return (
        <g>
          <rect x="34" y="26" width="64" height="44" fill={fade} />
          <rect x="102" y="26" width="64" height="44" fill={accent} />
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="76"
            stroke={ink}
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />
          <line x1="34" y1="78" x2="166" y2="78" stroke={ink} strokeWidth="0.8" />
        </g>
      );
    case 'arrow':
    default:
      return (
        <g>
          <line x1="38" y1="60" x2="148" y2="60" stroke={ink} strokeWidth="1.4" />
          <polyline
            points="138,52 150,60 138,68"
            fill="none"
            stroke={ink}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="58" cy="60" r="3" fill={accent} />
          <circle cx="90" cy="60" r="3" fill={fade} />
          <circle cx="122" cy="60" r="3" fill={accent} />
        </g>
      );
  }
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

interface NewsThumbProps {
  category: string;
  /** Unique seed (e.g. the article slug or href) so motif is stable. */
  seed: string;
  /** Optional aspect ratio override; defaults to landscape. */
  aspect?: 'landscape' | 'square';
  /** Optional caption rendered in the top-left chrome. */
  caption?: string;
  /** Optional real image. When provided, the SVG motif is replaced by an <img>. */
  image?: string;
  /** Optional alt text for the image. */
  alt?: string;
}

const NewsThumb = ({ category, seed, aspect = 'landscape', caption, image, alt }: NewsThumbProps) => {
  if (image) {
    return (
      <img
        src={image}
        alt={alt ?? ''}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
    );
  }
  const tone = TONE_BY_CATEGORY[category] ?? 'periwinkle';
  const palette = PALETTES[tone];
  const motif = motifFor(category, hash(seed));
  const viewBox = aspect === 'square' ? '0 0 200 200' : '0 0 200 110';
  const motifY = aspect === 'square' ? 50 : 0;

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <rect width="200" height={aspect === 'square' ? 200 : 110} fill={palette.bg} />
      {/* Editorial chrome - figure number + caption - fixes the news system as branded, not stock */}
      <text
        x="14"
        y="20"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="2.4"
        fill={palette.ink}
      >
        FIG. {(hash(seed) % 99).toString().padStart(2, '0')}
      </text>
      {caption ? (
        <text
          x="14"
          y={aspect === 'square' ? 192 : 102}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1.6"
          fill={palette.ink}
          opacity="0.7"
        >
          {caption.toUpperCase()}
        </text>
      ) : null}
      <g transform={`translate(0, ${motifY})`}>{renderMotif(motif, palette)}</g>
    </svg>
  );
};

export default NewsThumb;
