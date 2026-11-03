import { wedding, weddingDirectionsUrl } from './constants';

export type FaqItem = {
  id: string;
  question: string;
  paragraphs: string[];
  list?: { label: string; text: string }[];
  palette?: 'haldi' | 'mehndi';
  link?: { label: string; href: string; external?: boolean };
};
export type FaqGroup = { id: string; label: string; note: string; items: FaqItem[] };

const weddingDate = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date(wedding.dayStartsAt));

// Public, couple-confirmed details only. RSVP stays WhatsApp/call; no public number.
export const faqGroups: FaqGroup[] = [
  {
    id: 'the-big-day', label: 'The big day', note: 'The when & the where.',
    items: [
      { id: 'wedding-date', question: 'When is the wedding?', paragraphs: [`Our wedding is on ${weddingDate}. We can’t wait to celebrate with you!`] },
      { id: 'guest-arrival', question: 'What time should we arrive?', paragraphs: [`Please arrive at ${wedding.guestArrival} on ${weddingDate}.`] },
      { id: 'wedding-venue', question: 'Where are we celebrating?', paragraphs: [`Join us at ${wedding.venue.name}, ${wedding.venue.city}.`, wedding.venue.address], link: { label: 'Get directions', href: weddingDirectionsUrl, external: true } },
      { id: 'valet-parking', question: 'Is parking available at the venue?', paragraphs: [`Yes, valet parking will be available at ${wedding.venue.name}.`] },
    ],
  },
  {
    id: 'what-to-wear', label: 'What to wear', note: 'A little outfit inspiration.',
    items: [
      { id: 'engagement-look', question: 'What should I wear for the engagement?', paragraphs: ['The theme is Western Glam. Choose any color you love and bring your favourite western celebration look.'], link: { label: 'Explore the engagement look', href: '/dress-code#western' } },
      { id: 'haldi-look', question: 'What are the Haldi colors?', paragraphs: ['Shades of blue, from soft powder blue to deep midnight blue. Tap a blue swatch on our Dress Code page to preview the outfits.'], palette: 'haldi', link: { label: 'Find your shade of blue', href: '/dress-code#haldi' } },
      { id: 'mehndi-look', question: 'What are the Mehndi colors?', paragraphs: ['Shades of orange, from gentle peach to warm rust. The orange palette is for both him and her.'], palette: 'mehndi', link: { label: 'Find your shade of orange', href: '/dress-code#mehndi' } },
      { id: 'jaggo-look', question: 'What is the Jaggo dress code?', paragraphs: ['Any color of your choice. These are the outfit styles for the night:'], list: [{ label: 'For him', text: 'Kurta Pyjama or Pathani.' }, { label: 'For her', text: 'Patiala Suit, Sharara or Garara.' }], link: { label: 'Try the Jaggo outfits', href: '/dress-code#jaggo' } },
      { id: 'outfit-preview', question: 'How do I change the outfits in the doodles?', paragraphs: ['On the Dress Code page, tap the blue or orange color dots to change both outfits. For Jaggo, tap the outfit-name buttons to change his and her styles independently.'], link: { label: 'Have a little try', href: '/dress-code' } },
    ],
  },
  {
    id: 'the-little-things', label: 'The little things', note: 'For the memories we’ll make.',
    items: [
      { id: 'how-to-rsvp', question: 'How do I RSVP?', paragraphs: ['Please confirm your attendance with us by WhatsApp or a call. We’d love to know you’re joining us!'] },
      { id: 'wedding-hashtag', question: 'What is your wedding hashtag?', paragraphs: [`It’s ${wedding.hashtag}! Use it when sharing your celebration photos and favourite moments, so our memories can live together.`] },
      { id: 'our-story', question: 'Where can I read your story?', paragraphs: ['From our first hello to our roka, we’ve put a few of our favourite memories into a little illustrated story.'], link: { label: 'Read our little story', href: '/our-story' } },
    ],
  },
];
