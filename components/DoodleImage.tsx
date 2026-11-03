'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { removeDoodlePaper, defringeDoodle, cleanDoodleHair } from '@/lib/doodle-paper';
import { doodleGapSeeds, doodleBottomCrops, doodleHairZones } from '@/lib/doodle-cleanup';

// Repeated color layers share the same prepared artwork. Only display pixels
// are processed; light mode and the source assets always use the original.
const prepared = new Map<string, HTMLCanvasElement>();
function prepare(image: HTMLImageElement) {
  const cached = prepared.get(image.currentSrc);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  const ratio = Math.min(1, 1200 / Math.max(image.naturalWidth, image.naturalHeight));
  canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas unavailable');
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const data = context.getImageData(0, 0, canvas.width, canvas.height);
  const name = new URL(image.currentSrc, document.baseURI).pathname.split('/').pop() ?? '';
  removeDoodlePaper(data.data, canvas.width, canvas.height, doodleGapSeeds[name], doodleBottomCrops[name]);
  defringeDoodle(data.data, canvas.width, canvas.height);
  cleanDoodleHair(data.data, canvas.width, canvas.height, doodleHairZones[name]);
  context.putImageData(data, 0, 0);
  prepared.set(image.currentSrc, canvas);
  return canvas;
}

export default function DoodleImage({ className = '', ...props }: ImageProps) {
  const original = useRef<HTMLImageElement>(null);
  const cutout = useRef<HTMLCanvasElement>(null);
  const [readySrc, setReadySrc] = useState<ImageProps['src'] | null>(null);
  const ready = readySrc === props.src;

  useEffect(() => {
    const image = original.current;
    const canvas = cutout.current;
    if (!image || !canvas) return;
    let frame = 0;
    const render = () => {
      if (document.documentElement.dataset.theme !== 'dark' || !image.complete || !image.naturalWidth) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        try {
          const source = prepare(image);
          canvas.width = source.width;
          canvas.height = source.height;
          const context = canvas.getContext('2d');
          if (!context) return;
          context.drawImage(source, 0, 0);
          setReadySrc(props.src);
        } catch {
          // Graceful original-image fallback if a future external image blocks canvas access.
        }
      });
    };
    image.addEventListener('load', render);
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    render();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); image.removeEventListener('load', render); };
  }, [props.src]);

  return <>
    <Image {...props} ref={original} className={`${className} doodle-original ${ready ? 'has-cutout' : ''}`} />
    <canvas ref={cutout} className={`${className} doodle-cutout ${ready ? 'is-prepared' : ''}`} style={props.style} aria-hidden="true" />
  </>;
}
