import React from 'react';
import { Search, X, Filter, Sparkles, SlidersHorizontal } from 'lucide-react';
import { FilterState, Category } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: Category[];
  totalProblems: number;
  filteredCount: number;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  categories,
  totalProblems,
  filteredCount,
  searchInputRef,
}) => {
  const isAnyFilterActive =
    filters.search !== '' ||
    filters.category !== 'All' ||
    filters.difficulty !== 'All' ||
    filters.status !== 'All' ||
    filters.priority !== 'All' ||
    filters.pattern !== '';

  const handleResetFilters = () => {
    onFilterChange({
      search: '',
      category: 'All',
      difficulty: 'All',
      status: 'All',
      priority: 'All',
      pattern: '',
    });
  };

  const handleCategorySelect = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? 'All' : category,
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Bar: Search Input and Quick Dropdowns */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search problems, patterns, categories, or tags... (Press '/' to focus)"
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-sm"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ ...filters, search: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Filter */}
          <div className="flex items-center bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 text-xs">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => {
              const active = filters.difficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() =>
                    onFilterChange({ ...filters, difficulty: diff })
                  }
                  className={`px-2.5 py-1.5 rounded-md font-medium transition-all ${
                    active
                      ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) =>
                onFilterChange({ ...filters, priority: e.target.value })
              }
              aria-label="Filter by priority"
              className="appearance-none text-xs font-medium pl-3 pr-8 py-2 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
            >
              <option value="All">Priority: All</option>
              <option value="Must Master">⭐ Must Master</option>
              <option value="High Priority">🔥 High Priority</option>
              <option value="Good to Know">💡 Good to Know</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <SlidersHorizontal className="w-3 h-3" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  status: e.target.value as 'All' | 'Completed' | 'Not Completed',
                })
              }
              aria-label="Filter by status"
              className="appearance-none text-xs font-medium pl-3 pr-8 py-2 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
            >
              <option value="All">Status: All</option>
              <option value="Completed">✓ Completed</option>
              <option value="Not Completed">○ Incomplete</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <Filter className="w-3 h-3" />
            </div>
          </div>

          {/* Clear Filters Button */}
          {isAnyFilterActive && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg border border-rose-200/80 dark:border-rose-900/50 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <button
          onClick={() => onFilterChange({ ...filters, category: 'All' })}
          className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
            filters.category === 'All'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60'
          }`}
        >
          All Categories ({totalProblems})
        </button>

        {categories.map((cat) => {
          const active = filters.category === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                active
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Pattern Active Banner if filtered by Pattern Explorer */}
      {filters.pattern && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>
            Filtered by Pattern: <strong>{filters.pattern}</strong>
          </span>
          <button
            onClick={() => onFilterChange({ ...filters, pattern: '' })}
            className="p-0.5 hover:text-indigo-900 dark:hover:text-white rounded"
            title="Remove pattern filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
        <div>
          Showing <strong>{filteredCount}</strong> of <strong>{totalProblems}</strong> curated problems
        </div>
        {filteredCount === 0 && (
          <div className="text-amber-500 dark:text-amber-400 font-sans">
            No problems match the current filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};
