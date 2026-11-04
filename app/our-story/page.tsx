import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DoodleHeart from '@/components/DoodleHeart';
import Hashtag from '@/components/Hashtag';
import StoryPhoto from '@/components/story/StoryPhoto';
import StoryDoodle from '@/components/story/StoryDoodle';
import StoryPortrait from '@/components/story/StoryPortrait';
import { littleThings, storyChapters, storyPhotos } from '@/lib/story';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'From a first hello to a first meeting in Connaught Place, and a roka surrounded by family. The story of Gurinder and Gurpreet — #GuriKiReet.',
};

export default function OurStoryPage() {
  return <div className="story-page">
    <section className="story-hero" aria-labelledby="story-title">
      <div className="story-hero-copy hero-enter"><span className="story-kicker">GURINDER & GURPREET</span><div className="story-title-row"><h1 id="story-title">Our Story</h1><DoodleHeart /></div><p className="story-hero-line">A little hello.<br />A whole lot of us.</p><p className="story-hero-intro">A conversation became a friendship. A meeting became a memory. And, with our families’ blessings, a new chapter began.</p><Hashtag /><a className="story-scroll-link" href="#first-hello">Turn the first page <span aria-hidden="true">↓</span></a></div>
      <div className="story-hero-picture hero-enter">{storyPhotos.favourite.src ? <div className="story-hero-real-photo"><Image src={storyPhotos.favourite.src} alt={storyPhotos.favourite.alt} fill sizes="(max-width: 767px) 85vw, 360px" preload /></div> : <StoryPortrait />}<span className="story-picture-note">the two of us<svg viewBox="0 0 80 42" fill="none" aria-hidden="true"><path d="M6 5C9 30 40 34 67 23M55 18L68 23L60 35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span></div>
    </section>

    <section className="story-opening" data-reveal aria-label="A note from us"><span className="story-little-star" aria-hidden="true">✧</span><p>Looking back, it’s the little things we remember.<br />The first conversation. The first photograph.<br />And all the ordinary days that brought us here.</p><span className="story-little-star" aria-hidden="true">✧</span></section>

    <div className="story-timeline">
      {storyChapters.map((chapter, index) => <div className="story-chapter-group" key={chapter.id}>
        <article className={`story-chapter ${index % 2 ? 'is-reversed' : ''}`} id={chapter.id} data-reveal aria-labelledby={`${chapter.id}-title`}>
          <div className="story-chapter-copy"><div className="story-chapter-meta"><span className="story-chapter-number" aria-hidden="true">{chapter.number}</span><time dateTime={chapter.date}>{chapter.dateLabel}</time></div><h2 id={`${chapter.id}-title`}>{chapter.title}</h2>{chapter.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<span className="story-margin-note">{chapter.aside}</span></div>
          <StoryPhoto photo={chapter.photo ? storyPhotos[chapter.photo] : undefined} illustration={chapter.illustration} doodle={chapter.doodle} caption={chapter.caption} />
        </article>
        {index === 1 && <section className="story-everyday" data-reveal aria-labelledby="story-everyday-title"><div className="story-everyday-heading"><StoryDoodle kind="flower" /><div><span className="story-kicker">BETWEEN THE BIG MOMENTS</span><h2 id="story-everyday-title">The lovely, everyday things.</h2><p>Not every favourite memory needs a date on the calendar.</p></div></div><div className="story-little-things">{littleThings.map((thing, thingIndex) => <div className="story-small-note" key={thing.title}><span aria-hidden="true">{['♡', '✧', '✿'][thingIndex]}</span><h3>{thing.title}</h3><p>{thing.text}</p></div>)}</div></section>}
      </div>)}
    </div>

    <section className="story-next-chapter" data-reveal aria-labelledby="story-next-title"><DoodleHeart /><span className="story-kicker">AND NOW…</span><h2 id="story-next-title">From café plans<br />to wedding plans.</h2><p>We’re getting ready to celebrate the next chapter with our families and friends. Having you there will make it even more special.</p><span className="story-sign-off">With love, Gurinder & Gurpreet</span><Link href="/dress-code" className="button">Get celebration-ready <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
