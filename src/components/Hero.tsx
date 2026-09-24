import React from 'react';
import { ArrowRight, Layers, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartPracticing: () => void;
  onExplorePatterns: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPracticing,
  onExplorePatterns,
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-grid-pattern overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Curated for Students, Freshers & Early-Career Data Engineers</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          Data Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400">DSA Sheet</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-6">
          40 carefully selected DSA problems to build the patterns you actually need for Data Engineering interviews.
        </p>

        {/* Supporting Line of Topics */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
          <span>Arrays</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Hashing</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Strings</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Sliding Window</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Two Pointers</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Sorting</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Binary Search</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Stack</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Heap</span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span>Linked List</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={onStartPracticing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-sm hover:shadow-indigo-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 group"
          >
            <span>Start Practicing</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onExplorePatterns}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Master Patterns</span>
          </button>
        </div>

        {/* Value Proposition Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-left">
          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">40 Curated Problems</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Zero filler, 100% targeted</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
            <Database className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">DE-Focused Context</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">SQL & PySpark pipeline ties</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">10 Core Patterns</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Master reusable intuition</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Built-in Tracking</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Offline-first localStorage</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
