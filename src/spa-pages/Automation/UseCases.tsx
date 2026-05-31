import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface UseCase {
  id: string;
  key: 'case1' | 'case2' | 'case3';
}

const USE_CASES: UseCase[] = [
  { id: '1', key: 'case1' },
  { id: '2', key: 'case2' },
  { id: '3', key: 'case3' },
];

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const UseCases = () => {
  const { t } = useTranslation(['automation']);
  const [activeId, setActiveId] = useState('1');
  const [swapping, setSwapping] = useState(false);

  const active = USE_CASES.find((c) => c.id === activeId) ?? USE_CASES[0];

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setSwapping(true);
    window.setTimeout(() => {
      setActiveId(id);
      setSwapping(false);
    }, 220);
  };

  const bulletsForCase = (key: UseCase['key']): string[] => {
    const value = t(`automation:useCases.items.${key}.bullets`, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  };

  return (
    <section className="usecases" aria-labelledby="uc-title">
      <div className="container-shell">
        <div className="uc-head reveal">
          <div className="uc-eyebrow">{t('automation:useCases.eyebrow')}</div>
          <h2 id="uc-title">
            {t('automation:useCases.titleLine1')}
            <br />
            {t('automation:useCases.titleLine2')}
          </h2>
          <p className="uc-sub">{t('automation:useCases.sub')}</p>
        </div>

        <div className="uc-grid">
          <div className="uc-visual" aria-hidden="true">
            <div className="uc-circles">
              <span className="uc-ring uc-r1" />
              <span className="uc-ring uc-r2" />
              <span className="uc-ring uc-r3" />
              <span className="uc-ring uc-r4" />
              <span className="uc-ring uc-r5" />
              <div className={`uc-orb${swapping ? ' is-swap' : ''}`}>
                <span className="uc-orb-num">
                  {t(`automation:useCases.items.${active.key}.num`)}
                </span>
                <span className="uc-orb-title">
                  {t(`automation:useCases.items.${active.key}.titleLine1`)}
                  <br />
                  {t(`automation:useCases.items.${active.key}.titleLine2`)}
                </span>
              </div>
            </div>
          </div>

          <div className="uc-list" role="tablist">
            {USE_CASES.map((uc) => {
              const isOpen = uc.id === activeId;
              return (
                <button
                  key={uc.id}
                  className={`uc-row${isOpen ? ' is-open' : ''}`}
                  role="tab"
                  aria-selected={isOpen}
                  aria-controls={`uc-${uc.id}`}
                  onClick={() => handleSelect(uc.id)}
                  type="button"
                >
                  <div className="uc-row-head">
                    <span className="uc-row-title">
                      {t(`automation:useCases.items.${uc.key}.shortTitle`)}
                    </span>
                    <span className="uc-row-icon" aria-hidden="true">
                      <PlusIcon />
                    </span>
                  </div>
                  <div className="uc-row-body" id={`uc-${uc.id}`}>
                    <div className="uc-row-tag">
                      {t(`automation:useCases.items.${uc.key}.tag`)}
                    </div>
                    <div className="uc-row-h">
                      {t(`automation:useCases.items.${uc.key}.heading`)}
                    </div>
                    <p className="uc-row-p">{t(`automation:useCases.items.${uc.key}.body`)}</p>
                    <ul className="uc-row-list">
                      {bulletsForCase(uc.key).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
