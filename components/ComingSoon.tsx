import Link from 'next/link';
export default function ComingSoon({ title }: { title: string }) {
  return <section className="coming-soon"><span className="eyebrow">GURINDER & GURPREET</span><h1 className="script-title">{title}</h1><span className="heart big-heart">♥</span><h2 className="script-title coming-title">Coming Soon</h2><p>Stay tuned</p><Link className="button" href="/dress-code">Explore Dress Code <span>↗</span></Link></section>;
}
