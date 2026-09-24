import React from 'react';
import { Trophy, CheckCircle2, Circle, Flame, RotateCcw } from 'lucide-react';
import { Problem } from '../types';

interface ProgressDashboardProps {
  problems: Problem[];
  completedIds: number[];
  onResetProgress: () => void;
  onFilterByStatus?: (status: 'All' | 'Completed' | 'Not Completed') => void;
  onFilterByDifficulty?: (difficulty: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  problems,
  completedIds,
  onResetProgress,
  onFilterByStatus,
  onFilterByDifficulty,
}) => {
  const total = problems.length;
  const completed = completedIds.length;
  const remaining = total - completed;
  const percentage = Math.round((completed / total) * 100) || 0;

  // Breakdown by difficulty
  const easyProblems = problems.filter((p) => p.difficulty === 'Easy');
  const mediumProblems = problems.filter((p) => p.difficulty === 'Medium');
  const hardProblems = problems.filter((p) => p.difficulty === 'Hard');

  const easyCompleted = easyProblems.filter((p) => completedIds.includes(p.id)).length;
  const mediumCompleted = mediumProblems.filter((p) => completedIds.includes(p.id)).length;
  const hardCompleted = hardProblems.filter((p) => completedIds.includes(p.id)).length;

  const easyPercent = Math.round((easyCompleted / easyProblems.length) * 100) || 0;
  const mediumPercent = Math.round((mediumCompleted / mediumProblems.length) * 100) || 0;
  const hardPercent = Math.round((hardCompleted / hardProblems.length) * 100) || 0;

  // Motivational message
  const getMotivationalText = () => {
    if (completed === 0) return 'Pick your first problem to kickstart your preparation!';
    if (completed < 10) return 'Great start! Building momentum on core patterns.';
    if (completed < 25) return 'Halfway there! Your Data Engineering intuition is sharpening.';
    if (completed < 40) return 'Almost finished! Final push through advanced streaming patterns.';
    return '🎉 Masterclass complete! You are ready to crush your Data Engineering interviews!';
  };

  return (
    <section className="py-8 bg-slate-50/50 dark:bg-[#0C101B]/50 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0F172A] rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
          {/* Top Row: Title, Motivation, and Reset */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                {completed === total ? (
                  <Trophy className="w-5 h-5 text-amber-500" />
                ) : (
                  <Flame className="w-5 h-5 text-indigo-500" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    Your Progress Dashboard
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {percentage}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {getMotivationalText()}
                </p>
              </div>
            </div>

            {completed > 0 && (
              <button
                onClick={onResetProgress}
                className="self-start sm:self-center inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors px-2.5 py-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-rose-200 dark:hover:border-rose-800/50"
                title="Reset completion progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Progress</span>
              </button>
            )}
          </div>

          {/* Main Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {completed} of {total} Problems Solved
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                {remaining} remaining
              </span>
            </div>
            
            <div className="relative h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Detailed Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Total */}
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50">
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Sheet
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {total}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                40 Curated
              </div>
            </div>

            {/* Completed */}
            <button
              onClick={() => onFilterByStatus && onFilterByStatus('Completed')}
              className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 text-left hover:border-emerald-400 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Completed
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300 mt-0.5">
                {completed}
              </div>
              <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
                {percentage}% of sheet
              </div>
            </button>

            {/* Remaining */}
            <button
              onClick={() => onFilterByStatus && onFilterByStatus('Not Completed')}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 text-left hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Remaining
                </span>
                <Circle className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {remaining}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                To complete
              </div>
            </button>

            {/* Easy */}
            <button
              onClick={() => onFilterByDifficulty && onFilterByDifficulty('Easy')}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 text-left hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Easy
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {easyPercent}%
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {easyCompleted} <span className="text-xs font-normal text-slate-400">/ {easyProblems.length}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${easyPercent}%` }}
                />
              </div>
            </button>

            {/* Medium */}
            <button
              onClick={() => onFilterByDifficulty && onFilterByDifficulty('Medium')}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 text-left hover:border-amber-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Medium
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {mediumPercent}%
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {mediumCompleted} <span className="text-xs font-normal text-slate-400">/ {mediumProblems.length}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${mediumPercent}%` }}
                />
              </div>
            </button>

            {/* Hard */}
            <button
              onClick={() => onFilterByDifficulty && onFilterByDifficulty('Hard')}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/50 text-left hover:border-rose-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Hard
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {hardPercent}%
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {hardCompleted} <span className="text-xs font-normal text-slate-400">/ {hardProblems.length}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${hardPercent}%` }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
