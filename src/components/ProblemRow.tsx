import React, { useState } from 'react';
import { ExternalLink, Check, Bookmark, ChevronDown, ChevronUp, Database, Sparkles } from 'lucide-react';
import { Problem, Difficulty, Priority } from '../types';

interface ProblemRowProps {
  problem: Problem;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onSelectPattern?: (pattern: string) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onSelectPattern,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Difficulty badge styles
  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
  };

  // Priority badge styles
  const getPriorityBadge = (pri: Priority) => {
    switch (pri) {
      case 'Must Master':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'High Priority':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
      case 'Good to Know':
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <>
      <tr
        className={`group transition-colors duration-150 border-b border-slate-200/70 dark:border-slate-800/70 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 ${
          isCompleted ? 'bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01]' : ''
        }`}
      >
        {/* Status Checkbox */}
        <td className="py-3.5 pl-4 pr-2 text-center w-12">
          <button
            onClick={() => onToggleComplete(problem.id)}
            className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
              isCompleted
                ? 'bg-emerald-500 text-white shadow-sm scale-105'
                : 'border border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 text-transparent hover:text-slate-300 dark:hover:text-slate-600'
            }`}
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            title={isCompleted ? 'Completed' : 'Click to complete'}
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </td>

        {/* Number */}
        <td className="py-3.5 px-3 text-xs font-mono text-slate-400 dark:text-slate-500 w-12">
          {problem.numberDisplay}
        </td>

        {/* Problem Title & DE Relevance Toggle */}
        <td className="py-3.5 px-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  isCompleted
                    ? 'text-slate-500 dark:text-slate-400 line-through decoration-slate-300 dark:decoration-slate-700'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {problem.title}
              </a>

              {/* Bookmark button */}
              <button
                onClick={() => onToggleBookmark(problem.id)}
                className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 ${
                  isBookmarked
                    ? 'opacity-100 text-amber-500 dark:text-amber-400'
                    : 'text-slate-400 hover:text-amber-500'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark problem'}
                aria-label="Bookmark problem"
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* DE Relevance Expand button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-auto md:ml-0"
                title="View Data Engineer context"
              >
                <Database className="w-3 h-3 text-indigo-500/70" />
                <span className="hidden xl:inline">DE Relevance</span>
                {isExpanded ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Tags preview */}
            <div className="flex flex-wrap items-center gap-1">
              {problem.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.2 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 rounded border border-slate-200/50 dark:border-slate-700/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </td>

        {/* Pattern */}
        <td className="py-3.5 px-3">
          <button
            onClick={() => onSelectPattern && onSelectPattern(problem.pattern)}
            className="text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors text-left"
          >
            {problem.pattern}
          </button>
        </td>

        {/* Category */}
        <td className="py-3.5 px-3 text-xs text-slate-600 dark:text-slate-400 hidden lg:table-cell">
          {problem.category}
        </td>

        {/* Difficulty */}
        <td className="py-3.5 px-3 whitespace-nowrap">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyBadge(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </td>

        {/* Priority */}
        <td className="py-3.5 px-3 whitespace-nowrap hidden sm:table-cell">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getPriorityBadge(
              problem.priority
            )}`}
          >
            {problem.priority}
          </span>
        </td>

        {/* Platform */}
        <td className="py-3.5 px-3 text-xs font-mono text-slate-500 dark:text-slate-400 hidden md:table-cell">
          {problem.platform}
        </td>

        {/* Solve Action Button */}
        <td className="py-3.5 pl-3 pr-4 text-right whitespace-nowrap">
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-slate-200 dark:hover:text-white transition-all duration-150 border border-slate-200 dark:border-slate-700 group/btn shadow-sm"
          >
            <span>Solve</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </td>
      </tr>

      {/* Expanded Row: DE Specific Context Drawer */}
      {isExpanded && (
        <tr className="bg-indigo-50/40 dark:bg-indigo-950/20 border-b border-slate-200/70 dark:border-slate-800/70 animate-fade-in">
          <td colSpan={9} className="px-6 py-3.5">
            <div className="flex items-start gap-3 text-xs">
              <div className="w-6 h-6 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Why this problem matters in Data Engineering:</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    DE Interview Context
                  </span>
                </div>
                <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {problem.deRelevance}
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Category: {problem.category}</span>
                  <span>•</span>
                  <span>Pattern: {problem.pattern}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
