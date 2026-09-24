import React from 'react';
import {
  Database,
  Maximize2,
  GitCompare,
  TrendingUp,
  CalendarRange,
  Search,
  Layers,
  CircleDot,
  BarChart3,
  Code2,
  ArrowRight,
} from 'lucide-react';
import { PatternInfo } from '../types';

interface PatternExplorerProps {
  patterns: PatternInfo[];
  activePattern: string;
  onSelectPattern: (patternName: string) => void;
}

export const PatternExplorer: React.FC<PatternExplorerProps> = ({
  patterns,
  activePattern,
  onSelectPattern,
}) => {
  // Map icon names to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-500" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-cyan-500" />;
      case 'GitCompare':
        return <GitCompare className="w-5 h-5 text-emerald-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-amber-500" />;
      case 'CalendarRange':
        return <CalendarRange className="w-5 h-5 text-purple-500" />;
      case 'Search':
        return <Search className="w-5 h-5 text-blue-500" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-rose-500" />;
      case 'CircleDot':
        return <CircleDot className="w-5 h-5 text-teal-500" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-indigo-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-orange-400" />;
      default:
        return <Database className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section id="patterns" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-2">
              Mental Models
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Master the Patterns
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Algorithms change, but core patterns remain the same. Click any pattern below to filter the 40-problem sheet.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {patterns.length} Core Data Engineering Patterns
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patterns.map((pat) => {
            const isSelected = activePattern.toLowerCase() === pat.name.toLowerCase();

            return (
              <div
                key={pat.id}
                onClick={() => onSelectPattern(pat.name)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                    : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800/80 hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                      {getIcon(pat.iconName)}
                    </div>
                    <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60">
                      {pat.problemCount} problems
                    </span>
                  </div>

                  {/* Pattern Name */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {pat.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {pat.description}
                  </p>

                  {/* DE Real World Connection */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                      DE Application:
                    </span>
                    <p className="line-clamp-2">{pat.deApplication}</p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  <span>Explore Problems</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
