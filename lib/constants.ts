export const wedding = {
  bride: 'Gurpreet', groom: 'Gurinder', names: 'Gurinder & Gurpreet', hashtag: '#GuriKiReet',
  date: '2027-01-31',
  guestArrival: '11:00 am',
  // Start of the wedding day in India, not a ceremony time.
  dayStartsAt: '2027-01-31T00:00:00+05:30',
  // Venue details stay unpublished until the invitations are shared.
  venue: { status: 'coming-soon', label: 'Coming soon' },
};
export const navigation = [
  { label: 'Home', href: '/' }, { label: 'Dress Code', href: '/dress-code' },
  { label: 'Our Story', href: '/our-story' }, { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' }, { label: 'RSVP', href: '/rsvp' },
];
export type Shade = { name: string; hex: string };
export type WeddingFunction = { id: string; number: string; title: string; navLabel?: string; subtitle: string; marginNote: string; panel: number; shades?: Shade[] };
export const functions: WeddingFunction[] = [
  { id: 'western', number: '01', title: 'Engagement · Western Glam', navLabel: 'Engagement', subtitle: 'Any color of your choice', marginNote: 'you + me', panel: 0 },
  { id: 'haldi', number: '02', title: 'Haldi', subtitle: 'Shades of blue', marginNote: 'a splash of sunshine', panel: 1, shades: [
    { name: 'Powder blue', hex: '#A8C5E5' }, { name: 'Sky blue', hex: '#7FAACF' }, { name: 'Cornflower', hex: '#5485AE' }, { name: 'Ocean blue', hex: '#315F83' }, { name: 'Midnight blue', hex: '#1A3A52' },
  ] },
  { id: 'mehndi', number: '03', title: 'Mehndi', subtitle: 'Shades of orange', marginNote: 'love in full bloom', panel: 2, shades: [
    { name: 'Peach', hex: '#FFCDB2' }, { name: 'Apricot', hex: '#F8AC80' }, { name: 'Tangerine', hex: '#EB8850' }, { name: 'Burnt orange', hex: '#D3662C' }, { name: 'Rust', hex: '#B5450F' },
  ] },
  { id: 'jaggo', number: '04', title: 'Jaggo', subtitle: 'Any color of your choice', marginNote: 'let’s light up the night', panel: 3 },
];
export const images = {
  outfits: ['/images/doodles/western-ink.webp', '/images/doodles/haldi-ink.webp', '/images/doodles/mehndi-orange-ink.webp'],
};
export const jaggoOutfits = {
  him: [
    { id: 'kurta-pyjama', label: 'Kurta Pyjama', image: '/images/doodles/jaggo-him-kurta.webp' },
    { id: 'pathani', label: 'Pathani', image: '/images/doodles/jaggo-him-pathani.webp' },
  ],
  her: [
    { id: 'patiala-suit', label: 'Patiala Suit', image: '/images/doodles/jaggo-her-patiala.webp' },
    { id: 'sharara', label: 'Sharara', image: '/images/doodles/jaggo-her-garara-v2.webp' },
    { id: 'garara', label: 'Garara', image: '/images/doodles/jaggo-her-sharara-v2.webp' },
  ],
};
