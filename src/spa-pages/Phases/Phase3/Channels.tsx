import { useTranslation } from 'react-i18next';

const Channels = () => {
  const { t } = useTranslation(['pages']);
  const items = t('pages:phases.phase3.channels.items', { returnObjects: true }) as Record<
    string,
    { badge: string; name: string; desc: string; metric: string }
  >;
  const tracked = t('pages:phases.phase3.channels.trackedLabel');
  return (
    <section className="ph3-channels" aria-labelledby="ph3-channels-title">
      <h2 id="ph3-channels-title">{t('pages:phases.phase3.channels.title')}</h2>
      <p className="lede">{t('pages:phases.phase3.channels.lede')}</p>
      <div className="ph3-cgrid">
        <div className="ph3-ccell">
          <div className="badge">{items.search.badge}</div>
          <div className="name">{items.search.name}</div>
          <p className="desc">{items.search.desc}</p>
          <div className="metric">
            {tracked} {items.search.metric}
          </div>
        </div>
        <div className="ph3-ccell">
          <div className="badge">{items.paid.badge}</div>
          <div className="name">{items.paid.name}</div>
          <p className="desc">{items.paid.desc}</p>
          <div className="metric">
            {tracked} {items.paid.metric}
          </div>
        </div>
        <div className="ph3-ccell">
          <div className="badge">{items.email.badge}</div>
          <div className="name">{items.email.name}</div>
          <p className="desc">{items.email.desc}</p>
          <div className="metric">
            {tracked} {items.email.metric}
          </div>
        </div>
        <div className="ph3-ccell">
          <div className="badge">{items.editorial.badge}</div>
          <div className="name">{items.editorial.name}</div>
          <p className="desc">{items.editorial.desc}</p>
          <div className="metric">
            {tracked} {items.editorial.metric}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Channels;
