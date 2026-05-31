import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DetailNarrative from '@/components/DetailNarrative';
import { findDetail, type DetailKind } from '../details.data';
import Hero from './Hero';
import Body from './Body';
import FAQ from './FAQ';
import Related from './Related';
import Closing from './Closing';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { KIND_GROUP, buildNarrativeBlocks, buildSchema, faqSchema, localizedEntryTitle, kindGroupKey } from './data';

const truncate = (s: string, n: number): string =>
  s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`;

const OurWorkDetail = () => {
  const { t } = useTranslation('pages');
  const { kind, slug } = useParams<{ kind: string; slug: string }>();
  const validKind =
    kind === 'engagement' || kind === 'industry' || kind === 'capability'
      ? (kind as DetailKind)
      : null;

  const entry = validKind && slug ? findDetail(validKind, slug) : undefined;

  if (!validKind || !entry) {
    return <Navigate to="/our-work" replace />;
  }

  const group = KIND_GROUP[entry.kind];
  const indexInGroup = group.findIndex((d) => d.slug === entry.slug);
  const numLabel = `${String(indexInGroup + 1).padStart(2, '0')} / ${String(group.length).padStart(2, '0')}`;

  const localizedTitle = localizedEntryTitle(entry, t);
  const localizedDescription = t(
    `ourWork.${kindGroupKey(entry.kind)}.${entry.slug}.description`,
    entry.description
  );
  const kindLabel = t(`ourWork.detail.kindLabels.${entry.kind}`);

  const narrative = buildNarrativeBlocks(entry, t);

  const breadcrumb = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: 'Our Work', path: '/our-work' },
    { name: `${kindLabel}: ${localizedTitle}` },
  ]);

  return (
    <main className="ow-detail-page">
      <Seo
        title={`${localizedTitle} — ${kindLabel} · Our Work`}
        description={truncate(localizedDescription, 160)}
        path={`/our-work/${entry.kind}/${entry.slug}`}
        type={entry.kind === 'engagement' ? 'article' : 'website'}
        schema={[buildSchema(entry), faqSchema(entry), breadcrumb]}
      />

      <Hero entry={entry} numLabel={numLabel} />
      <Body entry={entry} />
      <DetailNarrative about={narrative.about} approach={narrative.approach} />
      <FAQ entry={entry} />
      <Related entry={entry} />
      <Closing entry={entry} />
    </main>
  );
};

export default OurWorkDetail;
