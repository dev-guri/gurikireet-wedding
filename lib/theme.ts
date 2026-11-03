export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'gurikireet-theme';

// Runs before the first paint so a saved dark preference never flashes white.
// Storage may be unavailable in private/restricted browsing; system preference still works.
export const themeInitScript = `(()=>{
  let saved;
  try { saved = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch {}
  const theme = saved === 'light' || saved === 'dark' ? saved :
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
})();`;
