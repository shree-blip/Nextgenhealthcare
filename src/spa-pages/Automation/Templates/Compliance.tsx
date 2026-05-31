import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { COMPLIANCE_COUNTS } from './data';

interface ComplianceTier {
  key: 'baa' | 'hipaa' | 'phiFree';
  count: number;
  icon: ReactElement;
}

const TIERS: ComplianceTier[] = [
  {
    key: 'baa',
    count: COMPLIANCE_COUNTS['BAA required'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 L 4 6 V 12 C 4 16.5 7.5 20.7 12 22 C 16.5 20.7 20 16.5 20 12 V 6 Z" />
        <path d="M9 12 L 11 14 L 15 10" />
      </svg>
    ),
  },
  {
    key: 'hipaa',
    count: COMPLIANCE_COUNTS['HIPAA-aware'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12 L 11 15 L 16 9" />
      </svg>
    ),
  },
  {
    key: 'phiFree',
    count: COMPLIANCE_COUNTS['PHI-free'],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 10 L 12 14 L 16 10" />
      </svg>
    ),
  },
];

const Compliance = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-comp" aria-labelledby="atx-comp-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.compliance.label')}</span>
          <h2 id="atx-comp-title" className="adv-h2">
            {t('automation:templates.page.compliance.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.compliance.intro')}</p>
        </header>
        <div className="atx-comp-grid">
          {TIERS.map((tier) => (
            <article key={tier.key} className="atx-comp-card">
              <span className="atx-comp-icon">{tier.icon}</span>
              <div className="atx-comp-head">
                <h3 className="atx-comp-title">
                  {t(`automation:templates.page.compliance.tiers.${tier.key}.key`)}
                </h3>
                <span className="atx-comp-count">
                  {tier.count === 1
                    ? t('automation:templates.page.compliance.countSingular', { count: tier.count })
                    : t('automation:templates.page.compliance.countPlural', { count: tier.count })}
                </span>
              </div>
              <p className="atx-comp-desc">
                {t(`automation:templates.page.compliance.tiers.${tier.key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Compliance;
