'use client';
import DoodleImage from '@/components/DoodleImage';
import { useState } from 'react';
import LoadingMark from './LoadingMark';
import { jaggoOutfits } from '@/lib/constants';

export default function JaggoArt({ him, her }: { him: number; her: number }) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const ready = Boolean(loaded[jaggoOutfits.him[him].id] && loaded[jaggoOutfits.her[her].id]);
  return <div className="couple-art jaggo-art" role="img" aria-busy={!ready} aria-label={`Jaggo outfits: him in ${jaggoOutfits.him[him].label}, her in ${jaggoOutfits.her[her].label}`}>
    {(['him', 'her'] as const).map(person => <div className={`wardrobe-figure wardrobe-${person}`} key={person}>
      {!loaded[jaggoOutfits[person][person === 'him' ? him : her].id] && <span className="art-placeholder" aria-hidden="true"><LoadingMark compact /></span>}
      {jaggoOutfits[person].map((outfit, index) => <DoodleImage key={outfit.id} src={outfit.image} alt="" width={500} height={1000} sizes="(max-width: 767px) 45vw, 260px" onLoad={() => setLoaded(previous => ({ ...previous, [outfit.id]: true }))} className={`wardrobe-image ${(person === 'him' ? him : her) === index && loaded[outfit.id] ? 'is-selected' : ''}`} />)}
    </div>)}
  </div>;
}
