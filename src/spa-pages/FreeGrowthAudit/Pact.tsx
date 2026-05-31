import { useTranslation } from 'react-i18next';

interface Promise {
  k: string;
  v: string;
}

const Pact = () => {
  const { t } = useTranslation('pages');
  const promises = t('pages:freeGrowthAudit.pact.items', { returnObjects: true }) as Promise[];
  const title = t('pages:freeGrowthAudit.pact.title');
  // Split the title on "&" so we can style the ampersand
  const [titleA, titleB] = title.includes('&') ? title.split('&') : [title, ''];
  return (
    <section className="fga-pact" aria-labelledby="fga-pact-title">
      <div className="container-shell">
        <div className="fga-pact-tree">
          <div className="fga-pact-root">
            <span className="fga-section-tag">{t('pages:freeGrowthAudit.pact.tag')}</span>
            <h2 id="fga-pact-title" className="fga-pact-h">
              {titleA}
              {titleB && (
                <>
                  <span className="fga-pact-amp">&amp;</span>
                  {titleB}
                </>
              )}
            </h2>
          </div>

          <div className="fga-pact-connector" aria-hidden="true">
            <span className="fga-pact-trunk" />
            <span className="fga-pact-bar" />
            <span className="fga-pact-drop fga-pact-drop-1" />
            <span className="fga-pact-drop fga-pact-drop-2" />
            <span className="fga-pact-drop fga-pact-drop-3" />
          </div>

          <ol className="fga-pact-list">
            {promises.map((p, i) => (
              <li key={p.k}>
                <span className="fga-pact-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.k}</h3>
                <p>{p.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Pact;
