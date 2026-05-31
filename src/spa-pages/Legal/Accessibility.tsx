import { useTranslation } from 'react-i18next';
import LegalPage from './LegalPage';
import type { LegalSection } from './LegalPage';
import { SITE } from '@/content/site';

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ margin: '0 0 14px' }}>{children}</p>
);

const UL = ({ children }: { children: React.ReactNode }) => (
  <ul style={{ margin: '0 0 14px', paddingLeft: 22 }}>{children}</ul>
);

const Accessibility = () => {
  const { t } = useTranslation(['legal']);

  const practiceItems = t('legal:accessibility.sections.practice.items', {
    returnObjects: true,
  }) as string[];

  const reportBody = t('legal:accessibility.sections.report.body', { email: SITE.email });
  const [reportBefore, reportAfter] = reportBody.split(SITE.email);

  const SECTIONS: LegalSection[] = [
    {
      heading: t('legal:accessibility.sections.commitment.heading'),
      body: (
        <p
          style={{ margin: '0 0 14px' }}
          dangerouslySetInnerHTML={{
            __html: t('legal:accessibility.sections.commitment.body'),
          }}
        />
      ),
    },
    {
      heading: t('legal:accessibility.sections.practice.heading'),
      body: (
        <UL>
          {practiceItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </UL>
      ),
    },
    {
      heading: t('legal:accessibility.sections.testing.heading'),
      body: <P>{t('legal:accessibility.sections.testing.body')}</P>,
    },
    {
      heading: t('legal:accessibility.sections.limitations.heading'),
      body: <P>{t('legal:accessibility.sections.limitations.body')}</P>,
    },
    {
      heading: t('legal:accessibility.sections.report.heading'),
      body: (
        <P>
          {reportBefore}
          <a href={`mailto:${SITE.email}`} style={{ color: '#576DB5' }}>
            {SITE.email}
          </a>
          {reportAfter}
        </P>
      ),
    },
  ];

  return (
    <LegalPage
      eyebrow={t('legal:accessibility.eyebrow')}
      title={t('legal:accessibility.title')}
      summary={t('legal:accessibility.summary')}
      effectiveDate={t('legal:accessibility.effectiveDate')}
      reviewedDate={t('legal:accessibility.reviewedDate')}
      contact={{ email: SITE.email }}
      sections={SECTIONS}
      breadcrumb={t('legal:accessibility.breadcrumb')}
      metaDescription={t('legal:accessibility.metaDescription')}
      canonicalPath="/accessibility"
    />
  );
};

export default Accessibility;
