import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageMotion from '@/components/PageMotion';
import { themeInitScript } from '@/lib/theme';
import './globals.css';
// Load namespaced page styles once, before any route can paint.
import './home.css';
import './our-story/story.css';
import './faqs/faqs.css';
import './gallery/gallery.css';
import './theme.css';
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#ffffff', colorScheme: 'light dark' };
export const metadata: Metadata = { title: { default: 'Gurinder & Gurpreet | Our Wedding', template: '%s | Gurinder & Gurpreet' }, description: 'A little love, a lot of celebration. Join Gurinder and Gurpreet for their wedding festivities.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /><link rel="preload" href="/fonts/caveat-regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /><link rel="preload" href="/fonts/oooh-baby-regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head><body><div className="browser-theme-surface" aria-hidden="true" /><a className="skip-link" href="#main">Skip to content</a><PageMotion /><Header /><main id="main">{children}</main><Footer /></body></html>;
}
