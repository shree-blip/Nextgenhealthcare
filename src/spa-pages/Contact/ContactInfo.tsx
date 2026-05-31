import { useTranslation } from 'react-i18next';
import InquiryForm from './InquiryForm';
import NewsletterCard from './NewsletterCard';
import HelpCard from './HelpCard';

const ContactInfo = () => {
  const { t } = useTranslation('contact');

  return (
    <section className="ct-info" aria-labelledby="ct-info-title">
      <div className="container-shell">
        <div className="ct-info-head">
          <span className="ct-info-eyebrow">{t('info.eyebrow')}</span>
          <h2 id="ct-info-title" className="ct-info-h2">
            {t('info.title')}
          </h2>
          <p className="ct-info-sub">{t('info.subtitle')}</p>
        </div>

        <div className="ct-info-grid">
          <InquiryForm />

          <div className="ct-right-stack">
            <NewsletterCard />
            <HelpCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
