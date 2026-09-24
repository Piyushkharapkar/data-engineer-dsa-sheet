const STORAGE_KEYS = {
  COMPLETED_PROBLEMS: 'dwp_de_completed_problems_v1',
  THEME: 'dwp_de_theme_v1',
  BOOKMARKED_PROBLEMS: 'dwp_de_bookmarked_problems_v1',
  USER_NOTES: 'dwp_de_notes_v1',
};

export function getStoredCompletedProblems(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_PROBLEMS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading completed problems from localStorage', e);
    return [];
  }
}

export function saveStoredCompletedProblems(completedIds: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_PROBLEMS, JSON.stringify(completedIds));
  } catch (e) {
    console.error('Error saving completed problems to localStorage', e);
  }
}

export function getStoredTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to dark mode as requested for modern developer tool feel
    return 'dark';
  } catch {
    return 'dark';
  }
}

export function saveStoredTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Error saving theme to localStorage', e);
  }
}

export function getStoredBookmarks(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_PROBLEMS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredBookmarks(bookmarkIds: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKED_PROBLEMS, JSON.stringify(bookmarkIds));
  } catch (e) {
    console.error('Error saving bookmarks to localStorage', e);
  }
}
