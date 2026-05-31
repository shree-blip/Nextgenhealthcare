import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  EditPostShell,
  PageHeader,
  Card,
  CoverImageCard,
  SEOCard,
  ContentEditorCard,
  PublishDateCard,
  inputCls,
  labelCls,
} from '../components/EditPostLayout';

export default function EditBlogPost() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    coverImageAlt: '',
    seoTitle: '',
    metaDesc: '',
    canonical: '',
    publishedAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  /* Auto-generate ALT text from blog title */
  const generateAltText = (title: string, suffix = '') => {
    if (!title) return suffix;
    const clean = title.trim().substring(0, 80);
    return suffix ? `${clean} - ${suffix}` : clean;
  };

  /* ── Load post ────────────────────────────────────────── */
  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          coverImage: data.coverImage || '',
          coverImageAlt:
            data.coverImageAlt ||
            generateAltText(data.title || '', 'Cover Image'),
          seoTitle: data.seoTitle || '',
          metaDesc: data.metaDesc || '',
          canonical: data.canonical || '',
          publishedAt: data.publishedAt ? data.publishedAt.split('T')[0] : '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ── Field helpers ────────────────────────────────────── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updates: Record<string, string> = { [name]: value };
    if (name === 'title' && form.coverImage) {
      updates.coverImageAlt = generateAltText(value, 'Cover Image');
    }
    setForm((p) => ({ ...p, ...updates }));
  };

  /* ── Cover upload ─────────────────────────────────────── */
  const handleCoverUpload = async (file: File) => {
    setUploadingCover(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('alt', generateAltText(form.title, 'Cover Image'));
      const res = await fetch('/api/upload/blog-image', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      const newUrl = data.url as string;
      const newAlt =
        (data.alt as string) || generateAltText(form.title, 'Cover Image');
      setForm((p) => ({ ...p, coverImage: newUrl, coverImageAlt: newAlt }));
      // Auto-save to DB
      const saveRes = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coverImage: newUrl, coverImageAlt: newAlt }),
      });
      if (!saveRes.ok) throw new Error('Failed to save cover image');
    } catch (err) {
      console.error('Cover upload failed:', err);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setUploadingCover(false);
    }
  };

  /* ── Submit ───────────────────────────────────────────── */
  const handleSubmit = async (publish?: boolean) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        publishedAt: publish
          ? new Date().toISOString()
          : form.publishedAt
            ? new Date(form.publishedAt).toISOString()
            : null,
      };
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      // Sitemap automatically revalidated by API route
      navigate('/dashboard/admin?view=blog-management');
    } catch {
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  const isPublished = !!form.publishedAt;

  /* ── Render ───────────────────────────────────────────── */
  return (
    <EditPostShell loading={loading}>
      <PageHeader
        title="Edit Blog Post"
        subtitle="Update content and SEO settings"
        backHref="/dashboard/admin?view=blog-management"
        backLabel="Back"
        isPublished={isPublished}
        saving={saving}
        onSave={() => handleSubmit()}
        onPublish={() => handleSubmit(true)}
        onCancel={() => navigate('/dashboard/admin?view=blog-management')}
      />

      <div className="space-y-6">
        {/* ── 1. Post Details ──────────────────────────────── */}
        <Card title="Post Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className={inputCls}
                placeholder="Enter post title"
                required
              />
            </div>
            <div>
              <label className={labelCls}>URL Slug *</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className={`${inputCls} font-mono text-sm`}
                placeholder="url-friendly-slug"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              className={`${inputCls} resize-none`}
              rows={2}
              placeholder="Brief summary for blog listings"
            />
          </div>
        </Card>

        {/* ── 2. SEO Settings ─────────────────────────────── */}
        <SEOCard
          seoTitle={form.seoTitle}
          metaDesc={form.metaDesc}
          canonical={form.canonical}
          onSeoTitleChange={(v) => setForm((p) => ({ ...p, seoTitle: v }))}
          onMetaDescChange={(v) => setForm((p) => ({ ...p, metaDesc: v }))}
          onCanonicalChange={(v) => setForm((p) => ({ ...p, canonical: v }))}
        />

        {/* ── 3. Cover Image ─────────────────────────────── */}
        <CoverImageCard
          url={form.coverImage}
          alt={form.coverImageAlt}
          uploading={uploadingCover}
          onUrlChange={(v) => setForm((p) => ({ ...p, coverImage: v }))}
          onAltChange={(v) => setForm((p) => ({ ...p, coverImageAlt: v }))}
          onUpload={handleCoverUpload}
          onRemove={() =>
            setForm((p) => ({ ...p, coverImage: '', coverImageAlt: '' }))
          }
        />

        {/* ── 4. Publish Status ─────────────────────────── */}
        <PublishDateCard
          publishedAt={form.publishedAt}
          onDateChange={(v) => setForm((p) => ({ ...p, publishedAt: v }))}
        />

        {/* ── 5. Content Editor ──────────────────────────── */}
        <ContentEditorCard
          content={form.content}
          onChange={(v) => setForm((p) => ({ ...p, content: v }))}
          placeholder="Start writing your blog post…"
          blogTitle={form.title}
        />
      </div>
    </EditPostShell>
  );
}
