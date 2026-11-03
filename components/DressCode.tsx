'use client';
import { useState, type CSSProperties } from 'react';
import DoodleHeart from './DoodleHeart';
import CoupleArt from './CoupleArt';
import JaggoArt from './JaggoArt';
import Hashtag from './Hashtag';
import ShadePicker from './ShadePicker';
import { functions, jaggoOutfits, type WeddingFunction } from '@/lib/constants';

const notes: Record<string, string[]> = {
  western: ['Look good', 'Feel good', 'Celebrate', 'with us'],
  haldi: ['A little blue,', 'a little sunshine,', 'a lot of love.'],
  mehndi: ['Henna on', 'our hands,', 'love in', 'our hearts.'],
  jaggo: ['Twirl a little,', 'dance a lot!'],
};

function OutfitCard({ event }: { event: WeddingFunction }) {
  const [shade, setShade] = useState(0);
  const [him, setHim] = useState(0);
  const [her, setHer] = useState(0);
  const accent = event.shades?.[shade].hex ?? '#C84B4B';
  return <article id={event.id} data-reveal className={`outfit-card ${event.id === 'western' ? 'western-card' : ''}`} style={{ '--card-accent': accent } as CSSProperties}>
    <div className="card-heading"><span className="event-number">{event.number}<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M48 10C25-2 1 11 5 33S27 61 45 47S63 17 46 8" /></svg></span><div><h2>{event.title}</h2><p>{event.subtitle}</p></div><DoodleHeart className="card-heart" /></div>
    <div className="fashion-portrait"><span className="margin-note" aria-hidden="true">{event.marginNote}<svg viewBox="0 0 80 60"><path d="M5 5Q15 42 66 39M55 29L68 39L55 49" /></svg></span>{event.id === 'jaggo' ? <JaggoArt him={him} her={her} /> : <CoupleArt panel={event.panel} shade={shade} label={`${event.title}: full-length hand-drawn couple${event.shades ? `, both wearing ${event.shades[shade].name}` : ''}`} />}<div className="handwritten-note" aria-hidden="true">{notes[event.id].map(line => <span key={line}>{line}</span>)}<DoodleHeart /></div></div>
    <div className="outfit-controls">
      {event.shades && <ShadePicker id={event.id} title={event.title} shades={event.shades} selected={shade} onChange={setShade} />}
      {event.id === 'western' && <span className="outfit-tag">Your color. Your moment.</span>}
      {event.id === 'jaggo' && <><div className="wardrobe-controls">{(['him', 'her'] as const).map(person => <fieldset className="wardrobe-group" key={person}><legend>For {person}</legend><div className="wardrobe-buttons">{jaggoOutfits[person].map((outfit, index) => <button key={outfit.id} className={(person === 'him' ? him : her) === index ? 'selected' : ''} aria-pressed={(person === 'him' ? him : her) === index} onClick={() => person === 'him' ? setHim(index) : setHer(index)}>{outfit.label}</button>)}</div></fieldset>)}</div><p className="selection-label" aria-live="polite">{jaggoOutfits.him[him].label} + {jaggoOutfits.her[her].label}</p></>}
    </div>
  </article>;
}

export default function DressCode() {
  return <div className="dress-page"><section className="dress-intro"><span className="poster-corner left-corner">OUR<br />WEDDING<br />DAY<span>—</span></span><span className="poster-corner right-corner">SAME PEOPLE.<br />A BEAUTIFUL<br />NEW CHAPTER.<span>—</span></span><div className="title-wrap hero-enter"><h1 className="script-title"><span>Dress</span><span>Code</span></h1><DoodleHeart className="title-heart" /></div><span className="couple-byline hero-enter">Gurinder & Gurpreet</span><Hashtag /><nav className="event-nav hero-enter" aria-label="Jump to a function">{functions.map(event => <a key={event.id} href={`#${event.id}`}><span>{event.number}</span>{event.navLabel ?? event.title}</a>)}</nav></section><section className="outfit-grid" aria-label="Wedding function outfits">{functions.map(event => <OutfitCard key={event.id} event={event} />)}</section><div className="closing-note" data-reveal><DoodleHeart /><p>A little color, a little sparkle, a whole lot of love.</p><span className="signature">See you on the dance floor!</span></div></div>;
}
