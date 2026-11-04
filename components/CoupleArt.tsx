'use client';
import Image from 'next/image';
import { useState } from 'react';
import LoadingMark from './LoadingMark';
import { functions, images } from '@/lib/constants';

function colorMatrix(source: string, target: string) {
  const rgb = (hex: string) => [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16) / 255);
  const from = rgb(source);
  const to = rgb(target);
  const mean = from.reduce((sum, value) => sum + value, 0) / 3;
  const direction = from.map(value => value - mean);
  const length = direction.reduce((sum, value) => sum + value * value, 0);
  // Preserve black ink and neutral whites while mapping the outfit's base color.
  return [...from.flatMap((value, row) => {
    const shift = (to[row] - value) / length;
    return [...direction.map((component, column) => (row === column ? 1 : 0) + shift * component), 0, 0];
  }), 0, 0, 0, 1, 0].join(' ');
}

export default function CoupleArt({ panel = 0, shade = 0, label, className = '' }: { panel?: number; shade?: number; label: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const source = images.outfits[panel];
  const target = functions[panel]?.shades?.[shade]?.hex;
  const filterId = `outfit-shade-${panel}-${shade}`;
  const filter = target ? `url(#${filterId})` : undefined;
  return <div className={`couple-art ${loaded ? 'art-loaded' : 'art-loading'} ${className}`} role="img" aria-label={label} aria-busy={!loaded}>
    {!loaded && <span className="art-placeholder" aria-hidden="true"><LoadingMark /></span>}
    {target && <svg className="color-filter-definitions" aria-hidden="true"><defs>
      <filter id={filterId} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={colorMatrix(panel === 1 ? '#88A9C8' : '#FF9834', target)} /></filter>
    </defs></svg>}
    <Image src={source} alt="" width={760} height={1000} sizes="(max-width: 767px) 90vw, 520px" className="couple-image" style={{ filter }} preload={panel === 0} onLoad={() => setLoaded(true)} />
  </div>;
}
