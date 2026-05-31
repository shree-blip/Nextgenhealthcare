import { useTranslation } from 'react-i18next';
import AboutHero from './AboutHero';
import ServicesSpectrum from './ServicesSpectrum';
import Genesis from './Genesis';
import Mission from './Mission';
import Methodology from './Methodology';
import Infrastructure from './Infrastructure';
import Team from './Team';
import AboutFAQ from './AboutFAQ';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';

// Note: the global Organization schema (address, contactPoint, sameAs)
// is emitted site-wide via the default <Seo /> in App.tsx. This page
// used to define a duplicate page-local Organization; it has been
// consolidated into the helper at src/lib/schema.ts. Founder name and
// foundingDate are intentionally omitted from the global schema pending
// user confirmation — see comment in src/lib/schema.ts.

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'About' },
]);

const About = () => {
  const { t } = useTranslation('about');

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        path="/about"
        schema={BREADCRUMB_SCHEMA}
      />

      <AboutHero />
      <Genesis />
      <Mission />
      <ServicesSpectrum />
      <Methodology />
      <Infrastructure />
      <Team />
      <AboutFAQ />
    </>
  );
};

export default About;
