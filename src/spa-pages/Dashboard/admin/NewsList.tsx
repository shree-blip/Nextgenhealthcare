import { Link } from 'react-router-dom';
import { ArrowLeft, Newspaper } from 'lucide-react';

export default function AdminNewsListPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        <Link to="/dashboard/admin" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Admin Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="h-7 w-7 text-amber-500" />
          <h1 className="text-3xl font-bold">News Management</h1>
        </div>
        <div className="rounded-3xl p-10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center">
          <p className="text-lg font-extrabold mb-2">News CMS not configured</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Backend <code className="font-mono text-xs">/api/admin/news</code> is stubbed. The full news editor will follow once you decide whether news content lives in this backend or a separate CMS.
          </p>
        </div>
      </div>
    </div>
  );
}
