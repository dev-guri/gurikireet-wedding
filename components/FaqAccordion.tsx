'use client';

import Link from 'next/link';
import type { FaqItem } from '@/lib/faqs';
import { functions } from '@/lib/constants';

export default function FaqAccordion({ items, openFirst = false }: { items: FaqItem[]; openFirst?: boolean }) {
  return <div className="faq-accordion">{items.map((item, index) => <details className="faq-item" name="wedding-faq" key={item.id} id={item.id} open={openFirst && index === 0} onToggle={event => {
    const current = event.currentTarget;
    if (!current.open) return;
    // Native name grouping handles current browsers. This also supports older
    // Safari versions, across every topic on the FAQ page.
    current.closest('.faq-groups')?.querySelectorAll<HTMLDetailsElement>('.faq-item[open]').forEach(other => {
      if (other !== current) other.open = false;
    });
  }}>
    <summary className="faq-question"><span>{item.question}</span><svg className="faq-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /><path className="faq-plus-vertical" d="M12 5v14" /></svg></summary>
    <div className="faq-answer">
      {item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {item.list && <dl className="faq-outfit-list">{item.list.map(line => <div key={line.label}><dt>{line.label}</dt><dd>{line.text}</dd></div>)}</dl>}
      {item.palette && <ul className="faq-palette" aria-label={`${item.palette === 'haldi' ? 'Haldi blue' : 'Mehndi orange'} palette`}>{functions.find(event => event.id === item.palette)?.shades?.map(shade => <li key={shade.hex}><span style={{ backgroundColor: shade.hex }} title={shade.name} /><span className="sr-only">{shade.name}</span></li>)}</ul>}
      {item.link && (item.link.external ? <a className="faq-answer-link" href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a> : <Link className="faq-answer-link" href={item.link.href}>{item.link.label} <span aria-hidden="true">↗</span></Link>)}
    </div>
  </details>)}</div>;
}
