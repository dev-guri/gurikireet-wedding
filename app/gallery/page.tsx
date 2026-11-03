import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import DoodleHeart from '@/components/DoodleHeart';
import Hashtag from '@/components/Hashtag';
import { galleryItems, galleryRokaDate } from '@/lib/gallery';

export const metadata: Metadata = { title: 'Gallery', description: 'Gurinder and Gurpreet’s roka memories: the photo album, cinematic film and full 4K video.' };
const dateLabel = galleryRokaDate ? new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${galleryRokaDate}T00:00:00+05:30`)) : null;

export default function GalleryPage() {
  return <div className="gallery-page">
    <section className="gallery-hero hero-enter" aria-labelledby="gallery-title"><span className="gallery-kicker">GURINDER &amp; GURPREET · THE GALLERY</span><div className="gallery-title-row"><h1 id="gallery-title">Our little collection.</h1><DoodleHeart /></div><p>Some days stay with you.<br />These are ours to look back on.</p><Hashtag /></section>

    <section className="gallery-collection" aria-labelledby="roka-gallery-title">
      <div className="gallery-collection-heading"><div><span className="gallery-chapter">CHAPTER ONE</span><h2 id="roka-gallery-title">Our Roka</h2></div>{galleryRokaDate && <time dateTime={galleryRokaDate}>{dateLabel}</time>}</div>
      <div className="gallery-card-grid">{galleryItems.map((item, index) => <a className={`gallery-link-card gallery-card-${item.kind}`} href={item.href} key={item.id} target="_blank" rel="noopener noreferrer" data-reveal>
        <div className="gallery-card-preview"><Image src={item.preview.src} alt={item.preview.alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 31vw, 340px" style={{ objectPosition: item.preview.position }} priority={index === 0} /><span className="gallery-preview-badge" aria-hidden="true">{item.kind === 'photos' ? 'Photo album' : item.kind === 'cinematic' ? 'Cinematic film' : 'Full film · 4K'}</span>{item.kind !== 'photos' && <span className="gallery-preview-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7z" /></svg></span>}</div>
        <div className="gallery-card-copy"><span className="gallery-card-label">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p><span className="gallery-card-action">{item.action}<span aria-hidden="true">↗</span></span><span className="sr-only"> (opens in Google Drive in a new tab)</span></div>
      </a>)}</div>
      <p className="gallery-drive-note"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 3h6v6m0-6-9 9M8 4H4v12h12v-4" /></svg>Each collection opens in Google Drive.</p>
    </section>

    <section className="gallery-closing" data-reveal><DoodleHeart /><h2>A day we’ll always come back to.</h2><Link className="gallery-story-link" href="/our-story">Read the story behind the smiles <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
