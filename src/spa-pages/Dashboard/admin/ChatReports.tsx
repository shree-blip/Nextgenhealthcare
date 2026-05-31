import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: number;
  role: string;
  content: string;
  createdAt: string;
}

interface ChatSessionReport {
  id: string;
  sessionKey: string;
  visitorId: string | null;
  language: string | null;
  startedAt: string;
  lastMessageAt: string;
  summary: string | null;
  report: string | null;
  totalMessages: number;
  messages: ChatMessage[];
}

export default function AdminChatReportsPage() {
  const [sessions, setSessions] = useState<ChatSessionReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/chat-reports')
      .then((res) => res.json())
      .then((data) => {
        setSessions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totals = useMemo(() => {
    const totalSessions = sessions.length;
    const totalMessages = sessions.reduce((acc, session) => acc + session.totalMessages, 0);
    const recentSessions = sessions.filter((session) => {
      const last = new Date(session.lastMessageAt).getTime();
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
      return last >= oneDayAgo;
    }).length;

    return { totalSessions, totalMessages, recentSessions };
  }, [sessions]);

  return (
    <div className="dashboard-scope min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Chat Conversation Reports</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track visitor conversations, timestamps, and AI-generated summaries</p>
          </div>
          <Link to="/dashboard/admin" className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-500 transition-all">
            ← Back to Admin
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Sessions" value={totals.totalSessions.toString()} />
          <StatCard label="Messages Logged" value={totals.totalMessages.toString()} />
          <StatCard label="Sessions (24h)" value={totals.recentSessions.toString()} />
        </div>

        {loading ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-slate-500 dark:text-slate-400">Loading chat reports...</div>
        ) : sessions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-slate-500 dark:text-slate-400">No chatbot conversations recorded yet.</div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => {
              const isExpanded = expandedSessionId === session.id;
              return (
                <article key={session.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                  <button
                    className="w-full text-left p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Session {session.sessionKey.slice(0, 12)}...</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {new Date(session.startedAt).toLocaleString()} · Last activity {new Date(session.lastMessageAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{session.summary || 'No summary generated yet.'}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white">{session.language || 'en'}</span>
                        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">{session.totalMessages} messages</span>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-slate-200 dark:border-slate-700 p-5 space-y-5">
                      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Admin Report</h3>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{session.report || 'No report generated yet.'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Visitor ID: {session.visitorId || 'anonymous'}</p>
                      </div>

                      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                        {session.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`rounded-xl p-3 border ${
                              message.role === 'user'
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">{message.role}</span>
                              <time className="text-xs text-slate-500 dark:text-slate-400">{new Date(message.createdAt).toLocaleString()}</time>
                            </div>
                            <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}
