import { useTranslation } from 'react-i18next';
import ContactHero from './ContactHero';
import QuoteWizard from './QuoteWizard';
import ContactInfo from './ContactInfo';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';

const BREADCRUMB_SCHEMA = buildBreadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Contact' },
]);

const Contact = () => {
  const { t } = useTranslation('contact');

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        path="/contact"
        schema={BREADCRUMB_SCHEMA}
      />

      <ContactHero />
      <QuoteWizard />
      <ContactInfo />
    </>
  );
};

export default Contact;
