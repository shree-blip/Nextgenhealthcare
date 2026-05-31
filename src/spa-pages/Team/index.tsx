import { useTranslation } from 'react-i18next';
import TeamHero from './TeamHero';
import Founder from './Founder';
import TeamGrid from './TeamGrid';
import Pillars from './Pillars';
import Engage from './Engage';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Team' },
]);

const Team = () => {
  const { t } = useTranslation('pages');

  return (
    <main className="ngt-page">
      <Seo
        title={t('team.seo.title')}
        description={t('team.seo.description')}
        path="/team"
        schema={BREADCRUMB_SCHEMA}
      />

      <TeamHero />
      <Founder />
      <TeamGrid />
      <Pillars />
      <Engage />
    </main>
  );
};

export default Team;
