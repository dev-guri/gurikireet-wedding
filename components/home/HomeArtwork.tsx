'use client';
import DoodleImage from '@/components/DoodleImage';
import { useState } from 'react';
import LoadingMark from '@/components/LoadingMark';

export default function HomeArtwork({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  return <div className={`landing-artwork ${loaded ? 'is-loaded' : ''}`} aria-busy={!loaded}>
    {!loaded && <span className="art-placeholder" aria-hidden="true"><LoadingMark /></span>}
    <DoodleImage src={src} alt={alt} fill sizes="(max-width: 767px) 90vw, (max-width: 1100px) 45vw, 520px" priority={priority} onLoad={() => setLoaded(true)} />
  </div>;
}
