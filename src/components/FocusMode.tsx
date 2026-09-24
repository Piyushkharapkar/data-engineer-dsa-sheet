import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Database,
  Bookmark,
} from 'lucide-react';
import { Problem, Difficulty, Priority } from '../types';

interface FocusModeProps {
  problems: Problem[];
  currentIndex: number;
  completedIds: number[];
  bookmarkedIds: number[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({
  problems,
  currentIndex,
  completedIds,
  bookmarkedIds,
  onClose,
  onNavigate,
  onToggleComplete,
  onToggleBookmark,
}) => {
  const problem = problems[currentIndex] || problems[0];
  const isCompleted = completedIds.includes(problem?.id);
  const isBookmarked = bookmarkedIds.includes(problem?.id);

  // Keyboard navigation inside Focus Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        if (currentIndex < problems.length - 1) {
          onNavigate(currentIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'p' || e.key === 'P') {
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        }
      } else if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        onToggleComplete(problem.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, problems, onClose, onNavigate, onToggleComplete, problem]);

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
    <div className="fixed inset-0 z-50 bg-[#080B11]/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fade-in text-white p-4 sm:p-6 md:p-8">
      {/* Top Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-indigo-500/20 border border-indigo-500/40 font-mono text-xs text-indigo-300 font-semibold">
            FOCUS STUDY MODE
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Problem {currentIndex + 1} of {problems.length}
          </span>
        </div>

        {/* Quick Problem Selector Dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={currentIndex}
            onChange={(e) => onNavigate(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer hidden md:block"
          >
            {problems.map((p, idx) => (
              <option key={p.id} value={idx}>
                #{p.numberDisplay} - {p.title} ({p.difficulty}) {completedIds.includes(p.id) ? '✓' : ''}
              </option>
            ))}
          </select>

          {/* Close / Exit Button */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Exit Focus Mode (Esc)"
          >
            <span>Exit</span>
            <kbd className="px-1 py-0.2 bg-slate-900 rounded text-[10px] font-mono text-slate-400">Esc</kbd>
            <X className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Main Focus Content Area */}
      <div className="max-w-3xl w-full mx-auto my-auto py-8">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none -z-10 rounded-full" />

          {/* Header row: Number, Category & Bookmark */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-800 text-indigo-400 border border-slate-700 font-bold">
                Problem #{problem.numberDisplay}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {problem.category}
              </span>
            </div>

            <button
              onClick={() => onToggleBookmark(problem.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-amber-400'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark problem'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Problem Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {problem.title}
          </h1>

          {/* Metadata Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-8 text-xs font-mono">
            <div className="px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 font-medium">
              Pattern: {problem.pattern}
            </div>

            <span className={`px-2.5 py-1 rounded-lg font-medium border ${getDifficultyBadge(problem.difficulty)}`}>
              {problem.difficulty}
            </span>

            <span className={`px-2.5 py-1 rounded-lg font-medium border ${getPriorityBadge(problem.priority)}`}>
              {problem.priority}
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              Platform: {problem.platform}
            </span>
          </div>

          {/* DE Relevance Box */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 mb-8 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Database className="w-4 h-4" />
              <span>Data Engineering Relevance & Pipeline Context</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {problem.deRelevance}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-8">
            <span className="text-xs text-slate-500 mr-1">Tags:</span>
            {problem.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800/80 text-slate-400 border border-slate-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions Row: Solve on LeetCode & Mark Complete */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-slate-800">
            {/* Mark Complete Toggle Button */}
            <button
              onClick={() => onToggleComplete(problem.id)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Completed ✓</span>
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5 text-slate-400" />
                  <span>Mark as Completed</span>
                </>
              )}
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-400 ml-1">
                Space
              </kbd>
            </button>

            {/* External Solve Link */}
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all group"
            >
              <span>Solve Problem on {problem.platform}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Shortcuts Footer */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
        <button
          onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (P)</span>
        </button>

        <div className="hidden sm:flex items-center gap-4 text-slate-500 font-mono text-[11px]">
          <span>[N] Next</span>
          <span>[P] Prev</span>
          <span>[Space] Complete</span>
          <span>[Esc] Exit</span>
        </div>

        <button
          onClick={() =>
            currentIndex < problems.length - 1 && onNavigate(currentIndex + 1)
          }
          disabled={currentIndex === problems.length - 1}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-800 transition-colors"
        >
          <span>Next (N)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
