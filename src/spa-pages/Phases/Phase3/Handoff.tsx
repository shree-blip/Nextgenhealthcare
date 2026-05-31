import { useTranslation } from 'react-i18next';
import { ClockIcon } from '@/components/icons';

const Handoff = () => {
  const { t } = useTranslation(['pages']);
  const items = t('pages:phases.phase3.handoff.items', { returnObjects: true }) as Record<
    string,
    { strong: string; desc: string }
  >;
  const tag = t('pages:phases.phase3.handoff.tag');
  return (
    <section className="ph3-handoff" aria-labelledby="ph3-handoff-title">
      <div className="head">
        <h2 id="ph3-handoff-title">{t('pages:phases.phase3.handoff.title')}</h2>
        <p>{t('pages:phases.phase3.handoff.lede')}</p>
      </div>
      <ul>
        <li>
          <div className="badge">
            <span className="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </span>
            <span className="ix">/ 01</span>
          </div>
          <strong>{items.dashboard.strong}</strong>
          <p className="desc">{items.dashboard.desc}</p>
          <span className="tag">{tag}</span>
        </li>
        <li>
          <div className="badge">
            <span className="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <span className="ix">/ 02</span>
          </div>
          <strong>{items.playbook.strong}</strong>
          <p className="desc">{items.playbook.desc}</p>
          <span className="tag">{tag}</span>
        </li>
        <li>
          <div className="badge">
            <span className="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <span className="ix">/ 03</span>
          </div>
          <strong>{items.editorial.strong}</strong>
          <p className="desc">{items.editorial.desc}</p>
          <span className="tag">{tag}</span>
        </li>
        <li>
          <div className="badge">
            <span className="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </span>
            <span className="ix">/ 04</span>
          </div>
          <strong>{items.frontDesk.strong}</strong>
          <p className="desc">{items.frontDesk.desc}</p>
          <span className="tag">{tag}</span>
        </li>
        <li>
          <div className="badge">
            <span className="icon" aria-hidden="true">
              <ClockIcon strokeWidth={2} />
            </span>
            <span className="ix">/ 05</span>
          </div>
          <strong>{items.cadence.strong}</strong>
          <p className="desc">{items.cadence.desc}</p>
          <span className="tag">{tag}</span>
        </li>
        <li>
          <div className="badge">
            <span className="icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4" />
                <polyline points="12 11 12 3" />
                <polyline points="9 6 12 3 15 6" />
              </svg>
            </span>
            <span className="ix">/ 06</span>
          </div>
          <strong>{items.phase4.strong}</strong>
          <p className="desc">{items.phase4.desc}</p>
          <span className="tag">{tag}</span>
        </li>
      </ul>
    </section>
  );
};

export default Handoff;
