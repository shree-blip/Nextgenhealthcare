import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type PillarKey = 'compliance' | 'ehr' | 'owner';

interface Pillar {
  pos: 0 | 1 | 2;
  key: PillarKey;
  icon: ReactElement;
}

const ComplianceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const ConnectIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
  </svg>
);
const OwnershipIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const PILLARS: Pillar[] = [
  { pos: 0, key: 'compliance', icon: <ComplianceIcon /> },
  { pos: 1, key: 'ehr', icon: <ConnectIcon /> },
  { pos: 2, key: 'owner', icon: <OwnershipIcon /> },
];

const WhyUs = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section mau-why-section" id="why-us">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:medicalAutomation.whyUs.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:medicalAutomation.whyUs.titleLine1')}{' '}
              <em>{t('pages:medicalAutomation.whyUs.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:medicalAutomation.whyUs.secMeta1')}
            <br />
            {t('pages:medicalAutomation.whyUs.secMeta2')}
          </div>
        </div>

        <div className="mau-why-grid">
          {PILLARS.map((p) => {
            const list = t(`pages:medicalAutomation.whyUs.items.${p.key}.list`, {
              returnObjects: true,
            }) as string[];
            return (
              <article key={p.key} className="mau-why-card" data-pos={p.pos}>
                <div className="mau-why-icon">{p.icon}</div>
                <div className="mau-why-tag">
                  {t(`pages:medicalAutomation.whyUs.items.${p.key}.tag`)}
                </div>
                <h3 className="mau-why-name">
                  {t(`pages:medicalAutomation.whyUs.items.${p.key}.name`)}
                </h3>
                <p className="mau-why-desc">
                  {t(`pages:medicalAutomation.whyUs.items.${p.key}.desc`)}
                </p>
                <ul className="mau-why-list">
                  {list.map((item) => (
                    <li key={item}>
                      <span className="mau-why-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
