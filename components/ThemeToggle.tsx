'use client';

import { useEffect, useState } from 'react';
import { applyTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = (next: Theme) => {
      applyTheme(next);
      setTheme(next);
    };
    const syncPreference = () => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(THEME_STORAGE_KEY); } catch {}
      apply(saved === 'light' || saved === 'dark' ? saved : media.matches ? 'dark' : 'light');
    };
    syncPreference();
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) syncPreference();
    };
    media.addEventListener('change', syncPreference);
    window.addEventListener('storage', onStorage);
    return () => {
      media.removeEventListener('change', syncPreference);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch {}
  };

  return <button type="button" className="theme-toggle" onClick={toggle} aria-label="Dark theme" aria-pressed={theme === 'dark'} title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
    <svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z" /><path d="m17 3 .7 2.3L20 6l-2.3.7L17 9l-.7-2.3L14 6l2.3-.7Z" /></svg>
    <svg className="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" /></svg>
  </button>;
}
