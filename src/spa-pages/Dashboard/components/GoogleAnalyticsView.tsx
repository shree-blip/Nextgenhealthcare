import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp, Users, Globe, Search, RefreshCw, FileText,
  BarChart3, MousePointerClick,
  Eye, Zap, MapPin, Phone, Navigation, ExternalLink,
} from 'lucide-react';
import DashboardLoader from './DashboardLoader';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

interface GA4Row {
  date: string;
  activeUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  engagementRate: number;
  conversions: number;
  organicSessions: number;
  paidSessions: number;
  directSessions: number;
  referralSessions: number;
  socialSessions: number;
}

interface SCRow {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  topQueries?: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
  topPages?: { page: string; clicks: number; impressions: number; ctr: number; position: number }[];
}

interface GMBRow {
  date: string;
  views: number;
  discovery: number;
  directionRequests: number;
  phoneCalls: number;
  websiteClicks: number;
  messageCount: number;
  totalReviews: number;
  averageRating: number;
  newReviews: number;
}

interface GoogleAnalyticsViewProps {
  clinicId: string;
  isDark?: boolean;
  isClient?: boolean;
}

export default function GoogleAnalyticsView({ clinicId, isDark = false, isClient = false }: GoogleAnalyticsViewProps) {
  const [ga4Data, setGa4Data] = useState<GA4Row[]>([]);
  const [scData, setScData] = useState<SCRow[]>([]);
  const [gmbData, setGmbData] = useState<GMBRow[]>([]);
  const [ga4PropertyId, setGa4PropertyId] = useState<string | null>(null);
  const [searchConsoleSite, setSearchConsoleSite] = useState<string | null>(null);
  const [businessLocationId, setBusinessLocationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = isClient
        ? `/api/client/analytics-data?clinicId=${clinicId}&days=30`
        : `/api/admin/gmb/analytics-data?clinicId=${clinicId}&days=30`;
      const res = await fetch(endpoint);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setGa4Data(json.ga4Data || []);
      setScData(json.searchConsoleData || []);
      setGmbData(json.gmbData || []);
      setGa4PropertyId(json.ga4PropertyId);
      setSearchConsoleSite(json.searchConsoleSite);
      setBusinessLocationId(json.businessLocationId || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [clinicId, isClient]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-dismiss sync status after 6 seconds
  useEffect(() => {
    if (syncStatus) {
      const timer = setTimeout(() => setSyncStatus(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setSyncStatus(null);
      setError(null);

      // Sync both GBP and analytics data
      const syncPromises: Promise<Response>[] = [];

      syncPromises.push(
        fetch('/api/admin/gmb/sync-analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clinicId }),
        })
      );

      // Also sync GBP data
      syncPromises.push(
        fetch('/api/admin/gmb/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clinicId }),
        })
      );

      const results = await Promise.allSettled(syncPromises);

      // Check if analytics sync succeeded
      const analyticsResult = results[0];
      if (analyticsResult.status === 'fulfilled' && !analyticsResult.value.ok) {
        const errJson = await analyticsResult.value.json().catch(() => ({ error: 'Sync failed' }));
        throw new Error(errJson.error || 'Sync failed');
      }

      await fetchData();
      const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      setLastSyncTime(now);
      setSyncStatus({ type: 'success', message: `Data synced successfully at ${now}` });
    } catch (err: any) {
      setSyncStatus({ type: 'error', message: err.message || 'Sync failed. Please try again.' });
    } finally {
      setSyncing(false);
    }
  };

  if (!ga4PropertyId && !searchConsoleSite && !businessLocationId) {
    if (loading) {
      return (
        <div className={`rounded-2xl p-10 border text-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
            <DashboardLoader variant="inline" className="text-blue-500" />
          </div>
          <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Loading Google integration data...</p>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Checking connection status</p>
        </div>
      );
    }
    if (isClient) {
      return (
        <div className={`rounded-2xl p-10 border text-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Search className="h-8 w-8 text-blue-400" />
          </div>
          <p className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Google Analytics Not Connected</p>
          <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Your administrator hasn&apos;t connected Google Analytics or Search Console for this clinic yet. Once they&apos;ve configured the integration, your live analytics data will appear here automatically.
          </p>
        </div>
      );
    }
    return null;
  }

  if (loading) {
    return (
      <div className={`rounded-2xl p-10 border text-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
          <DashboardLoader variant="inline" className="text-emerald-500" />
        </div>
        <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Fetching analytics data...</p>
        <p className={`text-xs mt-1.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Pulling the latest data from Google — this may take a few seconds</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-2xl p-8 border text-center ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
        <div className="h-12 w-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <Zap className="h-6 w-6 text-red-500" />
        </div>
        <p className={`text-sm font-bold mb-1.5 ${isDark ? 'text-red-400' : 'text-red-700'}`}>Failed to load analytics data</p>
        <p className={`text-xs mb-4 max-w-sm mx-auto ${isDark ? 'text-red-400/70' : 'text-red-500'}`}>{error}</p>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  // Empty data state — integration is configured but no data yet
  if (ga4Data.length === 0 && scData.length === 0 && gmbData.length === 0) {
    return (
      <div className={`rounded-2xl p-10 border text-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <BarChart3 className="h-8 w-8 text-emerald-400" />
        </div>
        <p className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>No Data Yet</p>
        <p className={`text-sm max-w-md mx-auto leading-relaxed mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Your Google integration is configured but no analytics data has been synced yet. Click &quot;Sync Now&quot; to pull the latest data from Google, or wait for the next automatic sync.
        </p>
        {!isClient && (
          <button
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-60"
          >
            {syncing ? (
              <><DashboardLoader variant="inline" className="text-white" /> Syncing...</>
            ) : (
              <><RefreshCw className="h-4 w-4" /> Sync Now</>
            )}
          </button>
        )}
      </div>
    );
  }

  // ─── Compute summary stats ──────────────────────────
  const ga4Totals = ga4Data.reduce(
    (acc, d) => ({
      activeUsers: acc.activeUsers + d.activeUsers,
      sessions: acc.sessions + d.sessions,
      pageViews: acc.pageViews + d.pageViews,
      conversions: acc.conversions + d.conversions,
    }),
    { activeUsers: 0, sessions: 0, pageViews: 0, conversions: 0 },
  );

  const avgEngagement = ga4Data.length ? ga4Data.reduce((s, d) => s + d.engagementRate, 0) / ga4Data.length : 0;

  const scTotals = scData.reduce(
    (acc, d) => ({
      clicks: acc.clicks + d.clicks,
      impressions: acc.impressions + d.impressions,
    }),
    { clicks: 0, impressions: 0 },
  );
  const avgCtr = scTotals.impressions ? scTotals.clicks / scTotals.impressions : 0;
  const avgPosition = scData.length ? scData.reduce((s, d) => s + d.avgPosition, 0) / scData.length : 0;

  // GMB totals
  const gmbTotals = gmbData.reduce(
    (acc, d) => ({
      views: acc.views + d.views,
      phoneCalls: acc.phoneCalls + d.phoneCalls,
      directionRequests: acc.directionRequests + d.directionRequests,
      websiteClicks: acc.websiteClicks + d.websiteClicks,
    }),
    { views: 0, phoneCalls: 0, directionRequests: 0, websiteClicks: 0 },
  );

  // Traffic source pie data
  const trafficSources = [
    { name: 'Organic', value: ga4Data.reduce((s, d) => s + d.organicSessions, 0) },
    { name: 'Paid', value: ga4Data.reduce((s, d) => s + d.paidSessions, 0) },
    { name: 'Direct', value: ga4Data.reduce((s, d) => s + d.directSessions, 0) },
    { name: 'Referral', value: ga4Data.reduce((s, d) => s + d.referralSessions, 0) },
    { name: 'Social', value: ga4Data.reduce((s, d) => s + d.socialSessions, 0) },
  ].filter(s => s.value > 0);

  // Top blog pages from the latest SC row that has them
  const latestSCWithPages = [...scData].reverse().find(d => Array.isArray(d.topPages) && d.topPages.length > 0);
  const allPages = Array.isArray(latestSCWithPages?.topPages) ? latestSCWithPages.topPages : [];
  const topBlogs = allPages
    .filter((p: any) => p && typeof p === 'object' && typeof p.page === 'string')
    .filter((p: any) => {
      let path = p.page;
      try { path = new URL(p.page).pathname; } catch { /* keep full */ }
      return path.includes('/blog');
    })
    .slice(0, 5);

  // Format date for chart X axis
  const formatDate = (d: string) => {
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartGA4 = ga4Data.map(d => ({
    ...d,
    label: formatDate(d.date),
    bounceRate: Math.round(d.bounceRate * 100) / 100,
    engagementRate: Math.round(d.engagementRate * 100) / 100,
  }));

  const chartSC = scData.map(d => ({
    ...d,
    label: formatDate(d.date),
    ctrPct: Math.round(d.ctr * 10000) / 100,
  }));

  const chartGMB = gmbData.map(d => ({
    ...d,
    label: formatDate(d.date),
  }));

  const cardClass = `rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`;
  const headingClass = `text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`;
  const tooltipStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    borderRadius: '12px',
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Section header with sync controls */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Google Analytics, Search Console & Business Profile
            </h2>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {lastSyncTime ? `Last synced at ${lastSyncTime}` : '30-day performance overview'}
              {ga4PropertyId && <span className="mx-1.5">·</span>}
              {ga4PropertyId && <span className="font-medium">GA4</span>}
              {searchConsoleSite && <span className="mx-1.5">·</span>}
              {searchConsoleSite && <span className="font-medium">Search Console</span>}
              {businessLocationId && <span className="mx-1.5">·</span>}
              {businessLocationId && <span className="font-medium">Business Profile</span>}
            </p>
          </div>
          {!isClient && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                syncing
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md'
              } disabled:opacity-70`}
            >
              {syncing ? (
                <><DashboardLoader variant="inline" className="text-blue-500 dark:text-blue-400" /> Syncing...</>
              ) : (
                <><RefreshCw className="h-4 w-4" /> Sync Now</>
              )}
            </button>
          )}
        </div>

        {/* Sync status banner */}
        {syncStatus && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium ${
              syncStatus.type === 'success'
                ? `bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`
                : `bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 ${isDark ? 'text-red-400' : 'text-red-700'}`
            }`}
          >
            {syncStatus.type === 'success' ? (
              <span className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">✓</span>
            ) : (
              <span className="h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs shrink-0">!</span>
            )}
            {syncStatus.message}
          </motion.div>
        )}

        {/* Syncing progress bar */}
        {syncing && (
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '90%' }}
              transition={{ duration: 8, ease: 'easeOut' }}
            />
          </div>
        )}
      </div>

      {/* ═══ KPI Cards ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard icon={<Users className="h-8 w-8 text-emerald-500" />} label="Active Users" value={ga4Totals.activeUsers.toLocaleString()} accent="emerald" isDark={isDark} />
        <KPICard icon={<Eye className="h-8 w-8 text-blue-500" />} label="Page Views" value={ga4Totals.pageViews.toLocaleString()} accent="blue" isDark={isDark} />
        <KPICard icon={<MousePointerClick className="h-8 w-8 text-amber-500" />} label="SC Clicks" value={scTotals.clicks.toLocaleString()} accent="amber" isDark={isDark} />
        <KPICard icon={<Search className="h-8 w-8 text-purple-500" />} label="Avg Position" value={avgPosition.toFixed(1)} accent="purple" isDark={isDark} />
      </div>

      {/* ═══ GMB KPI Cards ═══ */}
      {gmbData.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard icon={<MapPin className="h-8 w-8 text-rose-500" />} label="Profile Views" value={gmbTotals.views.toLocaleString()} accent="rose" isDark={isDark} />
          <KPICard icon={<Phone className="h-8 w-8 text-teal-500" />} label="Phone Calls" value={gmbTotals.phoneCalls.toLocaleString()} accent="teal" isDark={isDark} />
          <KPICard icon={<Navigation className="h-8 w-8 text-indigo-500" />} label="Direction Requests" value={gmbTotals.directionRequests.toLocaleString()} accent="indigo" isDark={isDark} />
          <KPICard icon={<ExternalLink className="h-8 w-8 text-cyan-500" />} label="Website Clicks" value={gmbTotals.websiteClicks.toLocaleString()} accent="cyan" isDark={isDark} />
        </div>
      )}

      {/* ═══ GA4 Users & Sessions Line Chart ═══ */}
      {ga4Data.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClass}>
          <h3 className={headingClass}>
            <TrendingUp className="inline h-5 w-5 mr-2 text-emerald-500" />
            Users & Sessions (GA4)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartGA4}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="label" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line type="monotone" dataKey="activeUsers" name="Active Users" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
              <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
              <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* ═══ Engagement & Bounce Rate ═══ */}
      {ga4Data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClass}>
            <h3 className={headingClass}>
              <Zap className="inline h-5 w-5 mr-2 text-amber-500" />
              Engagement Rate
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartGA4}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="label" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} />
                <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="engagementRate" name="Engagement" fill="#10b98133" stroke="#10b981" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <p className={`text-center text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Avg: {(avgEngagement * 100).toFixed(1)}%
            </p>
          </motion.div>

          {/* Traffic Sources Pie */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className={cardClass}>
            <h3 className={headingClass}>
              <Globe className="inline h-5 w-5 mr-2 text-blue-500" />
              Traffic Sources
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {trafficSources.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {/* ═══ Search Console Performance ═══ */}
      {scData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={cardClass}>
          <h3 className={headingClass}>
            <Search className="inline h-5 w-5 mr-2 text-purple-500" />
            Search Console Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MiniStat label="Total Clicks" value={scTotals.clicks.toLocaleString()} isDark={isDark} />
            <MiniStat label="Total Impressions" value={scTotals.impressions.toLocaleString()} isDark={isDark} />
            <MiniStat label="Avg CTR" value={`${(avgCtr * 100).toFixed(2)}%`} isDark={isDark} />
            <MiniStat label="Avg Position" value={avgPosition.toFixed(1)} isDark={isDark} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartSC}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="label" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} />
              <YAxis yAxisId="left" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <YAxis yAxisId="right" orientation="right" stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar yAxisId="left" dataKey="clicks" name="Clicks" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="left" dataKey="impressions" name="Impressions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="avgPosition" name="Avg Position" stroke="#ef4444" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* ═══ Google Business Profile Performance ═══ */}
      {gmbData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={cardClass}>
          <h3 className={headingClass}>
            <MapPin className="inline h-5 w-5 mr-2 text-rose-500" />
            Google Business Profile Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MiniStat label="Profile Views" value={gmbTotals.views.toLocaleString()} isDark={isDark} />
            <MiniStat label="Phone Calls" value={gmbTotals.phoneCalls.toLocaleString()} isDark={isDark} />
            <MiniStat label="Direction Requests" value={gmbTotals.directionRequests.toLocaleString()} isDark={isDark} />
            <MiniStat label="Website Clicks" value={gmbTotals.websiteClicks.toLocaleString()} isDark={isDark} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartGMB}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
              <XAxis dataKey="label" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={12} />
              <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="views" name="Profile Views" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="websiteClicks" name="Website Clicks" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              <Bar dataKey="phoneCalls" name="Phone Calls" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="directionRequests" name="Directions" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* ═══ Top Blogs Visited ═══ */}
      {topBlogs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className={cardClass}>
          <h3 className={headingClass}>
            <FileText className="inline h-5 w-5 mr-2 text-emerald-500" />
            Top Blogs Visited
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={isDark ? 'text-slate-400 border-b border-slate-700' : 'text-slate-500 border-b border-slate-200'}>
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Blog Page</th>
                  <th className="text-right py-3 px-2">Clicks</th>
                  <th className="text-right py-3 px-2">Impressions</th>
                </tr>
              </thead>
              <tbody>
                {topBlogs.map((p: any, i) => {
                  const rawPage = typeof p.page === 'string' ? p.page : '';
                  let displayUrl = rawPage;
                  try { displayUrl = new URL(rawPage).pathname; } catch { /* keep full */ }
                  const blogTitle = displayUrl
                    .replace(/^\/blog\//, '')
                    .replace(/\/$/, '')
                    .split('-')
                    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ') || displayUrl;
                  return (
                    <tr key={i} className={`${isDark ? 'border-b border-slate-700/50 hover:bg-slate-700/30' : 'border-b border-slate-100 hover:bg-slate-50'} transition`}>
                      <td className={`py-2 px-2 font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{i + 1}</td>
                      <td className={`py-2 px-2 font-medium truncate max-w-xs ${isDark ? 'text-white' : 'text-slate-900'}`} title={rawPage}>{blogTitle}</td>
                      <td className="py-2 px-2 text-right text-emerald-500 font-semibold">{p.clicks?.toLocaleString()}</td>
                      <td className={`py-2 px-2 text-right ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{p.impressions?.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {ga4Data.length === 0 && scData.length === 0 && gmbData.length === 0 && (
        <div className={`rounded-2xl p-10 border text-center ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-7 w-7 text-slate-400" />
          </div>
          <p className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>No analytics data yet</p>
          <p className={`text-sm mb-4 max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {isClient
              ? 'Analytics data has not been synced yet. Your administrator will sync the data shortly.'
              : 'Click "Sync Now" above to fetch the latest data from Google Analytics & Search Console.'
            }
          </p>
          {!isClient && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold disabled:opacity-50 transition-colors"
            >
              {syncing ? <><DashboardLoader variant="inline" className="text-white" /> Syncing...</> : <><RefreshCw className="h-4 w-4" /> Sync Now</>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────── */

function KPICard({ icon, label, value, accent, isDark }: {
  icon: React.ReactNode; label: string; value: string; accent: string; isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-5 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
    >
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          isDark ? `bg-${accent}-900/30 text-${accent}-400` : `bg-${accent}-100 text-${accent}-600`
        }`}>
          30d
        </span>
      </div>
      <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
      <p className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}</p>
    </motion.div>
  );
}

function MiniStat({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <div className={`rounded-xl p-3 ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
      <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}
