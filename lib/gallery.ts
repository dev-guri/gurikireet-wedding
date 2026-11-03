import { storyChapters } from './story';

export type GalleryItem = {
  id: string;
  kind: 'photos' | 'cinematic' | 'full-film';
  label: string;
  title: string;
  description: string;
  action: string;
  href: string;
  preview: { src: string; alt: string; position: string };
};

export const galleryRokaDate = storyChapters.find(chapter => chapter.id === 'our-roka')?.date;

// Keep the complete album and large films on Drive; full media is not embedded
// or downloaded on page load. Links open only when a guest chooses a card.
// Only three small, local photo posters load in the cards. Video posters use
// album photos because Drive's automatic video thumbnails are dark opening frames.
export const galleryItems: GalleryItem[] = [
  {
    id: 'roka-photos', kind: 'photos', label: 'THE PHOTO ALBUM', title: 'Our roka, in photographs.',
    description: 'All the smiles, saved together in one album.', action: 'Open the photo album',
    href: 'https://drive.google.com/drive/folders/1G7JazgYvdVEhV-yuAQOhKO4xlRQO4dxY',
    preview: { src: '/images/gallery/roka-album-cover-v2.jpg', alt: 'Gurinder and Gurpreet seated together in their roka outfits, photo album cover', position: '50% 30%' },
  },
  {
    id: 'roka-cinematic', kind: 'cinematic', label: 'THE CINEMATIC FILM', title: 'A day worth replaying.',
    description: 'Our roka, told through a cinematic film.', action: 'Watch the cinematic film',
    href: 'https://drive.google.com/file/d/1xOzlKv0f_3XfDUTjsz03ZB6qVScV1zd7/view',
    preview: { src: '/images/gallery/roka-cinematic-cover.jpg', alt: 'Gurpreet in her turquoise roka dupatta beside a staircase, photo poster for the cinematic film', position: '50% 43%' },
  },
  {
    id: 'roka-full-film', kind: 'full-film', label: 'THE FULL FILM · 4K', title: 'Every little moment.',
    description: 'The complete roka video, in 4K.', action: 'Watch the full 4K video',
    href: 'https://drive.google.com/file/d/1DIXdjq9b4BFBuCgql3G5f0xR3u0vfRKb/view',
    preview: { src: '/images/gallery/roka-full-film-cover.jpg', alt: 'Gurinder and Gurpreet celebrating together at their roka, photo poster for the full film', position: '50% 50%' },
  },
];
