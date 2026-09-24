import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { PROBLEMS_DATA } from './data/problems';
import { PATTERNS_DATA } from './data/patterns';
import { FilterState, Category } from './types';
import {
  getStoredCompletedProblems,
  saveStoredCompletedProblems,
  getStoredTheme,
  saveStoredTheme,
  getStoredBookmarks,
  saveStoredBookmarks,
} from './utils/storage';
import { fireCompletionConfetti, fireMilestoneConfetti } from './utils/confetti';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProgressDashboard } from './components/ProgressDashboard';
import { FilterBar } from './components/FilterBar';
import { ProblemTable } from './components/ProblemTable';
import { PatternExplorer } from './components/PatternExplorer';
import { DataEngineerFocus } from './components/DataEngineerFocus';
import { LearningRoadmap } from './components/LearningRoadmap';
import { FocusMode } from './components/FocusMode';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // -------------------------------------------------------------
  // State Initialization
  // -------------------------------------------------------------
  const [completedIds, setCompletedIds] = useState<number[]>(() =>
    getStoredCompletedProblems()
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() =>
    getStoredBookmarks()
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getStoredTheme());

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All',
    difficulty: 'All',
    status: 'All',
    priority: 'All',
    pattern: '',
  });

  const [selectedPhaseProblemIds, setSelectedPhaseProblemIds] = useState<number[] | null>(null);
  const [activePhaseTitle, setActivePhaseTitle] = useState<string>('');

  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [focusCurrentIndex, setFocusCurrentIndex] = useState<number>(0);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------
  // Theme Management
  // -------------------------------------------------------------
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // -------------------------------------------------------------
  // Completion Toggle with Confetti & Milestones
  // -------------------------------------------------------------
  const handleToggleComplete = useCallback(
    (id: number) => {
      setCompletedIds((prev) => {
        let updated: number[];
        const wasCompleted = prev.includes(id);

        if (wasCompleted) {
          updated = prev.filter((item) => item !== id);
        } else {
          updated = [...prev, id];
          // Fire micro confetti
          fireCompletionConfetti();

          // Milestone triggers
          const newCount = updated.length;
          if (
            newCount === 10 ||
            newCount === 20 ||
            newCount === 30 ||
            newCount === 40
          ) {
            setTimeout(() => {
              fireMilestoneConfetti();
            }, 300);
          }
        }

        saveStoredCompletedProblems(updated);
        return updated;
      });
    },
    []
  );

  // -------------------------------------------------------------
  // Bookmark Toggle
  // -------------------------------------------------------------
  const handleToggleBookmark = useCallback((id: number) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      saveStoredBookmarks(updated);
      return updated;
    });
  }, []);

  // -------------------------------------------------------------
  // Reset Progress
  // -------------------------------------------------------------
  const handleConfirmReset = () => {
    setCompletedIds([]);
    saveStoredCompletedProblems([]);
    setShowResetConfirm(false);
  };

  // -------------------------------------------------------------
  // Filter Categories
  // -------------------------------------------------------------
  const categories = useMemo(() => {
    const set = new Set<Category>();
    PROBLEMS_DATA.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  // -------------------------------------------------------------
  // Filtered Problems Computation
  // -------------------------------------------------------------
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter((p) => {
      // Phase filtering
      if (selectedPhaseProblemIds && !selectedPhaseProblemIds.includes(p.id)) {
        return false;
      }

      // Search term (title, pattern, category, tags)
      if (filters.search.trim() !== '') {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesPattern = p.pattern.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        const matchesNumber = p.numberDisplay.includes(query) || `${p.id}` === query;

        if (!matchesTitle && !matchesPattern && !matchesCategory && !matchesTags && !matchesNumber) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'All' && p.category !== filters.category) {
        return false;
      }

      // Difficulty
      if (filters.difficulty !== 'All' && p.difficulty !== filters.difficulty) {
        return false;
      }

      // Priority
      if (filters.priority !== 'All' && p.priority !== filters.priority) {
        return false;
      }

      // Status
      if (filters.status === 'Completed' && !completedIds.includes(p.id)) {
        return false;
      }
      if (filters.status === 'Not Completed' && completedIds.includes(p.id)) {
        return false;
      }

      // Pattern Filter from Explorer
      if (
        filters.pattern !== '' &&
        !p.pattern.toLowerCase().includes(filters.pattern.toLowerCase()) &&
        !p.tags.some((t) => t.toLowerCase().includes(filters.pattern.toLowerCase()))
      ) {
        return false;
      }

      return true;
    });
  }, [filters, completedIds, selectedPhaseProblemIds]);

  // -------------------------------------------------------------
  // Navigation & Interactive Jump Helpers
  // -------------------------------------------------------------
  const scrollToProblems = () => {
    const el = document.getElementById('problems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPatterns = () => {
    const el = document.getElementById('patterns');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPattern = (patternName: string) => {
    setSelectedPhaseProblemIds(null);
    setActivePhaseTitle('');
    setFilters((prev) => ({
      ...prev,
      pattern: prev.pattern === patternName ? '' : patternName,
      category: 'All',
    }));
    scrollToProblems();
  };

  const handleSelectRoadmapPhase = (problemIds: number[], phaseTitle: string) => {
    setSelectedPhaseProblemIds(problemIds);
    setActivePhaseTitle(phaseTitle);
    setFilters({
      search: '',
      category: 'All',
      difficulty: 'All',
      status: 'All',
      priority: 'All',
      pattern: '',
    });
    scrollToProblems();
  };

  const handleFilterByStatus = (status: 'All' | 'Completed' | 'Not Completed') => {
    setSelectedPhaseProblemIds(null);
    setActivePhaseTitle('');
    setFilters((prev) => ({
      ...prev,
      status: prev.status === status ? 'All' : status,
    }));
    scrollToProblems();
  };

  const handleFilterByDifficulty = (diff: string) => {
    setSelectedPhaseProblemIds(null);
    setActivePhaseTitle('');
    setFilters((prev) => ({
      ...prev,
      difficulty: prev.difficulty === diff ? 'All' : diff,
    }));
    scrollToProblems();
  };

  // -------------------------------------------------------------
  // Keyboard Shortcuts Listener
  // -------------------------------------------------------------
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (e.target as HTMLElement).tagName
      );

      // Escape to close modals
      if (e.key === 'Escape') {
        if (isShortcutsOpen) setIsShortcutsOpen(false);
        if (showResetConfirm) setShowResetConfirm(false);
        if (isFocusMode) setIsFocusMode(false);
        return;
      }

      if (isInput) return;

      if (e.key === '/') {
        e.preventDefault();
        searchInputRef.current?.focus();
        scrollToProblems();
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        toggleTheme();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFocusMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isShortcutsOpen, showResetConfirm, isFocusMode]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-slate-900 dark:bg-[#080B11] dark:text-[#F1F5F9] transition-colors duration-200">
      {/* 1. Sticky Navigation Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        completedCount={completedIds.length}
        totalCount={PROBLEMS_DATA.length}
        onOpenSearch={() => {
          searchInputRef.current?.focus();
          scrollToProblems();
        }}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onEnterFocusMode={() => setIsFocusMode(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onStartPracticing={scrollToProblems}
          onExplorePatterns={scrollToPatterns}
        />

        {/* 3. Progress Dashboard */}
        <ProgressDashboard
          problems={PROBLEMS_DATA}
          completedIds={completedIds}
          onResetProgress={() => setShowResetConfirm(true)}
          onFilterByStatus={handleFilterByStatus}
          onFilterByDifficulty={handleFilterByDifficulty}
        />

        {/* 4. Main Problem List Section */}
        <section id="problems" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-2">
                The Curated Sheet
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                All Problems
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Master these 40 problems to develop the intuition needed for Top Data Engineering interviews.
              </p>
            </div>

            {/* Active Phase Pill if filtered from Roadmap */}
            {selectedPhaseProblemIds && activePhaseTitle && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                <span>Phase: <strong>{activePhaseTitle}</strong></span>
                <button
                  onClick={() => {
                    setSelectedPhaseProblemIds(null);
                    setActivePhaseTitle('');
                  }}
                  className="ml-1 text-slate-400 hover:text-indigo-900 dark:hover:text-white"
                  title="Clear Phase filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <div className="mb-6">
            <FilterBar
              filters={filters}
              onFilterChange={(newFilters) => {
                setSelectedPhaseProblemIds(null);
                setActivePhaseTitle('');
                setFilters(newFilters);
              }}
              categories={categories}
              totalProblems={PROBLEMS_DATA.length}
              filteredCount={filteredProblems.length}
              searchInputRef={searchInputRef}
            />
          </div>

          {/* Table / Cards */}
          <ProblemTable
            problems={filteredProblems}
            completedIds={completedIds}
            bookmarkedIds={bookmarkedIds}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onSelectPattern={handleSelectPattern}
            onClearFilters={() => {
              setSelectedPhaseProblemIds(null);
              setActivePhaseTitle('');
              setFilters({
                search: '',
                category: 'All',
                difficulty: 'All',
                status: 'All',
                priority: 'All',
                pattern: '',
              });
            }}
          />
        </section>

        {/* 5. Pattern Explorer Section */}
        <PatternExplorer
          patterns={PATTERNS_DATA}
          activePattern={filters.pattern}
          onSelectPattern={handleSelectPattern}
        />

        {/* 6. Why DSA for Data Engineers Focus Section */}
        <DataEngineerFocus />

        {/* 7. Recommended Learning Order Roadmap */}
        <LearningRoadmap
          problems={PROBLEMS_DATA}
          completedIds={completedIds}
          onSelectProblemIds={handleSelectRoadmapPhase}
        />
      </main>

      {/* 8. Minimalist Brand Footer */}
      <Footer />

      {/* 9. Focus Study Mode Modal / Screen */}
      {isFocusMode && (
        <FocusMode
          problems={PROBLEMS_DATA}
          currentIndex={focusCurrentIndex}
          completedIds={completedIds}
          bookmarkedIds={bookmarkedIds}
          onClose={() => setIsFocusMode(false)}
          onNavigate={(index) => setFocusCurrentIndex(index)}
          onToggleComplete={handleToggleComplete}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* 10. Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* 11. Reset Progress Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Reset All Progress?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              This will uncheck all completed problems stored in your browser's local storage. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-sm"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
