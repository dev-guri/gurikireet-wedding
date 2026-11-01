'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageMotion() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  useEffect(() => { setNavigating(false); }, [pathname]);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const start = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!target || target.hasAttribute('download') || (target.target && target.target !== '_self')) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setNavigating(true);
      // Clear the indicator if navigation is cancelled or fails before a route change.
      clearTimeout(timeout);
      timeout = setTimeout(() => setNavigating(false), 15000);
    };
    const finish = () => setNavigating(false);
    document.addEventListener('click', start, true);
    window.addEventListener('pageshow', finish);
    return () => {
      document.removeEventListener('click', start, true);
      window.removeEventListener('pageshow', finish);
      clearTimeout(timeout);
    };
  }, []);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    let observer: IntersectionObserver | undefined;
    if (!reduced && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: .08 });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('reveal-pending');
        observer?.observe(element);
      });
    }
    let frame = 0;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${height > 0 ? window.scrollY / height : 0}`);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return <><div className="reading-progress" aria-hidden="true" />{navigating && <div className="navigation-loading" role="status"><span className="sr-only">Loading page…</span><span className="navigation-loading-track" aria-hidden="true" /></div>}</>;
}
