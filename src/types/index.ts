export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Priority = 'Must Master' | 'High Priority' | 'Good to Know';

export type Category = 
  | 'Arrays & Hashing'
  | 'Strings & Sliding Window'
  | 'Two Pointers'
  | 'Sorting & Searching'
  | 'Stack & Queue'
  | 'Linked List'
  | 'Heap & Streaming';

export interface Problem {
  id: number;
  numberDisplay: string;
  title: string;
  category: Category;
  pattern: string;
  difficulty: Difficulty;
  platform: 'LeetCode' | 'HackerRank' | 'GeeksforGeeks';
  url: string;
  priority: Priority;
  deRelevance: string; // Why this specific problem/pattern matters for Data Engineers
  tags: string[];
}

export interface PatternInfo {
  id: string;
  name: string;
  category: Category;
  description: string;
  deApplication: string;
  problemCount: number;
  sampleProblems: string[];
  iconName: string;
}

export interface FilterState {
  search: string;
  category: string;
  difficulty: string;
  status: 'All' | 'Completed' | 'Not Completed';
  priority: string;
  pattern: string;
}

export interface DEFocusArea {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  realWorldDE: string;
  topPatterns: string[];
}

export interface RoadmapStep {
  step: number;
  phase: string;
  title: string;
  description: string;
  problemIds: number[];
  estimatedHours: string;
  keyTakeaway: string;
}
