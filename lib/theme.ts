export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'gurikireet-theme';

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const color = theme === 'dark' ? '#17191c' : '#ffffff';
  root.dataset.theme = theme;
  root.style.backgroundColor = color;
  root.style.colorScheme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => { meta.content = color; });
  document.querySelectorAll<HTMLMetaElement>('meta[name="color-scheme"]').forEach(meta => { meta.content = theme; });
}

// Runs before the first paint so a saved dark preference never flashes white.
// Storage may be unavailable in private/restricted browsing; system preference still works.
export const themeInitScript = `(()=>{
  let saved;
  try { saved = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch {}
  const theme = saved === 'light' || saved === 'dark' ? saved :
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
  const color = theme === 'dark' ? '#17191c' : '#ffffff';
  document.documentElement.style.backgroundColor = color;
  document.documentElement.style.colorScheme = theme;
  const syncChrome = () => {
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => { meta.content = color; });
    document.querySelectorAll('meta[name="color-scheme"]').forEach(meta => { meta.content = theme; });
  };
  syncChrome();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncChrome, {once:true});
})();`;
