'use client';
import Image from 'next/image';
import { useState } from 'react';
import LoadingMark from '@/components/LoadingMark';
import { storyIllustration } from '@/lib/story';

export default function StoryPortrait() {
  const [loaded, setLoaded] = useState(false);
  return <div className={`couple-art story-hero-couple ${loaded ? 'art-loaded' : 'art-loading'}`} aria-busy={!loaded}>
    {!loaded && <span className="art-placeholder" aria-hidden="true"><LoadingMark /></span>}
    <Image src={storyIllustration.src} alt={storyIllustration.alt} width={1086} height={1448} sizes="(max-width: 767px) 290px, 360px" className="couple-image original-layer" priority onLoad={() => setLoaded(true)} />
  </div>;
}
