import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type PillarKey = 'reach' | 'operations' | 'accountability';

interface Pillar {
  pos: 0 | 1 | 2;
  key: PillarKey;
  icon: ReactElement;
}

const ReachIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const OpsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.06a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const AttribIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <polyline points="7 14 11 10 14 13 21 6" />
  </svg>
);

const PILLARS: Pillar[] = [
  { pos: 0, key: 'reach', icon: <ReachIcon /> },
  { pos: 1, key: 'operations', icon: <OpsIcon /> },
  { pos: 2, key: 'accountability', icon: <AttribIcon /> },
];

const WhyUs = () => {
  const { t } = useTranslation('pages');
  return (
    <section className="sl-section ofm-why-section" id="why-us">
      <div className="container-shell">
        <div className="sl-sec-head">
          <div>
            <div className="sl-sec-num">{t('pages:onsiteFieldMarketing.whyUs.secNum')}</div>
            <h2 className="sl-sec-title">
              {t('pages:onsiteFieldMarketing.whyUs.titleLine1')}{' '}
              <em>{t('pages:onsiteFieldMarketing.whyUs.titleAccent')}</em>
            </h2>
          </div>
          <div className="sl-sec-meta">
            {t('pages:onsiteFieldMarketing.whyUs.secMeta1')}
            <br />
            {t('pages:onsiteFieldMarketing.whyUs.secMeta2')}
          </div>
        </div>

        <div className="ofm-why-grid">
          {PILLARS.map((p) => {
            const list = t(`pages:onsiteFieldMarketing.whyUs.items.${p.key}.list`, {
              returnObjects: true,
            }) as string[];
            return (
              <article key={p.key} className="ofm-why-card" data-pos={p.pos}>
                <div className="ofm-why-icon">{p.icon}</div>
                <div className="ofm-why-tag">
                  {t(`pages:onsiteFieldMarketing.whyUs.items.${p.key}.tag`)}
                </div>
                <h3 className="ofm-why-name">
                  {t(`pages:onsiteFieldMarketing.whyUs.items.${p.key}.name`)}
                </h3>
                <p className="ofm-why-desc">
                  {t(`pages:onsiteFieldMarketing.whyUs.items.${p.key}.desc`)}
                </p>
                <ul className="ofm-why-list">
                  {list.map((item) => (
                    <li key={item}>
                      <span className="ofm-why-tick" aria-hidden="true">
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
