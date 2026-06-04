import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import clinicsImg from '../../assets/nextgen-image/Clinicalimg1.png';
import medspaImg from '../../assets/nextgen-image/Medspas&wellnessimg.png';
import emergencyImg from '../../assets/nextgen-image/Erimg.png';

export interface ServeCard {
  ariaId: string;
  image: string;
  imgPosition?: string;
  tag: string;
  title: string;
  desc: string;
  points: string[];
  accent: string;
  to: string;
  stat: string;
  cta: string;
}

interface CardConfig {
  ariaId: string;
  image: string;
  imgPosition?: string;
  accent: string;
  to: string;
  key: 'clinics' | 'medspas' | 'specialty';
}

const CARD_CONFIG: CardConfig[] = [
  {
    ariaId: 'serve-3',
    image: emergencyImg,
    imgPosition: 'left center',
    accent: '#A8D5A8',
    to: '/industries/specialty-emergency',
    key: 'specialty',
  },
  {
    ariaId: 'serve-2',
    image: medspaImg,
    accent: '#E6B98C',
    to: '/industries/medspas',
    key: 'medspas',
  },
  {
    ariaId: 'serve-1',
    image: clinicsImg,
    accent: '#7AA1E8',
    to: '/industries/clinics',
    key: 'clinics',
  },
];

/** React hook for "Who We Serve" cards — live-translates. */
export function useServeCards(): readonly ServeCard[] {
  const { t } = useTranslation('services');
  return useMemo(
    () =>
      CARD_CONFIG.map((c) => ({
        ariaId: c.ariaId,
        image: c.image,
        ...(c.imgPosition ? { imgPosition: c.imgPosition } : {}),
        accent: c.accent,
        to: c.to,
        tag: t(`whoWeServe.cards.${c.key}.tag`),
        title: t(`whoWeServe.cards.${c.key}.title`),
        desc: t(`whoWeServe.cards.${c.key}.desc`),
        points: t(`whoWeServe.cards.${c.key}.points`, { returnObjects: true }) as string[],
        stat: t(`whoWeServe.cards.${c.key}.stat`),
        cta: t(`whoWeServe.cards.${c.key}.cta`),
      })),
    [t]
  );
}
