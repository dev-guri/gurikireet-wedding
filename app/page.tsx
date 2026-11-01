import Link from 'next/link';
import DoodleHeart from '@/components/DoodleHeart';
import CoupleArt from '@/components/CoupleArt';
import Hashtag from '@/components/Hashtag';
export default function Home() {
  return <section className="home-hero"><span className="poster-corner left-corner">OUR<br />WEDDING<br />DAY<span>—</span></span><span className="poster-corner right-corner">ONE LOVE.<br />A LIFETIME<br />OF MEMORIES.<span>—</span></span><div className="home-heading hero-enter"><span className="eyebrow">THE BEGINNING OF OUR FOREVER</span><h1 className="home-title">Gurinder<span>&</span>Gurpreet</h1><DoodleHeart className="home-heart" /></div><Hashtag /><div className="home-illustration hero-enter"><span className="home-scribble">better<br />together<svg viewBox="0 0 80 60" aria-hidden="true"><path d="M5 5Q15 42 66 39M55 29L68 39L55 49" /></svg></span><CoupleArt label="Playful hand-drawn Gurinder and Gurpreet, together in western wedding outfits" /><span className="home-scribble right-scribble">our kind<br />of forever<DoodleHeart /></span></div><p className="hero-description hero-enter">A little love. A lot of celebration.<br />And all our favourite people.</p><Link href="/dress-code" className="button hero-enter">Explore Dress Code <span>↗</span></Link><span className="home-bottom-note">COME FOR THE LOVE. STAY FOR THE DANCING.</span></section>;
}
