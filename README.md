# DataWithPiyush — Data Engineer DSA Sheet

> **40 problems. The right patterns. Built for Data Engineers.**

A modern, minimalistic, and highly attractive developer platform curated specifically for students, freshers, and early-career Data Engineers preparing for coding and algorithmic interviews.

---

## 🚀 Key Highlights

- **40 Curated Problems:** Targeted specifically for Data Engineering interviews (Zero filler, 100% relevance).
- **10 Mental Model Patterns:** HashMap Lookups, Sliding Windows, Two Pointers, Prefix Sum, Interval Merging, Monotonic Stacks, Binary Search, Heaps & K-Way Merging.
- **DE-Specific Interview Context:** Every problem includes an expandable drawer explaining its direct connection to SQL engines (`GROUP BY`, `JOIN`, `LEAD/LAG`), PySpark operations, Flink streaming windows, and B+ Tree indexing.
- **Interactive Progress Dashboard:** Real-time completion metrics, difficulty breakdown (Easy / Medium / Hard), progress percentage, and celebratory milestone confetti.
- **Offline-First Persistence:** Progress and bookmarks persist in `localStorage` — no login required.
- **Focus Study Mode:** Distraction-free single-problem study interface with keyboard navigation (`N` for next, `P` for previous, `Space` to toggle completion, `Esc` to exit).
- **Phased 30-Day Learning Roadmap:** 7 sequential phases with time estimates and core takeaways.
- **Comprehensive Filtering & Instant Search:** Filter by Category, Difficulty, Status, Priority, or search by name, tag, or pattern without page reloads.
- **Light & Dark Mode:** Restrained modern palette (near-black charcoal default with instant toggle).
- **Keyboard Shortcuts:** Fast power-user shortcuts (`/`, `F`, `N`, `P`, `Space`, `T`, `?`, `Esc`).

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS (Dark/Light mode via class strategy)
- **Icons:** Lucide React & Custom SVG
- **Animations:** Canvas Confetti for celebratory milestones
- **State & Storage:** React Hooks + LocalStorage API

---

## 📁 Project Architecture

```
sharp-borg/
├── index.html                    # SEO meta tags, Google Fonts, OpenGraph
├── package.json                  # Scripts and dependencies
├── postcss.config.js             # PostCSS Tailwind config
├── tailwind.config.js            # Design system, theme colors & typography
├── tsconfig.json                 # TypeScript compiler options
├── vite.config.ts                # Vite React configuration
└── src/
    ├── main.tsx                  # React DOM mount point
    ├── App.tsx                   # Central state orchestrator & layout
    ├── index.css                 # Global Tailwind styles & custom scrollbars
    ├── types/
    │   └── index.ts              # TypeScript interfaces for problems, patterns, filters
    ├── data/
    │   ├── problems.ts           # Curated 40 problems with verified LeetCode URLs & DE context
    │   ├── patterns.ts           # 10 DSA patterns with real-world pipeline applications
    │   ├── focusAreas.ts         # "Why DSA for Data Engineers" core principles
    │   └── roadmap.ts            # Phased 7-step recommended learning timeline
    ├── utils/
    │   ├── storage.ts            # LocalStorage helpers for progress, theme, and bookmarks
    │   └── confetti.ts           # Milestone celebration animations
    └── components/
        ├── Header.tsx            # Sticky header with brand logo, nav & search shortcut
        ├── Hero.tsx              # Hero section with brand tagline & CTA buttons
        ├── ProgressDashboard.tsx # Real-time statistics & visual progress bar
        ├── FilterBar.tsx         # Search input, category pills, difficulty & priority filters
        ├── ProblemTable.tsx      # Desktop table layout
        ├── ProblemRow.tsx        # Individual row with expandable DE context drawer
        ├── ProblemCardMobile.tsx # Mobile-optimized responsive card
        ├── PatternExplorer.tsx   # Visual grid of 10 patterns with direct filter triggers
        ├── DataEngineerFocus.tsx # Detailed DE architectural value propositions
        ├── LearningRoadmap.tsx   # Phased step-by-step roadmap
        ├── FocusMode.tsx         # Immersive single-problem study view
        ├── KeyboardShortcutsModal.tsx # Keyboard shortcuts cheat-sheet modal
        └── Footer.tsx            # Minimalist footer with brand links
```

---

## 💻 Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `/` | Focus search bar instantly |
| `F` | Toggle Focus Study Mode |
| `N` | Navigate to next problem in Focus Mode |
| `P` | Navigate to previous problem in Focus Mode |
| `Space` | Toggle completion status of active problem |
| `T` | Toggle Dark / Light theme |
| `?` | Open Keyboard Shortcuts modal |
| `Esc` | Close active modal / Exit Focus Mode |

---

## 📑 Curated 40 Problems Breakdown

1. **Arrays & Hashing (10 Problems):** Two Sum, Contains Duplicate, Valid Anagram, Group Anagrams, Product of Array Except Self, Maximum Subarray, Longest Consecutive Sequence, Top K Frequent Elements, Majority Element, Missing Number.
2. **Strings & Sliding Window (6 Problems):** Longest Substring Without Repeating Characters, Valid Palindrome, Longest Palindromic Substring, Minimum Size Subarray Sum, Permutation in String, Longest Repeating Character Replacement.
3. **Two Pointers (5 Problems):** 3Sum, Container With Most Water, Best Time to Buy and Sell Stock, Merge Sorted Array, Move Zeroes.
4. **Sorting & Searching / Intervals (5 Problems):** Merge Intervals, Insert Interval, Binary Search, Search in Rotated Sorted Array, Subarray Sum Equals K.
5. **Stack & Queue (5 Problems):** Valid Parentheses, Daily Temperatures, Min Stack, Implement Queue Using Stacks, Evaluate Reverse Polish Notation.
6. **Linked List (4 Problems):** Reverse Linked List, Linked List Cycle, Merge Two Sorted Lists, Remove Nth Node From End of List.
7. **Heap & Streaming (5 Problems):** Kth Largest Element in an Array, K Closest Points to Origin, Find Median from Data Stream, Merge K Sorted Lists, Task Scheduler.

---

© 2026 DataWithPiyush. Built for Data Engineers who want to focus on the right problems.
