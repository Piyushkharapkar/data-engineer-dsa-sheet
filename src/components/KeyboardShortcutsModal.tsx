import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', description: 'Focus search bar instantly' },
    { key: 'F', description: 'Enter / Exit Focus Study Mode' },
    { key: 'N', description: 'Navigate to next problem (in Focus Mode)' },
    { key: 'P', description: 'Navigate to previous problem (in Focus Mode)' },
    { key: 'Space', description: 'Toggle completion status of active problem' },
    { key: 'T', description: 'Toggle Dark / Light theme mode' },
    { key: 'Esc', description: 'Close active modal / Exit Focus Mode' },
    { key: '?', description: 'Open this keyboard shortcuts cheat-sheet' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Keyboard className="w-5 h-5 text-indigo-500" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close shortcuts modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="py-4 space-y-2.5">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span className="text-slate-600 dark:text-slate-300">
                {sc.description}
              </span>
              <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200 shadow-xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            Designed for power-users & high-velocity coding prep
          </p>
        </div>
      </div>
    </div>
  );
};
