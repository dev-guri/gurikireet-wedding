export type StoryPhoto = { src: string | null; alt: string; caption: string };
export type StoryPhotoKey = 'firstMeeting' | 'roka' | 'favourite';
export type StoryDoodleKind = 'hello' | 'coffee' | 'meal' | 'rings' | 'flower';
export type StoryIllustration = { src: string; alt: string };

export const storyIllustration = {
  src: '/images/gurinder-gurpreet-story-doodle-v3.png',
  alt: 'A playful cartoon doodle of Gurinder in his turban and Gurpreet smiling at each other, inspired by their photograph',
};

// Add the couple's chosen photographs here when they are available.
// Until then, the page uses illustrated memory cards rather than empty frames.
export const storyPhotos: Record<StoryPhotoKey, StoryPhoto> = {
  firstMeeting: {
    src: null,
    alt: 'Gurinder and Gurpreet at their first meeting in Connaught Place',
    caption: 'Connaught Place. Our first little chapter together.',
  },
  roka: {
    src: null,
    alt: 'Gurinder and Gurpreet celebrating their roka with their families',
    caption: '16 May 2026 — surrounded by blessings.',
  },
  favourite: {
    src: null,
    alt: 'A favourite photograph of Gurinder and Gurpreet together',
    caption: 'Our favourite place is together.',
  },
};

export type StoryChapter = {
  id: string;
  number: string;
  date: string;
  dateLabel: string;
  title: string;
  paragraphs: string[];
  aside: string;
  doodle: StoryDoodleKind;
  photo?: StoryPhotoKey;
  illustration?: StoryIllustration;
  caption: string;
};

// Dates and first-meeting location confirmed by the couple.
// Public-facing narrative: no private conversation transcripts are included.
export const storyChapters: StoryChapter[] = [
  {
    id: 'first-hello',
    number: '01',
    date: '2026-02-13',
    dateLabel: '13 February 2026',
    title: 'A hello worth remembering.',
    paragraphs: [
      'Our story began with a simple introduction. A hello, a conversation, and the chance to get to know someone new. There was no grand announcement — just the beginning of something we would come to treasure.',
      'As we talked, we found plenty to share: a love for exploring cafés, stories from our days, and a sense of humour that made conversation feel easy. Little by little, the introductions became a friendship.',
    ],
    aside: 'every story starts somewhere',
    doodle: 'hello',
    illustration: {
      src: '/images/our-story-first-hello-doodle.png',
      alt: 'A playful WhatsApp-inspired phone doodle with Hi and Hello bubbles, a turbaned Gurinder avatar, and a Gurpreet avatar',
    },
    caption: 'One small hello. So much still to come.',
  },
  {
    id: 'first-meeting',
    number: '02',
    date: '2026-03-01',
    dateLabel: '1 March 2026 · Connaught Place',
    title: 'Pasta, conversation & a little twinning.',
    paragraphs: [
      'Our first meeting took us to Connaught Place. We ordered white sauce pasta, chilli garlic noodles and a Belgian chocolate shake, and settled in for our first conversation across a table — putting a real smile to a familiar voice.',
      'There were matching outfits, our first photographs together, and a thoughtful surprise of sunflowers and roses. It gave us a lovely memory to look back on — and plenty of reasons to look forward to meeting again.',
    ],
    aside: 'the first of many café plans',
    doodle: 'meal',
    photo: 'firstMeeting',
    illustration: {
      src: '/images/our-story-first-meeting-doodle-v3.png',
      alt: 'Gurinder in a blue polo, white jeans and cream turban with Gurpreet in her blue-floral dress, sharing a café table with white sauce pasta, chilli garlic noodles and a Belgian chocolate shake',
    },
    caption: 'Our first meeting. A memory we still smile about.',
  },
  {
    id: 'our-roka',
    number: '03',
    date: '2026-05-16',
    dateLabel: '16 May 2026 · Our Roka',
    title: 'Our story became a family celebration.',
    paragraphs: [
      'On 16 May, the day we had been looking forward to arrived: our roka. With our families beside us, the connection we had been building became a celebration shared by the people who mean the most to us.',
      'Their blessings, happy faces, and excitement made the day special. We were beginning a new chapter together, with two families ready to fill it with love.',
    ],
    aside: 'two families, so much love',
    doodle: 'rings',
    photo: 'roka',
    illustration: {
      src: '/images/our-story-roka-doodle.png',
      alt: 'A roka doodle of Gurinder in an ivory outfit and blue turban beside Gurpreet in her ivory embroidered outfit and turquoise dupatta',
    },
    caption: 'A new chapter, with all our favourite people.',
  },
];

export const littleThings = [
  { title: 'The little check-ins', text: 'Remembering to ask how the day went, and making time to listen.' },
  { title: 'Our next café plan', text: 'Somewhere new to explore, something good to eat, and a conversation to continue.' },
  { title: 'Thoughtful little gestures', text: 'Flowers, shared laughter, and remembering the things that make the other person smile.' },
];
