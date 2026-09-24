import React from 'react';
import { CheckCircle2, Clock, Lightbulb, ArrowRight } from 'lucide-react';
import { LEARNING_ROADMAP } from '../data/roadmap';
import { Problem } from '../types';

interface LearningRoadmapProps {
  problems: Problem[];
  completedIds: number[];
  onSelectProblemIds: (ids: number[], phaseTitle: string) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({
  problems,
  completedIds,
  onSelectProblemIds,
}) => {
  return (
    <section id="roadmap" className="py-16 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-2">
              Structured Timeline
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Recommended Learning Order
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Follow this battle-tested progression to build intuition without feeling overwhelmed. Complete one phase before moving to the next.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            7 Sequential Phases • 30-Day Plan
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-4">
          {LEARNING_ROADMAP.map((step) => {
            const stepProblems = problems.filter((p) =>
              step.problemIds.includes(p.id)
            );
            const stepCompleted = stepProblems.filter((p) =>
              completedIds.includes(p.id)
            ).length;
            const isPhaseComplete =
              stepProblems.length > 0 && stepCompleted === stepProblems.length;

            return (
              <div
                key={step.step}
                className={`p-5 rounded-xl border transition-all duration-200 ${
                  isPhaseComplete
                    ? 'bg-emerald-500/[0.03] border-emerald-500/30'
                    : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Step Pill, Title, Description */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-mono font-bold text-sm border ${
                        isPhaseComplete
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {isPhaseComplete ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        `0${step.step}`
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {step.phase}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{step.estimatedHours}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        {step.description}
                      </p>

                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>
                          <strong>Core Insight:</strong> {step.keyTakeaway}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Progress Pill & Action Button */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                        {stepCompleted} / {stepProblems.length} solved
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {Math.round((stepCompleted / stepProblems.length) * 100)}% completed
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onSelectProblemIds(step.problemIds, step.title)
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-indigo-600 dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-700 hover:text-white dark:text-slate-200 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors shadow-sm group"
                    >
                      <span>Practice Phase</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
