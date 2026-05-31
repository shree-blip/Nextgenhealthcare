import { useTranslation } from 'react-i18next';
import Column from './Column';
import { usePopularDestinations, usePopularServices, usePopularReads } from './links';

const RecoveryGrid = () => {
  const { t } = useTranslation('pages');
  const destinations = usePopularDestinations();
  const services = usePopularServices();
  const reads = usePopularReads();

  return (
    <section aria-label={t('notFound.recovery.sectionAria')}>
      <div className="container-shell">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(16px, 1.8vw, 24px)',
          }}
        >
          <Column title={t('notFound.recovery.destinations')} links={destinations} />
          <Column title={t('notFound.recovery.services')} links={services} />
          <Column title={t('notFound.recovery.reads')} links={reads} />
        </div>
      </div>
    </section>
  );
};

export default RecoveryGrid;
