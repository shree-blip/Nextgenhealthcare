import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import Hero from './Hero';
import CertStrip from './CertStrip';
import Results from './Results';
import AboutUs from './AboutUs';
import Advantages from './Advantages';
import Services from './Services';
import FAQ from './FAQ';
import Testimonials from './Testimonials';
import Industries from './Industries';
import ContactSection from './ContactSection';
import BookingModal from '@/components/BookingModal';
import Seo from '@/components/Seo';

// FAQ schema mirrors the questions rendered in the Home FAQ section. If
// you add/remove a question in `content/home/faqs.tsx`, mirror it here so
// the JSON-LD payload matches the visible content (Google ignores schema
// that does not match). Both the visible answers and these schema strings
// come from the same `home:faq.items.*` translations.
const FAQ_KEYS = ['results', 'hipaa', 'size', 'monthly', 'contract'] as const;

const buildFaqSchema = (t: TFunction<'home'>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_KEYS.map((key) => ({
    '@type': 'Question',
    name: t(`faq.items.${key}.q`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`faq.items.${key}.text`),
    },
  })),
});

const Home = () => {
  const { t } = useTranslation('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  const faqSchema = useMemo(() => buildFaqSchema(t), [t]);

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        path="/"
        schema={faqSchema}
      />

      <Hero>
        <CertStrip />
      </Hero>
      <AboutUs />
      <Advantages />
      <Services />
      <Industries />
      <Results />
      <Testimonials />
      <FAQ onBook={openBooking} />
      <ContactSection />

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </>
  );
};

export default Home;
