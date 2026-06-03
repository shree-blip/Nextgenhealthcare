import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, LayoutDashboard, Upload } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

type NewsForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  publisher: string;
  source: string;
  sourceUrl: string;
  sourceDate: string;
  seoTitle: string;
  metaDesc: string;
  publishedAt: string;
};

const isoToDateInput = (iso: string | null | undefined): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
};

export default function EditNewsArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<NewsForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    coverImageAlt: '',
    publisher: 'The NextGen Healthcare Marketing',
    source: '',
    sourceUrl: '',
    sourceDate: '',
    seoTitle: '',
    metaDesc: '',
    publishedAt: '',
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/news/${id}`);
        if (!res.ok) throw new Error('Could not load article');
        const data = await res.json();
        if (cancelled) return;
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          coverImage: data.coverImage || '',
          coverImageAlt: data.coverImageAlt || '',
          publisher: data.publisher || 'The NextGen Healthcare Marketing',
          source: data.source || '',
          sourceUrl: data.sourceUrl || '',
          sourceDate: isoToDateInput(data.sourceDate),
          seoTitle: data.seoTitle || '',
          metaDesc: data.metaDesc || '',
          publishedAt: isoToDateInput(data.publishedAt),
        });
      } catch (err) {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleCoverUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image is over 10 MB.');
      return;
    }
    setUploadError(null);
    setUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/upload/blog-image', { method: 'POST', body });
      const data = await res.json().catch(() => ({}) as { url?: string; error?: string });
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm((p) => ({ ...p, coverImage: data.url || '' }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sourceDate: form.sourceDate ? new Date(form.sourceDate).toISOString() : null,
          publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
        }),
      });
      const data = await res.json().catch(() => ({}) as { error?: string });
      if (!res.ok) throw new Error(data.error || 'Failed to update article');
      navigate('/dashboard/admin?view=news-management');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to update article');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-scope min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EAD08A]" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="dashboard-scope min-h-screen p-10 bg-slate-50 dark:bg-slate-950">
        <p className="text-red-600">{loadError}</p>
        <Link to="/dashboard/admin?view=news-management" className="text-[#4A3208] underline">
          Back to News Management
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard-scope min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/dashboard/admin"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#E5B73A] transition-all"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            to="/dashboard/admin?view=news-management"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-[#E5B73A] transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            News Management
          </Link>
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
          <h1 className="text-[20px] font-bold mb-1 text-slate-900 dark:text-slate-100">
            Edit News Article
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Update the article fields below and save.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Slug *
                </label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Cover Image
              </label>
              <div className="flex gap-3">
                <input
                  name="coverImage"
                  value={form.coverImage}
                  onChange={handleChange}
                  className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                  placeholder="Enter image URL or upload"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCoverUpload(file);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-[#F5C857] text-[#4A3208] font-bold rounded-lg hover:bg-[#E9B83A] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload className="h-5 w-5" />
                  {uploading ? 'Uploading…' : 'Upload'}
                </button>
              </div>

              {!form.coverImage && (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleCoverUpload(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-3 p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                    dragOver
                      ? 'border-[#EAD08A] bg-[#F5C857] dark:bg-[#F5C857]/20'
                      : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-[#E5B73A]'
                  }`}
                >
                  <ImageIcon className="h-8 w-8 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Drag and drop an image here, click to browse, or paste a URL above
                  </p>
                </div>
              )}

              {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
              {form.coverImage && (
                <div className="mt-3">
                  <img
                    src={form.coverImage}
                    alt={form.coverImageAlt}
                    className="max-h-48 rounded-lg object-cover"
                  />
                </div>
              )}
              <input
                name="coverImageAlt"
                value={form.coverImageAlt}
                onChange={handleChange}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#E5B73A] mt-3"
                placeholder="ALT text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Publisher
                </label>
                <input
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Source
                </label>
                <input
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Source URL
                </label>
                <input
                  name="sourceUrl"
                  value={form.sourceUrl}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Source Publish Date
                </label>
                <input
                  type="date"
                  name="sourceDate"
                  value={form.sourceDate}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  SEO Title
                </label>
                <input
                  name="seoTitle"
                  value={form.seoTitle}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                  Meta Description
                </label>
                <input
                  name="metaDesc"
                  value={form.metaDesc}
                  onChange={handleChange}
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Content *
              </label>
              <RichTextEditor
                value={form.content}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Edit the article..."
                minHeight="400px"
                blogTitle={form.title}
              />
            </div>

            <div className="max-w-xs">
              <label className="block font-medium mb-1 text-slate-700 dark:text-slate-300">
                Publish Date
              </label>
              <input
                type="date"
                name="publishedAt"
                value={form.publishedAt}
                onChange={handleChange}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Clear this to revert to draft.
              </p>
            </div>

            {submitError && <p className="text-sm text-red-600">{submitError}</p>}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-[#F5C857] text-[#4A3208] font-bold rounded-xl hover:bg-[#E9B83A] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Saving…' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/admin?view=news-management')}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
