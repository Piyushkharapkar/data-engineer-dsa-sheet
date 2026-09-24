import React from 'react';
import { Moon, Sun, Terminal, Search, HelpCircle, Target } from 'lucide-react';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  completedCount: number;
  totalCount: number;
  onOpenSearch: () => void;
  onOpenShortcuts: () => void;
  onEnterFocusMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  completedCount,
  totalCount,
  onOpenSearch,
  onOpenShortcuts,
  onEnterFocusMode,
}) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#080B11]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white font-mono">
                DataWithPiyush
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                DE
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Data Engineer DSA Sheet
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#problems"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Problems
          </a>
          <a
            href="#patterns"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Patterns
          </a>
          <a
            href="#roadmap"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Roadmap
          </a>
          <a
            href="#de-focus"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Why DSA for DE?
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Search problems (Press /)"
            aria-label="Search problems"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-400">
              /
            </kbd>
          </button>

          {/* Focus Mode Trigger */}
          <button
            onClick={onEnterFocusMode}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Enter Focus Study Mode (Press F)"
          >
            <Target className="w-3.5 h-3.5 text-indigo-500" />
            <span>Focus Mode</span>
          </button>

          {/* Mini Progress Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-full text-xs text-slate-600 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {completedCount}/{totalCount}
            </span>
            <span className="text-slate-400">({percentage}%)</span>
          </div>

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={onOpenShortcuts}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Keyboard shortcuts (Press ?)"
            aria-label="Keyboard shortcuts"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
