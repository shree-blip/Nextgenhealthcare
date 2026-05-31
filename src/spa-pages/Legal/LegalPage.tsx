import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export interface LegalPageProps {
  eyebrow: string;
  title: string;
  summary: string;
  effectiveDate: string;
  reviewedDate?: string;
  contact?: { email: string; phone?: string };
  sections: LegalSection[];
  breadcrumb: string;
  metaDescription: string;
  canonicalPath: string;
}

const LegalPage = ({
  eyebrow,
  title,
  summary,
  effectiveDate,
  reviewedDate,
  contact,
  sections,
  breadcrumb,
  metaDescription,
  canonicalPath,
}: LegalPageProps) => {
  const { t } = useTranslation(['legal']);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} · ${SITE.name}`,
    url: `${SITE.url}${canonicalPath}`,
    description: metaDescription,
    isPartOf: { '@id': `${SITE.url}#website` },
    about: { '@id': `${SITE.url}#organization` },
  };

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: 'Legal', path: '/sitemap' },
    { name: breadcrumb },
  ]);

  return (
    <main className="legal-page" style={{ paddingBottom: 'clamp(72px, 9vw, 120px)' }}>
      <Seo
        title={title}
        description={metaDescription}
        path={canonicalPath}
        schema={[webPageSchema, breadcrumbSchema]}
      />
      <section
        aria-labelledby="lg-title"
        style={{ padding: 'clamp(56px, 7vw, 96px) 0 clamp(32px, 4vw, 48px)' }}
      >
        <div className="container-shell">
          <Breadcrumb
            items={[{ label: t('legal:common.section'), to: '/sitemap' }, { label: breadcrumb }]}
            section={t('legal:common.section')}
          />
          <div style={{ maxWidth: 760 }}>
            <span className="results-eyebrow">{eyebrow}</span>
            <h1
              id="lg-title"
              style={{
                fontSize: 'clamp(34px, 4.6vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: '#2D3748',
                fontWeight: 700,
                margin: '6px 0 14px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: '#4A5568',
                margin: 0,
                maxWidth: '64ch',
              }}
            >
              {summary}
            </p>
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
                marginTop: 28,
                paddingTop: 22,
                borderTop: '1px solid rgba(45,55,72,0.08)',
              }}
            >
              <div>
                <dt
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#718096',
                  }}
                >
                  {t('legal:common.effectiveDate')}
                </dt>
                <dd
                  style={{
                    margin: '4px 0 0',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#2D3748',
                  }}
                >
                  {effectiveDate}
                </dd>
              </div>
              {reviewedDate ? (
                <div>
                  <dt
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#718096',
                    }}
                  >
                    {t('legal:common.lastReviewed')}
                  </dt>
                  <dd
                    style={{
                      margin: '4px 0 0',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#2D3748',
                    }}
                  >
                    {reviewedDate}
                  </dd>
                </div>
              ) : null}
              {contact ? (
                <div>
                  <dt
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#718096',
                    }}
                  >
                    {t('legal:common.questions')}
                  </dt>
                  <dd
                    style={{
                      margin: '4px 0 0',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#576DB5',
                    }}
                  >
                    <a href={`mailto:${contact.email}`} style={{ color: 'inherit' }}>
                      {contact.email}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="Policy sections">
        <div className="container-shell">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 260px) 1fr',
              gap: 'clamp(28px, 4vw, 64px)',
              alignItems: 'start',
            }}
            className="legal-shell"
          >
            <nav
              aria-label={t('legal:common.onThisPage')}
              style={{
                position: 'sticky',
                top: 110,
                background: '#fff',
                border: '1px solid rgba(45,55,72,0.08)',
                borderRadius: 18,
                padding: 20,
              }}
              className="legal-toc"
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#718096',
                  marginBottom: 12,
                }}
              >
                {t('legal:common.onThisPage')}
              </span>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#sec-${i + 1}`}
                      style={{
                        display: 'flex',
                        gap: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: '#2D3748',
                        padding: '6px 0',
                      }}
                    >
                      <span style={{ color: '#B38B6D', fontWeight: 700, minWidth: 22 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{s.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article
              style={{
                background: '#fff',
                border: '1px solid rgba(45,55,72,0.08)',
                borderRadius: 18,
                padding: 'clamp(28px, 4vw, 56px)',
                color: '#2D3748',
                fontSize: 15.5,
                lineHeight: 1.75,
              }}
            >
              {sections.map((s, i) => (
                <section
                  key={s.heading}
                  id={`sec-${i + 1}`}
                  style={{ marginTop: i === 0 ? 0 : 36 }}
                >
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                      color: '#1A2438',
                      margin: '0 0 12px',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 12,
                    }}
                  >
                    <span style={{ color: '#B38B6D', fontSize: 13, fontWeight: 800 }}>
                      § {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="legal-body">{s.body}</div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LegalPage;
