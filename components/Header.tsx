'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navigation } from '@/lib/constants';
import Monogram from './Monogram';
import ThemeToggle from './ThemeToggle';
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="header-inner">
    <Link href="/" aria-label="Gurinder and Gurpreet home" onClick={() => setOpen(false)}><Monogram /></Link>
    <nav id="main-navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation">{navigation.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`${path === link.href ? 'active' : ''} ${link.label === 'RSVP' ? 'rsvp-link' : ''}`} aria-current={path === link.href ? 'page' : undefined}>{link.label}</Link>)}</nav>
    <div className="header-controls"><ThemeToggle /><button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span>{open ? '✕' : '☰'}</span></button></div>
  </div></header>;
}
