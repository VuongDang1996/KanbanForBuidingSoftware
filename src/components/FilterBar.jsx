import React from 'react';
import {
  LayoutGrid,
  Columns3,
  ListFilter,
  Search,
  X,
  Filter,
  SlidersHorizontal,
  Palette,
  BarChart3
} from 'lucide-react';
import { MOSCOW_PRIORITIES, STATUSES } from '../constants/sampleData';

export default function FilterBar({
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
  selectedEpicId,
  onEpicFilterChange,
  selectedPriority,
  onPriorityFilterChange,
  selectedStatus,
  onStatusFilterChange,
  epics,
  totalMatchingStories,
  totalStories,
  onClearFilters
}) {
  const hasActiveFilters = Boolean(
    searchQuery || selectedEpicId !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all'
  );

  return (
    <div className="border-b border-slate-800 bg-slate-900/60 px-4 sm:px-6 py-2.5">
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: View Switcher */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 self-start">
          <button
            onClick={() => onViewChange('matrix')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeView === 'matrix'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Story Map Matrix</span>
          </button>

          <button
            onClick={() => onViewChange('kanban')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeView === 'kanban'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>

          <button
            onClick={() => onViewChange('table')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeView === 'table'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Agile Table</span>
          </button>

          <button
            onClick={() => onViewChange('ui-studio')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeView === 'ui-studio'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            <span>UI Design Studio</span>
          </button>

          <button
            onClick={() => onViewChange('progress')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeView === 'progress'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-750'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tiến Độ & Lịch Sử</span>
          </button>
        </div>

        {/* Right: Search and Filtering */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search box */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search stories, personas, criteria..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-8 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter by Epic */}
          <select
            value={selectedEpicId}
            onChange={(e) => onEpicFilterChange(e.target.value)}
            className="bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Epics</option>
            {epics.map(epic => (
              <option key={epic.id} value={epic.id}>
                {epic.title}
              </option>
            ))}
          </select>

          {/* Filter by MoSCoW Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            className="bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Priorities</option>
            {Object.entries(MOSCOW_PRIORITIES).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>

          {/* Filter by Status (relevant for Table and Matrix) */}
          {activeView !== 'kanban' && (
            <select
              value={selectedStatus}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              {Object.entries(STATUSES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          )}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-colors"
              title="Reset all filters"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <div className="text-[11px] text-slate-500 font-mono hidden xl:block ml-1">
            {totalMatchingStories} of {totalStories} stories
          </div>
        </div>
      </div>
    </div>
  );
}
