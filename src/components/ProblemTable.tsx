import React from 'react';
import { Problem } from '../types';
import { ProblemRow } from './ProblemRow';
import { ProblemCardMobile } from './ProblemCardMobile';
import { SearchX } from 'lucide-react';

interface ProblemTableProps {
  problems: Problem[];
  completedIds: number[];
  bookmarkedIds: number[];
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onSelectPattern?: (pattern: string) => void;
  onClearFilters?: () => void;
}

export const ProblemTable: React.FC<ProblemTableProps> = ({
  problems,
  completedIds,
  bookmarkedIds,
  onToggleComplete,
  onToggleBookmark,
  onSelectPattern,
  onClearFilters,
}) => {
  if (problems.length === 0) {
    return (
      <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
          No matching problems found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
          Try adjusting your search keyword, category, difficulty, or priority filters.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View (< 768px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
        {problems.map((problem) => (
          <ProblemCardMobile
            key={problem.id}
            problem={problem}
            isCompleted={completedIds.includes(problem.id)}
            isBookmarked={bookmarkedIds.includes(problem.id)}
            onToggleComplete={onToggleComplete}
            onToggleBookmark={onToggleBookmark}
            onSelectPattern={onSelectPattern}
          />
        ))}
      </div>

      {/* Desktop / Tablet Table (>= 768px) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/60 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                <th className="py-3 pl-4 pr-2 text-center w-12">Status</th>
                <th className="py-3 px-3 w-12">#</th>
                <th className="py-3 px-3 min-w-[220px]">Problem</th>
                <th className="py-3 px-3 min-w-[150px]">Pattern</th>
                <th className="py-3 px-3 hidden lg:table-cell min-w-[140px]">
                  Category
                </th>
                <th className="py-3 px-3 w-24">Difficulty</th>
                <th className="py-3 px-3 hidden sm:table-cell w-28">Priority</th>
                <th className="py-3 px-3 hidden md:table-cell w-24">Platform</th>
                <th className="py-3 pl-3 pr-4 text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 font-sans text-sm">
              {problems.map((problem) => (
                <ProblemRow
                  key={problem.id}
                  problem={problem}
                  isCompleted={completedIds.includes(problem.id)}
                  isBookmarked={bookmarkedIds.includes(problem.id)}
                  onToggleComplete={onToggleComplete}
                  onToggleBookmark={onToggleBookmark}
                  onSelectPattern={onSelectPattern}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
