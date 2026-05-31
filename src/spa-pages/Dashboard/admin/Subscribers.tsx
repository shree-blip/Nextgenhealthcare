import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  subscribedAt: string;
  active: boolean;
  source: string | null;
}

export default function NewsletterSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter');
      const data = await response.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-scope min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard/admin"
            className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Newsletter Subscribers</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage your email subscribers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Subscribers</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{subscribers.length}</p>
              </div>
              <Mail className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-3xl font-black text-emerald-600 mt-1">
                  {subscribers.filter(s => s.active).length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Inactive</p>
                <p className="text-3xl font-black text-slate-400 mt-1">
                  {subscribers.filter(s => !s.active).length}
                </p>
              </div>
              <XCircle className="h-12 w-12 text-slate-400" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">Loading subscribers...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700">
            <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400">No subscribers yet</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Source</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Subscribed</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-900 dark:text-white">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                        {subscriber.source || 'unknown'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="h-4 w-4" />
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {subscriber.active ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white">
                          <XCircle className="h-3 w-3" />
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
