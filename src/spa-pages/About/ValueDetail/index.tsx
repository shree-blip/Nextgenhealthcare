import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DetailNarrative from '@/components/DetailNarrative';
import { useValueEntries, valueIndex } from '@/content/about/values.data';
import Hero from './Hero';
import Body from './Body';
import FAQ from './FAQ';
import Related from './Related';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { useBuildValueNarrative, articleSchema, faqSchema } from './data';

const truncate = (s: string, n: number): string =>
  s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`;

const ValueDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('about');
  const values = useValueEntries();
  const entry = slug ? values.find((v) => v.slug === slug) : undefined;
  const index = slug ? valueIndex(slug) : -1;
  const buildNarrative = useBuildValueNarrative();

  if (!entry || index < 0) {
    return <Navigate to="/about" replace />;
  }

  const narrative = buildNarrative(entry);

  const breadcrumb = buildBreadcrumbList([
    { name: t('valueDetail.breadcrumbHome'), path: '/' },
    { name: t('valueDetail.breadcrumbAbout'), path: '/about' },
    { name: t('valueDetail.crumbCoreValue', { title: entry.title }) },
  ]);

  return (
    <main className="ow-detail-page ab-value-detail-page">
      <Seo
        title={t('valueDetail.seoTitle', { title: entry.title })}
        description={truncate(entry.lead, 160)}
        path={`/about/value/${entry.slug}`}
        type="article"
        schema={[articleSchema(entry), faqSchema(entry), breadcrumb]}
      />

      <Hero entry={entry} index={index} />
      <Body entry={entry} />
      <DetailNarrative about={narrative.about} approach={narrative.approach} />
      <FAQ entry={entry} />
      <Related entry={entry} />
      <Closing entry={entry} />
    </main>
  );
};

export default ValueDetail;
