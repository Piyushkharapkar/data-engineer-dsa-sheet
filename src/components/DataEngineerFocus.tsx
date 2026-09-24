import React from 'react';
import { Database, Activity, ArrowUpDown, TrendingUp, Search, GitFork } from 'lucide-react';
import { DE_FOCUS_AREAS } from '../data/focusAreas';

export const DataEngineerFocus: React.FC = () => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Hash':
        return <Database className="w-5 h-5 text-indigo-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-cyan-500" />;
      case 'ArrowUpDown':
        return <ArrowUpDown className="w-5 h-5 text-emerald-500" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-amber-500" />;
      case 'Search':
        return <Search className="w-5 h-5 text-blue-500" />;
      case 'GitFork':
        return <GitFork className="w-5 h-5 text-rose-500" />;
      default:
        return <Database className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section id="de-focus" className="py-16 bg-slate-50/50 dark:bg-[#090D16] border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-2">
            The Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Why DSA for Data Engineers?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Data Engineering interviews usually place more emphasis on <strong>SQL, Python, data modeling, Spark</strong>, and data engineering concepts than pure competitive programming. This sheet focuses exclusively on the DSA patterns that provide the most useful foundation without requiring hundreds of problems.
          </p>
        </div>

        {/* 6 Key Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DE_FOCUS_AREAS.map((area) => (
            <div
              key={area.id}
              className="p-6 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center mb-4">
                  {getIcon(area.icon)}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {area.title}
                </h3>
                <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mt-0.5 mb-2.5">
                  {area.tagline}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {area.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Real-World DE Pipeline Impact:
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  {area.realWorldDE}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Principle */}
        <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 via-indigo-500/5 to-cyan-500/10 border border-indigo-500/20 text-center max-w-4xl mx-auto">
          <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
            💡 <strong>The Golden Rule of DE Prep:</strong> "You don't need 500 DSA problems. Master these 40 problems and spend the rest of your prep on SQL window functions, Spark optimization, and system architecture."
          </p>
        </div>
      </div>
    </section>
  );
};
