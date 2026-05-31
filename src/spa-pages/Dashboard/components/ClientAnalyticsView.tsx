import { useState, useEffect, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Building2, TrendingUp, Users, Globe, MousePointerClick, Eye, BarChart3, Search, DollarSign } from 'lucide-react';
import DashboardLoader from './DashboardLoader';
import AnalyticsDateFilter, { type DateRange, type FilterPreset } from './AnalyticsDateFilter';
import { useSitePreferences } from './SitePreferencesProvider';

// ── Types ─────────────────────────────────────────────────────────────────────
interface WeeklyAnalytics {
  id: string;
  clinicId: string;
  weekLabel: string;
  year: number;
  month: number;
  weekNumber: number;
  socialPosts: number;
  socialViews: number;
  patientCount: number;
  digitalConversion: number;
  conversionRate: number;
  dailyPatientAvg: number;
}

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
  topQueries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[] | null;
  topPages: { page: string; clicks: number; impressions: number; ctr: number; position: number }[] | null;
}

interface GBPRow {
  date: string;
  views: number;
  phoneCalls: number;
  websiteClicks: number;
  directionRequests: number;
}

interface GoogleAdsRow {
  date: string;
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  avgCpc: number;
  costPerConversion: number;
}

interface ClientAnalyticsViewProps {
  refreshTrigger?: number;
  isAdmin?: boolean;
  onLoadingStateChange?: (loading: boolean) => void;
}

const TRAFFIC_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

/** Compute the Monday of a given ISO week number */
function getWeekStartDate(year: number, weekNumber: number): Date {
  // Jan 4 always falls in ISO week 1
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7; // Mon=1..Sun=7
  const isoWeek1Monday = new Date(jan4);
  isoWeek1Monday.setDate(jan4.getDate() - dayOfWeek + 1);
  const monday = new Date(isoWeek1Monday);
  monday.setDate(isoWeek1Monday.getDate() + (weekNumber - 1) * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export default function ClientAnalyticsView({ refreshTrigger, isAdmin = false, onLoadingStateChange }: ClientAnalyticsViewProps) {
  const { theme } = useSitePreferences();
  const isDark = theme === 'dark';

  const [analytics, setAnalytics] = useState<WeeklyAnalytics[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Google data from DB
  const [ga4Data, setGa4Data] = useState<GA4Row[]>([]);
  const [scData, setScData] = useState<SCRow[]>([]);
  const [gbpData, setGbpData] = useState<GBPRow[]>([]);
  const [adsData, setAdsData] = useState<GoogleAdsRow[]>([]);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Date filter state
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    const start = new Date(monday);
    start.setDate(monday.getDate() - 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
  });
  const [filterPreset, setFilterPreset] = useState<FilterPreset>('last_week');

  const handleFilterChange = useCallback((range: DateRange, preset: FilterPreset) => {
    setDateRange(range);
    setFilterPreset(preset);
  }, []);

  useEffect(() => { onLoadingStateChange?.(loading); }, [loading, onLoadingStateChange]);

  // Fetch clinics
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const endpoint = isAdmin ? '/api/admin/clinics' : '/api/auth/me';
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        let clinicList: any[] = [];
        if (isAdmin) {
          clinicList = data.clinics || [];
        } else {
          const userId = data.id;
          const assignRes = await fetch(`/api/client/clinics?userId=${userId}`);
          if (assignRes.ok) { clinicList = (await assignRes.json()).clinics || []; }
        }
        setClinics(clinicList);
        if (clinicList.length > 0) setSelectedClinic(clinicList[0].id);
      } catch (err) { console.error('Failed to fetch clinics:', err); }
    };
    fetchClinics();
  }, [isAdmin]);

  // Fetch weekly analytics
  useEffect(() => {
    if (!selectedClinic) return;
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/analytics/weekly?clinicId=${selectedClinic}`);
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        const records = (data.analytics || []) as WeeklyAnalytics[];
        records.sort((a, b) => a.year !== b.year ? a.year - b.year : a.weekNumber - b.weekNumber);
        setAnalytics(records);
      } catch { setAnalytics([]); }
      finally { setLoading(false); }
    };
    fetchAnalytics();
  }, [selectedClinic, refreshTrigger]);

  // Fetch Google Analytics (GA4 + Search Console + GBP) data from DB
  useEffect(() => {
    if (!selectedClinic) return;
    const fetchGoogleData = async () => {
      setGoogleLoading(true);
      try {
        const apiBase = isAdmin ? '/api/admin/gmb/analytics-data' : '/api/client/analytics-data';
        const params = new URLSearchParams({
          clinicId: selectedClinic,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        });
        const res = await fetch(`${apiBase}?${params.toString()}`);
        if (!res.ok) { setGa4Data([]); setScData([]); setGbpData([]); setAdsData([]); return; }
        const json = await res.json();
        setGa4Data(json.ga4Data || []);
        setScData(json.searchConsoleData || []);
        setGbpData(json.gmbData || []);
        setAdsData(json.googleAdsData || []);
      } catch { setGa4Data([]); setScData([]); setGbpData([]); setAdsData([]); }
      finally { setGoogleLoading(false); }
    };
    fetchGoogleData();
  }, [selectedClinic, refreshTrigger, isAdmin, dateRange]);

  // Theme-aware chart styles
  const tooltipStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    borderRadius: '12px',
    color: isDark ? '#e2e8f0' : '#334155',
  };
  const axisStroke = isDark ? '#94a3b8' : '#64748b';
  const gridStroke = isDark ? '#334155' : '#e2e8f0';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <DashboardLoader variant="page" label="Loading analytics..." className="text-emerald-500" />
      </div>
    );
  }

  if (clinics.length === 0) {
    return (
      <div className="rounded-2xl p-8 border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
        <Building2 className="h-12 w-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No Clinics Assigned</h3>
        <p className="text-slate-500 dark:text-slate-400">Please contact your admin to assign clinics to your account.</p>
      </div>
    );
  }

  // ── Filter weekly analytics by selected date range ──────────────────────────
  const filteredAnalytics = analytics.filter(week => {
    const weekStart = getWeekStartDate(week.year, week.weekNumber);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    const rangeStart = new Date(dateRange.startDate + 'T00:00:00');
    const rangeEnd = new Date(dateRange.endDate + 'T23:59:59');
    // Include week if it overlaps the selected range
    return weekStart <= rangeEnd && weekEnd >= rangeStart;
  });

  // ── GA4 Aggregates ──────────────────────────────────────────────────────────
  const ga4Summary = ga4Data.length > 0 ? {
    totalUsers: ga4Data.reduce((s, d) => s + d.activeUsers, 0),
    totalSessions: ga4Data.reduce((s, d) => s + d.sessions, 0),
    totalPageViews: ga4Data.reduce((s, d) => s + d.pageViews, 0),
    avgBounceRate: +(ga4Data.reduce((s, d) => s + d.bounceRate, 0) / ga4Data.length).toFixed(1),
    avgEngagement: +(ga4Data.reduce((s, d) => s + d.engagementRate, 0) / ga4Data.length).toFixed(1),
    totalConversions: ga4Data.reduce((s, d) => s + d.conversions, 0),
    newUsers: ga4Data.reduce((s, d) => s + d.newUsers, 0),
  } : null;

  // GA4 traffic sources aggregated
  const trafficSources = ga4Data.length > 0 ? [
    { name: 'Organic', value: ga4Data.reduce((s, d) => s + d.organicSessions, 0) },
    { name: 'Direct', value: ga4Data.reduce((s, d) => s + d.directSessions, 0) },
    { name: 'Paid', value: ga4Data.reduce((s, d) => s + d.paidSessions, 0) },
    { name: 'Referral', value: ga4Data.reduce((s, d) => s + d.referralSessions, 0) },
    { name: 'Social', value: ga4Data.reduce((s, d) => s + d.socialSessions, 0) },
  ].filter(s => s.value > 0) : [];

  // SC aggregates
  const scSummary = scData.length > 0 ? {
    totalClicks: scData.reduce((s, d) => s + d.clicks, 0),
    totalImpressions: scData.reduce((s, d) => s + d.impressions, 0),
    avgPosition: +(scData.reduce((s, d) => s + d.avgPosition, 0) / scData.length).toFixed(1),
    avgCTR: +(scData.reduce((s, d) => s + d.ctr, 0) / scData.length * 100).toFixed(2),
  } : null;

  // Top pages — merge from recent SC data entries that carry topPages
  const allTopPages: { page: string; clicks: number; impressions: number; position: number }[] = [];
  for (const row of scData) {
    if (Array.isArray(row.topPages)) {
      for (const p of row.topPages) {
        const existing = allTopPages.find(x => x.page === p.page);
        if (existing) { existing.clicks += p.clicks; existing.impressions += p.impressions; }
        else allTopPages.push({ page: p.page, clicks: p.clicks, impressions: p.impressions, position: p.position });
      }
    }
  }
  allTopPages.sort((a, b) => b.clicks - a.clicks);
  const topPages = allTopPages.slice(0, 10);

  // Top queries
  const allTopQueries: { query: string; clicks: number; impressions: number; position: number }[] = [];
  for (const row of scData) {
    if (Array.isArray(row.topQueries)) {
      for (const q of row.topQueries) {
        const existing = allTopQueries.find(x => x.query === q.query);
        if (existing) { existing.clicks += q.clicks; existing.impressions += q.impressions; }
        else allTopQueries.push({ query: q.query, clicks: q.clicks, impressions: q.impressions, position: q.position });
      }
    }
  }
  allTopQueries.sort((a, b) => b.clicks - a.clicks);
  const topQueries = allTopQueries.slice(0, 10);

  // GBP aggregates
  const gbpSummary = gbpData.length > 0 ? {
    totalViews: gbpData.reduce((s, d) => s + (d.views || 0), 0),
    totalCalls: gbpData.reduce((s, d) => s + (d.phoneCalls || 0), 0),
    totalClicks: gbpData.reduce((s, d) => s + (d.websiteClicks || 0), 0),
    totalDirections: gbpData.reduce((s, d) => s + (d.directionRequests || 0), 0),
  } : null;

  // GA4 chart data (use all data returned by the filter-aware API)
  const ga4ChartData = ga4Data.map(d => ({
    date: d.date.slice(5), // MM-DD
    users: d.activeUsers,
    sessions: d.sessions,
    pageViews: d.pageViews,
  }));

  // SC chart data
  const scChartData = scData.map(d => ({
    date: d.date.slice(5),
    clicks: d.clicks,
    impressions: d.impressions,
  }));

  // Weekly analytics summaries (using filtered data)
  const weekSummary = filteredAnalytics.length > 0 ? {
    totalPosts: filteredAnalytics.reduce((s, w) => s + (w.socialPosts || 0), 0),
    totalViews: filteredAnalytics.reduce((s, w) => s + (w.socialViews || 0), 0),
    totalPatients: filteredAnalytics.reduce((s, w) => s + (w.patientCount || 0), 0),
    totalConversions: filteredAnalytics.reduce((s, w) => s + (w.digitalConversion || 0), 0),
    avgConversionRate: +(filteredAnalytics.reduce((s, w) => s + (w.conversionRate || 0), 0) / filteredAnalytics.length).toFixed(2),
  } : null;

  const chartData = filteredAnalytics.map(week => ({
    week: `W${week.weekNumber}`,
    socialPosts: week.socialPosts || 0,
    socialViews: week.socialViews || 0,
    patientCount: week.patientCount || 0,
    conversionRate: week.conversionRate || 0,
  }));

  const hasGoogleData = ga4Data.length > 0 || scData.length > 0 || gbpData.length > 0 || adsData.length > 0;
  const hasWeeklyData = filteredAnalytics.length > 0;
  const hasAnyRawData = hasGoogleData || analytics.length > 0;

  if (!hasGoogleData && !hasWeeklyData) {
    return (
      <div className="space-y-6">
        {/* Still show the date filter so users can change the range */}
        {!isAdmin && clinics.length > 1 && (
          <div className="flex items-center gap-4">
            <label className="text-slate-900 dark:text-white font-semibold">Clinic:</label>
            <select
              value={selectedClinic}
              onChange={(e) => setSelectedClinic(e.target.value)}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600"
            >
              {clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
              ))}
            </select>
          </div>
        )}
        <AnalyticsDateFilter isDark={isDark} onChange={handleFilterChange} initialPreset={filterPreset} />
        <div className="rounded-2xl p-8 border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
            {hasAnyRawData ? 'No Data for Selected Period' : 'No Analytics Data Yet'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {hasAnyRawData
              ? 'Try selecting a different date range, or choose "All" to see all available data.'
              : 'Connect Google Analytics or add weekly data to see insights here.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Clinic Selector */}
      {!isAdmin && clinics.length > 1 && (
        <div className="flex items-center gap-4">
          <label className="text-slate-900 dark:text-white font-semibold">Clinic:</label>
          <select
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600"
          >
            {clinics.map((clinic) => (
              <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Date Filter */}
      <AnalyticsDateFilter
        isDark={isDark}
        onChange={handleFilterChange}
        initialPreset="last_week"
      />

      {/* ═══════════════════ GOOGLE ANALYTICS (GA4) SECTION ═══════════════════ */}
      {ga4Summary && (
        <>
          <div className="flex items-center gap-2 pt-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Google Analytics (GA4)</h2>
            <span className="text-xs text-slate-500 ml-2">Filtered range</span>
          </div>

          {/* GA4 Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { label: 'Active Users', value: ga4Summary.totalUsers.toLocaleString(), icon: <Users className="h-5 w-5 text-emerald-400" /> },
              { label: 'New Users', value: ga4Summary.newUsers.toLocaleString(), icon: <Users className="h-5 w-5 text-cyan-400" /> },
              { label: 'Sessions', value: ga4Summary.totalSessions.toLocaleString(), icon: <Globe className="h-5 w-5 text-blue-400" /> },
              { label: 'Page Views', value: ga4Summary.totalPageViews.toLocaleString(), icon: <Eye className="h-5 w-5 text-purple-400" /> },
              { label: 'Bounce Rate', value: `${ga4Summary.avgBounceRate}%`, icon: <TrendingUp className="h-5 w-5 text-red-400" /> },
              { label: 'Engagement', value: `${ga4Summary.avgEngagement}%`, icon: <TrendingUp className="h-5 w-5 text-green-400" /> },
              { label: 'Conversions', value: ga4Summary.totalConversions.toLocaleString(), icon: <MousePointerClick className="h-5 w-5 text-amber-400" /> },
            ].map((card) => (
              <div key={card.label} className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">{card.icon}</div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* GA4 Users / Sessions / Page Views Chart */}
          {ga4ChartData.length > 0 && (
            <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📈 Website Traffic (Daily)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={ga4ChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="date" stroke={axisStroke} fontSize={11} />
                  <YAxis stroke={axisStroke} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Area type="monotone" dataKey="users" name="Active Users" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="pageViews" name="Page Views" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Traffic Sources Pie */}
          {trafficSources.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">🎯 Traffic Sources</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      labelLine={false}
                      label={(e) => `${e.name}: ${((e.percent ?? 0) * 100).toFixed(0)}%`}
                      dataKey="value"
                    >
                      {trafficSources.map((_, i) => (
                        <Cell key={i} fill={TRAFFIC_COLORS[i % TRAFFIC_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Traffic Sources Table */}
              <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📊 Session Breakdown</h3>
                <table className="w-full text-sm text-slate-600 dark:text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 text-slate-900 dark:text-white">Source</th>
                      <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Sessions</th>
                      <th className="text-right py-2 px-3 text-slate-900 dark:text-white">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trafficSources.map((src, i) => {
                      const total = trafficSources.reduce((s, t) => s + t.value, 0);
                      return (
                        <tr key={src.name} className="border-b border-slate-200/50 dark:border-slate-700/50">
                          <td className="py-2 px-3 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: TRAFFIC_COLORS[i % TRAFFIC_COLORS.length] }} />
                            {src.name}
                          </td>
                          <td className="text-right py-2 px-3">{src.value.toLocaleString()}</td>
                          <td className="text-right py-2 px-3">{total > 0 ? ((src.value / total) * 100).toFixed(1) : 0}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ═══════════════════ ORGANIC GOOGLE TRAFFIC SECTION ═══════════════════ */}
      {scSummary && (
        <>
          <div className="flex items-center gap-2 pt-4">
            <Search className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Organic Google Traffic</h2>
            <span className="text-xs text-slate-500 ml-2">Filtered range</span>
          </div>

          {/* Organic Google Traffic Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{scSummary.totalClicks.toLocaleString()}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Total Clicks</p>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{scSummary.totalImpressions.toLocaleString()}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Impressions</p>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{scSummary.avgCTR}%</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Avg CTR</p>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{scSummary.avgPosition}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Avg Position</p>
            </div>
          </div>

          {/* SC Clicks & Impressions Chart */}
          {scChartData.length > 0 && (
            <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">🔍 Search Performance (Daily)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                  <XAxis dataKey="date" stroke={axisStroke} fontSize={11} />
                  <YAxis yAxisId="left" stroke={axisStroke} />
                  <YAxis yAxisId="right" orientation="right" stroke={axisStroke} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="impressions" name="Impressions" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Top Pages & Top Queries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topPages.length > 0 && (
              <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📄 Top Visited Pages</h3>
                <table className="w-full text-sm text-slate-600 dark:text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 text-slate-900 dark:text-white">Page</th>
                      <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Clicks</th>
                      <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Impressions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((p, i) => {
                      // Show only the pathname
                      let path = p.page;
                      try { path = new URL(p.page).pathname; } catch {}
                      return (
                        <tr key={i} className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/30">
                          <td className="py-2 px-3 truncate max-w-[200px]" title={p.page}>{path}</td>
                          <td className="text-right py-2 px-3 font-semibold text-emerald-400">{p.clicks.toLocaleString()}</td>
                          <td className="text-right py-2 px-3">{p.impressions.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {topQueries.length > 0 && (
              <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">🔎 Top Search Queries</h3>
                <table className="w-full text-sm text-slate-600 dark:text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-3 text-slate-900 dark:text-white">Query</th>
                      <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Clicks</th>
                      <th className="text-right py-2 px-3 text-slate-900 dark:text-white">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topQueries.map((q, i) => (
                      <tr key={i} className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700/30">
                        <td className="py-2 px-3">{q.query}</td>
                        <td className="text-right py-2 px-3 font-semibold text-blue-400">{q.clicks.toLocaleString()}</td>
                        <td className="text-right py-2 px-3">{q.position.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ═══════════════════ GBP SECTION ═══════════════════ */}
      {gbpSummary && (
        <>
          <div className="flex items-center gap-2 pt-4">
            <Globe className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Google Business Profile</h2>
            <span className="text-xs text-slate-500 ml-2">Filtered range</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{gbpSummary.totalViews.toLocaleString()}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Profile Views</p>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{gbpSummary.totalCalls.toLocaleString()}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Phone Calls</p>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{gbpSummary.totalClicks.toLocaleString()}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Website Clicks</p>
            </div>
            <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{gbpSummary.totalDirections.toLocaleString()}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Direction Requests</p>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════ GOOGLE ADS & TOTAL AD SPEND ═══════════════════ */}
      {adsData.length > 0 && (
        <>
          <div className="flex items-center gap-2 pt-4">
            <DollarSign className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Google Ads & Ad Spend</h2>
            <span className="text-xs text-slate-500 ml-2">Filtered range</span>
          </div>
          {(() => {
            const totalGoogleAdsSpend = adsData.reduce((s, d) => s + (d.cost || 0), 0);
            const totalGoogleAdsClicks = adsData.reduce((s, d) => s + (d.clicks || 0), 0);
            const totalGoogleAdsImpressions = adsData.reduce((s, d) => s + (d.impressions || 0), 0);
            const totalGoogleAdsConversions = adsData.reduce((s, d) => s + (d.conversions || 0), 0);
            const avgCpc = totalGoogleAdsClicks > 0 ? totalGoogleAdsSpend / totalGoogleAdsClicks : 0;
            return (
              <>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-2xl font-bold text-green-400">${totalGoogleAdsSpend.toFixed(2)}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Total Ad Spend</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-2xl font-bold text-blue-400">{totalGoogleAdsClicks.toLocaleString()}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Clicks</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-2xl font-bold text-purple-400">{totalGoogleAdsImpressions.toLocaleString()}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Impressions</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-2xl font-bold text-amber-400">{totalGoogleAdsConversions.toLocaleString()}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Conversions</p>
                  </div>
                  <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-2xl font-bold text-indigo-400">${avgCpc.toFixed(2)}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Avg CPC</p>
                  </div>
                </div>
                <div className="rounded-2xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Daily Ad Spend & Clicks</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={adsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                      <XAxis dataKey="date" stroke={axisStroke} tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="left" stroke={axisStroke} />
                      <YAxis yAxisId="right" orientation="right" stroke={axisStroke} />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(value: any, name: any) => [name === 'Spend ($)' ? `$${Number(value || 0).toFixed(2)}` : Number(value || 0).toLocaleString(), name]}
                      />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="cost" name="Spend ($)" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Area yAxisId="right" type="monotone" dataKey="clicks" name="Clicks" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </>
            );
          })()}
        </>
      )}

      {/* Loading indicator for Google data */}
      {googleLoading && (
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm py-2">
          <DashboardLoader variant="inline" className="text-slate-500 dark:text-slate-400" /> Syncing Google data...
        </div>
      )}

      {/* No Google data message */}
      {!hasGoogleData && !googleLoading && (
        <div className="rounded-xl p-6 bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 text-center">
          <Globe className="h-8 w-8 mx-auto mb-3 text-slate-400 dark:text-slate-600" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">No Google Analytics data connected yet. Ask your admin to connect Google Analytics.</p>
        </div>
      )}

      {/* ═══════════════════ WEEKLY ANALYTICS (SOCIAL & PATIENTS) ═══════════════════ */}
      {hasWeeklyData && (
        <>
          <div className="flex items-center gap-2 pt-4">
            <TrendingUp className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Weekly Performance</h2>
          </div>

          {/* Weekly Summary Cards */}
          {weekSummary && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{weekSummary.totalPosts}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Total Posts</p>
              </div>
              <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{weekSummary.totalViews.toLocaleString()}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Social Views</p>
              </div>
              <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{weekSummary.totalPatients}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Patients</p>
              </div>
              <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(weekSummary.totalConversions)}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Conversions</p>
              </div>
              <div className="rounded-xl p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{weekSummary.avgConversionRate}%</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Avg Conv Rate</p>
              </div>
            </div>
          )}

          {/* Social Media Chart */}
          <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">📱 Social Media Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="week" stroke={axisStroke} />
                <YAxis stroke={axisStroke} yAxisId="left" />
                <YAxis stroke={axisStroke} yAxisId="right" orientation="right" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="socialPosts" name="Posts" stroke="#8b5cf6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="socialViews" name="Views" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Patient Metrics Chart */}
          <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">👥 Patient Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="week" stroke={axisStroke} />
                <YAxis yAxisId="left" stroke={axisStroke} />
                <YAxis yAxisId="right" orientation="right" stroke={axisStroke} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend />
                <Bar yAxisId="left" dataKey="patientCount" name="Patients" fill="#10b981" />
                <Bar yAxisId="right" dataKey="conversionRate" name="Conv Rate (%)" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Detailed Table */}
          <div className="rounded-xl p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📊 Weekly Breakdown</h3>
            <table className="w-full text-sm text-slate-600 dark:text-slate-300">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Week</th>
                  <th className="text-right py-3 px-4">Posts</th>
                  <th className="text-right py-3 px-4">Views</th>
                  <th className="text-right py-3 px-4">Patients</th>
                  <th className="text-right py-3 px-4">Conversions</th>
                  <th className="text-right py-3 px-4">Conv Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnalytics.map((week) => (
                  <tr key={week.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50">
                    <td className="py-3 px-4 font-medium">{week.weekLabel}</td>
                    <td className="text-right py-3 px-4">{week.socialPosts || 0}</td>
                    <td className="text-right py-3 px-4">{(week.socialViews || 0).toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{week.patientCount || 0}</td>
                    <td className="text-right py-3 px-4">{Math.round(week.digitalConversion || 0)}</td>
                    <td className="text-right py-3 px-4">{(week.conversionRate || 0).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
