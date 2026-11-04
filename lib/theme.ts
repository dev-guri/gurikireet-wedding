export type Theme = 'light' | 'dark';
export const THEME_STORAGE_KEY = 'gurikireet-theme';

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const color = theme === 'dark' ? '#17191c' : '#ffffff';
  root.dataset.theme = theme;
  root.style.backgroundColor = color;
  root.style.colorScheme = theme;
  if (document.body) {
    document.body.style.backgroundColor = color;
    document.body.style.colorScheme = theme;
  }
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => {
    // Keep Next's managed node intact so hydration cannot create a second,
    // stale theme-color tag. The opaque top-edge surface handles Safari tint.
    if (meta.content !== color) meta.content = color;
  });
  document.querySelectorAll<HTMLMetaElement>('meta[name="color-scheme"]').forEach(meta => {
    if (meta.content !== theme) meta.content = theme;
  });
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
  // Metadata is synchronized after hydration by ThemeToggle. Mutating Next's
  // server-rendered meta contents here can make React duplicate those tags.
})();`;
