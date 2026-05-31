import { useTranslation } from 'react-i18next';
import { CountUp } from '@/lib/motion';
import advantagesImg from '../../assets/nextgen-image/Ouradvantageimg1.png';

type StatKey = 'retention' | 'practices' | 'leadTime';
type CardKey = 'underOneRoof' | 'dedicatedLead' | 'fixedPricing' | 'hipaaSpecialists';

interface AdvantageStat {
  key: StatKey;
  value: number;
  suffix?: string;
  prefix?: string;
}

interface AdvantageCard {
  key: CardKey;
  icon: 'hand' | 'price' | 'manager' | 'shield';
}

const STATS: AdvantageStat[] = [
  { key: 'retention', value: 98, suffix: '%' },
  { key: 'practices', value: 200, suffix: '+' },
  { key: 'leadTime', value: 30, prefix: '≤', suffix: ' Days' },
];

const CARDS_LEFT: AdvantageCard[] = [
  { key: 'underOneRoof', icon: 'hand' },
  { key: 'dedicatedLead', icon: 'manager' },
];

const CARDS_RIGHT: AdvantageCard[] = [
  { key: 'fixedPricing', icon: 'price' },
  { key: 'hipaaSpecialists', icon: 'shield' },
];

const Icon = ({ name }: { name: AdvantageCard['icon'] }) => {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'hand':
      return (
        <svg {...common}>
          <path d="M7 11V6a2 2 0 0 1 4 0v5" />
          <path d="M11 11V4a2 2 0 0 1 4 0v7" />
          <path d="M15 11V6a2 2 0 0 1 4 0v9a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7L4 16a2 2 0 0 1 3-2.7l2 1.7" />
        </svg>
      );
    case 'price':
      return (
        <svg {...common}>
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
          <circle cx="8" cy="8" r="1.6" />
        </svg>
      );
    case 'manager':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.4" />
          <path d="M5 20a7 7 0 0 1 14 0" />
          <path d="M16.5 4.5a3 3 0 0 1 0 5" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
};

const Advantages = () => {
  const { t } = useTranslation('home');
  return (
    <section className="adv-section" id="advantages" aria-labelledby="adv-title">
      <div className="container-shell">
        <div className="adv-head">
          <span className="adv-eyebrow">{t('advantages.eyebrow')}</span>
          <h2 id="adv-title" className="adv-h2">
            {t('advantages.title')}
          </h2>
          <p className="adv-intro">{t('advantages.intro')}</p>
        </div>

        <div className="adv-stats">
          {STATS.map((s) => (
            <div key={s.key} className="adv-stat">
              <p className="adv-stat-num">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} duration={1.8} />
              </p>
              <p className="adv-stat-label">{t(`advantages.stats.${s.key}`)}</p>
            </div>
          ))}
        </div>

        <div className="adv-grid">
          <div className="adv-col adv-col--left">
            {CARDS_LEFT.map((c) => (
              <article key={c.key} className="adv-card">
                <span className="adv-card-icon" aria-hidden="true">
                  <Icon name={c.icon} />
                </span>
                <h3 className="adv-card-title">{t(`advantages.cards.${c.key}.title`)}</h3>
                <p className="adv-card-desc">{t(`advantages.cards.${c.key}.desc`)}</p>
              </article>
            ))}
          </div>

          <div className="adv-media" aria-hidden="true">
            <div className="adv-media-frame">
              <img src={advantagesImg} alt="" width={1536} height={1024} loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="adv-col adv-col--right">
            {CARDS_RIGHT.map((c) => (
              <article key={c.key} className="adv-card">
                <span className="adv-card-icon" aria-hidden="true">
                  <Icon name={c.icon} />
                </span>
                <h3 className="adv-card-title">{t(`advantages.cards.${c.key}.title`)}</h3>
                <p className="adv-card-desc">{t(`advantages.cards.${c.key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
