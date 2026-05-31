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

const Terms = () => {
  const { t } = useTranslation(['legal']);

  const useItems = t('legal:terms.sections.acceptableUse.items', {
    returnObjects: true,
  }) as string[];

  const SECTIONS: LegalSection[] = [
    {
      heading: t('legal:terms.sections.acceptance.heading'),
      body: <P>{t('legal:terms.sections.acceptance.body')}</P>,
    },
    {
      heading: t('legal:terms.sections.content.heading'),
      body: (
        <>
          <P>{t('legal:terms.sections.content.p1')}</P>
          <P>{t('legal:terms.sections.content.p2')}</P>
        </>
      ),
    },
    {
      heading: t('legal:terms.sections.ip.heading'),
      body: <P>{t('legal:terms.sections.ip.body')}</P>,
    },
    {
      heading: t('legal:terms.sections.acceptableUse.heading'),
      body: (
        <>
          <P>{t('legal:terms.sections.acceptableUse.intro')}</P>
          <UL>
            {useItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </UL>
        </>
      ),
    },
    {
      heading: t('legal:terms.sections.engagements.heading'),
      body: <P>{t('legal:terms.sections.engagements.body')}</P>,
    },
    {
      heading: t('legal:terms.sections.disclaimers.heading'),
      body: <P>{t('legal:terms.sections.disclaimers.body')}</P>,
    },
    {
      heading: t('legal:terms.sections.liability.heading'),
      body: <P>{t('legal:terms.sections.liability.body')}</P>,
    },
    {
      heading: t('legal:terms.sections.law.heading'),
      body: <P>{t('legal:terms.sections.law.body')}</P>,
    },
  ];

  return (
    <LegalPage
      eyebrow={t('legal:terms.eyebrow')}
      title={t('legal:terms.title')}
      summary={t('legal:terms.summary')}
      effectiveDate={t('legal:terms.effectiveDate')}
      reviewedDate={t('legal:terms.reviewedDate')}
      contact={{ email: SITE.email }}
      sections={SECTIONS}
      breadcrumb={t('legal:terms.breadcrumb')}
      metaDescription={t('legal:terms.metaDescription')}
      canonicalPath="/terms"
    />
  );
};

export default Terms;
