import Image from 'next/image';
import type { StoryDoodleKind, StoryPhoto, StoryIllustration } from '@/lib/story';
import StoryDoodle from './StoryDoodle';

export default function StoryPhoto({ photo, illustration, doodle, caption }: {
  photo?: StoryPhoto;
  illustration?: StoryIllustration;
  doodle: StoryDoodleKind;
  caption: string;
}) {
  return <figure className={`story-postcard ${photo?.src ? 'has-photo' : 'illustrated-memory'}`}>
    <span className="story-paper-tape" aria-hidden="true" />
    <div className="story-postcard-picture">
      {photo?.src ? <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 85vw, 370px" className="story-memory-photo" /> : illustration ? <Image src={illustration.src} alt={illustration.alt} fill sizes="(max-width: 767px) 85vw, 370px" className="story-memory-illustration" /> : <StoryDoodle kind={doodle} />}
    </div>
    <figcaption>{photo?.caption ?? caption}</figcaption>
  </figure>;
}
