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

const Privacy = () => {
  const { t } = useTranslation(['legal']);

  const collectedItems = t('legal:privacy.sections.informationCollected.items', {
    returnObjects: true,
  }) as string[];
  const useItems = t('legal:privacy.sections.howWeUseIt.items', { returnObjects: true }) as string[];
  const subItems = t('legal:privacy.sections.subProcessors.items', {
    returnObjects: true,
  }) as string[];

  const rightsBody = t('legal:privacy.sections.yourRights.body', { email: SITE.email });
  const [rightsBefore, rightsAfter] = rightsBody.split(SITE.email);

  const SECTIONS: LegalSection[] = [
    {
      heading: t('legal:privacy.sections.whoWeAre.heading'),
      body: <P>{t('legal:privacy.sections.whoWeAre.body')}</P>,
    },
    {
      heading: t('legal:privacy.sections.informationCollected.heading'),
      body: (
        <>
          <P>{t('legal:privacy.sections.informationCollected.intro')}</P>
          <UL>
            {collectedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </UL>
          <p
            style={{ margin: '0 0 14px' }}
            dangerouslySetInnerHTML={{
              __html: t('legal:privacy.sections.informationCollected.phiNote'),
            }}
          />
        </>
      ),
    },
    {
      heading: t('legal:privacy.sections.howWeUseIt.heading'),
      body: (
        <>
          <UL>
            {useItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </UL>
          <P>{t('legal:privacy.sections.howWeUseIt.noSell')}</P>
        </>
      ),
    },
    {
      heading: t('legal:privacy.sections.cookies.heading'),
      body: <P>{t('legal:privacy.sections.cookies.body')}</P>,
    },
    {
      heading: t('legal:privacy.sections.subProcessors.heading'),
      body: (
        <>
          <P>{t('legal:privacy.sections.subProcessors.intro')}</P>
          <UL>
            {subItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </UL>
        </>
      ),
    },
    {
      heading: t('legal:privacy.sections.yourRights.heading'),
      body: (
        <P>
          {rightsBefore}
          <a href={`mailto:${SITE.email}`} style={{ color: '#576DB5' }}>
            {SITE.email}
          </a>
          {rightsAfter}
        </P>
      ),
    },
    {
      heading: t('legal:privacy.sections.changes.heading'),
      body: <P>{t('legal:privacy.sections.changes.body')}</P>,
    },
  ];

  return (
    <LegalPage
      eyebrow={t('legal:privacy.eyebrow')}
      title={t('legal:privacy.title')}
      summary={t('legal:privacy.summary')}
      effectiveDate={t('legal:privacy.effectiveDate')}
      reviewedDate={t('legal:privacy.reviewedDate')}
      contact={{ email: SITE.email }}
      sections={SECTIONS}
      breadcrumb={t('legal:privacy.breadcrumb')}
      metaDescription={t('legal:privacy.metaDescription')}
      canonicalPath="/privacy"
    />
  );
};

export default Privacy;
