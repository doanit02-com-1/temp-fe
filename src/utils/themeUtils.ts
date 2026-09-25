/**
 * Theme Utilities
 */

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored) return stored;

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function setTheme(theme: Theme): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }
}

export function toggleTheme(): Theme {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}

function applyTheme(theme: Theme): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

// Apply theme on startup
export function initializeTheme(): void {
  applyTheme(getTheme());
}
