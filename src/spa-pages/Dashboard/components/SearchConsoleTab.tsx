import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Search, Globe, RefreshCw, FileText,
  Target, BarChart3, MousePointerClick,
} from 'lucide-react';
import GoogleDataProgressLoader from './GoogleDataProgressLoader';

interface SCRow {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  topQueries?: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  topPages?: { page: string; clicks: number; impressions: number; ctr: number; position: number }[];
}

type Period = '7d' | '30d' | '90d' | '365d';
const PERIOD_OPTIONS: { value: Period; label: string; short: string }[] = [
  { value: '7d', label: 'Last 7 days', short: '7D' },
  { value: '30d', label: 'Last 30 days', short: '30D' },
  { value: '90d', label: 'Last 90 days', short: '90D' },
  { value: '365d', label: 'Last year', short: '1Y' },
];

interface SearchConsoleTabProps { clinicId: string; isDark?: boolean; }

export default function SearchConsoleTab({ clinicId, isDark = false }: SearchConsoleTabProps) {
  const [data, setData] = useState<SCRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('30d');
  const [searchConsoleSite, setSearchConsoleSite] = useState<string | null>(null);

  const fetchData = useCallback(async (forceSync = false) => {
    try {
      if (forceSync) setSyncing(true); else setLoading(true);
      setError(null);
      const days = parseInt(period);
      const syncParam = forceSync ? '&sync=1' : '';
      const res = await fetch(`/api/client/analytics-data?clinicId=${clinicId}&days=${days}${syncParam}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json.searchConsoleData || []);
      setSearchConsoleSite(json.searchConsoleSite);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, [clinicId, period]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Not connected
  if (!searchConsoleSite && !loading) {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40 dark:from-slate-800 dark:via-slate-800 dark:to-purple-950/20 p-14 text-center shadow-sm">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-purple-200/20 to-indigo-200/10 blur-3xl" />
        <div className="relative z-10">
          <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-400 to-indigo-500 p-[2px] shadow-lg shadow-purple-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white dark:bg-slate-800">
              <Globe className="h-9 w-9 text-purple-500" />
            </div>
          </div>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Search Console Not Connected</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Your administrator hasn&apos;t connected a Search Console site for this clinic yet.
          </p>
        </div>
      </motion.div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="space-y-5">
        <GoogleDataProgressLoader isLoading={true} isDark={isDark} />
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-red-200 dark:border-red-800/50 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/10 p-8 text-center">
        <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">Failed to load Search Console data</p>
        <p className="text-xs text-red-500/80 dark:text-red-400/60 mb-5">{error}</p>
        <button onClick={() => fetchData()} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all active:scale-95">
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </motion.div>
    );
  }

  // No data
  if (data.length === 0) {
    return (
      <div className="space-y-5">
        <PeriodSelector period={period} onChange={setPeriod} isDark={isDark} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-14 text-center">
          <BarChart3 className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Search Console Data Yet</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            No data synced for this period. Click <strong>Refresh</strong> or check back soon.
          </p>
        </motion.div>
      </div>
    );
  }

  // Summaries
  const totals = data.reduce((acc, d) => ({ clicks: acc.clicks + d.clicks, impressions: acc.impressions + d.impressions }), { clicks: 0, impressions: 0 });
  const avgCtr = totals.impressions ? totals.clicks / totals.impressions : 0;
  const avgPosition = data.reduce((s, d) => s + d.avgPosition, 0) / data.length;
  const latestWithPages = [...data].reverse().find(d => d.topPages && (d.topPages as any[]).length > 0);
  const allPages: any[] = (latestWithPages?.topPages as any[]) || [];
  // Filter to blog pages only (top 5)
  const topBlogs = allPages
    .filter((p: any) => {
      let path = p.page;
      try { path = new URL(p.page).pathname; } catch { /* keep full */ }
      return path.includes('/blog');
    })
    .slice(0, 5);

  const formatDate = (d: string) => {
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  const chartData = data.map(d => ({ ...d, label: formatDate(d.date), ctrPct: Math.round(d.ctr * 10000) / 100 }));

  const glassCard = `rounded-3xl p-6 border backdrop-blur-sm shadow-sm ${isDark ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white/80 border-slate-200/60'}`;
  const headingClass = `text-[15px] font-bold mb-5 flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`;
  const tooltipStyle = { backgroundColor: isDark ? '#0f172a' : '#ffffff', border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', padding: '12px 16px' };

  const kpis = [
    { label: 'Total Clicks', value: totals.clicks.toLocaleString(), icon: <MousePointerClick className="h-5 w-5" />, color: 'emerald' },
    { label: 'Impressions', value: totals.impressions.toLocaleString(), icon: <Search className="h-5 w-5" />, color: 'blue' },
    { label: 'Avg CTR', value: `${(avgCtr * 100).toFixed(2)}%`, icon: <Target className="h-5 w-5" />, color: 'amber' },
    { label: 'Avg Position', value: avgPosition.toFixed(1), icon: <Target className="h-5 w-5" />, color: 'purple' },
  ];

  const iconColor: Record<string, string> = { emerald: 'text-emerald-500', blue: 'text-blue-500', amber: 'text-amber-500', purple: 'text-purple-500' };
  const iconBg: Record<string, string> = { emerald: 'bg-emerald-500/10', blue: 'bg-blue-500/10', amber: 'bg-amber-500/10', purple: 'bg-purple-500/10' };
  const gradBg: Record<string, string> = { emerald: 'from-emerald-500/10 to-emerald-500/5', blue: 'from-blue-500/10 to-blue-500/5', amber: 'from-amber-500/10 to-amber-500/5', purple: 'from-purple-500/10 to-purple-500/5' };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Search Console</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{searchConsoleSite || 'Google Search Console performance'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => fetchData(true)} disabled={syncing} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md disabled:opacity-50 active:scale-95">
            <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Refresh'}
          </button>
          <PeriodSelector period={period} onChange={setPeriod} isDark={isDark} />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className={`relative overflow-hidden rounded-2xl p-4 border backdrop-blur-sm group hover:shadow-lg transition-all ${isDark ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white/80 border-slate-200/60'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradBg[kpi.color]} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${iconBg[kpi.color]} mb-3`}>
                <span className={iconColor[kpi.color]}>{kpi.icon}</span>
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white mb-0.5">{kpi.value}</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{kpi.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Clicks & Impressions BarChart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={glassCard}>
        <h3 className={headingClass}><div className="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center"><Search className="h-4 w-4 text-purple-500" /></div>Clicks & Impressions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#f1f5f9'} />
            <XAxis dataKey="label" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
            <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar yAxisId="left" dataKey="impressions" name="Impressions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Avg Position LineChart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={glassCard}>
        <h3 className={headingClass}><div className="h-8 w-8 rounded-xl bg-amber-500/10 flex items-center justify-center"><Target className="h-4 w-4 text-amber-500" /></div>Average Position <span className="text-xs font-normal text-slate-400 ml-1">(lower is better)</span></h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#f1f5f9'} />
            <XAxis dataKey="label" stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
            <YAxis reversed stroke={isDark ? '#64748b' : '#94a3b8'} fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="avgPosition" name="Avg Position" stroke="#f59e0b" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Blogs Visited */}
      {topBlogs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={glassCard}>
          <h3 className={headingClass}><div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center"><FileText className="h-4 w-4 text-emerald-500" /></div>Top Blogs Visited</h3>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className={`text-[11px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  <th className="text-left py-3 px-3 font-semibold">#</th>
                  <th className="text-left py-3 px-3 font-semibold">Blog Page</th>
                  <th className="text-right py-3 px-3 font-semibold">Clicks</th>
                  <th className="text-right py-3 px-3 font-semibold">Impressions</th>
                </tr>
              </thead>
              <tbody>
                {topBlogs.map((p: any, i: number) => {
                  let displayUrl = p.page;
                  try { displayUrl = new URL(p.page).pathname; } catch { /* keep full */ }
                  // Prettify blog path — strip '/blog/' prefix and trailing slash, replace hyphens
                  const blogTitle = displayUrl
                    .replace(/^\/blog\//, '')
                    .replace(/\/$/, '')
                    .split('-')
                    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ') || displayUrl;
                  return (
                    <tr key={i} className={`group transition-colors ${i % 2 === 0 ? (isDark ? 'bg-slate-900/30' : 'bg-slate-50/50') : ''} ${isDark ? 'hover:bg-slate-700/40' : 'hover:bg-slate-100/60'}`}>
                      <td className={`py-3 px-3 font-mono text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{i + 1}</td>
                      <td className={`py-3 px-3 font-semibold truncate max-w-xs ${isDark ? 'text-white' : 'text-slate-900'}`} title={p.page}>{blogTitle}</td>
                      <td className="py-3 px-3 text-right"><span className="font-bold text-emerald-500">{p.clicks?.toLocaleString()}</span></td>
                      <td className={`py-3 px-3 text-right ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{p.impressions?.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* Period Selector */
function PeriodSelector({ period, onChange }: { period: Period; onChange: (p: Period) => void; isDark: boolean }) {
  return (
    <div className="inline-flex items-center gap-0.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
      {PERIOD_OPTIONS.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            period === opt.value
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm shadow-black/5'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}>
          <span className="hidden sm:inline">{opt.label}</span>
          <span className="sm:hidden">{opt.short}</span>
        </button>
      ))}
    </div>
  );
}
