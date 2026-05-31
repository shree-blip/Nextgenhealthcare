import { useTranslation } from 'react-i18next';
import Section from '@/components/editorial/Section';
import EditorialCTA from '@/components/editorial/EditorialCTA';

const Closing = () => {
  const { t } = useTranslation('pages');
  return (
    <Section
      no={t('pages:patientExperience.closing.no')}
      title={t('pages:patientExperience.closing.title')}
      kicker={t('pages:patientExperience.closing.kicker')}
    >
      <EditorialCTA
        eyebrow={t('pages:patientExperience.closing.ctaEyebrow')}
        title={t('pages:patientExperience.closing.ctaTitle')}
        description={t('pages:patientExperience.closing.ctaDescription')}
        primaryHref="/contact"
        primaryLabel={t('pages:patientExperience.closing.ctaPrimary')}
        secondaryHref="/case-studies"
        secondaryLabel={t('pages:patientExperience.closing.ctaSecondary')}
      />
    </Section>
  );
};

export default Closing;
