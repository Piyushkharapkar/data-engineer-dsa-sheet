import React, { useState } from 'react';
import { ExternalLink, Check, Bookmark, ChevronDown, ChevronUp, Database } from 'lucide-react';
import { Problem, Difficulty, Priority } from '../types';

interface ProblemCardMobileProps {
  problem: Problem;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onSelectPattern?: (pattern: string) => void;
}

export const ProblemCardMobile: React.FC<ProblemCardMobileProps> = ({
  problem,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onSelectPattern,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div
      className={`p-4 rounded-xl border transition-all duration-150 ${
        isCompleted
          ? 'bg-emerald-500/[0.03] border-emerald-500/30 dark:bg-emerald-500/[0.02]'
          : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 shadow-sm'
      }`}
    >
      {/* Top row: Checkbox, Number, Title & Bookmark */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(problem.id)}
          className={`w-6 h-6 rounded-md shrink-0 mt-0.5 flex items-center justify-center transition-all ${
            isCompleted
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'border border-slate-300 dark:border-slate-700 text-transparent'
          }`}
          aria-label={isCompleted ? 'Completed' : 'Mark complete'}
        >
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
            <span>#{problem.numberDisplay}</span>
            <span>•</span>
            <span className="truncate">{problem.category}</span>
          </div>

          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-semibold block leading-tight ${
              isCompleted
                ? 'text-slate-500 dark:text-slate-400 line-through'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {problem.title}
          </a>
        </div>

        <button
          onClick={() => onToggleBookmark(problem.id)}
          className={`p-1 rounded text-slate-400 ${
            isBookmarked ? 'text-amber-500' : ''
          }`}
          aria-label="Bookmark"
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Pattern & Badges Row */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => onSelectPattern && onSelectPattern(problem.pattern)}
          className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/60"
        >
          {problem.pattern}
        </button>

        <span
          className={`px-2 py-0.5 rounded font-medium border ${getDifficultyBadge(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </span>

        <span
          className={`px-2 py-0.5 rounded font-medium border ${getPriorityBadge(
            problem.priority
          )}`}
        >
          {problem.priority}
        </span>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <Database className="w-3.5 h-3.5 text-indigo-500" />
          <span>DE Context</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
        >
          <span>Solve on {problem.platform}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Expandable DE Context */}
      {isExpanded && (
        <div className="mt-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-medium text-slate-900 dark:text-white mb-1">
            Data Engineering Relevance:
          </div>
          <p className="leading-relaxed">{problem.deRelevance}</p>
        </div>
      )}
    </div>
  );
};
