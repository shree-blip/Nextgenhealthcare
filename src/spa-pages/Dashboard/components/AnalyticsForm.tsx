import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Check, AlertCircle, Edit2, X } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface WeekOption {
  key: string;
  year: number;
  month: number;
  weekNumber: number;
  weekLabel: string;
  start: Date;
  end: Date;
}

interface EditingRecord {
  id: string;
  year: number;
  month: number;
  weekNumber: number;
  weekLabel: string;
}

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const METRIC_FIELDS = [
  'blogsPublished',
  'callsRequested',
  'websiteVisits',
  'directionClicks',
  'metaImpressions',
  'metaClicks',
  'metaCTR',
  'metaConversions',
  'metaAdSpend',
  'metaCPC',
  'metaCostPerConversion',
  'googleImpressions',
  'googleClicks',
  'googleCTR',
  'googleCPC',
  'googleConversions',
  'googleCVR',
  'googleCostPerConversion',
  'googleTotalCost',
  'socialPosts',
  'socialViews',
  'patientCount',
  'digitalConversion',
  'conversionRate',
  'dailyPatientAvg',
] as const;

type MetricField = typeof METRIC_FIELDS[number];
type FormMetrics = Record<MetricField, string>;

const FLOAT_FIELDS = new Set<MetricField>([
  'metaCTR',
  'metaAdSpend',
  'metaCPC',
  'metaCostPerConversion',
  'googleCTR',
  'googleCPC',
  'googleCVR',
  'googleCostPerConversion',
  'googleTotalCost',
  'conversionRate',
  'dailyPatientAvg',
]);

// Helper functions for calculations
function calcPercentage(numerator: number, denominator: number): number {
  if (!denominator || denominator === 0) return 0;
  return Number(((numerator / denominator) * 100).toFixed(2));
}

function calcMoney(numerator: number, denominator: number): number {
  if (!denominator || denominator === 0) return 0;
  return Number((numerator / denominator).toFixed(2));
}

function calculateAllMetrics(metrics: FormMetrics): Partial<Record<MetricField, number>> {
  const calculated: Partial<Record<MetricField, number>> = {};

  // Parse manual inputs
  const metaImpressions = Number(metrics.metaImpressions) || 0;
  const metaClicks = Number(metrics.metaClicks) || 0;
  const metaAdSpend = Number(metrics.metaAdSpend) || 0;
  const metaConversions = Number(metrics.metaConversions) || 0;

  const googleImpressions = Number(metrics.googleImpressions) || 0;
  const googleClicks = Number(metrics.googleClicks) || 0;
  const googleTotalCost = Number(metrics.googleTotalCost) || 0;
  const googleConversions = Number(metrics.googleConversions) || 0;

  const patientCount = Number(metrics.patientCount) || 0;
  const digitalConversion = Number(metrics.digitalConversion) || 0;

  // Meta calculations
  calculated.metaCTR = calcPercentage(metaClicks, metaImpressions);
  calculated.metaCPC = calcMoney(metaAdSpend, metaClicks);
  calculated.metaCostPerConversion = calcMoney(metaAdSpend, metaConversions);

  // Google calculations
  calculated.googleCTR = calcPercentage(googleClicks, googleImpressions);
  calculated.googleCPC = calcMoney(googleTotalCost, googleClicks);
  calculated.googleCVR = calcPercentage(googleConversions, googleClicks);
  calculated.googleCostPerConversion = calcMoney(googleTotalCost, googleConversions);

  // Patient/Conversion calculations
  calculated.dailyPatientAvg = Number((patientCount / 7).toFixed(2));
  calculated.conversionRate = calcPercentage(digitalConversion, patientCount);

  return calculated;
}

function parseMetricsForSave(source: FormMetrics): { values: Partial<Record<MetricField, number>>; error?: string } {
  const values: Partial<Record<MetricField, number>> = {};

  // These fields are NOT read from the form (they're read-only / calculated).
  // They ARE computed by calculateAllMetrics() below and saved to the database
  // via Object.assign(values, calculated).
  const autoCalculatedFields = new Set<MetricField>([
    'metaCTR',
    'metaCPC',
    'metaCostPerConversion',
    'googleCTR',
    'googleCPC',
    'googleCVR',
    'googleCostPerConversion',
    'dailyPatientAvg',
    'conversionRate',
  ]);

  for (const field of METRIC_FIELDS) {
    // Skip auto-calculated fields - they will be computed below
    if (autoCalculatedFields.has(field)) continue;

    const raw = source[field].trim();
    if (raw === '') continue;

    const numeric = Number(raw);
    if (Number.isNaN(numeric)) {
      return { values, error: `Invalid numeric value for ${field}` };
    }

    if (FLOAT_FIELDS.has(field)) {
      values[field] = numeric;
      continue;
    }

    if (!Number.isInteger(numeric)) {
      return { values, error: `${field} must be a whole number` };
    }

    values[field] = numeric;
  }

  // Calculate all derived fields and add to values
  const calculated = calculateAllMetrics(source);
  Object.assign(values, calculated);

  return { values };
}

function emptyMetrics(): FormMetrics {
  return METRIC_FIELDS.reduce((acc, key) => {
    acc[key] = '';
    return acc;
  }, {} as FormMetrics);
}

function startOfWeekMonday(date: Date): Date {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatShortDate(date: Date): string {
  return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}`;
}

function generateWeeksForYear(year: number): WeekOption[] {
  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);
  const weeks: WeekOption[] = [];

  let cursor = startOfWeekMonday(jan1);
  let weekNumber = 1;

  while (cursor <= dec31) {
    const start = new Date(cursor);
    const end = addDays(start, 6);

    weeks.push({
      key: `${year}-${weekNumber}`,
      year,
      month: start.getMonth() + 1,
      weekNumber,
      weekLabel: `${year} Week ${weekNumber} (${formatShortDate(start)}–${formatShortDate(end)})`,
      start,
      end,
    });

    cursor = addDays(cursor, 7);
    weekNumber += 1;
  }

  return weeks;
}

function getDefaultTargetDate(today: Date): Date {
  const target = new Date(today);
  target.setHours(0, 0, 0, 0);
  if (target.getDay() === 1) {
    target.setDate(target.getDate() - 7);
  }
  return target;
}

function analyticsToFormMetrics(record: any): FormMetrics {
  const next = emptyMetrics();
  for (const field of METRIC_FIELDS) {
    const value = record?.[field];
    next[field] = value === null || value === undefined ? '' : String(value);
  }
  return next;
}

interface SectionInputProps {
  label: string;
  name: string;
  type?: 'number' | 'text';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: string;
  min?: string;
  helperText?: string;
  readOnly?: boolean;
}

function SectionInput({ label, name, type = 'number', value, onChange, step = 'any', min = '0', helperText, readOnly = false }: SectionInputProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2.5 text-slate-700 dark:text-slate-200 transition-colors">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        readOnly={readOnly}
        placeholder="0"
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all font-medium ${
          readOnly
            ? 'bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 cursor-not-allowed'
            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-500/30 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      />
      {helperText && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{helperText}</p>}
    </div>
  );
}

function MetricsInputGrid({ metrics, onChange }: { metrics: FormMetrics; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  // Auto-calculate all derived metrics
  const metaImpressions = Number(metrics.metaImpressions) || 0;
  const metaClicks = Number(metrics.metaClicks) || 0;
  const metaAdSpend = Number(metrics.metaAdSpend) || 0;
  const metaConversions = Number(metrics.metaConversions) || 0;

  const googleImpressions = Number(metrics.googleImpressions) || 0;
  const googleClicks = Number(metrics.googleClicks) || 0;
  const googleTotalCost = Number(metrics.googleTotalCost) || 0;
  const googleConversions = Number(metrics.googleConversions) || 0;

  const patientCount = Number(metrics.patientCount) || 0;
  const digitalConversion = Number(metrics.digitalConversion) || 0;

  // Meta calculations
  const metaCTR = calcPercentage(metaClicks, metaImpressions);
  const metaCPC = calcMoney(metaAdSpend, metaClicks);
  const metaCostPerConv = calcMoney(metaAdSpend, metaConversions);

  // Google calculations
  const googleCTR = calcPercentage(googleClicks, googleImpressions);
  const googleCPC = calcMoney(googleTotalCost, googleClicks);
  const googleCVR = calcPercentage(googleConversions, googleClicks);
  const googleCostPerConv = calcMoney(googleTotalCost, googleConversions);

  // Patient/Conversion calculations
  const dailyPatientAvg = (patientCount / 7).toFixed(2);
  const conversionRate = calcPercentage(digitalConversion, patientCount);

  return (
    <div className="space-y-6">
      {/* SECTION 1: Content & SEO */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 backdrop-blur-sm">
        <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-4 text-xs uppercase tracking-widest flex items-center gap-2"><span>📊</span> Content & SEO</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionInput label="Blogs Published" name="blogsPublished" value={metrics.blogsPublished} onChange={onChange} />
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50">
          ℹ️ Avg Ranking & Total Traffic are now pulled automatically from Google Search Console and shown on the dashboard.
        </p>
      </div>

      {/* SECTION 2: Google My Business (GMB) */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 backdrop-blur-sm">
        <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-4 text-xs uppercase tracking-widest flex items-center gap-2"><span>🗺️</span> Google My Business</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionInput label="Calls Requested" name="callsRequested" value={metrics.callsRequested} onChange={onChange} />
          <SectionInput label="Website Visits" name="websiteVisits" value={metrics.websiteVisits} onChange={onChange} />
          <SectionInput label="Direction Clicks" name="directionClicks" value={metrics.directionClicks} onChange={onChange} />
        </div>
      </div>

      {/* SECTION 3: Meta (Facebook/Instagram) */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 backdrop-blur-sm">
        <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-4 text-xs uppercase tracking-widest flex items-center gap-2"><span>📘</span> Meta (Facebook/Instagram)</h4>
        
        {/* Meta Manual Inputs */}
        <div className="mb-5 pb-5 border-b border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">📝 Manual Inputs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SectionInput label="Impressions" name="metaImpressions" value={metrics.metaImpressions} onChange={onChange} />
            <SectionInput label="Clicks" name="metaClicks" value={metrics.metaClicks} onChange={onChange} />
            <SectionInput label="Conversions" name="metaConversions" value={metrics.metaConversions} onChange={onChange} />
            <SectionInput label="Ad Spend ($)" name="metaAdSpend" value={metrics.metaAdSpend} onChange={onChange} helperText="Supports decimals (e.g., 125.50)" />
          </div>
        </div>

        {/* Meta Auto-Calculated */}
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">⚙️ Auto-Calculated</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionInput label="CTR (%)" name="metaCTR" value={metaCTR.toString()} onChange={onChange} readOnly={true} helperText="(Clicks ÷ Impressions) × 100" />
          <SectionInput label="CPC ($)" name="metaCPC" value={metaCPC.toString()} onChange={onChange} readOnly={true} helperText="Auto: Spend ÷ Clicks" />
          <SectionInput label="Cost Per Conv ($)" name="metaCostPerConversion" value={metaCostPerConv.toString()} onChange={onChange} readOnly={true} helperText="Auto-calculated" />
        </div>
      </div>

      {/* SECTION 4: Google Ads */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 backdrop-blur-sm">
        <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 text-xs uppercase tracking-widest flex items-center gap-2"><span>🔍</span> Google Ads (Search & Display)</h4>
        
        {/* Google Manual Inputs */}
        <div className="mb-5 pb-5 border-b border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">📝 Manual Inputs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SectionInput label="Impressions" name="googleImpressions" value={metrics.googleImpressions} onChange={onChange} />
            <SectionInput label="Clicks" name="googleClicks" value={metrics.googleClicks} onChange={onChange} />
            <SectionInput label="Conversions" name="googleConversions" value={metrics.googleConversions} onChange={onChange} />
            <SectionInput label="Total Cost ($)" name="googleTotalCost" value={metrics.googleTotalCost} onChange={onChange} helperText="Supports decimals (e.g., 250.75)" />
          </div>
        </div>

        {/* Google Auto-Calculated */}
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">⚙️ Auto-Calculated</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SectionInput label="CTR (%)" name="googleCTR" value={googleCTR.toString()} onChange={onChange} readOnly={true} helperText="(Clicks ÷ Impressions) × 100" />
          <SectionInput label="CPC ($)" name="googleCPC" value={googleCPC.toString()} onChange={onChange} readOnly={true} helperText="Total Cost ÷ Clicks" />
          <SectionInput label="CVR (%)" name="googleCVR" value={googleCVR.toString()} onChange={onChange} readOnly={true} helperText="(Conversions ÷ Clicks) × 100" />
          <SectionInput label="Cost Per Conv ($)" name="googleCostPerConversion" value={googleCostPerConv.toString()} onChange={onChange} readOnly={true} helperText="Total Cost ÷ Conversions" />
        </div>
      </div>

      {/* SECTION 5: Social Media */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 backdrop-blur-sm">
        <h4 className="font-bold text-pink-700 dark:text-pink-300 mb-4 text-xs uppercase tracking-widest flex items-center gap-2"><span>📱</span> Social Media</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionInput label="Posts" name="socialPosts" value={metrics.socialPosts} onChange={onChange} />
          <SectionInput label="Views" name="socialViews" value={metrics.socialViews} onChange={onChange} helperText="Supports decimals (e.g., 1250.5)" />
        </div>
      </div>

      {/* SECTION 6: Patient Metrics */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 backdrop-blur-sm">
        <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-4 text-xs uppercase tracking-widest flex items-center gap-2"><span>👥</span> Patient Metrics</h4>
        
        {/* Manual Inputs */}
        <div className="mb-5 pb-5 border-b border-slate-200 dark:border-slate-700">
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">📝 Manual Inputs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionInput label="Patient Count" name="patientCount" value={metrics.patientCount} onChange={onChange} helperText="Total patients for the week" />
            <SectionInput label="Digital Conversion" name="digitalConversion" value={metrics.digitalConversion} onChange={onChange} helperText="Supports decimals (e.g., 45.5)" />
          </div>
        </div>

        {/* Auto-Calculated */}
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wide">⚙️ Auto-Calculated</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionInput label="Daily Patient Avg" name="dailyPatientAvg" value={dailyPatientAvg} onChange={onChange} readOnly={true} helperText="Patient Count ÷ 7" />
          <SectionInput label="Conversion Rate (%)" name="conversionRate" value={conversionRate.toString()} onChange={onChange} readOnly={true} helperText="(Digital Conversion ÷ Patient Count) × 100" />
        </div>
        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-3 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
          ℹ️ All calculated fields update automatically when you change the manual inputs above.
        </p>
      </div>
    </div>
  );
}

export default function AnalyticsForm({ onSaved }: { onSaved?: () => void } = {}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [clinics, setClinics] = useState<any[]>([]);
  const [existingData, setExistingData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<FormMetrics>(emptyMetrics());
  const [selectedClinicId, setSelectedClinicId] = useState('');

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<EditingRecord | null>(null);
  const [editMetrics, setEditMetrics] = useState<FormMetrics>(emptyMetrics());
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);

  const defaultTargetDate = useMemo(() => getDefaultTargetDate(new Date()), []);
  const [selectedYear, setSelectedYear] = useState<number>(defaultTargetDate.getFullYear());
  const [selectedWeekKey, setSelectedWeekKey] = useState<string>('');
  const [isLoadingWeekData, setIsLoadingWeekData] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const yearOptions = useMemo(() => {
    const nowYear = new Date().getFullYear();
    return [nowYear - 1, nowYear, nowYear + 1, nowYear + 2];
  }, []);

  const weeks = useMemo(() => generateWeeksForYear(selectedYear), [selectedYear]);
  const selectedWeek = useMemo(() => weeks.find((w) => w.key === selectedWeekKey) || null, [weeks, selectedWeekKey]);

  useEffect(() => {
    socketRef.current = io({ path: '/socket.io' });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch('/api/admin/clinics')
      .then((res) => res.json())
      .then((result) => {
        const loaded = result.clinics || [];
        setClinics(loaded);
        if (loaded.length > 0) {
          setSelectedClinicId((prev) => prev || loaded[0].id);
        }
      })
      .catch((err) => console.error('Failed to load clinics:', err));
  }, []);

  useEffect(() => {
    if (selectedWeekKey && weeks.some((w) => w.key === selectedWeekKey)) return;

    const target = defaultTargetDate;
    const targetWeek = weeks.find((week) => target >= week.start && target <= week.end);
    setSelectedWeekKey(targetWeek?.key || weeks[0]?.key || '');
  }, [weeks, selectedWeekKey, defaultTargetDate]);

  useEffect(() => {
    if (!selectedClinicId) {
      setExistingData([]);
      return;
    }

    fetch(`/api/analytics/weekly?clinicId=${selectedClinicId}`)
      .then((res) => res.json())
      .then((result) => setExistingData(result.analytics || []))
      .catch((err) => console.error('Failed to load analytics list:', err));
  }, [selectedClinicId]);

  useEffect(() => {
    if (!selectedClinicId || !selectedWeek) {
      setMetrics(emptyMetrics());
      return;
    }

    const controller = new AbortController();

    const loadWeek = async () => {
      setError('');
      setIsLoadingWeekData(true);
      try {
        const query = new URLSearchParams({
          clinicId: selectedClinicId,
          year: String(selectedWeek.year),
          month: String(selectedWeek.month),
          weekNumber: String(selectedWeek.weekNumber),
        }).toString();

        const res = await fetch(`/api/analytics/weekly?${query}`, { signal: controller.signal });
        if (!res.ok) {
          throw new Error('Failed to load weekly analytics data');
        }
        const payload = await res.json();
        const existing = payload.analytics?.[0] || null;
        setMetrics(existing ? analyticsToFormMetrics(existing) : emptyMetrics());
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          console.error('Failed to load selected week analytics:', err);
          setError('Unable to load saved data for selected clinic/week');
        }
      } finally {
        setIsLoadingWeekData(false);
      }
    };

    loadWeek();

    return () => {
      controller.abort();
    };
  }, [selectedClinicId, selectedWeek]);

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as MetricField;
    setMetrics((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name as MetricField;
    setEditMetrics((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (!selectedClinicId || !selectedWeek) {
      setError('Please select a clinic and a week');
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, any> = {
        clinicId: selectedClinicId,
        year: Number(selectedWeek.year),
        month: Number(selectedWeek.month),
        weekNumber: Number(selectedWeek.weekNumber),
        weekLabel: selectedWeek.weekLabel,
      };

      const parsed = parseMetricsForSave(metrics);
      if (parsed.error) {
        throw new Error(parsed.error);
      }

      for (const field of METRIC_FIELDS) {
        if (parsed.values[field] !== undefined) {
          payload[field] = parsed.values[field];
        }
      }

      console.log('[Weekly Analytics Entry] Saving payload:', payload);

      const res = await fetch('/api/analytics/weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('[Weekly Analytics Entry] API Error:', err);
        throw new Error(err.error || 'Failed to save analytics');
      }

      const result = await res.json();
      console.log('[Weekly Analytics Entry] Save successful:', result);
      const saved = result.analytics;

      if (saved) {
        setMetrics(analyticsToFormMetrics(saved));
      }

      setSubmitted(true);

      // Wait briefly for database to settle, then refresh data
      await new Promise(resolve => setTimeout(resolve, 300));

      const refreshRes = await fetch(`/api/analytics/weekly?clinicId=${selectedClinicId}`);
      if (!refreshRes.ok) {
        throw new Error('Failed to refresh data');
      }

      const refreshData = await refreshRes.json();
      console.log('[Weekly Analytics Entry] Refreshed data:', refreshData);
      setExistingData(refreshData.analytics || []);
      onSaved?.();

      socketRef.current?.emit('weekly_analytics_saved', {
        clinicId: selectedClinicId,
        year: Number(selectedWeek.year),
        month: Number(selectedWeek.month),
        weekNumber: Number(selectedWeek.weekNumber),
      });

      setTimeout(() => setSubmitted(false), 2500);
    } catch (err: any) {
      console.error('[Weekly Analytics Entry] Error:', err);
      setError(err.message || 'Error saving analytics');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (item: any) => {
    setEditingRecord({
      id: item.id,
      year: item.year,
      month: item.month,
      weekNumber: item.weekNumber,
      weekLabel: item.weekLabel,
    });
    setEditMetrics(analyticsToFormMetrics(item));
    setEditError('');
    setEditSuccess(false);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord || !selectedClinicId) return;

    setEditError('');
    setEditSuccess(false);
    setEditLoading(true);

    try {
      // Ensure numeric fields are properly typed as numbers
      const payload: Record<string, any> = {
        clinicId: selectedClinicId,
        year: Number(editingRecord.year),
        month: Number(editingRecord.month),
        weekNumber: Number(editingRecord.weekNumber),
        weekLabel: editingRecord.weekLabel,
      };

      const parsed = parseMetricsForSave(editMetrics);
      if (parsed.error) {
        throw new Error(parsed.error);
      }

      for (const field of METRIC_FIELDS) {
        if (parsed.values[field] !== undefined) {
          payload[field] = parsed.values[field];
        }
      }

      console.log('[Weekly History Edit] Saving payload:', payload);

      const res = await fetch('/api/analytics/weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('[Weekly History Edit] API Error:', err);
        throw new Error(err.error || 'Failed to save analytics');
      }

      const saveResult = await res.json();
      console.log('[Weekly History Edit] Save successful:', saveResult);

      setEditSuccess(true);

      // Wait briefly for database to settle, then refresh data
      await new Promise(resolve => setTimeout(resolve, 300));

      const refreshRes = await fetch(`/api/analytics/weekly?clinicId=${selectedClinicId}`);
      if (!refreshRes.ok) {
        throw new Error('Failed to refresh data');
      }

      const refreshData = await refreshRes.json();
      console.log('[Weekly History Edit] Refreshed data:', refreshData);
      setExistingData(refreshData.analytics || []);
      onSaved?.();

      socketRef.current?.emit('weekly_analytics_saved', {
        clinicId: selectedClinicId,
        year: Number(editingRecord.year),
        month: Number(editingRecord.month),
        weekNumber: Number(editingRecord.weekNumber),
      });

      setTimeout(() => {
        setShowEditModal(false);
      }, 1500);
    } catch (err: any) {
      console.error('[Weekly History Edit] Error:', err);
      setEditError(err.message || 'Error saving analytics');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Clean Single Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-3 text-slate-900 dark:text-white">Weekly Analytics Entry</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Select a clinic and a week (Monday to Sunday). The form will load saved data. You can save partial updates. Click Edit on any saved week to modify it.
        </p>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => !editLoading && setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400, duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:border-2 dark:border-slate-700/60 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header with Gradient */}
              <div className="sticky top-0 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-t-3xl px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4 z-10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📅</span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingRecord.weekLabel}</h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Edit weekly metrics and sync instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={editLoading}
                  className="p-2.5 hover:bg-cyan-200/40 dark:hover:bg-cyan-900/40 rounded-full disabled:opacity-50 transition-colors"
                >
                  <X className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Error Message */}
              {editError && (
                <div className="mx-6 mt-5 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-2xl text-red-700 dark:text-red-300 animate-in fade-in">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{editError}</p>
                  </div>
                </div>
              )}

              {/* Success Message */}
              {editSuccess && (
                <div className="mx-6 mt-5 flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl text-emerald-700 dark:text-emerald-300 animate-in fade-in">
                  <Check className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">✓ Saved successfully! Data syncing to dashboards...</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleEditSubmit} className="space-y-6 px-6 py-6">
                <MetricsInputGrid metrics={editMetrics} onChange={handleEditMetricChange} />

                {/* Modern Footer with Split Layout */}
                <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    disabled={editLoading}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {editLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENTRY FORM - TOP */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl text-red-700 dark:text-red-300">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {submitted && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-700 dark:text-emerald-300">
            <Check className="h-5 w-5 shrink-0" />
            <span className="font-semibold">Analytics saved and synced to client dashboards.</span>
          </div>
        )}

        <div className="rounded-2xl p-6 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <span>📍 Clinic & Week Selection</span>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Select a clinic and week to view or enter analytics data</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Clinic Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <span className="text-lg">🏥</span>
                <span>Clinic <span className="text-red-500">*</span></span>
              </label>
              <div className="relative">
                <select
                  value={selectedClinicId}
                  onChange={(e) => setSelectedClinicId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all appearance-none cursor-pointer font-medium"
                  required
                >
                  <option value="">Select a clinic...</option>
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-3.5 text-slate-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
              {!selectedClinicId && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Required to proceed</p>
              )}
            </div>

            {/* Year Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <span className="text-lg">📅</span>
                <span>Year</span>
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(Number(e.target.value));
                    setSelectedWeekKey('');
                  }}
                  className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all appearance-none cursor-pointer font-medium"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-3.5 text-slate-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Week Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <span className="text-lg">📆</span>
                <span>Week (Mon–Sun)</span>
              </label>
              <div className="relative">
                <select
                  value={selectedWeekKey}
                  onChange={(e) => setSelectedWeekKey(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all appearance-none cursor-pointer font-medium"
                >
                  {weeks.map((week) => (
                    <option key={week.key} value={week.key}>{week.weekLabel}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-3.5 text-slate-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-100/50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span>💡</span>
              On Mondays, this defaults to last week so you can enter last week&apos;s data quickly.
            </p>
          </div>
        </div>

        {isLoadingWeekData && (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading saved week data...
          </div>
        )}

        <div className="rounded-2xl p-6 border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
          <h3 className="text-lg font-bold mb-4">📝 Metrics</h3>
          <MetricsInputGrid metrics={metrics} onChange={handleMetricChange} />
        </div>

        <button
          type="submit"
          disabled={loading || isLoadingWeekData}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" /> Save Weekly Analytics
            </>
          )}
        </button>
      </motion.form>

      {/* HISTORY SECTION - BELOW FORM */}
      {existingData.length > 0 && selectedClinicId && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50 p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">📅 Week History</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Click "Edit" to update any week. Changes sync instantly to client dashboards.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-3 font-bold text-slate-700 dark:text-slate-300">Week</th>
                  <th className="text-left py-3 px-3 font-bold text-slate-700 dark:text-slate-300">Traffic</th>
                  <th className="text-left py-3 px-3 font-bold text-slate-700 dark:text-slate-300">Blogs</th>
                  <th className="text-left py-3 px-3 font-bold text-slate-700 dark:text-slate-300">Calls</th>
                  <th className="text-left py-3 px-3 font-bold text-slate-700 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {existingData.map((item: any) => (
                  <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/50 transition-colors bg-white/50 dark:bg-slate-800/20">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">{item.weekLabel}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{item.totalTraffic || '–'}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{item.blogsPublished || '–'}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{item.callsRequested || '–'}</td>
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold rounded-md transition-all inline-flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
