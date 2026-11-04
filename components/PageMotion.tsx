'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import LoadingMark from './LoadingMark';
import { applyTheme } from '@/lib/theme';
import { usePathname } from 'next/navigation';

export default function PageMotion() {
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  useLayoutEffect(() => {
    // Styles are in the root bundle. Keep the outgoing page covered until the
    // newly committed route has had a layout frame, including back/forward.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        delete document.documentElement.dataset.navigating;
        setNavigating(false);
        applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
      });
    });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); };
  }, [pathname]);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const start = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!target || target.hasAttribute('download') || (target.target && target.target !== '_self')) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      document.documentElement.dataset.navigating = 'true';
      setNavigating(true);
      // Clear the indicator if navigation is cancelled or fails before a route change.
      clearTimeout(timeout);
      timeout = setTimeout(() => { delete document.documentElement.dataset.navigating; setNavigating(false); }, 15000);
    };
    const finish = () => { delete document.documentElement.dataset.navigating; setNavigating(false); };
    const back = () => {
      // A hash-only history entry does not change pathname, so no route-ready
      // effect would dismiss the overlay. Native scrolling needs no loader.
      if (window.location.pathname === pathname) return;
      document.documentElement.dataset.navigating = 'true';
      setNavigating(true);
      clearTimeout(timeout);
      timeout = setTimeout(finish, 15000);
    };
    document.addEventListener('click', start, true);
    window.addEventListener('pageshow', finish);
    window.addEventListener('popstate', back);
    return () => {
      document.removeEventListener('click', start, true);
      window.removeEventListener('pageshow', finish);
      window.removeEventListener('popstate', back);
      clearTimeout(timeout);
    };
  }, [pathname]);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduced = motion.matches;
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    let observer: IntersectionObserver | undefined;
    const reveals = new Map<Element, Animation>();
    if (!reduced && 'IntersectionObserver' in window && 'animate' in HTMLElement.prototype) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveals.get(entry.target)?.play();
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: .08 });
      elements.forEach(element => {
        if (element.getBoundingClientRect().top <= window.innerHeight) return;
        // Animate computed presentation without changing server-rendered class
        // attributes while React 19 is still hydrating nested route segments.
        const animation = element.animate([
          { opacity: 0, transform: 'translateY(28px) rotate(-.6deg)' },
          { opacity: 1, transform: 'translateY(0) rotate(0)' },
        ], { duration: 800, easing: 'ease-out', fill: 'backwards' });
        animation.pause();
        animation.currentTime = 0;
        animation.onfinish = () => { animation.cancel(); reveals.delete(element); };
        reveals.set(element, animation);
        observer?.observe(element);
      });
    }
    const stopReveals = () => {
      observer?.disconnect();
      reveals.forEach(animation => animation.cancel());
      reveals.clear();
    };
    const onMotionChange = () => { if (motion.matches) stopReveals(); };
    motion.addEventListener('change', onMotionChange);
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
      stopReveals();
      motion.removeEventListener('change', onMotionChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return <><div className="reading-progress" aria-hidden="true" /><div className="navigation-loading" aria-hidden={!navigating}><LoadingMark /></div></>;
}
