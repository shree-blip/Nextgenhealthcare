import { useState } from 'react';
import type { ReactNode } from 'react';
import type { PillarPane } from '@/content/services/pillars';

interface PillarsProps {
  id: string;
  ariaTitleId: string;
  eyebrow: string;
  title: ReactNode;
  sub: string;
  panes: PillarPane[];
}

const Pillars = ({ id, ariaTitleId, eyebrow, title, sub, panes }: PillarsProps) => {
  const [activeId, setActiveId] = useState(panes[0]?.id ?? '');

  return (
    <section className="pillars-section" id={id} aria-labelledby={ariaTitleId}>
      <div className="container-shell">
        <div className="pillars-head">
          <span className="pillars-eyebrow">{eyebrow}</span>
          <h2 id={ariaTitleId} className="pillars-h2">
            {title}
          </h2>
          <p className="pillars-sub">{sub}</p>
        </div>

        <div className="pillars-grid">
          <ul className="pillar-list" role="tablist">
            {panes.map((pane) => {
              const isActive = pane.id === activeId;
              return (
                <li
                  key={pane.id}
                  className={`pillar-item${isActive ? ' is-active' : ''}`}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  onClick={() => setActiveId(pane.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveId(pane.id);
                    }
                  }}
                >
                  <h3 className="pillar-title">{pane.listTitle}</h3>
                  <p className="pillar-sub">{pane.listSub}</p>
                </li>
              );
            })}
          </ul>

          <div className="pillar-detail" role="tabpanel">
            {panes.map((pane) => (
              <div
                key={pane.id}
                id={pane.id}
                className={`pillar-detail-pane${pane.id === activeId ? ' is-active' : ''}`}
              >
                <div className="pdt-head">
                  <span className="num">{pane.num}</span>
                  <span>{pane.tag}</span>
                </div>
                <h4 className="pdt-title">{pane.detailTitle}</h4>
                <p className="pdt-text">{pane.detailText}</p>
                <ul className="pdt-list">
                  {pane.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <div className="pdt-foot">{pane.foot}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
