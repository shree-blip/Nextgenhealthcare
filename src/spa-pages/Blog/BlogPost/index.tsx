import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getPostBySlug, BLOG_POSTS } from '@/content/blog/posts';
import Hero from './Hero';
import NotFoundBlock from './NotFoundBlock';
import Seo from '@/components/Seo';
import { buildBlogPostSchema, buildBreadcrumbSchema } from './data';

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
    fetch(`/api/posts?slug=${encodeURIComponent(slug)}`)
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
  }, [slug]);

  if (state === 'loading') {
    return (
      <main className="bpx container-shell" style={{ padding: '120px 0', textAlign: 'center' }}>
        <p style={{ opacity: 0.6 }}>Loading…</p>
      </main>
    );
  }
  if (state === 'notfound' || !post) return <NotFoundBlock />;

  return (
    <main className="bpx" id="bpx-top">
      <Seo
        title={post.title}
        description={post.excerpt || ''}
        path={`/blog/${post.slug}`}
      />
      <article className="container-shell" style={{ maxWidth: 760, margin: '0 auto', padding: '80px 0 100px' }}>
        <Link
          to="/blog"
          style={{ display: 'inline-block', marginBottom: 24, fontSize: 13, opacity: 0.7 }}
        >
          ← Back to blog
        </Link>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || ''}
            style={{ width: '100%', borderRadius: 18, marginBottom: 28, display: 'block' }}
          />
        )}
        <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 8 }}>
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Draft'}
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15, marginBottom: 16 }}>
          {post.title}
        </h1>
        {post.excerpt && (
          <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.78, marginBottom: 32 }}>
            {post.excerpt}
          </p>
        )}
        <div
          className="bpx-content"
          style={{ fontSize: 16, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
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
