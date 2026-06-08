import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPostBySlug, BLOG_POSTS } from '@/content/blog/posts';
import Hero from './Hero';
import NotFoundBlock from './NotFoundBlock';
import Seo from '@/components/Seo';
import { renderArticleHtml } from '@/lib/article-body';
import { buildBlogPostSchema, buildBreadcrumbSchema } from './data';

/** Shimmer placeholder shown while the full article body is fetched. */
function ArticleSkeleton() {
  const rows: (number | null)[] = [96, 100, 88, 64, null, 92, 100, 90, 100, 72, null, 98, 84, 100];
  return (
    <div role="status" aria-label="Loading article">
      {rows.map((w, i) =>
        w === null ? (
          <div key={i} style={{ height: 24 }} />
        ) : (
          <div
            key={i}
            className="bpx-skel"
            style={{ width: `${w}%`, marginTop: i === 0 ? 0 : 14 }}
          />
        ),
      )}
    </div>
  );
}

/* ============================================================
   BLOG POST — Editorial detail page (hero-only).
   When the slug matches a curated editorial article, use the
   rich static layout below. When it doesn't, fall back to
   /api/posts?slug=... so admin-created posts render too.
   ============================================================ */

interface DbPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  coverImageAlt: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

function DbPostView({ slug }: { slug: string }) {
  // If the user clicked through from /blog (BlogFeed), the card passed the
  // post object as router state — we render instantly from that and then
  // refetch in the background to pull in the full `content` (which isn't in
  // the list payload).
  const location = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  const preloaded = (location.state as { post?: Partial<DbPost> } | null)?.post ?? null;

  const initialPost: DbPost | null = preloaded
    ? {
        id: preloaded.id ?? 0,
        title: preloaded.title ?? '',
        slug: preloaded.slug ?? slug,
        excerpt: preloaded.excerpt ?? null,
        content: preloaded.content ?? '',
        coverImage: preloaded.coverImage ?? null,
        coverImageAlt: preloaded.coverImageAlt ?? null,
        publishedAt: preloaded.publishedAt ?? null,
        updatedAt: preloaded.updatedAt ?? '',
      }
    : null;

  const [state, setState] = useState<'loading' | 'found' | 'notfound'>(
    preloaded ? 'found' : 'loading',
  );
  const [post, setPost] = useState<DbPost | null>(initialPost);

  useEffect(() => {
    let cancelled = false;
    const url =
      `/api/posts?slug=${encodeURIComponent(slug)}` + (lang === 'es' ? '&lang=es' : '');
    fetch(url)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          // Only flip to notfound if we don't already have preloaded data.
          if (!preloaded) setState('notfound');
          return;
        }
        if (!res.ok) {
          if (!preloaded) setState('notfound');
          return;
        }
        const data = (await res.json()) as DbPost;
        setPost(data);
        setState('found');
      })
      .catch(() => {
        if (!cancelled && !preloaded) setState('notfound');
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, lang]);

  const ARTICLE_STYLE = {
    maxWidth: 740,
    margin: '0 auto',
    padding: 'clamp(56px, 7vw, 92px) 0 clamp(72px, 9vw, 110px)',
  } as const;

  // Nothing in hand yet (direct visit, no preload) → full-page skeleton.
  if (state === 'loading' && !post) {
    return (
      <main className="bpx" id="bpx-top">
        <article className="container-shell" style={ARTICLE_STYLE}>
          <div className="bpx-skel" style={{ width: 84, height: 13, marginBottom: 30 }} />
          <div className="bpx-skel" style={{ width: '78%', height: 42, marginBottom: 18 }} />
          <div className="bpx-skel" style={{ width: '100%', height: 20, marginBottom: 8 }} />
          <div className="bpx-skel" style={{ width: '88%', height: 20, marginBottom: 40 }} />
          <ArticleSkeleton />
        </article>
      </main>
    );
  }
  if (state === 'notfound' || !post) return <NotFoundBlock />;

  const bodyHtml = renderArticleHtml(post.content);
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Draft';

  return (
    <main className="bpx" id="bpx-top">
      <Seo title={post.title} description={post.excerpt || ''} path={`/blog/${post.slug}`} />
      <article className="container-shell" style={ARTICLE_STYLE}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 28,
            fontSize: 13,
            fontWeight: 600,
            color: '#0a9968',
            textDecoration: 'none',
          }}
        >
          ← Back to blog
        </Link>

        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#0a9968',
            marginBottom: 14,
          }}
        >
          Editorial · {formattedDate}
        </div>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(30px, 4.6vw, 50px)',
            lineHeight: 1.08,
            letterSpacing: '-0.028em',
            fontWeight: 800,
            color: '#1A2438',
            margin: 0,
          }}
        >
          {post.title}
        </h1>
        {post.excerpt && (
          <p
            style={{
              fontSize: 'clamp(17px, 1.4vw, 20px)',
              lineHeight: 1.6,
              color: '#4A5568',
              marginTop: 18,
              marginBottom: 0,
            }}
          >
            {post.excerpt}
          </p>
        )}

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || ''}
            loading="eager"
            decoding="async"
            style={{
              width: '100%',
              maxHeight: 460,
              objectFit: 'cover',
              borderRadius: 18,
              margin: '36px 0 0',
              display: 'block',
            }}
          />
        )}

        <div style={{ height: 1, background: 'rgba(15, 23, 42, 0.08)', margin: '36px 0' }} />

        {bodyHtml ? (
          <div className="bpx-content" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        ) : (
          <ArticleSkeleton />
        )}

        <div style={{ marginTop: 56 }}>
          <Link to="/blog" style={{ color: '#0a9968', fontWeight: 700, textDecoration: 'none' }}>
            ← Back to blog
          </Link>
        </div>
      </article>
    </main>
  );
}

const BlogPost = () => {
  const { t } = useTranslation('blog');
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  if (!post) {
    if (!slug) return <NotFoundBlock />;
    return <DbPostView slug={slug} />;
  }

  const idx = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const postId = `NG-${String(idx + 1).padStart(3, '0')}`;

  const localizedTitle = t(`posts.${post.slug}.title`, post.title);
  const localizedDescription = t(`posts.${post.slug}.metaDescription`, post.metaDescription);
  const localizedSection = t(`posts.${post.slug}.catLabel`, post.catLabel);

  return (
    <main className="bpx" id="bpx-top" data-post-id={postId}>
      <Seo
        title={localizedTitle}
        description={localizedDescription}
        path={`/blog/${post.slug}`}
        type="article"
        article={{
          publishedTime: post.date,
          modifiedTime: post.date,
          author: post.author,
          section: localizedSection,
        }}
        schema={[buildBlogPostSchema(post), buildBreadcrumbSchema(post)]}
      />

      <article>
        <Hero post={post} />
      </article>
    </main>
  );
};

export default BlogPost;
