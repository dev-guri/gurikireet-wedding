import Link from 'next/link';
import Monogram from './Monogram';
import Hashtag from './Hashtag';
export default function Footer() {
  return <footer className="site-footer"><Monogram small /><Hashtag /><p>Made with love, for the people we love.</p><div className="footer-links"><Link href="/location">Location</Link><span>·</span><Link href="/faqs">FAQs</Link><span>·</span><Link href="/rsvp">RSVP</Link></div><span className="heart">♥</span></footer>;
}
