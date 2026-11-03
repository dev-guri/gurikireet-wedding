import type { Metadata } from 'next';
import Link from 'next/link';
import DoodleHeart from '@/components/DoodleHeart';
import Hashtag from '@/components/Hashtag';
import HomeArtwork from '@/components/home/HomeArtwork';
import WeddingCountdown from '@/components/home/WeddingCountdown';
import WeddingMotif from '@/components/home/WeddingMotif';
import CopyHashtag from '@/components/home/CopyHashtag';
import { functions, wedding, weddingDirectionsUrl } from '@/lib/constants';
import { storyChapters } from '@/lib/story';
import './home.css';

export const metadata: Metadata = {
  title: { absolute: 'Gurinder & Gurpreet | 31 January 2027' },
  description: 'Celebrate Gurinder and Gurpreet’s wedding on 31 January 2027 at Majestic Crown, New Delhi. Our story, celebrations and dress code. #GuriKiReet',
};
const date = new Date(wedding.dayStartsAt);
const dateLabel = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' }).format(date);
const weekday = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long' }).format(date);
const momentNames = ['The first hello', 'Our first meeting', 'Our roka'];

export default function Home() {
  return <div className="landing-home">
    <section className="landing-hero" aria-labelledby="landing-title">
      <div className="landing-hero-copy hero-enter">
        <span className="landing-eyebrow">TOGETHER WITH OUR FAMILIES</span>
        <div className="landing-name-wrap">
          <h1 id="landing-title"><span>{wedding.groom}</span><i>&amp;</i><span>{wedding.bride}</span></h1>
          <DoodleHeart className="landing-name-heart" />
        </div>
        <p className="landing-welcome">We’re getting married!<br />And we can’t wait to celebrate with you.</p>
        <div className="landing-date-note"><time dateTime={wedding.date}>{dateLabel}</time><span>{wedding.venue.city} <i>·</i> {weekday}</span></div>
        <div className="landing-hero-actions"><Link className="button landing-primary-button" href="/our-story">Our little story ↗</Link><Link className="landing-text-link" href="/dress-code">Find your celebration look ↗</Link></div>
      </div>
      <div className="landing-hero-portrait hero-enter">
        <HomeArtwork src="/images/home-wedding-lehenga-sherwani.png" alt="A wedding doodle of Gurinder in an ivory and gold sherwani with a champagne turban, holding hands with Gurpreet in a burgundy and gold lehenga" priority />
        <span className="landing-portrait-note">our kind of forever<svg viewBox="0 0 95 45" aria-hidden="true"><path d="M89 36Q70 3 16 15m10-12L15 15l16 4" /></svg></span>
      </div>
    </section>

    <section className="landing-countdown-section" aria-labelledby="countdown-title">
      <div className="landing-countdown-heading"><DoodleHeart /><h2 id="countdown-title">Counting down to our big day</h2><span className="landing-small-note">a little closer, every day</span></div>
      <WeddingCountdown target={wedding.dayStartsAt} />
    </section>

    <section className="landing-story" data-reveal aria-labelledby="landing-story-title">
      <figure className="landing-memory-card"><span className="landing-tape" aria-hidden="true" /><HomeArtwork src="/images/our-story-first-meeting-doodle-v3.png" alt="Our first-meeting café doodle, with blue outfits, white jeans, pasta, noodles and a chocolate shake" /><figcaption>Where our favourite story began.</figcaption></figure>
      <div className="landing-story-copy"><span className="landing-eyebrow">A FEW MOMENTS THAT MEAN EVERYTHING</span><h2 id="landing-story-title">From a little hello<br />to all of this.</h2><p>A first conversation, a meeting in Connaught Place, and a roka surrounded by family. The little moments brought us here — ready for the next chapter, together.</p>
        <ol className="landing-mini-timeline">{storyChapters.map((chapter, index) => <li key={chapter.id}><span className="landing-moment-dot" aria-hidden="true" /><time dateTime={chapter.date}>{new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' }).format(new Date(`${chapter.date}T00:00:00+05:30`))}</time><span>{momentNames[index]}</span></li>)}</ol>
        <Link className="landing-text-link" href="/our-story">Read our story ↗</Link>
      </div>
    </section>

    <section className="landing-celebrations" data-reveal aria-labelledby="landing-celebrations-title">
      <div className="landing-section-heading"><span className="landing-eyebrow">A LITTLE COLOR. A LOT OF CELEBRATION.</span><h2 id="landing-celebrations-title">Let the celebrations begin.</h2><p>Find your look for every celebration.</p></div>
      <div className="landing-function-grid">{functions.map(event => <Link key={event.id} className={`landing-function-card landing-function-${event.id}`} href={`/dress-code#${event.id}`}><span className="landing-function-number">{event.number}</span><WeddingMotif kind={event.id} /><h3>{event.navLabel ?? event.title}</h3><p>{event.id === 'western' ? 'Western glam · Any color' : event.subtitle}</p><span className="landing-function-link">Find your look <i>↗</i></span></Link>)}</div>
    </section>

    <section className="landing-venue" data-reveal aria-labelledby="landing-venue-title">
      <div className="landing-venue-art"><WeddingMotif kind="venue" /><span className="landing-small-note">See you here!</span></div>
      <div className="landing-venue-copy"><span className="landing-eyebrow">THE PLACE WE’LL MAKE NEW MEMORIES</span><h2 id="landing-venue-title">{wedding.venue.name}</h2><address>{wedding.venue.address}</address><p className="landing-venue-date">{weekday}, <time dateTime={wedding.date}>{dateLabel}</time></p></div>
      <a className="button landing-directions" href={weddingDirectionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Get directions to Majestic Crown in Google Maps, opens in a new tab">Get directions ↗</a>
    </section>

    <section className="landing-share" data-reveal aria-labelledby="landing-share-title"><DoodleHeart /><h2 id="landing-share-title">A little tag for all our memories.</h2><Hashtag /><p>When the celebrations begin, share your favourite moments with our hashtag.</p><CopyHashtag hashtag={wedding.hashtag} /><span className="landing-sign-off">With love, Gurinder &amp; Gurpreet</span></section>
  </div>;
}
