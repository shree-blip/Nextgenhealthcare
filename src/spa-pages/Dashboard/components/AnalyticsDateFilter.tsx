import { useState, useMemo, useCallback } from 'react';
import { Calendar, Search, RotateCcw } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
export type FilterPreset = 'last_week' | 'current_month' | 'last_month' | 'year' | 'all' | 'custom';

export interface DateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface AnalyticsDateFilterProps {
  isDark?: boolean;
  /** Called whenever the active date range changes (preset click or custom Search) */
  onChange: (range: DateRange, preset: FilterPreset) => void;
  /** Show compare presets (admin only) */
  showCompare?: boolean;
  /** Initial preset (default: 'last_week') */
  initialPreset?: FilterPreset;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getMonday(date: Date): Date {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, n: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + n);
  return copy;
}

const fmt = (d: Date) => d.toISOString().slice(0, 10);

function computeRange(preset: FilterPreset): DateRange {
  const now = new Date();
  const thisMonday = getMonday(now);

  switch (preset) {
    case 'last_week': {
      const start = addDays(thisMonday, -7);
      const end = addDays(start, 6);
      return { startDate: fmt(start), endDate: fmt(end) };
    }
    case 'current_month': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { startDate: fmt(start), endDate: fmt(now) };
    }
    case 'last_month': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { startDate: fmt(start), endDate: fmt(end) };
    }
    case 'year': {
      const start = new Date(now.getFullYear(), 0, 1);
      return { startDate: fmt(start), endDate: fmt(now) };
    }
    case 'all': {
      const start = new Date(2020, 0, 1);
      return { startDate: fmt(start), endDate: fmt(now) };
    }
    case 'custom':
    default: {
      // Fallback to last 30 days — custom should use explicit dates
      const start = addDays(now, -30);
      return { startDate: fmt(start), endDate: fmt(now) };
    }
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AnalyticsDateFilter({
  isDark = false,
  onChange,
  initialPreset = 'last_week',
}: AnalyticsDateFilterProps) {
  const [activePreset, setActivePreset] = useState<FilterPreset>(initialPreset);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // Preset date range label
  const activeRange = useMemo(() => computeRange(activePreset), [activePreset]);

  const handlePreset = useCallback((preset: FilterPreset) => {
    setActivePreset(preset);
    const range = computeRange(preset);
    onChange(range, preset);
  }, [onChange]);

  const handleCustomSearch = useCallback(() => {
    if (!customStart || !customEnd) return;
    if (customStart > customEnd) return;
    setActivePreset('custom');
    onChange({ startDate: customStart, endDate: customEnd }, 'custom');
  }, [customStart, customEnd, onChange]);

  const handleReset = useCallback(() => {
    setActivePreset('last_week');
    setCustomStart('');
    setCustomEnd('');
    onChange(computeRange('last_week'), 'last_week');
  }, [onChange]);

  // Styling helpers
  const presetBtn = (preset: FilterPreset, label: string, color: 'emerald' | 'blue' = 'emerald') => {
    const isActive = activePreset === preset;
    const active = color === 'emerald'
      ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg shadow-emerald-500/20'
      : 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20';
    const inactive = isDark
      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/60'
      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500/60';
    return (
      <button
        key={preset}
        onClick={() => handlePreset(preset)}
        className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${isActive ? active : inactive}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className={`rounded-2xl p-4 border ${isDark ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white/80 border-slate-200/60'} backdrop-blur-sm`}>
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {presetBtn('last_week', 'Last Week')}
        {presetBtn('current_month', 'Current Month')}
        {presetBtn('last_month', 'Last Month')}
        {presetBtn('year', 'Year')}
        {presetBtn('all', 'All')}
      </div>

      {/* Custom Date Range */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-2">
          <Calendar className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <div className="flex items-center gap-2">
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Start Date
              </label>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className={`px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
            <span className={`text-sm font-medium mt-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>to</span>
            <div>
              <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                End Date
              </label>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className={`px-3 py-2 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Search (apply custom range) */}
        <button
          onClick={handleCustomSearch}
          disabled={!customStart || !customEnd || customStart > customEnd}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
            customStart && customEnd && customStart <= customEnd
              ? 'bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 active:scale-95'
              : isDark
                ? 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Search className="h-4 w-4" />
          Search
        </button>

        {/* Reset Filters */}
        <button
          onClick={handleReset}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 active:scale-95 ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-red-500/60 hover:text-red-400'
              : 'bg-white border-slate-200 text-slate-600 hover:border-red-400 hover:text-red-500'
          }`}
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </button>
      </div>

      {/* Active range indicator */}
      <div className={`mt-3 text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        Showing data from <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{activeRange.startDate}</span>
        {' '}to{' '}
        <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{activeRange.endDate}</span>
        {activePreset === 'custom' && customStart && customEnd && (
          <>
            {' '}— <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{customStart}</span>
            {' '}to{' '}
            <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{customEnd}</span>
          </>
        )}
      </div>
    </div>
  );
}
