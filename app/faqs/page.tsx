import type { Metadata } from 'next';
import Link from 'next/link';
import DoodleHeart from '@/components/DoodleHeart';
import FaqAccordion from '@/components/FaqAccordion';
import { faqGroups } from '@/lib/faqs';
import { wedding } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Your questions about Gurinder and Gurpreet’s wedding: the date, celebration outfits and #GuriKiReet.',
};

const dateLabel = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(wedding.dayStartsAt));

export default function FaqPage() {
  return <div className="faq-page">
    <section className="faq-hero hero-enter" aria-labelledby="faq-title">
      <span className="faq-kicker">A LITTLE HELP BEFORE THE BIG DAY</span>
      <div className="faq-title-row"><h1 id="faq-title">A few little questions.</h1><DoodleHeart /></div>
      <p>The little details for celebrating with us.</p>
      <span className="faq-hero-note">you asked, we answered<svg viewBox="0 0 80 30" aria-hidden="true"><path d="M6 9Q40 30 71 7m-11 1 12-2-4 12" /></svg></span>
    </section>

    <div className="faq-layout">
      <aside className="faq-sidebar" aria-label="FAQ topics">
        <span className="faq-index-heading">Wondering about…</span>
        <nav className="faq-topic-nav" aria-label="Jump to a question topic">{faqGroups.map((group, index) => <a href={`#${group.id}`} key={group.id}><span>{String(index + 1).padStart(2, '0')}</span>{group.label}<i aria-hidden="true">↘</i></a>)}</nav>
        <div className="faq-date-note"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 12h30v28H9zM9 21h30M16 8v8M32 8v8M16 28h4m8 0h4m-16 6h4" /><path d="M28 32c-5-5-7 2 0 6 7-6 5-10 0-6z" stroke="var(--heart)" /></svg><time dateTime={wedding.date}>{dateLabel}</time><span>Guests arrive at {wedding.guestArrival}</span><span>Venue & location: {wedding.venue.label}</span><span className="faq-date-signature">a date to remember</span></div>
      </aside>

      <div className="faq-groups">{faqGroups.map((group, index) => <section className="faq-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`} data-reveal>
        <div className="faq-group-heading"><span className="faq-group-number">{String(index + 1).padStart(2, '0')}</span><div><h2 id={`${group.id}-title`}>{group.label}</h2><p>{group.note}</p></div></div>
        <FaqAccordion items={group.items} openFirst={index === 0} />
      </section>)}</div>
    </div>

    <section className="faq-closing" data-reveal><DoodleHeart /><h2>Now, let’s make some memories.</h2><p>We can’t wait to celebrate with you.</p><Link className="button" href="/dress-code">Find your celebration look <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
