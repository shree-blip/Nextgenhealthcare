import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  Save,
  Check,
  Copy,
  X,
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
/* ── Shared input class names ────────────────────────────── */
export const inputCls =
  'w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2.5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors';

export const labelCls =
  'block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300';

/* ── Card wrapper ────────────────────────────────────────── */
export function Card({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 ${className}`}
    >
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ── CharCounter ─────────────────────────────────────────── */
function CharCounter({ value, max }: { value: string; max: number }) {
  const len = value.length;
  const color =
    len > max
      ? 'text-red-500'
      : len > max * 0.85
        ? 'text-amber-500 dark:text-amber-400'
        : 'text-slate-400 dark:text-slate-500';
  return (
    <span className={`text-xs tabular-nums ${color}`}>
      {len}/{max}
    </span>
  );
}

/* ── CoverImageCard ──────────────────────────────────────── */
export function CoverImageCard({
  url,
  alt,
  uploading,
  onUrlChange,
  onAltChange,
  onUpload,
  onRemove,
}: {
  url: string;
  alt: string;
  uploading: boolean;
  onUrlChange: (v: string) => void;
  onAltChange: (v: string) => void;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const truncatedUrl =
    url.length > 60 ? url.slice(0, 30) + '…' + url.slice(-25) : url;

  return (
    <Card title="Cover Image">
      <div className="space-y-4">
        {/* URL row */}
        <div className="flex gap-2 items-center">
          <input
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className={`${inputCls} flex-1 font-mono text-sm`}
            placeholder="Image URL or upload below"
          />
          {url && (
            <button
              type="button"
              onClick={copyUrl}
              title="Copy URL"
              className="shrink-0 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              if (fileRef.current) fileRef.current.value = '';
            }}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        </div>

        {/* ALT text */}
        <div>
          <label className={labelCls}>ALT Text</label>
          <input
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            className={inputCls}
            placeholder="Describe the image (auto-generated from title)"
          />
        </div>

        {/* Preview */}
        {url && (
          <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <img
              src={url}
              alt={alt}
              className="w-full max-h-64 object-cover"
            />
            {/* Overlay controls */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-start justify-end p-3">
              <button
                type="button"
                onClick={onRemove}
                className="p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove cover image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            {/* Truncated URL + ALT badge */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white/90 font-mono truncate">
                {truncatedUrl}
              </p>
              <p className="text-xs text-white/70 mt-0.5 truncate">
                ALT: {alt}
              </p>
            </div>
          </div>
        )}

        {uploading && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            Uploading and saving…
          </div>
        )}
      </div>
    </Card>
  );
}

/* ── SEO Card ────────────────────────────────────────────── */
export function SEOCard({
  seoTitle,
  metaDesc,
  canonical,
  onSeoTitleChange,
  onMetaDescChange,
  onCanonicalChange,
}: {
  seoTitle: string;
  metaDesc: string;
  canonical: string;
  onSeoTitleChange: (v: string) => void;
  onMetaDescChange: (v: string) => void;
  onCanonicalChange: (v: string) => void;
}) {
  return (
    <Card title="SEO Settings">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between">
              <label className={labelCls}>SEO Title</label>
              <CharCounter value={seoTitle} max={60} />
            </div>
            <input
              value={seoTitle}
              onChange={(e) => onSeoTitleChange(e.target.value)}
              className={inputCls}
              placeholder="SEO optimized title"
            />
          </div>
          <div>
            <label className={labelCls}>Canonical URL</label>
            <input
              value={canonical}
              onChange={(e) => onCanonicalChange(e.target.value)}
              className={inputCls}
              placeholder="https://…"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className={labelCls}>Meta Description</label>
            <CharCounter value={metaDesc} max={160} />
          </div>
          <textarea
            value={metaDesc}
            onChange={(e) => onMetaDescChange(e.target.value)}
            className={`${inputCls} resize-none`}
            rows={2}
            placeholder="Brief description for search engines (150-160 chars)"
          />
        </div>
      </div>
    </Card>
  );
}

/* ── ContentEditorCard ───────────────────────────────────── */
export function ContentEditorCard({
  content,
  onChange,
  placeholder,
  blogTitle,
}: {
  content: string;
  onChange: (v: string) => void;
  placeholder?: string;
  blogTitle?: string;
}) {
  return (
    <Card title="Content">
      <RichTextEditor
        value={content}
        onChange={onChange}
        placeholder={placeholder || 'Start writing…'}
        minHeight="400px"
        blogTitle={blogTitle}
      />
    </Card>
  );
}

/* ── PublishDateCard ─────────────────────────────────────── */
export function PublishDateCard({
  publishedAt,
  onDateChange,
}: {
  publishedAt: string;
  onDateChange: (date: string) => void;
}) {
  const isPublished = !!publishedAt;
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Not published yet';

  return (
    <Card title="Publish Status">
      <div className="space-y-3">
        <div>
          <label className={labelCls}>Publication Date</label>
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => onDateChange(e.target.value)}
            className={inputCls}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isPublished ? `Published on ${formattedDate}` : formattedDate}
          </p>
        </div>
        {isPublished && (
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-medium text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Published
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

/* ── PageHeader ──────────────────────────────────────────── */
export function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel,
  isPublished,
  saving,
  onSave,
  onPublish,
  onCancel,
}: {
  title: string;
  subtitle: string;
  backHref: string;
  backLabel: string;
  isPublished: boolean;
  saving: boolean;
  onSave: () => void;
  onPublish?: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="sticky top-20 z-40 bg-slate-50 dark:bg-slate-950 py-4 mb-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      {/* Left: back + title */}
      <div className="flex items-center gap-3">
        <Link to={backHref}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: status + actions */}
      <div className="flex items-center gap-2">
        {isPublished && (
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg font-medium text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            Published
          </span>
        )}
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving…' : 'Save'}
        </button>
        {onPublish && !isPublished && (
          <button
            type="button"
            onClick={onPublish}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            <Check className="h-4 w-4" />
            Publish
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── EditPostShell — outer chrome (Navbar + centered container + Footer) */
export function EditPostShell({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <>
        
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <div className="text-slate-600 dark:text-slate-400">Loading…</div>
        </div>
        
      </>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 pt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      
    </>
  );
}
