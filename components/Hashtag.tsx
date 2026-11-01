import { wedding } from '@/lib/constants';

export default function Hashtag() {
  return <span className="wedding-hashtag">{wedding.hashtag}<svg viewBox="0 0 180 12" fill="none" aria-hidden="true"><path d="M4 8C43 2 109 3 175 5M30 10C69 5 115 5 150 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg></span>;
}
